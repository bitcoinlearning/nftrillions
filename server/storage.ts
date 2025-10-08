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
    // Initialize with some sample slices
    const sampleSlices: Slice[] = [
      {
        id: randomUUID(),
        number: 1,
        debtAmount: "$100,000,000,000",
        mintPrice: 100,
        tier: 1,
        isUnlocked: true,
        unlockedAt: new Date("1981-09-28"),
        dateReached: "September 1981",
        cpiRate: "10.3%",
        interestRate: "15.8%",
        historicalContext: "This milestone was reached during the Reagan administration, a period marked by high inflation and aggressive Federal Reserve policies to combat it. The Volcker shock had just begun, with interest rates reaching historic highs to curb double-digit inflation.",
        president: "Ronald Reagan",
        headlines: JSON.stringify([
          "Fed Raises Interest Rates to Combat Inflation",
          "Reagan's Economic Policies Take Effect",
          "National Debt Crosses $100 Billion Milestone"
        ]),
        solanaAddress: null,
      },
      {
        id: randomUUID(),
        number: 10,
        debtAmount: "$1,000,000,000,000",
        mintPrice: 100,
        tier: 1,
        isUnlocked: true,
        unlockedAt: new Date("1982-10-22"),
        dateReached: "October 1982",
        cpiRate: "5.1%",
        interestRate: "12.0%",
        historicalContext: "The U.S. debt reached $1 trillion during a severe recession. Unemployment hit 10.8%, the highest since the Great Depression.",
        president: "Ronald Reagan",
        headlines: JSON.stringify([
          "U.S. Debt Reaches Historic $1 Trillion",
          "Recession Deepens as Unemployment Soars",
          "Manufacturing Sector Hit Hardest"
        ]),
        solanaAddress: null,
      },
      {
        id: randomUUID(),
        number: 50,
        debtAmount: "$5,000,000,000,000",
        mintPrice: 100,
        tier: 1,
        isUnlocked: true,
        unlockedAt: new Date("1996-03-29"),
        dateReached: "March 1996",
        cpiRate: "2.9%",
        interestRate: "5.25%",
        historicalContext: "During the Clinton administration's economic expansion, the debt reached $5 trillion despite strong economic growth and budget surplus efforts.",
        president: "Bill Clinton",
        headlines: JSON.stringify([
          "Economy Shows Strong Growth Despite Rising Debt",
          "Technology Sector Boom Continues",
          "Clinton Pushes for Balanced Budget"
        ]),
        solanaAddress: null,
      }
    ];

    sampleSlices.forEach(slice => {
      this.slices.set(slice.number, slice);
    });

    // Initialize debt stats
    this.debtStats = {
      id: randomUUID(),
      currentDebt: "$37,000,000,000,000",
      unlockedSlices: 370,
      nextUnlockAt: "$37,100,000,000,000",
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
    
    return allSlices.filter(slice => 
      slice.number.toString().includes(lowerQuery) ||
      slice.debtAmount.toLowerCase().includes(lowerQuery) ||
      slice.dateReached?.toLowerCase().includes(lowerQuery) ||
      slice.president?.toLowerCase().includes(lowerQuery)
    );
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
