import { type User, type InsertUser, type Slice, type InsertSlice, type DebtStats, type InsertDebtStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Slices
  getAllSlices(): Promise<Slice[]>;
  getSliceByNumber(number: number): Promise<Slice | undefined>;
  getSlicesByTier(tier: number): Promise<Slice[]>;
  getUnlockedSlices(): Promise<Slice[]>;
  createSlice(slice: InsertSlice): Promise<Slice>;
  updateSlice(number: number, updates: Partial<Slice>): Promise<Slice | undefined>;
  
  // Debt Stats
  getDebtStats(): Promise<DebtStats | undefined>;
  updateDebtStats(stats: InsertDebtStats): Promise<DebtStats>;
  
  // Search & Filter
  searchSlices(query: string): Promise<Slice[]>;
  filterSlices(filters: { tier?: number; unlocked?: boolean }): Promise<Slice[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private slices: Map<number, Slice>;
  private debtStats: DebtStats | undefined;

  constructor() {
    this.users = new Map();
    this.slices = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Generate all 1000 slices
    const MIN_UNLOCKED = 389; // Minimum slices to unlock for showcase
    
    for (let i = 1; i <= 1000; i++) {
      // Calculate tier (1-10, each tier has 100 slices)
      const tier = Math.ceil(i / 100);
      
      // Calculate price based on tier
      const mintPrice = tier * 100;
      
      // Calculate debt amount ($100B per slice)
      const debtBillions = i * 100;
      const debtAmount = `$${(debtBillions * 1_000_000_000).toLocaleString('en-US')}`;
      
      // Unlock logic:
      // - Slices 1-389: Always unlocked (showcase minimum)
      // - Slices 390+: Would auto-unlock based on current debt (378), so locked for now
      const isUnlocked = i <= MIN_UNLOCKED;
      
      const slice: Slice = {
        id: randomUUID(),
        number: i,
        debtAmount,
        mintPrice,
        tier,
        isUnlocked,
        unlockedAt: isUnlocked ? new Date() : null,
        dateReached: null,
        cpiRate: null,
        interestRate: null,
        historicalContext: null,
        president: null,
        headlines: null,
        solanaAddress: null,
      };
      
      this.slices.set(i, slice);
    }

    // Initialize debt stats (current real debt: ~$37.89T = 378 slices)
    this.debtStats = {
      id: randomUUID(),
      currentDebt: "$37,840,931,900,999",
      unlockedSlices: MIN_UNLOCKED, // Show 389 unlocked for showcase
      nextUnlockAt: "$39,000,000,000,000", // Next unlock at $39T (slice #390)
      lastUpdated: new Date(),
    };
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Slices
  async getAllSlices(): Promise<Slice[]> {
    return Array.from(this.slices.values()).sort((a, b) => a.number - b.number);
  }

  async getSliceByNumber(number: number): Promise<Slice | undefined> {
    return this.slices.get(number);
  }

  async getSlicesByTier(tier: number): Promise<Slice[]> {
    return Array.from(this.slices.values()).filter(slice => slice.tier === tier);
  }

  async getUnlockedSlices(): Promise<Slice[]> {
    return Array.from(this.slices.values()).filter(slice => slice.isUnlocked);
  }

  async createSlice(insertSlice: InsertSlice): Promise<Slice> {
    const id = randomUUID();
    const slice: Slice = {
      id,
      number: insertSlice.number,
      debtAmount: insertSlice.debtAmount,
      mintPrice: insertSlice.mintPrice,
      tier: insertSlice.tier,
      isUnlocked: insertSlice.isUnlocked ?? false,
      unlockedAt: insertSlice.isUnlocked ? new Date() : null,
      dateReached: insertSlice.dateReached || null,
      cpiRate: insertSlice.cpiRate || null,
      interestRate: insertSlice.interestRate || null,
      historicalContext: insertSlice.historicalContext || null,
      president: insertSlice.president || null,
      headlines: insertSlice.headlines || null,
      solanaAddress: insertSlice.solanaAddress || null,
    };
    this.slices.set(slice.number, slice);
    return slice;
  }

  async updateSlice(number: number, updates: Partial<Slice>): Promise<Slice | undefined> {
    const slice = this.slices.get(number);
    if (!slice) return undefined;
    
    const updatedSlice = { ...slice, ...updates };
    this.slices.set(number, updatedSlice);
    return updatedSlice;
  }

  // Debt Stats
  async getDebtStats(): Promise<DebtStats | undefined> {
    return this.debtStats;
  }

  async updateDebtStats(stats: InsertDebtStats): Promise<DebtStats> {
    this.debtStats = {
      id: this.debtStats?.id || randomUUID(),
      ...stats,
      lastUpdated: new Date(),
    };
    return this.debtStats;
  }

  // Search & Filter
  async searchSlices(query: string): Promise<Slice[]> {
    const allSlices = await this.getAllSlices();
    const lowerQuery = query.toLowerCase();
    
    // Strip # and whitespace for number matching
    const cleanedQuery = query.replace('#', '').trim();
    const queryAsNumber = parseInt(cleanedQuery);
    
    // Check if the cleaned query is purely numeric (after stripping #)
    const isPurelyNumeric = /^\d+$/.test(cleanedQuery);
    
    return allSlices.filter(slice => {
      // Check if query matches slice number (handles "001", "#103", etc.)
      // Only match by number if the query is purely numeric
      if (isPurelyNumeric && !isNaN(queryAsNumber) && slice.number === queryAsNumber) {
        return true;
      }
      
      // Also check string matches for other fields
      return (
        slice.number.toString().includes(lowerQuery) ||
        slice.debtAmount.toLowerCase().includes(lowerQuery) ||
        slice.dateReached?.toLowerCase().includes(lowerQuery) ||
        slice.president?.toLowerCase().includes(lowerQuery)
      );
    });
  }

  async filterSlices(filters: { tier?: number; unlocked?: boolean }): Promise<Slice[]> {
    let slices = await this.getAllSlices();
    
    if (filters.tier !== undefined) {
      slices = slices.filter(slice => slice.tier === filters.tier);
    }
    
    if (filters.unlocked !== undefined) {
      slices = slices.filter(slice => slice.isUnlocked === filters.unlocked);
    }
    
    return slices;
  }
}

export const storage = new MemStorage();
