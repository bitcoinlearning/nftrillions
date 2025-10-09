# NFTrillions - Static Deployment Guide

This guide explains how to deploy NFTrillions to SiteGround shared hosting (or any static hosting service).

## Overview

NFTrillions uses a **hybrid architecture** that works with or without a backend:

- **Development Mode**: Full-stack React + Express application with live API
- **Static Mode**: Frontend-only with pre-exported JSON data files

The app automatically detects whether a backend is available and falls back to static data if needed.

## Prerequisites

- Node.js 18+ installed locally
- SiteGround hosting account with public_html access
- FTP/SFTP client or File Manager access

## Build Process

### Step 1: Export Fresh Data

Before building, export the latest data from your development server:

```bash
# Make sure the dev server is running
npm run dev

# In another terminal, export the data
node scripts/export-static-data.cjs
```

This creates/updates:
- `client/public/slices.json` - All NFT slice data
- `client/public/stats.json` - Current debt statistics

### Step 2: Build Static Version

Build the production-ready static files:

```bash
# Build the frontend
npm run build

# The output will be in dist/public/
```

### Step 3: Deploy to SiteGround

Upload the contents of `dist/public/` to your SiteGround hosting:

#### Option A: Using File Manager

1. Log in to SiteGround cPanel
2. Open **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. Upload all files from `dist/public/` to `public_html/`
5. Ensure `.htaccess` is included for proper routing

#### Option B: Using FTP/SFTP

1. Connect to your SiteGround via FTP/SFTP
2. Navigate to `public_html/`
3. Upload all files from `dist/public/`
4. Set permissions: 755 for directories, 644 for files

### Step 4: Configure Apache Rewrite Rules

Create or update `.htaccess` in your `public_html/` folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/json "access plus 1 hour"
</IfModule>

# Compress text files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>
```

## Subdirectory Deployment

If deploying to a subdirectory (e.g., `example.com/nftrillions/`):

1. Build with a base path:
```bash
# Set the base URL before building
export VITE_BASE_URL=/nftrillions/
npm run build
```

2. Update `.htaccess` RewriteBase:
```apache
RewriteBase /nftrillions/
```

## Updating Content

To update the site with fresh data:

1. Run the dev server locally: `npm run dev`
2. Export fresh data: `node scripts/export-static-data.cjs`
3. Rebuild: `npm run build`
4. Upload new files to SiteGround

**Note**: The debt counter on the static site uses cached data from `stats.json`. Update regularly to keep the debt figures current.

## Automation Options

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to SiteGround

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/public/
          server-dir: ./public_html/
```

### Option 2: Manual Script

Create `deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Building NFTrillions for static deployment..."

# Build
npm run build

# Deploy via FTP (requires lftp)
echo "📤 Uploading to SiteGround..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
mirror -Rev dist/public/ public_html/ --exclude .git/ --exclude .DS_Store
"

echo "✅ Deployment complete!"
```

## Treasury Data Strategy

The static deployment uses cached Treasury data from `stats.json`. Two approaches for keeping it fresh:

### Approach A: Build-Time Updates (Current)

- Data is frozen at build time
- Update manually by rebuilding and redeploying
- Good for: Sites updated weekly/monthly

### Approach B: External API Proxy (Future)

- Set up a serverless function (Cloudflare Workers, Vercel Edge)
- Proxy Treasury API calls to avoid CORS
- Add endpoint URL to frontend: `VITE_DEBT_API_URL`
- Good for: Real-time debt tracking

## File Structure

```
dist/public/
├── index.html          # Main HTML file
├── assets/             # JS, CSS, images (hashed names)
├── slices.json         # NFT slice data (301KB)
├── stats.json          # Debt statistics (180B)
└── .htaccess           # Apache rewrite rules
```

## Troubleshooting

### Issue: Blank page after deployment

**Solution**: Check `.htaccess` rewrite rules are in place. SiteGround requires Apache rewrites for SPA routing.

### Issue: 404 on refresh

**Solution**: Ensure `RewriteRule ^ index.html [L]` is in `.htaccess`. This redirects all routes to index.html.

### Issue: Debt counter shows old data

**Solution**: Re-export data and rebuild:
```bash
node scripts/export-static-data.cjs
npm run build
```

### Issue: Assets not loading

**Solution**: Check that all files from `dist/public/` were uploaded, including the `assets/` folder.

## Performance Tips

1. **Enable Cloudflare** (free on SiteGround) for CDN and caching
2. **Optimize images** before deployment (already optimized in build)
3. **Use gzip compression** (included in .htaccess)
4. **Set cache headers** for static assets (included in .htaccess)

## Security

- No server-side code = reduced attack surface
- All data is public (no sensitive information)
- Static hosting = no database vulnerabilities
- HTTPS enforced via SiteGround SSL

## Support

For deployment issues:
- SiteGround Support: https://www.siteground.com/support
- NFTrillions Issues: contact@nftrillions.xyz

---

**Last Updated**: October 2025
