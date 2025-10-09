import { QueryClient, type QueryFunction } from "@tanstack/react-query";
import * as staticData from './staticData';

// Detect if backend is available
let backendAvailable: boolean | null = null;

async function checkBackendAvailability(): Promise<boolean> {
  if (backendAvailable !== null) {
    return backendAvailable;
  }
  
  try {
    // Use GET and verify JSON response to avoid .htaccess rewrites
    const response = await fetch('/api/debt-stats');
    
    // Check if we got JSON (real backend) or HTML (rewritten by .htaccess)
    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    
    if (isJson && response.ok) {
      // Verify it's actually JSON by parsing
      await response.json();
      backendAvailable = true;
    } else {
      backendAvailable = false;
    }
  } catch {
    backendAvailable = false;
  }
  
  return backendAvailable;
}

// Hybrid fetcher that uses backend if available, static data otherwise
const hybridFetcher: QueryFunction = async ({ queryKey }) => {
  const [path, ...params] = queryKey as [string, ...any[]];
  const hasBackend = await checkBackendAvailability();
  
  if (hasBackend) {
    try {
      // Use backend API
      const response = await fetch(path as string);
      const contentType = response.headers.get('content-type') || '';
      
      // If we got HTML instead of JSON, backend is not really available
      if (!contentType.includes('application/json')) {
        backendAvailable = false; // Reset detection
        // Fall through to static data below
      } else if (response.ok) {
        try {
          return await response.json();
        } catch (parseError) {
          // JSON parse failed - backend returned invalid JSON
          backendAvailable = false;
          // Fall through to static data below
        }
      } else {
        // HTTP error - try static data
        backendAvailable = false;
        // Fall through to static data below
      }
    } catch (error) {
      // Network error or other fetch error - try static data
      backendAvailable = false;
      // Fall through to static data below
    }
  }
  
  // Fall back to static data
  if (path === '/api/slices') {
    return await staticData.loadStaticSlices();
  }
  
  if (path.startsWith('/api/slices/')) {
    const parts = path.split('/');
    
    if (parts.length === 4 && !isNaN(Number(parts[3]))) {
      const number = Number(parts[3]);
      return await staticData.getSliceByNumber(number);
    }
    
    if (parts[3] === 'tier' && parts[4]) {
      const tier = Number(parts[4]);
      return await staticData.getSlicesByTier(tier);
    }
    
    if (parts[3] === 'search' && params[0]) {
      return await staticData.searchSlices(params[0] as string);
    }
    
    if (parts[3] === 'filter' && params[0]) {
      return await staticData.filterSlices(params[0] as any);
    }
  }
  
  if (path === '/api/debt-stats') {
    return await staticData.loadStaticStats();
  }
  
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
  
  throw new Error(`Unknown route: ${path}`);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: hybridFetcher,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export async function apiRequest(url: string, options?: RequestInit) {
  const hasBackend = await checkBackendAvailability();
  
  if (!hasBackend) {
    throw new Error('API mutations not available in static mode');
  }
  
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
