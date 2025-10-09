// Static data loader for production builds without backend
import type { Slice, DebtStats } from '@shared/schema';

let slicesCache: Slice[] | null = null;
let statsCache: DebtStats | null = null;

export async function loadStaticSlices(): Promise<Slice[]> {
  if (slicesCache) {
    return slicesCache;
  }
  
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Use relative path instead of window.location for SSR compatibility
  const url = `${baseUrl}slices.json`.replace(/\/+/g, '/');
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load slices data');
  }
  
  slicesCache = await response.json();
  return slicesCache!;
}

export async function loadStaticStats(): Promise<DebtStats> {
  if (statsCache) {
    return statsCache;
  }
  
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Use relative path instead of window.location for SSR compatibility
  const url = `${baseUrl}stats.json`.replace(/\/+/g, '/');
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load stats data');
  }
  
  statsCache = await response.json();
  return statsCache!;
}

export async function getSliceByNumber(number: number): Promise<Slice | undefined> {
  const slices = await loadStaticSlices();
  return slices.find(s => s.number === number);
}

export async function getSlicesByTier(tier: number): Promise<Slice[]> {
  const slices = await loadStaticSlices();
  return slices.filter(s => s.tier === tier);
}

export async function searchSlices(query: string): Promise<Slice[]> {
  const slices = await loadStaticSlices();
  const lowerQuery = query.toLowerCase();
  const cleanedQuery = query.replace('#', '').trim();
  const queryAsNumber = parseInt(cleanedQuery);
  const isPurelyNumeric = /^\d+$/.test(cleanedQuery);
  
  return slices.filter(slice => {
    if (isPurelyNumeric && !isNaN(queryAsNumber) && slice.number === queryAsNumber) {
      return true;
    }
    
    return (
      slice.number.toString().includes(lowerQuery) ||
      slice.debtAmount.toLowerCase().includes(lowerQuery) ||
      slice.dateReached?.toLowerCase().includes(lowerQuery) ||
      slice.president?.toLowerCase().includes(lowerQuery)
    );
  });
}

export async function filterSlices(filters: { tier?: number; unlocked?: boolean }): Promise<Slice[]> {
  let slices = await loadStaticSlices();
  
  if (filters.tier !== undefined) {
    slices = slices.filter(slice => slice.tier === filters.tier);
  }
  
  if (filters.unlocked !== undefined) {
    slices = slices.filter(slice => slice.isUnlocked === filters.unlocked);
  }
  
  return slices;
}
