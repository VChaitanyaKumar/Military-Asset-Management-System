# 🚀 Deployment Guide - Military Asset Management System

## 🎯 Recommended Free Deployment Stack

### **Frontend:** Vercel (Free)
### **Backend:** Railway.app (Free tier)
### **Database:** Railway.app MySQL (Free tier)

---

## 📋 Step-by-Step Deployment

### **Step 1: Deploy Database (Railway.app)**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Provision MySQL"
5. Copy the connection details:
   - Host
   - Port
   - Username
   - Password
   - Database name

6. **Import your data:**
   - Export from MySQL Workbench: `mysqldump -u root -p military_assets > backup.sql`
   - Import to Railway: Use their MySQL client or phpMyAdmin

---

### **Step 2: Deploy Backend (Railway.app)**

1. In Railway, click "New" → "GitHub Repo"
2. Connect your backend repository
3. Add environment variables:
   ```
   DB_HOST=<railway-mysql-host>
   DB_PORT=<railway-mysql-port>
   DB_USER=<railway-mysql-user>
   DB_PASSWORD=<railway-mysql-password>
   DB_NAME=military_assets
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. Railway will auto-deploy your backend
5. Copy the backend URL (e.g., `https://your-app.railway.app`)

---

### **Step 3: Deploy Frontend (Vercel)**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your frontend repository
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```

6. Deploy!
7. Your frontend will be live at `https://your-app.vercel.app`

---

## 🔧 Update Frontend for Production

**File: `client/src/utils/api.js`** (or in each page)

Change:
```javascript
const API_URL = 'http://localhost:5000/api'
```

To:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

---

## 🗄️ Database Migration

### **Export from Local MySQL:**

```bash
mysqldump -u root -p military_assets > military_assets_backup.sql
```

### **Import to Railway MySQL:**

1. Get Railway MySQL connection string
2. Use MySQL Workbench to connect to Railway
3. Run your backup.sql file

Or use command line:
```bash
mysql -h <railway-host> -P <port> -u <user> -p <database> < military_assets_backup.sql
```

---

## 💰 Cost Breakdown

### **Free Tier (Good for 6-12 months):**
- Frontend (Vercel): FREE
- Backend (Railway): FREE ($5 credit/month)
- Database (Railway): FREE (included)
- **Total: $0/month**

### **Paid Tier (After free tier):**
- Frontend (Vercel): FREE
- Backend (Railway): ~$5/month
- Database (Railway): ~$5/month
- **Total: ~$10/month**

---

## 🔒 Security Checklist

Before deploying:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Update CORS settings in backend
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Set strong database password
- [ ] Remove console.log statements
- [ ] Add rate limiting
- [ ] Enable database backups

---

## 🌐 Alternative: All-in-One Platforms

### **Heroku** (Easiest but paid)
- Deploy everything in one place
- ~$7/month for hobby tier
- Automatic SSL
- Easy database management

### **DigitalOcean App Platform**
- $5/month for backend
- $15/month for managed database
- More control, more setup

---

## 📊 Database Always Running

### **How it works:**

**Local (Current):**
- MySQL runs on your computer
- Stops when computer is off
- Only you can access

**Cloud (After Deployment):**
- MySQL runs on cloud server 24/7
- Always accessible
- Anyone can access (with credentials)
- Automatic backups
- Never stops

---

## 🔄 Workflow After Deployment

### **Development:**
1. Code on local machine
2. Test with local MySQL
3. Push to GitHub
4. Auto-deploys to production

### **Data Flow:**
```
User Browser
    ↓
Frontend (Vercel)
    ↓
Backend (Railway)
    ↓
MySQL Database (Railway - Always Running!)
```

---

## 🎯 Quick Start (Railway - Recommended)

1. **Sign up:** railway.app
2. **New Project** → MySQL
3. **New Service** → GitHub Repo (backend)
4. **Add env variables**
5. **Deploy!**

Railway handles:
- ✅ Database hosting (24/7)
- ✅ Backend hosting
- ✅ Automatic SSL
- ✅ Automatic backups
- ✅ Easy scaling

---

## 📞 Need Help?

Common issues:
- **CORS errors:** Update backend CORS to allow frontend URL
- **Database connection:** Check environment variables
- **Build errors:** Check Node.js version compatibility

---

## ✅ Summary

**Question:** "How to keep database running?"
**Answer:** Deploy to cloud (Railway/PlanetScale) - it runs 24/7 automatically!

**Question:** "How to fetch data after deployment?"
**Answer:** Backend connects to cloud database instead of localhost!

**Your app will be:**
- ✅ Always online
- ✅ Accessible from anywhere
- ✅ Database always running
- ✅ Automatic backups
- ✅ Free (with free tier)

🚀 **Ready to deploy!**
