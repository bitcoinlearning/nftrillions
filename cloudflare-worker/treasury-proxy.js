/**
 * Cloudflare Worker: Treasury API Proxy with 12-hour caching
 * 
 * This worker acts as a CORS-enabled proxy for U.S. Treasury debt data.
 * It caches responses for 12 hours to avoid rate limiting.
 * 
 * Deploy to: https://workers.cloudflare.com/
 */

const CACHE_DURATION = 12 * 60 * 60; // 12 hours in seconds

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Only allow GET requests
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const cacheKey = 'treasury-debt-data';
  const cache = caches.default;

  // Try to get from Cloudflare cache
  let cachedResponse = await cache.match(cacheKey);
  
  if (cachedResponse) {
    console.log('Cache hit - serving cached data');
    
    // Parse cached response to add cache metadata
    const cachedData = await cachedResponse.json();
    const cacheTimestamp = cachedData.timestamp ? new Date(cachedData.timestamp).getTime() : Date.now();
    const cacheAge = Math.floor((Date.now() - cacheTimestamp) / 1000); // seconds
    
    const enrichedData = {
      ...cachedData,
      cached: true,
      cacheAge: cacheAge
    };
    
    return new Response(JSON.stringify(enrichedData), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': `public, max-age=${CACHE_DURATION}`,
      },
    });
  }

  console.log('Cache miss - fetching fresh data from Treasury APIs');
  
  // Try FiscalData API first (primary source)
  let debtData = await fetchFromFiscalData();
  
  // Fallback to TreasuryDirect if FiscalData fails
  if (!debtData) {
    console.log('FiscalData failed, trying TreasuryDirect');
    debtData = await fetchFromTreasuryDirect();
  }

  // Return error if both APIs fail
  if (!debtData) {
    return new Response(JSON.stringify({
      error: 'Unable to fetch debt data from Treasury APIs',
      amount: 36000000000000, // Fallback to ~$36T
      formatted: '$36,000,000,000,000',
      cached: false,
      cacheAge: 0,
      source: 'fallback'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // Create response with CORS headers
  const response = new Response(JSON.stringify(debtData), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': `public, max-age=${CACHE_DURATION}`,
    },
  });

  // Store in Cloudflare cache for 12 hours
  await cache.put(cacheKey, response.clone());

  return response;
}

async function fetchFromFiscalData() {
  try {
    const url = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?fields=record_date,tot_pub_debt_out_amt&sort=-record_date&page[size]=1&format=json';
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'NFTrillions-Cloudflare-Worker/1.0'
      }
    });

    if (!response.ok) {
      console.error('FiscalData API error:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (data.data && data.data[0] && data.data[0].tot_pub_debt_out_amt) {
      const amount = parseFloat(data.data[0].tot_pub_debt_out_amt);
      return {
        amount: amount,
        formatted: formatCurrency(amount),
        cached: false,
        cacheAge: 0,
        source: 'fiscaldata',
        timestamp: new Date().toISOString()
      };
    }

    return null;
  } catch (error) {
    console.error('FiscalData fetch error:', error);
    return null;
  }
}

async function fetchFromTreasuryDirect() {
  try {
    const url = 'https://www.treasurydirect.gov/NP_WS/debt/current';
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'NFTrillions-Cloudflare-Worker/1.0'
      }
    });

    if (!response.ok) {
      console.error('TreasuryDirect API error:', response.status);
      return null;
    }

    const text = await response.text();
    
    // Parse XML response
    const match = text.match(/<totalDebt>(\d+\.?\d*)<\/totalDebt>/);
    if (match && match[1]) {
      const amount = parseFloat(match[1]);
      return {
        amount: amount,
        formatted: formatCurrency(amount),
        cached: false,
        cacheAge: 0,
        source: 'treasurydirect',
        timestamp: new Date().toISOString()
      };
    }

    return null;
  } catch (error) {
    console.error('TreasuryDirect fetch error:', error);
    return null;
  }
}

function formatCurrency(value) {
  return '$' + value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}
