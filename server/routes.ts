import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSliceSchema, insertDebtStatsSchema } from "@shared/schema";
import { z } from "zod";

// Cache for debt data to minimize API requests
let debtCache: { amount: number; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

async function fetchCurrentDebt(): Promise<number> {
  // Check cache first
  if (debtCache && Date.now() - debtCache.timestamp < CACHE_DURATION) {
    return debtCache.amount;
  }

  try {
    // Primary: U.S. Treasury FiscalData API
    const fiscalResponse = await fetch(
      'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?fields=record_date,tot_pub_debt_out_amt&sort=-record_date&page[size]=1&format=json',
      { signal: AbortSignal.timeout(5000) } // 5 second timeout
    );

    if (fiscalResponse.ok) {
      const fiscalData = await fiscalResponse.json();
      if (fiscalData?.data?.[0]?.tot_pub_debt_out_amt) {
        const debtAmount = parseFloat(fiscalData.data[0].tot_pub_debt_out_amt);
        debtCache = { amount: debtAmount, timestamp: Date.now() };
        console.log('[Debt API] Fetched from FiscalData:', debtAmount);
        return debtAmount;
      }
    }
  } catch (error) {
    console.error('[Debt API] FiscalData failed:', error);
  }

  try {
    // Fallback: TreasuryDirect legacy API
    const treasuryResponse = await fetch(
      'https://www.treasurydirect.gov/NP_WS/debt/current',
      { signal: AbortSignal.timeout(5000) }
    );

    if (treasuryResponse.ok) {
      const treasuryData = await treasuryResponse.json();
      if (treasuryData?.totalDebt) {
        const debtAmount = parseFloat(treasuryData.totalDebt.replace(/,/g, ''));
        debtCache = { amount: debtAmount, timestamp: Date.now() };
        console.log('[Debt API] Fetched from TreasuryDirect:', debtAmount);
        return debtAmount;
      }
    }
  } catch (error) {
    console.error('[Debt API] TreasuryDirect failed:', error);
  }

  // If both APIs fail, return cached value or fallback to last known amount
  if (debtCache) {
    console.log('[Debt API] Using stale cache:', debtCache.amount);
    return debtCache.amount;
  }

  // Final fallback to hardcoded value (from usdebtclock.org)
  const fallbackAmount = 37840931900999;
  console.log('[Debt API] All sources failed, using fallback:', fallbackAmount);
  return fallbackAmount;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all slices
  app.get("/api/slices", async (req, res) => {
    try {
      const slices = await storage.getAllSlices();
      res.json(slices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch slices" });
    }
  });

  // Get slice by number
  app.get("/api/slices/:number", async (req, res) => {
    try {
      const number = parseInt(req.params.number);
      if (isNaN(number)) {
        return res.status(400).json({ error: "Invalid slice number" });
      }

      const slice = await storage.getSliceByNumber(number);
      if (!slice) {
        return res.status(404).json({ error: "Slice not found" });
      }

      res.json(slice);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch slice" });
    }
  });

  // Get slices by tier
  app.get("/api/slices/tier/:tier", async (req, res) => {
    try {
      const tier = parseInt(req.params.tier);
      if (isNaN(tier)) {
        return res.status(400).json({ error: "Invalid tier number" });
      }

      const slices = await storage.getSlicesByTier(tier);
      res.json(slices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch slices by tier" });
    }
  });

  // Get unlocked slices
  app.get("/api/slices/unlocked", async (req, res) => {
    try {
      const slices = await storage.getUnlockedSlices();
      res.json(slices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch unlocked slices" });
    }
  });

  // Search slices
  app.get("/api/slices/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }

      const slices = await storage.searchSlices(q);
      res.json(slices);
    } catch (error) {
      res.status(500).json({ error: "Failed to search slices" });
    }
  });

  // Filter slices
  app.get("/api/slices/filter", async (req, res) => {
    try {
      const { tier, unlocked } = req.query;
      
      const filters: { tier?: number; unlocked?: boolean } = {};
      
      if (tier && typeof tier === 'string') {
        const tierNum = parseInt(tier);
        if (!isNaN(tierNum)) {
          filters.tier = tierNum;
        }
      }
      
      if (unlocked && typeof unlocked === 'string') {
        filters.unlocked = unlocked === 'true';
      }

      const slices = await storage.filterSlices(filters);
      res.json(slices);
    } catch (error) {
      res.status(500).json({ error: "Failed to filter slices" });
    }
  });

  // Create new slice
  app.post("/api/slices", async (req, res) => {
    try {
      const validatedData = insertSliceSchema.parse(req.body);
      const slice = await storage.createSlice(validatedData);
      res.status(201).json(slice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid slice data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create slice" });
    }
  });

  // Update slice
  app.patch("/api/slices/:number", async (req, res) => {
    try {
      const number = parseInt(req.params.number);
      if (isNaN(number)) {
        return res.status(400).json({ error: "Invalid slice number" });
      }

      const slice = await storage.updateSlice(number, req.body);
      if (!slice) {
        return res.status(404).json({ error: "Slice not found" });
      }

      res.json(slice);
    } catch (error) {
      res.status(500).json({ error: "Failed to update slice" });
    }
  });

  // Get current debt from Treasury APIs
  app.get("/api/debt/current", async (req, res) => {
    try {
      const debtAmount = await fetchCurrentDebt();
      const cacheAge = debtCache ? Date.now() - debtCache.timestamp : 0;
      
      res.json({
        amount: debtAmount,
        formatted: '$' + debtAmount.toLocaleString('en-US'),
        cached: cacheAge > 0,
        cacheAge: Math.floor(cacheAge / 1000), // age in seconds
        source: cacheAge === 0 ? 'live' : 'cache'
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch current debt" });
    }
  });

  // Get debt stats
  app.get("/api/debt-stats", async (req, res) => {
    try {
      const stats = await storage.getDebtStats();
      if (!stats) {
        return res.status(404).json({ error: "Debt stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch debt stats" });
    }
  });

  // Update debt stats
  app.post("/api/debt-stats", async (req, res) => {
    try {
      const validatedData = insertDebtStatsSchema.parse(req.body);
      const stats = await storage.updateDebtStats(validatedData);
      res.json(stats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid debt stats data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update debt stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
