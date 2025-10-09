# Complete Cloudflare Setup - Quick Reference

## 📋 Checklist

### ✅ Step 1: Deploy Worker (5 minutes)
- [ ] Create Cloudflare account at https://workers.cloudflare.com/
- [ ] Create new Worker named `treasury-proxy`
- [ ] Copy code from `treasury-proxy.js` into Worker
- [ ] Click "Save and Deploy"
- [ ] Copy your Worker URL (e.g., `https://treasury-proxy.YOUR-NAME.workers.dev`)

**📚 Detailed Guide**: See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

---

### ✅ Step 2: Configure App (2 minutes)
- [ ] Add Replit Secret: `VITE_CLOUDFLARE_WORKER_URL` = Your Worker URL
- [ ] Restart the app
- [ ] Check browser console for "Fetching from: Cloudflare Worker"

**📚 Detailed Guide**: See [CONFIGURATION.md](./CONFIGURATION.md)

---

### ✅ Step 3: Build for SiteGround (1 minute)

```bash
# Set your Worker URL
export VITE_CLOUDFLARE_WORKER_URL=https://treasury-proxy.YOUR-NAME.workers.dev

# Build the app
npm run build

# Export static data (if needed)
node scripts/export-static-data.cjs

# Deploy dist/public/ to SiteGround
```

---

## 🎯 What You Get

✅ **Fresh data twice daily** (12-hour cache)  
✅ **No rate limiting** (Cloudflare caches for you)  
✅ **Works on static hosting** (no backend needed)  
✅ **100% free** (100k requests/day limit)  
✅ **Automatic failover** (Falls back if Worker is down)

---

## 🧪 Testing

### Test 1: Worker is Deployed
Visit your Worker URL in browser:
```
https://treasury-proxy.YOUR-NAME.workers.dev
```

**Expected**: JSON response with debt data

### Test 2: App Uses Worker
1. Open browser DevTools (F12)
2. Check Console for: `[Debt API] Fetching from: Cloudflare Worker`
3. Check Network tab for requests to `workers.dev`

### Test 3: Static Deployment Works
1. Build with Worker URL: `VITE_CLOUDFLARE_WORKER_URL=... npm run build`
2. Upload `dist/public/` to SiteGround
3. Visit your site, check that debt counter works

---

## 📊 Monitoring

**View Worker Stats:**
1. Go to https://dash.cloudflare.com/
2. Click "Workers & Pages"
3. Click your Worker name
4. See requests, errors, and cache hits

**Check Logs:**
1. Worker dashboard → Click "Logs" tab
2. Real-time debugging as requests come in

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS errors | Verify Worker is deployed and URL is correct |
| Old data showing | Worker caches 12 hours (intentional) |
| "Hybrid endpoint" in console | Check environment variable spelling |
| 404 on Worker URL | Worker not deployed or wrong URL |

---

## 📞 Need Help?

1. **Check logs**: Cloudflare Worker logs show exactly what's happening
2. **Test Worker URL**: Visit it directly in browser to see JSON response
3. **Check configuration**: Verify `VITE_CLOUDFLARE_WORKER_URL` is set correctly
4. **Read guides**: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) and [CONFIGURATION.md](./CONFIGURATION.md)

---

## 🚀 Quick Commands

```bash
# Test Worker
curl https://treasury-proxy.YOUR-NAME.workers.dev

# Build for production
VITE_CLOUDFLARE_WORKER_URL=https://treasury-proxy.YOUR-NAME.workers.dev npm run build

# Export static data
node scripts/export-static-data.cjs

# Deploy to SiteGround
# Upload contents of dist/public/ folder
```

---

**That's it!** Your app now has automated, twice-daily debt updates on static hosting. 🎉
