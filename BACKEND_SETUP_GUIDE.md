# Backend Setup Guide - Complete Instructions

## 🎯 How the Database Connection Works

The backend connects to your MySQL database using a **connection string** with these details:

```
Host: localhost (your computer)
Port: 3306 (MySQL default port)
User: root (MySQL admin user)
Password: YOUR_MYSQL_PASSWORD (the one you set when installing MySQL)
Database: military_assets (the database we created)
```

The connection happens automatically when you start the server!

## 📋 Step-by-Step Setup

### Step 1: Install Node.js Packages

Open your terminal in the `server` folder:

```bash
cd server
npm install
```

This installs all required packages:
- express (web server)
- mysql2 (MySQL driver - THIS connects to your database)
- bcrypt (password hashing)
- jsonwebtoken (authentication)
- cors (allows frontend to talk to backend)
- dotenv (reads .env file)

### Step 2: Create .env File

The `.env` file tells the backend HOW to connect to MySQL.

**Option A: Copy the example file**
```bash
copy .env.example .env
```

**Option B: Create manually**
Create a file named `.env` in the `server` folder with this content:

```env
PORT=5000
NODE_ENV=development

# Database Configuration - CHANGE THE PASSWORD!
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_ROOT_PASSWORD_HERE
DB_NAME=military_assets

# JWT Configuration
JWT_SECRET=my-super-secret-key-12345
JWT_EXPIRES_IN=24h

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**IMPORTANT:** Replace `YOUR_MYSQL_ROOT_PASSWORD_HERE` with your actual MySQL password!

### Step 3: Fix Password Hashes in Database

The sample users in the database need proper password hashes.

**Run this command:**
```bash
node src/utils/hashPassword.js
```

You'll see output like:
```
Password: password123
Hash: $2b$10$abcdefghijklmnopqrstuvwxyz1234567890...
```

**Copy that hash**, then in MySQL Workbench, run:

```sql
USE military_assets;

UPDATE users SET password_hash = '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890...';
```

(Replace with your actual hash)

### Step 4: Start the Backend Server

```bash
npm run dev
```

**If successful, you'll see:**
```
✅ Database connected successfully!
📊 Database: military_assets
🖥️  Host: localhost:3306
🚀 Server running on port 5000
```

**If you see an error:**
- "Access denied" → Wrong password in `.env`
- "Database not found" → Run the setup.sql script again
- "Port in use" → Change PORT in `.env` to 5001

## 🔍 Understanding the Connection

### Where the connection happens:

**File: `server/src/config/database.js`**

```javascript
const mysql = require('mysql2/promise');

// This reads your .env file
const dbConfig = {
  host: process.env.DB_HOST,      // localhost
  port: process.env.DB_PORT,      // 3306
  user: process.env.DB_USER,      // root
  password: process.env.DB_PASSWORD, // YOUR PASSWORD
  database: process.env.DB_NAME   // military_assets
};

// This creates the connection pool
const pool = mysql.createPool(dbConfig);
```

### When it connects:

When you run `npm run dev`, the server:
1. Reads `.env` file
2. Creates MySQL connection pool
3. Tests the connection
4. If successful, starts listening on port 5000

## 🧪 Test the Backend

### Test 1: Health Check

Open browser: `http://localhost:5000`

You should see:
```json
{
  "message": "Military Asset Management System API",
  "version": "1.0.0",
  "status": "running"
}
```

### Test 2: Login API

**Using curl (in terminal):**
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@military.mil\",\"password\":\"password123\"}"
```

**Using browser console (F12):**
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@military.mil',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log)
```

**Expected response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@military.mil",
    "role": "admin",
    "baseId": null
  }
}
```

### Test 3: Get Dashboard Data

First login to get a token, then:

```bash
curl http://localhost:5000/api/dashboard -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔗 Connect Frontend to Backend

### Update Frontend API URL

**File: `client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

### Update Frontend to Use Real API

The frontend already has API utilities ready in `client/src/utils/api.js`.

You just need to replace mock data with real API calls in each page.

**Example - Dashboard.jsx:**

Change from:
```javascript
const fetchDashboardData = async () => {
  // Mock data
  setDashboardData([...])
}
```

To:
```javascript
import { dashboardAPI } from '../utils/api'

const fetchDashboardData = async () => {
  try {
    const data = await dashboardAPI.getData(filters)
    setDashboardData(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

## 📊 Database Connection Flow

```
Frontend (React)
    ↓
    HTTP Request (with JWT token)
    ↓
Backend (Express)
    ↓
    Middleware (auth.js) - Verify token
    ↓
    Route (purchases.js) - Handle request
    ↓
    Database Config (database.js) - Execute query
    ↓
MySQL Database (military_assets)
    ↓
    Return data
    ↓
Backend sends JSON response
    ↓
Frontend displays data
```

## 🛡️ Security Notes

1. **Never commit .env file** - It contains your password!
2. **Change JWT_SECRET** - Use a random string in production
3. **Use HTTPS** - In production, always use HTTPS
4. **Strong passwords** - Change default passwords

## ❓ Common Issues

### Issue: "Cannot find module 'mysql2'"
**Solution:** Run `npm install` in server folder

### Issue: "ER_ACCESS_DENIED_ERROR"
**Solution:** Check DB_PASSWORD in `.env` file

### Issue: "ER_BAD_DB_ERROR: Unknown database"
**Solution:** Run the setup.sql script in MySQL Workbench

### Issue: "Invalid email or password" when logging in
**Solution:** Update password hashes (Step 3)

### Issue: "Port 5000 already in use"
**Solution:** Change PORT in `.env` to 5001 or stop other process

### Issue: Frontend can't connect to backend
**Solution:** 
- Check if backend is running
- Verify CORS settings in server.js
- Check VITE_API_URL in client/.env

## ✅ Checklist

- [ ] Node.js installed
- [ ] MySQL installed and running
- [ ] Database `military_assets` created
- [ ] `npm install` completed in server folder
- [ ] `.env` file created with correct password
- [ ] Password hashes updated in database
- [ ] Backend starts without errors
- [ ] Can login via API
- [ ] Frontend `.env` updated with backend URL

## 🎉 Success!

If you completed all steps, your backend is now:
- ✅ Connected to MySQL database
- ✅ Serving API endpoints
- ✅ Authenticating users with JWT
- ✅ Logging all transactions
- ✅ Ready for frontend integration

## 🔄 Next Steps

1. Test all API endpoints
2. Update frontend to use real APIs
3. Test end-to-end functionality
4. Deploy to production (optional)
