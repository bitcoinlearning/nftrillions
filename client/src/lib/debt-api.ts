// Simulated real-time debt API
export class DebtAPI {
  private baseDebt = 37000000000000; // $37T
  private increment = 1000000; // $1M per update
  private intervalMs = 1000; // Update every second
  private startTime = Date.now(); // Track when we started counting

  setBaseDebt(amount: number): void {
    this.baseDebt = amount;
    this.startTime = Date.now(); // Reset the start time when base changes
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

  // Subscribe to debt updates
  subscribeToUpdates(callback: (debt: string) => void): () => void {
    const interval = setInterval(() => {
      callback(this.getCurrentDebt());
    }, this.intervalMs);

    return () => clearInterval(interval);
  }

  // Get next milestone info
  getNextMilestone(currentDebt: number): { amount: number; sliceNumber: number } {
    const currentSliceNumber = Math.floor(currentDebt / 100000000000); // $100B increments
    const nextSliceNumber = currentSliceNumber + 1;
    const nextMilestoneAmount = nextSliceNumber * 100000000000;
    
    return {
      amount: nextMilestoneAmount,
      sliceNumber: nextSliceNumber
    };
  }
}

export const debtAPI = new DebtAPI();
