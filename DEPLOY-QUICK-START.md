# NFTrillions - Quick Deployment Guide for SiteGround

## TL;DR - 3 Steps to Deploy

### 1. Export Fresh Data
```bash
# Make sure dev server is running (npm run dev)
node scripts/export-static-data.cjs
```

### 2. Build Static Files
```bash
npm run build
```

### 3. Upload to SiteGround
Upload everything from `dist/public/` to your `public_html/` folder via:
- File Manager (cPanel), OR
- FTP/SFTP client

**Done!** Your site is live at your domain. 🎉

---

## Important Files

After building, you'll have:
- `dist/public/` - **Upload this entire folder to SiteGround**
  - `index.html` - Main page
  - `assets/` - CSS, JS, images
  - `slices.json` - NFT data (301KB)
  - `stats.json` - Debt data (180B)
  - `.htaccess` - Routing rules (critical!)

## What the Hybrid System Does

The app **automatically detects** if a backend is available:

- **With backend** (development): Uses live API for real-time data
- **Without backend** (SiteGround): Uses static JSON files

No code changes needed - it just works! ✨

## Updating the Site

To refresh data and redeploy:

```bash
# Step 1: Export latest data
node scripts/export-static-data.cjs

# Step 2: Rebuild
npm run build

# Step 3: Re-upload dist/public/ to SiteGround
```

## Common Issues

**Blank page?**
→ Make sure `.htaccess` file is uploaded

**404 on page refresh?**
→ Check `.htaccess` contains: `RewriteRule ^ index.html [L]`

**Old debt data?**
→ Re-export and rebuild (see "Updating the Site")

## Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete details on:
- Subdirectory deployment
- GitHub Actions automation
- Performance optimization
- Advanced troubleshooting

---

**Contact**: contact@nftrillions.xyz
