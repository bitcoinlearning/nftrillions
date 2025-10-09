# NFTrillions - SiteGround Deployment Package

## 📦 What's Inside

This package contains everything you need to deploy NFTrillions to SiteGround shared hosting.

```
siteground-deployment/
├── dist/                          # Production build
│   ├── public/                    # Frontend static files
│   │   ├── assets/               # CSS & JS bundles
│   │   └── index.html            # Main HTML file
│   └── index.js                  # Backend server bundle
├── package.json                   # Dependencies list
├── DEPLOYMENT_INSTRUCTIONS.md     # Step-by-step guide
└── README.md                      # This file
```

## 🚀 Quick Start

1. **Read the Instructions**: Open `DEPLOYMENT_INSTRUCTIONS.md` for complete deployment steps
2. **Upload Files**: Use FTP/SFTP to upload all files to your SiteGround hosting
3. **Install Dependencies**: SSH into your server and run `npm install --production`
4. **Configure Node.js App**: Set up the app in SiteGround Site Tools > Node.js
5. **Start Your App**: Launch the application from Site Tools

## ⚠️ Important Requirements

- **Node.js Hosting**: SiteGround account with Node.js support
- **Node.js Version**: 18.x or higher
- **SSH Access**: Required for installing dependencies
- **Startup File**: Must be set to `dist/index.js`

## 📋 Pre-Deployment Checklist

Before uploading, make sure you have:
- [ ] SiteGround account with Node.js enabled
- [ ] FTP/SFTP credentials
- [ ] SSH access credentials
- [ ] Domain configured and pointing to SiteGround

## 🌟 What's Included in NFTrillions

- **Real-Time Debt Counter**: Live U.S. debt tracking from Treasury APIs
- **1,000 NFT Collection**: Educational debt milestone NFTs
- **Legal Pages**: Whitepaper, Terms, Privacy, Contact, etc.
- **Multi-Chain Ready**: Prepared for Solana, BNB Smart Chain, Bitcoin, and more
- **Responsive Design**: Glassmorphic UI optimized for all devices
- **Educational Focus**: Satirical art project with full disclaimers

## 📖 Documentation

- Full deployment guide: `DEPLOYMENT_INSTRUCTIONS.md`
- SiteGround Node.js docs: https://www.siteground.com/kb/how-to-setup-node-js-app/

## 📧 Support

- Project Email: contact@nftrillions.xyz
- SiteGround Support: https://www.siteground.com/support/

## 🎉 Ready to Deploy?

Open `DEPLOYMENT_INSTRUCTIONS.md` and follow the step-by-step guide to get your site live!

---

**NFTrillions** - A satirical, educational digital art project chronicling U.S. national debt milestones.
