# GitHub Pages Deployment Guide

## Quick Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it: `history-2310-study-bot` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)

### 2. Upload Files
**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop all files from the `History_2310_Study_Bot` folder
3. Commit with message: "Initial commit: History 2310 Study Bot"

**Option B: Using Git Commands**
```bash
git init
git add .
git commit -m "Initial commit: History 2310 Study Bot"
git branch -M main
git remote add origin https://github.com/yourusername/history-2310-study-bot.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (in left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

### 4. Access Your Study Bot
- Your study bot will be available at:
- `https://yourusername.github.io/history-2310-study-bot/`
- GitHub Pages may take 5-10 minutes to deploy

## Features That Work on GitHub Pages

### ✅ Fully Functional:
- **Multiple Choice Quiz** - Interactive with immediate feedback
- **Paragraph Grading** - AI-powered assessment
- **Study Materials** - View summaries and download files
- **File Downloads** - Downloads work perfectly on GitHub Pages
- **Responsive Design** - Works on all devices

### 📱 Mobile Friendly:
- **Touch-friendly interface**
- **Responsive design**
- **Works on phones and tablets**

## Custom Domain (Optional)

### To Use Your Own Domain:
1. Create a `CNAME` file in the repository root
2. Add your domain name (e.g., `studybot.yourdomain.com`)
3. Update your DNS settings to point to GitHub Pages
4. GitHub will automatically use your custom domain

## Troubleshooting

### If Pages Don't Load:
- Check that the repository is **Public**
- Verify the **Pages** settings are correct
- Wait 5-10 minutes for deployment
- Check the **Actions** tab for any errors

### If Downloads Don't Work:
- Downloads work perfectly on GitHub Pages
- The issue only occurs when opening HTML files directly
- GitHub Pages serves files with proper HTTP headers

## Updating Your Study Bot

### To Add New Content:
1. Edit files locally
2. Commit and push changes:
```bash
git add .
git commit -m "Update study materials"
git push
```
3. Changes will automatically deploy to GitHub Pages

## Analytics (Optional)

### To Track Usage:
1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Enable **GitHub Pages analytics**
4. View usage statistics in **Insights** tab

---

**Your History 2310 Study Bot is now ready for the world! 🌍📚**

