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
  private increment = 1000000; // $1M per update
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
      // Primary: U.S. Treasury FiscalData API
      const fiscalResponse = await this.fetchWithTimeout(
        'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?fields=record_date,tot_pub_debt_out_amt&sort=-record_date&page[size]=1&format=json',
        8000
      );

      if (fiscalResponse.ok) {
        const fiscalData = await fiscalResponse.json();
        if (fiscalData?.data?.[0]?.tot_pub_debt_out_amt) {
          const debtAmount = parseFloat(fiscalData.data[0].tot_pub_debt_out_amt);
          this.setCache({ amount: debtAmount, timestamp: Date.now(), source: 'FiscalData' });
          console.log('[Debt API] Fetched from FiscalData:', debtAmount);
          return debtAmount;
        }
      }
    } catch (error) {
      console.warn('[Debt API] FiscalData failed, trying fallback');
    }

    try {
      // Fallback: TreasuryDirect legacy API
      const treasuryResponse = await this.fetchWithTimeout(
        'https://www.treasurydirect.gov/NP_WS/debt/current',
        8000
      );

      if (treasuryResponse.ok) {
        const treasuryData = await treasuryResponse.json();
        if (treasuryData?.totalDebt) {
          const debtAmount = parseFloat(treasuryData.totalDebt.replace(/,/g, ''));
          this.setCache({ amount: debtAmount, timestamp: Date.now(), source: 'TreasuryDirect' });
          console.log('[Debt API] Fetched from TreasuryDirect:', debtAmount);
          return debtAmount;
        }
      }
    } catch (error) {
      console.warn('[Debt API] TreasuryDirect failed');
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

  private formatCurrency(amount: number): string {
    return '$' + amount.toLocaleString('en-US');
  }

  subscribeToUpdates(callback: (debt: string) => void): () => void {
    const interval = setInterval(() => {
      callback(this.getCurrentDebt());
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
