import { QueryClient, type QueryFunction, type QueryKey } from "@tanstack/react-query";
import * as staticData from './staticData';

// Static data fetcher for production builds without backend
const staticFetcher: QueryFunction = async ({ queryKey }) => {
  const [path, ...params] = queryKey as [string, ...any[]];
  
  // Handle slice requests
  if (path === '/api/slices') {
    return await staticData.loadStaticSlices();
  }
  
  if (path.startsWith('/api/slices/')) {
    const parts = path.split('/');
    
    // /api/slices/:number
    if (parts.length === 4 && !isNaN(Number(parts[3]))) {
      const number = Number(parts[3]);
      return await staticData.getSliceByNumber(number);
    }
    
    // /api/slices/tier/:tier
    if (parts[3] === 'tier' && parts[4]) {
      const tier = Number(parts[4]);
      return await staticData.getSlicesByTier(tier);
    }
    
    // /api/slices/search
    if (parts[3] === 'search' && params[0]) {
      return await staticData.searchSlices(params[0] as string);
    }
    
    // /api/slices/filter
    if (parts[3] === 'filter' && params[0]) {
      return await staticData.filterSlices(params[0] as any);
    }
  }
  
  // Handle stats
  if (path === '/api/debt-stats') {
    return await staticData.loadStaticStats();
  }
  
  // Handle debt/current - use cached value from stats
  if (path === '/api/debt/current') {
    const stats = await staticData.loadStaticStats();
    const debtValue = parseFloat(stats.currentDebt.replace(/[^0-9.]/g, ''));
    return {
      amount: debtValue,
      formatted: stats.currentDebt,
      cached: true,
      cacheAge: 0,
      source: 'static'
    };
  }
  
  throw new Error(`Unknown static route: ${path}`);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: staticFetcher,
      staleTime: Infinity, // Data never goes stale (it's static)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

// Dummy API request function for mutations (not used in static mode)
export async function apiRequest(url: string, options?: RequestInit) {
  throw new Error('API mutations not available in static mode');
}
