# Cloudflare Worker - Treasury API Proxy

## Quick Start

**5-Minute Setup - No Credit Card Required (FREE)**

1. **Sign up**: https://workers.cloudflare.com/
2. **Create Worker**: Follow steps in [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
3. **Copy code**: Use `treasury-proxy.js`
4. **Get URL**: Something like `https://treasury-proxy.YOUR-NAME.workers.dev`
5. **Configure app**: Set `VITE_CLOUDFLARE_WORKER_URL` in Replit Secrets (see Step 5 in deployment guide)

## What's Inside

- **`treasury-proxy.js`** - The Worker code (copy-paste this into Cloudflare)
- **`DEPLOYMENT-GUIDE.md`** - Step-by-step setup instructions
- **`README.md`** - This file

## Why Do We Need This?

The U.S. Treasury APIs don't allow direct browser calls (no CORS support). This Worker:

✅ Adds CORS headers so browsers can access the data  
✅ Caches data for 12 hours to avoid rate limiting  
✅ Works with static hosting (SiteGround, Netlify, etc.)  
✅ Completely free (100k requests/day)

## After Setup

Once you configure `VITE_CLOUDFLARE_WORKER_URL`:
1. The app will automatically use your Worker for debt data
2. Test it works correctly (check browser console logs)
3. You're ready to deploy to SiteGround!

The debt data will automatically update twice daily (every 12 hours) without any manual work.
