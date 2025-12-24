# 🚀 How to Push Your Project to GitHub

Follow these simple steps to get your New Year wish webpage live on GitHub!

## Method 1: Using Command Line (Git)

### Step 1: Install Git (if you haven't already)
- Download from: https://git-scm.com/downloads
- Install it and restart your terminal/command prompt

### Step 2: Create a GitHub Account
- Go to: https://github.com
- Sign up for a free account (if you don't have one)

### Step 3: Create a New Repository on GitHub
1. Log in to GitHub
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name your repository (e.g., `new-year-wish-2026` or `happy-new-year`)
5. Make it **Public** (required for free GitHub Pages)
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

### Step 4: Open Terminal/Command Prompt in Your Project Folder
- Navigate to your project folder: `D:\NEW YEAR PROJECT`
- Right-click in the folder and select "Open in Terminal" or "Git Bash Here"
- Or open terminal and type:
  ```bash
  cd "D:\NEW YEAR PROJECT"
  ```

### Step 5: Initialize Git and Push to GitHub

Copy and paste these commands one by one:

```bash
# Initialize git repository
git init

# Add all your files
git add .

# Create your first commit
git commit -m "Initial commit: New Year 2026 wish webpage"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with your repository name.

**Example:**
If your username is `john` and repo name is `new-year-wish-2026`, the command would be:
```bash
git remote add origin https://github.com/john/new-year-wish-2026.git
```

### Step 6: Authenticate
- When you push, GitHub will ask for your username and password
- Use a **Personal Access Token** instead of password:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Click "Generate new token"
  3. Give it a name and select `repo` scope
  4. Copy the token and use it as your password

## Method 2: Using GitHub Desktop (Easier!)

### Step 1: Download GitHub Desktop
- Go to: https://desktop.github.com
- Download and install GitHub Desktop

### Step 2: Sign in to GitHub
- Open GitHub Desktop
- Sign in with your GitHub account

### Step 3: Create Repository
1. Click **"File"** → **"Add Local Repository"**
2. Click **"Create a New Repository"**
3. Name it (e.g., `new-year-wish-2026`)
4. Choose your project folder: `D:\NEW YEAR PROJECT`
5. Click **"Create Repository"**

### Step 4: Publish to GitHub
1. Click **"Publish repository"** button
2. Make sure **"Keep this code private"** is **UNCHECKED** (for free Pages)
3. Click **"Publish Repository"**

## 🌐 Making It Live with GitHub Pages

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** (left sidebar)
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select branch: **"main"**
6. Select folder: **"/ (root)"**
7. Click **"Save"**

### Step 2: Access Your Live Site
- Your site will be live at:
  ```
  https://YOUR_USERNAME.github.io/REPO_NAME
  ```
- Example: `https://john.github.io/new-year-wish-2026`
- It may take 1-2 minutes to go live

## 📝 Updating Your Site

### Using Command Line:
```bash
# Make your changes to files
# Then:
git add .
git commit -m "Updated memories page"
git push
```

### Using GitHub Desktop:
1. Make your changes
2. GitHub Desktop will show the changes
3. Write a commit message
4. Click **"Commit to main"**
5. Click **"Push origin"**

## 🎨 Adding Photos to Memories Page

1. Create an `images` folder in your project
2. Add your photos there
3. In `index.html`, find the memory placeholders and replace:

**Before:**
```html
<div class="photo-placeholder">
    <span class="photo-icon">📸</span>
    <p>Add your photo here</p>
</div>
```

**After:**
```html
<img src="images/photo1.jpg" alt="Beautiful Moment" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">
```

4. Commit and push the changes!

## 🔒 Troubleshooting

### "Repository not found" error
- Check your repository URL is correct
- Make sure the repository exists on GitHub

### "Authentication failed"
- Use Personal Access Token instead of password
- Or use GitHub Desktop for easier authentication

### Pages not showing
- Wait 1-2 minutes after enabling Pages
- Check Settings → Pages to ensure it's enabled
- Make sure your repository is Public

### Files not updating
- Clear browser cache (Ctrl+F5)
- Wait a few minutes for GitHub to update

## 💡 Tips

- **Custom Domain**: You can add a custom domain in Pages settings
- **Private Repo**: GitHub Pages only works with public repos (free tier)
- **HTTPS**: Your site will automatically use HTTPS
- **Updates**: Changes appear within 1-2 minutes after pushing

## 🎉 You're Done!

Your beautiful New Year wish webpage is now live on the internet! Share the link with your special someone! 💕

---

**Need Help?** Check GitHub's official documentation: https://docs.github.com/en/pages

