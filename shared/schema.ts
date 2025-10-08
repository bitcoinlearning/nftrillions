import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const slices = pgTable("slices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  number: integer("number").notNull().unique(),
  debtAmount: text("debt_amount").notNull(),
  mintPrice: integer("mint_price").notNull(),
  tier: integer("tier").notNull(),
  isUnlocked: boolean("is_unlocked").notNull().default(false),
  unlockedAt: timestamp("unlocked_at"),
  dateReached: text("date_reached"),
  cpiRate: text("cpi_rate"),
  interestRate: text("interest_rate"),
  historicalContext: text("historical_context"),
  president: text("president"),
  headlines: text("headlines"), // JSON string
  solanaAddress: text("solana_address"),
});

export const debtStats = pgTable("debt_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  currentDebt: text("current_debt").notNull(),
  unlockedSlices: integer("unlocked_slices").notNull(),
  nextUnlockAt: text("next_unlock_at").notNull(),
  lastUpdated: timestamp("last_updated").notNull().default(sql`now()`),
});

export const insertSliceSchema = createInsertSchema(slices).omit({
  id: true,
  unlockedAt: true,
});

export const insertDebtStatsSchema = createInsertSchema(debtStats).omit({
  id: true,
  lastUpdated: true,
});

export type InsertSlice = z.infer<typeof insertSliceSchema>;
export type Slice = typeof slices.$inferSelect;

export type InsertDebtStats = z.infer<typeof insertDebtStatsSchema>;
export type DebtStats = typeof debtStats.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
