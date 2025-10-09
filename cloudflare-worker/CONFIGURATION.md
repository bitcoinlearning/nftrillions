# Configure App to Use Cloudflare Worker

## After You Deploy the Worker

Once you have your Cloudflare Worker URL (e.g., `https://treasury-proxy.YOUR-NAME.workers.dev`), follow these steps:

### Option 1: Using Replit Secrets (Recommended)

1. **Open Replit Secrets** (lock icon in left sidebar)
2. **Add new secret**:
   - Key: `VITE_CLOUDFLARE_WORKER_URL`
   - Value: Your Worker URL (paste it here)
3. **Click "Add Secret"**
4. **Restart the app** (refresh the page or restart workflow)

### Option 2: Using .env File (Local Development)

1. **Create `.env` file** in the root directory (if it doesn't exist)
2. **Add this line**:
   ```
   VITE_CLOUDFLARE_WORKER_URL=https://treasury-proxy.YOUR-NAME.workers.dev
   ```
3. **Replace** `YOUR-NAME` with your actual Cloudflare subdomain
4. **Restart the app**

### Option 3: For Static Deployment (SiteGround)

When building for production:

```bash
VITE_CLOUDFLARE_WORKER_URL=https://treasury-proxy.YOUR-NAME.workers.dev npm run build
```

This bakes the Worker URL into your static build.

---

## Verify It's Working

### 1. Check Browser Console

Open DevTools (F12) and look for:

```
[Debt API] Fetching from: Cloudflare Worker
[Debt API] Fetched debt data: 36000000000000 source: fiscaldata
```

If you see "Cloudflare Worker", it's working! ✅

### 2. Check Network Tab

In DevTools Network tab, you should see requests to:
- ✅ `treasury-proxy.YOUR-NAME.workers.dev` (GOOD - using Worker)
- ❌ `api.fiscaldata.treasury.gov` (BAD - direct calls, CORS will fail)

---

## How It Works

**Without Worker URL:**
```
Browser → /api/debt/current → Backend/Static JSON
```

**With Worker URL:**
```
Browser → Cloudflare Worker → Treasury APIs (12-hour cache)
```

---

## Troubleshooting

### Still seeing "Hybrid endpoint" in console?

1. **Check spelling** of environment variable (must be exact: `VITE_CLOUDFLARE_WORKER_URL`)
2. **Restart the app** after adding the secret
3. **Verify the URL** includes `https://` and ends with `.workers.dev`

### CORS errors?

1. **Check Worker is deployed** (visit URL in browser, should return JSON)
2. **Verify CORS headers** are in the Worker code (they are!)
3. **Clear browser cache** and try again

### Data not updating?

1. **Worker caches for 12 hours** (this is intentional)
2. **Check Worker logs** in Cloudflare dashboard to see when it fetches fresh data
3. **Clear Cloudflare cache** by redeploying the Worker (if needed)

---

## What Happens on SiteGround?

When you deploy to SiteGround (static hosting):

1. Build command includes Worker URL
2. Frontend makes requests directly to Cloudflare Worker
3. Worker handles Treasury API calls with 12-hour caching
4. No backend needed - everything works on static hosting!

**Result**: Fresh debt data twice daily, no server required! 🎉
