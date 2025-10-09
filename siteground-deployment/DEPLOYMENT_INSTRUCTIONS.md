# NFTrillions - SiteGround Deployment Instructions

## 📦 Files Included

This deployment package contains:
- `dist/` - Production-ready built files
  - `dist/public/` - Static frontend files (HTML, CSS, JS)
  - `dist/index.js` - Backend server bundle
- `package.json` - Project dependencies

## 🚀 Deployment Steps for SiteGround Shared Hosting

### Prerequisites
- SiteGround account with Node.js support enabled
- SSH access to your hosting account
- Domain configured and pointing to your hosting

### Step 1: Upload Files via FTP/SFTP

1. Connect to your SiteGround account using FTP or SFTP
2. Navigate to your website's root directory (usually `public_html` or `www`)
3. Upload ALL files from the `siteground-deployment` folder:
   - Upload the entire `dist` folder
   - Upload `package.json`

### Step 2: Install Node.js Dependencies (via SSH)

1. Connect to your SiteGround account via SSH
2. Navigate to your website directory:
   ```bash
   cd ~/public_html
   ```

3. Install production dependencies:
   ```bash
   npm install --production
   ```

### Step 3: Configure Node.js Application

1. Log into your SiteGround Site Tools
2. Go to **Devs > Node.js**
3. Create a new Node.js application with these settings:
   - **Application mode:** Production
   - **Application root:** (your domain folder)
   - **Application URL:** (your domain)
   - **Application startup file:** `dist/index.js`
   - **Node.js version:** 18.x or higher

4. Click **Create** to set up the application

### Step 4: Set Environment Variables (Optional)

In SiteGround Site Tools > Node.js > Your App:
- Click **Environment Variables**
- Add any required variables (if needed in the future):
  - `NODE_ENV=production`
  - `SESSION_SECRET=your-random-secret-here`

### Step 5: Start Your Application

1. In SiteGround Site Tools > Node.js
2. Find your application
3. Click **Start** or **Restart**

### Step 6: Verify Deployment

1. Visit your domain in a browser
2. You should see the NFTrillions homepage with:
   - Live debt counter
   - NFT collections
   - All navigation working

## 🔧 Troubleshooting

### Application won't start
- Check the Node.js version (should be 18.x+)
- Verify `dist/index.js` exists and path is correct
- Check error logs in SiteGround Site Tools

### 404 errors on page refresh
- The app handles routing internally
- Make sure the startup file is `dist/index.js` (not a static file server)

### Styles not loading
- Clear browser cache
- Verify `dist/public/assets/` folder uploaded correctly
- Check browser console for 404 errors

### API endpoints not working
- Verify the backend server (`dist/index.js`) is running
- Check environment variables are set correctly
- Review application logs in SiteGround

## 📝 Important Notes

1. **Static Site Hosting:** This is a Node.js application, not a static site. You MUST use SiteGround's Node.js hosting feature.

2. **Database:** The app uses in-memory storage. Data will reset when the server restarts. For persistent storage, you'll need to configure a database.

3. **Updates:** To deploy updates:
   - Build locally (`npm run build`)
   - Upload new `dist` folder
   - Restart the Node.js app in SiteGround

4. **Performance:** Consider enabling:
   - SiteGround's CDN (Cloudflare)
   - HTTPS/SSL certificate (free with SiteGround)
   - Server-side caching

## 🌐 Domain Configuration

Make sure your domain DNS is pointing to SiteGround:
- A record pointing to SiteGround IP
- CNAME for www subdomain (if used)

## 📧 Support

For SiteGround-specific issues:
- SiteGround Support: https://www.siteground.com/support/
- Node.js Setup Guide: https://www.siteground.com/kb/how-to-setup-node-js-app/

For NFTrillions issues:
- Email: contact@nftrillions.xyz

## ✅ Post-Deployment Checklist

- [ ] All files uploaded successfully
- [ ] Node modules installed via SSH
- [ ] Node.js app created and started in Site Tools
- [ ] Domain accessible in browser
- [ ] Homepage loads with debt counter
- [ ] NFT pages load correctly
- [ ] Legal pages accessible (Whitepaper, Terms, etc.)
- [ ] Footer displays on all pages
- [ ] SSL certificate installed (HTTPS working)

---

**Congratulations!** Your NFTrillions site should now be live! 🎉
