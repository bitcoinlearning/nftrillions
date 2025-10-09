# GitHub + Automated Deployment Setup

## 🎯 What This Does

Automatically fetches fresh Treasury debt data and rebuilds your site **every 12 hours** using GitHub Actions (completely free).

---

## 📋 Setup Steps

### Step 1: Connect Replit to GitHub

1. **In Replit**, look for the **Version Control** tab in the left sidebar (it looks like a branch icon)
2. Click **"Connect to GitHub"**
3. **Authorize Replit** to access your GitHub account
4. **Create new repository** or select existing one
   - Repository name: `nftrillions` (or whatever you prefer)
   - Make it **Public** (required for free GitHub Actions)
5. Click **"Connect"**

### Step 2: Push Your Code to GitHub

After connecting, Replit will show you the Git panel:

1. **Commit your changes**:
   - Message: "Initial commit - NFTrillions app"
   - Click **"Commit & Push"**
2. Your code is now on GitHub! 🎉

### Step 3: Enable GitHub Actions

1. Go to **GitHub.com** and open your repository
2. Click the **"Actions"** tab at the top
3. You'll see the workflow: **"Update NFTrillions Debt Data"**
4. Click **"I understand my workflows, go ahead and enable them"**

### Step 4: Configure Deployment (Optional)

The workflow currently deploys to **GitHub Pages** (free hosting). If you want to deploy to **SiteGround** instead:

#### Option A: Deploy to GitHub Pages (Free)
1. In your GitHub repo, go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** (will be created automatically)
   - Click **Save**
3. Your site will be live at: `https://YOUR-USERNAME.github.io/nftrillions/`

#### Option B: Deploy to SiteGround (Manual)
1. Download the built files from GitHub Actions:
   - Go to **Actions** tab → Click on a completed workflow run
   - Scroll to **Artifacts** → Download `build`
2. Upload to SiteGround via FTP

#### Option C: Auto-Deploy to SiteGround (Advanced)
1. In GitHub repo, go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `FTP_SERVER`: Your SiteGround FTP server (e.g., `ftp.yourdomain.com`)
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password
3. Uncomment the FTP deployment section in `.github/workflows/update-debt-data.yml`

---

## ⏰ How the Automation Works

**Every 12 hours**, GitHub Actions will:
1. ✅ Start your Express backend
2. ✅ Fetch fresh debt data from Treasury APIs
3. ✅ Export to `stats.json` and `slices.json`
4. ✅ Build the static site with fresh data
5. ✅ Deploy to GitHub Pages (or SiteGround if configured)

**Manual Trigger:**
You can also run it manually:
1. Go to **Actions** tab on GitHub
2. Click **"Update NFTrillions Debt Data"**
3. Click **"Run workflow"** → **"Run workflow"**

---

## 🧪 Test It Right Now

1. Go to your GitHub repo
2. Click **"Actions"** tab
3. Click **"Update NFTrillions Debt Data"**
4. Click **"Run workflow"** dropdown → **"Run workflow"** button
5. Wait 2-3 minutes
6. Check if it succeeds ✅

---

## 📊 What You'll See

In the Actions tab, you'll see:
- ✅ Green checkmark = Success (fresh data deployed)
- ❌ Red X = Failed (check logs)
- 🟡 Yellow circle = Running

Click on any run to see detailed logs and download the built files.

---

## 🎉 You're Done!

Your site now updates automatically every 12 hours with fresh Treasury debt data. No manual work needed!

**Next time you make code changes:**
1. Edit in Replit
2. Commit & Push via Git panel
3. GitHub Actions rebuilds and deploys automatically
