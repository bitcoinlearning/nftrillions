// Client-side debt API with Treasury data and localStorage caching
const CACHE_KEY = 'nft_debt_cache';
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours (conservative to minimize API requests)

interface CachedDebt {
  amount: number;
  timestamp: number;
  source: string;
}

export class DebtAPI {
  private baseDebt = 37840931900999; // Fallback value
  private increment = 80000; // ~$80K per second (estimated average debt growth rate)
  private intervalMs = 1000; // Update every second
  private startTime = Date.now();

  // Cross-browser compatible timeout for fetch
  private fetchWithTimeout(url: string, timeout: number): Promise<Response> {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new Error('Request timeout'));
      }, timeout);

      fetch(url, { signal: controller.signal })
        .then(response => {
          clearTimeout(timeoutId);
          resolve(response);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  async fetchRealDebt(): Promise<number> {
    // Check localStorage cache first
    const cached = this.getCache();
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('[Debt API] Using cached data:', cached.amount, '(age:', Math.floor((Date.now() - cached.timestamp) / 1000 / 60), 'min)');
      return cached.amount;
    }

    try {
      // Use the hybrid backend/static endpoint (works in both dev and static mode)
      // In dev mode: backend proxies Treasury APIs
      // In static mode: falls back to exported JSON data
      const response = await this.fetchWithTimeout('/api/debt/current', 8000);

      if (response.ok) {
        const data = await response.json();
        if (data?.amount) {
          const debtAmount = data.amount;
          this.setCache({ amount: debtAmount, timestamp: Date.now(), source: data.source || 'API' });
          console.log('[Debt API] Fetched debt data:', debtAmount, 'source:', data.source);
          return debtAmount;
        }
      }
    } catch (error) {
      console.warn('[Debt API] API endpoint failed, using cached or fallback value');
    }

    // Use stale cache if available
    if (cached) {
      console.log('[Debt API] Using stale cache:', cached.amount);
      return cached.amount;
    }

    // Final fallback
    console.log('[Debt API] All sources failed, using fallback:', this.baseDebt);
    return this.baseDebt;
  }

  private getCache(): CachedDebt | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private setCache(data: CachedDebt): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('[Debt API] Failed to cache data');
    }
  }

  setBaseDebt(amount: number): void {
    this.baseDebt = amount;
    this.startTime = Date.now();
  }

  getCurrentDebt(): string {
    const now = Date.now();
    const secondsElapsed = Math.floor((now - this.startTime) / this.intervalMs);
    const currentDebt = this.baseDebt + (secondsElapsed * this.increment);
    
    return this.formatCurrency(currentDebt);
  }

  getCurrentDebtNumeric(): number {
    const now = Date.now();
    const secondsElapsed = Math.floor((now - this.startTime) / this.intervalMs);
    return this.baseDebt + (secondsElapsed * this.increment);
  }

  private formatCurrency(amount: number): string {
    return '$' + amount.toLocaleString('en-US');
  }

  subscribeToUpdates(callback: (debt: string) => void): () => void {
    const interval = setInterval(() => {
      callback(this.getCurrentDebt());
    }, this.intervalMs);

    return () => clearInterval(interval);
  }

  subscribeToNumericUpdates(callback: (debt: number) => void): () => void {
    const interval = setInterval(() => {
      callback(this.getCurrentDebtNumeric());
    }, this.intervalMs);

    return () => clearInterval(interval);
  }

  getNextMilestone(currentDebt: number): { amount: number; sliceNumber: number } {
    const currentSliceNumber = Math.floor(currentDebt / 100000000000);
    const nextSliceNumber = currentSliceNumber + 1;
    const nextMilestoneAmount = nextSliceNumber * 100000000000;
    
    return {
      amount: nextMilestoneAmount,
      sliceNumber: nextSliceNumber
    };
  }
}

export const debtAPI = new DebtAPI();
