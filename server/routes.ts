import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSliceSchema, insertDebtStatsSchema } from "@shared/schema";
import { z } from "zod";

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
