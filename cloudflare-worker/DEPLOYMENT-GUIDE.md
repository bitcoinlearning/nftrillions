# Cloudflare Worker Deployment Guide

## What This Does

This Cloudflare Worker acts as a CORS-enabled proxy for U.S. Treasury debt data with 12-hour caching. It solves three problems:

1. **CORS Issues**: Treasury APIs don't support cross-origin requests from browsers
2. **Rate Limiting**: Caches data for 12 hours to avoid hitting Treasury rate limits
3. **Static Hosting**: Works perfectly with SiteGround (no backend needed)

## Step-by-Step Setup (5 Minutes)

### Step 1: Create Cloudflare Account (FREE)

1. Go to https://workers.cloudflare.com/
2. Click **"Sign Up"** (top right)
3. Create account with email/password
4. Verify your email

**Cost**: FREE tier includes 100,000 requests/day (more than enough!)

---

### Step 2: Create Your Worker

1. **Log in to Cloudflare Dashboard**: https://dash.cloudflare.com/
2. Click **"Workers & Pages"** in the left sidebar
3. Click **"Create Application"** button
4. Select **"Create Worker"**
5. **Name it**: `treasury-proxy` (or any name you like)
6. Click **"Deploy"**

---

### Step 3: Add the Code

1. After deployment, you'll see the Worker editor
2. **Delete all the default code** in the editor
3. **Copy the entire contents** of `treasury-proxy.js` (from this folder)
4. **Paste it** into the Cloudflare editor
5. Click **"Save and Deploy"** (top right)

---

### Step 4: Get Your Worker URL

After deploying, you'll see a URL like:

```
https://treasury-proxy.YOUR-SUBDOMAIN.workers.dev
```

**Copy this URL!** You'll need it in the next step.

Example: `https://treasury-proxy.nftrillions.workers.dev`

---

### Step 5: Configure the App

Now connect your app to the Worker:

**Method 1: Replit Secrets (Recommended)**
1. In your Replit project, click the **lock icon** (🔒) in the left sidebar
2. Click **"New Secret"**
3. Set:
   - **Key**: `VITE_CLOUDFLARE_WORKER_URL`
   - **Value**: Your Worker URL (paste it here)
4. Click **"Add Secret"**
5. **Restart your app** (refresh the page)

**Method 2: Environment File (Alternative)**
1. Create a file named `.env` in your project root (if it doesn't exist)
2. Add this line:
   ```
   VITE_CLOUDFLARE_WORKER_URL=https://treasury-proxy.YOUR-SUBDOMAIN.workers.dev
   ```
3. Replace with your actual Worker URL
4. Restart your app

That's it! Your app now uses your Worker for debt data. 🎉

---

## How It Works

```
User Browser → Cloudflare Worker → Treasury APIs
                      ↑
               12-hour cache
```

1. **First Request**: Worker fetches fresh data from Treasury, caches it for 12 hours
2. **Next 12 Hours**: Worker serves cached data (fast + no API calls)
3. **After 12 Hours**: Cache expires, Worker fetches fresh data again

---

## Testing Your Worker

After deployment, test it in your browser:

```
https://treasury-proxy.YOUR-SUBDOMAIN.workers.dev
```

You should see JSON like this:

```json
{
  "amount": 36000000000000,
  "formatted": "$36,000,000,000,000",
  "cached": false,
  "source": "fiscaldata",
  "timestamp": "2025-10-09T12:00:00.000Z"
}
```

---

## Monitoring & Limits

**Free Tier Limits:**
- ✅ 100,000 requests/day (plenty for your site)
- ✅ 10ms CPU time per request
- ✅ Unlimited bandwidth

**View Analytics:**
1. Go to Workers dashboard
2. Click your Worker name
3. See request count, errors, etc.

**If You Exceed Limits:**
- Paid tier starts at $5/month for 10 million requests
- But you won't need it with 12-hour caching!

---

## Troubleshooting

### Worker Returns Error

**Check Cloudflare Logs:**
1. Workers dashboard → Your worker
2. Click "Logs" tab (real-time debugging)
3. Make a request to see what's happening

### CORS Still Not Working

Make sure your Worker URL is correct in the app:
- Should end with `.workers.dev`
- Must use `https://` (not `http://`)

### Cache Not Working

The Worker caches automatically. To verify:
1. First request: `"cached": false`
2. Second request (within 12 hours): Browser may cache it
3. Check Worker logs to see if it's hitting Treasury APIs

---

## Next Steps

Once deployed:

1. **Configure the app**: Set `VITE_CLOUDFLARE_WORKER_URL` with your Worker URL (see Step 5 above)
2. **Test it**: Visit the Worker URL in your browser to see debt data
3. **Deploy to SiteGround**: The app will automatically use your Worker

Your static site will now have fresh debt data twice daily! 🚀
