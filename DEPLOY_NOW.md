# 🚀 Deploy Your Project NOW - Step by Step

Follow these exact steps to deploy your Military Asset Management System.

---

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Your project code
- [ ] MySQL database backup (optional)

---

## 🗄️ STEP 1: Deploy Database (Railway.app)

### 1.1 Sign Up for Railway

1. Go to: https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access GitHub

### 1.2 Create MySQL Database

1. Click "New Project"
2. Select "Provision MySQL"
3. Wait for deployment (30 seconds)
4. Click on the MySQL service

### 1.3 Get Database Credentials

1. Click "Variables" tab
2. Copy these values:
   - `MYSQLHOST` (Database host)
   - `MYSQLPORT` (Usually 3306)
   - `MYSQLUSER` (Usually root)
   - `MYSQLPASSWORD` (Your database password)
   - `MYSQLDATABASE` (Database name)

### 1.4 Import Your Data (Optional)

**Option A: Using MySQL Workbench**
1. In MySQL Workbench, create new connection
2. Use Railway credentials above
3. Connect and import your `military_assets` database

**Option B: Using Command Line**
```bash
# Export from local
mysqldump -u root -p military_assets > backup.sql

# Import to Railway
mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p <MYSQLDATABASE> < backup.sql
```

**Option C: Run setup.sql on Railway**
1. Connect to Railway MySQL
2. Run your `database/setup.sql` file

✅ **Database is now running 24/7 in the cloud!**

---

## 🖥️ STEP 2: Deploy Backend (Railway.app)

### 2.1 Push Code to GitHub

```bash
# In your project root
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2.2 Deploy Backend on Railway

1. In Railway dashboard, click "New"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Select the `server` folder (if prompted)

### 2.3 Add Environment Variables

1. Click on your backend service
2. Go to "Variables" tab
3. Click "Raw Editor"
4. Paste this (update with your Railway MySQL credentials):

```
PORT=5000
NODE_ENV=production
DB_HOST=your-railway-mysql-host-from-step-1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-railway-mysql-password-from-step-1
DB_NAME=military_assets
JWT_SECRET=your-super-secret-random-key-change-this
FRONTEND_URL=https://your-app.vercel.app
```

5. Click "Update Variables"

### 2.4 Get Backend URL

1. Go to "Settings" tab
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://your-app.railway.app`)

✅ **Backend is now live!**

---

## 🌐 STEP 3: Deploy Frontend (Vercel)

### 3.1 Sign Up for Vercel

1. Go to: https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel

### 3.2 Deploy Frontend

1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Select the `client` folder as root directory
4. Click "Environment Variables"
5. Add:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.railway.app/api` (from Step 2.4)

6. Click "Deploy"
7. Wait 2-3 minutes

### 3.3 Get Frontend URL

1. After deployment, copy your URL (e.g., `https://your-app.vercel.app`)

### 3.4 Update Backend CORS

1. Go back to Railway
2. Update `FRONTEND_URL` variable to your Vercel URL
3. Backend will restart automatically

✅ **Frontend is now live!**

---

## ✅ STEP 4: Test Your Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. You should see the Sign In page
3. Create a new account (Sign Up)
4. Login and test all features

---

## 🎉 YOU'RE LIVE!

Your app is now:
- ✅ Accessible from anywhere
- ✅ Database running 24/7
- ✅ Automatic HTTPS
- ✅ Free hosting

---

## 🔧 Troubleshooting

### Problem: "Failed to fetch" error

**Solution:**
1. Check backend is running on Railway
2. Verify `VITE_API_URL` in Vercel
3. Check CORS settings in backend

### Problem: Database connection failed

**Solution:**
1. Verify database credentials in Railway
2. Check `DB_HOST`, `DB_PASSWORD` are correct
3. Ensure database is running

### Problem: Can't login

**Solution:**
1. Create a new account (Sign Up)
2. Check browser console for errors
3. Verify backend logs in Railway

---

## 📊 Your Deployment URLs

After deployment, save these:

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-app.railway.app
- **Database:** Railway MySQL (internal)

---

## 💰 Cost

- **Railway:** Free $5 credit/month (enough for small projects)
- **Vercel:** Free forever for personal projects
- **Total:** $0/month

---

## 🔄 Future Updates

To update your deployed app:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push

# Vercel and Railway auto-deploy!
```

---

## 🎯 Quick Checklist

- [ ] Railway account created
- [ ] MySQL database deployed on Railway
- [ ] Database credentials copied
- [ ] Backend deployed on Railway
- [ ] Environment variables added to Railway
- [ ] Backend URL copied
- [ ] Vercel account created
- [ ] Frontend deployed on Vercel
- [ ] VITE_API_URL added to Vercel
- [ ] Tested sign up and login
- [ ] All features working

---

## 🚀 Ready to Deploy!

Start with Step 1 and follow each step carefully. Your app will be live in about 30 minutes!

**Need help?** Check Railway and Vercel documentation or their Discord communities.
