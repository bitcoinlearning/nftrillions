# NFTrillions - Cloudflare Worker Setup Walkthrough

## 🎯 What We Built

A **Cloudflare Worker** that acts as a CORS-enabled proxy for U.S. Treasury debt data with **12-hour caching**. This solves your requirements:

✅ **Server-side caching** (12 hours on Cloudflare's edge network)  
✅ **Twice-daily updates** (automatic, no manual work)  
✅ **Works on SiteGround** (static hosting, no backend needed)  
✅ **No rate limiting** (distributed across all users)  
✅ **100% FREE** (100k requests/day included)

---

## 📁 What Was Created

### 1. Worker Code
- **`treasury-proxy.js`** - Cloudflare Worker with 12-hour caching
  - CORS headers for browser access
  - FiscalData → TreasuryDirect → Fallback logic
  - Cache metadata (cached, cacheAge, timestamp)

### 2. Documentation
- **`DEPLOYMENT-GUIDE.md`** - Step-by-step Cloudflare setup (5 min)
- **`CONFIGURATION.md`** - How to configure the app
- **`COMPLETE-SETUP.md`** - Quick reference checklist
- **`README.md`** - Overview and quick start
- **`WALKTHROUGH.md`** - This file

### 3. App Updates
- **`client/src/lib/debt-api.ts`** - Updated to use Worker URL from `VITE_CLOUDFLARE_WORKER_URL`
- **`.env.example`** - Template for environment variables

---

## 🚀 How to Set It Up

### Step 1: Deploy Cloudflare Worker (5 minutes)

1. **Create account**: https://workers.cloudflare.com/ (FREE, no credit card)
2. **Create Worker**: 
   - Click "Create Application" → "Create Worker"
   - Name it: `treasury-proxy`
   - Click "Deploy"
3. **Add code**: 
   - Delete default code
   - Copy all of `treasury-proxy.js`
   - Paste into editor
   - Click "Save and Deploy"
4. **Copy URL**: You'll get something like:
   ```
   https://treasury-proxy.YOUR-NAME.workers.dev
   ```

**Full guide**: See `DEPLOYMENT-GUIDE.md`

---

### Step 2: Configure Your App (2 minutes)

**Option A: Replit Secrets (Easiest)**
1. Click the **lock icon** (🔒) in Replit's left sidebar
2. Click **"New Secret"**
3. Add:
   - **Key**: `VITE_CLOUDFLARE_WORKER_URL`
   - **Value**: Your Worker URL (paste it)
4. Click **"Add Secret"**
5. **Restart your app** (refresh page)

**Option B: .env File**
1. Create `.env` file in project root
2. Add:
   ```
   VITE_CLOUDFLARE_WORKER_URL=https://treasury-proxy.YOUR-NAME.workers.dev
   ```
3. Restart your app

**Full guide**: See `CONFIGURATION.md`

---

### Step 3: Verify It Works (1 minute)

1. **Open browser DevTools** (F12)
2. **Check Console** - Look for:
   ```
   [Debt API] Fetching from: Cloudflare Worker
   [Debt API] Fetched debt data: 37840931900999 source: fiscaldata
   ```
3. **Check Network tab** - Should see requests to `workers.dev`

If you see "Cloudflare Worker" in logs, you're done! ✅

---

## 📦 Deploy to SiteGround

When ready to deploy:

```bash
# Set your Worker URL
export VITE_CLOUDFLARE_WORKER_URL=https://treasury-proxy.YOUR-NAME.workers.dev

# Build the app
npm run build

# Upload dist/public/ folder to SiteGround
```

Your static site will now have **fresh debt data twice daily** without a backend! 🎉

---

## 🔧 How It Works

### Architecture

```
User Browser (SiteGround) → Cloudflare Worker → Treasury APIs
                                     ↓
                              12-hour cache
```

1. **First request**: Worker fetches from Treasury, caches for 12 hours
2. **Next 12 hours**: Worker serves cached data (fast, no API calls)
3. **After 12 hours**: Cache expires, Worker fetches fresh data

### Data Flow

1. **App loads** → Checks for `VITE_CLOUDFLARE_WORKER_URL`
2. **If set** → Uses Worker endpoint (recommended for production)
3. **If not set** → Falls back to hybrid endpoint (dev mode)
4. **Static hosting** → Worker provides data, no backend needed

---

## 📊 Monitoring

**View Worker Stats:**
1. Go to https://dash.cloudflare.com/
2. Click "Workers & Pages"
3. Click your Worker name
4. See requests, cache hits, errors

**Check Logs:**
1. Worker dashboard → "Logs" tab
2. Real-time debugging as requests happen

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Hybrid endpoint" in console | Verify `VITE_CLOUDFLARE_WORKER_URL` is set and restart app |
| CORS errors | Check Worker is deployed and URL is correct |
| Old data showing | Worker caches 12 hours (intentional) |
| 404 on Worker URL | Worker not deployed or wrong URL |

---

## 📝 Summary

**What you have now:**
- ✅ Cloudflare Worker with 12-hour Treasury API caching
- ✅ Automatic twice-daily data updates
- ✅ Works on static hosting (SiteGround)
- ✅ No rate limiting issues (distributed)
- ✅ Complete documentation for setup
- ✅ FREE tier (100k requests/day)

**Next steps:**
1. Follow `DEPLOYMENT-GUIDE.md` to deploy your Worker
2. Configure `VITE_CLOUDFLARE_WORKER_URL` in your app
3. Test and verify it works
4. Deploy to SiteGround!

---

## 📚 Documentation Index

- **Quick Start**: `README.md`
- **Deploy Worker**: `DEPLOYMENT-GUIDE.md`
- **Configure App**: `CONFIGURATION.md`
- **Quick Reference**: `COMPLETE-SETUP.md`
- **This Guide**: `WALKTHROUGH.md`

---

**Questions?** Check the troubleshooting sections in each guide!
