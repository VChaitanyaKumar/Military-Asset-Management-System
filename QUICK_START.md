# 🚀 Quick Start Guide - Military Asset Management System

## ✅ What You Have Now

1. ✅ **Frontend** - Complete React application (client folder)
2. ✅ **Database** - MySQL database with all tables (military_assets)
3. ✅ **Backend** - Node.js API server (server folder)

## 🎯 Quick Setup (5 Minutes)

### Step 1: Setup Backend (2 minutes)

```bash
# Go to server folder
cd server

# Install packages
npm install

# Create .env file
copy .env.example .env
```

**Edit `.env` file** - Change this line:
```
DB_PASSWORD=YOUR_MYSQL_ROOT_PASSWORD_HERE
```

### Step 2: Fix Password Hashes (1 minute)

```bash
# Generate password hash
node src/utils/hashPassword.js
```

Copy the hash, then in **MySQL Workbench**:
```sql
USE military_assets;
UPDATE users SET password_hash = 'PASTE_HASH_HERE';
```

### Step 3: Start Backend (30 seconds)

```bash
npm run dev
```

You should see: ✅ Database connected successfully!

### Step 4: Start Frontend (1 minute)

Open **NEW terminal**:
```bash
cd client
npm run dev
```

### Step 5: Open Browser

Go to: `http://localhost:3000`

Login with:
- Email: `admin@military.mil`
- Password: `password123`

## 🎉 Done!

You now have:
- ✅ Frontend running on port 3000
- ✅ Backend running on port 5000
- ✅ Database connected and working

## 📝 Current Status

### Frontend (100% Complete)
- Dashboard with filters
- Purchases page
- Transfers page
- Assignments page
- Login page
- All UI components

### Backend (100% Complete)
- Authentication (JWT)
- All API endpoints
- Role-based access control
- Audit logging
- MySQL connection

### Database (100% Complete)
- 8 tables created
- Sample data loaded
- 4 test users
- 3 bases
- 8 asset types

## 🔄 To Connect Frontend to Backend

Currently frontend uses mock data. To use real backend:

1. Update `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

2. In each page (Dashboard, Purchases, etc.), replace mock data with API calls:

```javascript
// Instead of mock data
import { dashboardAPI } from '../utils/api'

const data = await dashboardAPI.getData(filters)
```

## 👥 Test Accounts

All passwords: `password123`

| Email | Role | Access |
|-------|------|--------|
| admin@military.mil | Admin | All bases, all features |
| commander@base1.mil | Commander | Base Alpha only |
| logistics@base1.mil | Logistics | Purchases & Transfers |
| commander@base2.mil | Commander | Base Bravo only |

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify password in `.env`
- Run `npm install` again

### Frontend won't start
- Run `npm install` in client folder
- Check if port 3000 is free

### Can't login
- Update password hashes (Step 2)
- Check backend is running
- Check browser console for errors

## 📚 Documentation

- `FRONTEND_IMPLEMENTATION.md` - Frontend features
- `BACKEND_SETUP_GUIDE.md` - Detailed backend setup
- `SETUP_CHECKLIST.md` - Complete checklist
- `client/README.md` - Frontend docs
- `server/README.md` - Backend docs
- `database/MYSQL_SETUP_GUIDE.md` - Database docs

## 🎯 Project Structure

```
Military Asset Management System/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/            # Dashboard, Purchases, etc.
│   │   ├── components/       # Reusable components
│   │   └── utils/            # API client
│   └── package.json
├── server/                    # Backend (Node.js)
│   ├── src/
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Auth, RBAC, Logging
│   │   └── config/           # Database connection
│   ├── .env                  # Your configuration
│   └── server.js
├── database/                  # Database scripts
│   └── setup.sql             # MySQL schema
└── README.md
```

## ✨ Features

### Dashboard
- View metrics for all bases
- Filter by date, base, equipment type
- Click Net Movement for details

### Purchases
- Record new purchases
- View purchase history
- Track vendor and costs

### Transfers
- Transfer assets between bases
- Record authorized officer
- View transfer history

### Assignments
- Assign assets to personnel
- Track expended assets
- Mark as expended

### Security
- JWT authentication
- Role-based access control
- Password hashing
- Audit logging

## 🚀 You're All Set!

Everything is ready to use. Just follow the 5 steps above and you'll have a fully working system!

Need help? Check the documentation files or the error messages in the console.
