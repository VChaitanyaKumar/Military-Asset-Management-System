# 🔗 How Everything Connects

## 📊 Visual Connection Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR COMPUTER                             │
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Browser    │         │   Terminal   │                 │
│  │ localhost:   │         │              │                 │
│  │    3000      │         │  npm run dev │                 │
│  └──────┬───────┘         └──────────────┘                 │
│         │                                                    │
│         │ HTTP Request                                       │
│         │ (with JWT token)                                   │
│         ↓                                                    │
│  ┌──────────────────────────────────────┐                  │
│  │     FRONTEND (React)                 │                  │
│  │     Port: 3000                       │                  │
│  │     Location: client/                │                  │
│  │                                      │                  │
│  │  - Dashboard.jsx                     │                  │
│  │  - Purchases.jsx                     │                  │
│  │  - Transfers.jsx                     │                  │
│  │  - Assignments.jsx                   │                  │
│  │  - Login.jsx                         │                  │
│  │                                      │                  │
│  │  Uses: utils/api.js                  │                  │
│  └──────────────┬───────────────────────┘                  │
│                 │                                            │
│                 │ API Call                                   │
│                 │ http://localhost:5000/api/...             │
│                 ↓                                            │
│  ┌──────────────────────────────────────┐                  │
│  │     BACKEND (Node.js + Express)      │                  │
│  │     Port: 5000                       │                  │
│  │     Location: server/                │                  │
│  │                                      │                  │
│  │  1. server.js (main entry)           │                  │
│  │  2. middleware/auth.js (verify JWT)  │                  │
│  │  3. routes/*.js (handle request)     │                  │
│  │  4. config/database.js (query DB)    │                  │
│  └──────────────┬───────────────────────┘                  │
│                 │                                            │
│                 │ SQL Query                                  │
│                 │ mysql2 driver                             │
│                 ↓                                            │
│  ┌──────────────────────────────────────┐                  │
│  │     MySQL DATABASE                   │                  │
│  │     Port: 3306                       │                  │
│  │     Database: military_assets        │                  │
│  │                                      │                  │
│  │  Tables:                             │                  │
│  │  - users                             │                  │
│  │  - bases                             │                  │
│  │  - asset_types                       │                  │
│  │  - purchases                         │                  │
│  │  - transfers                         │                  │
│  │  - assignments                       │                  │
│  │  - audit_logs                        │                  │
│  └──────────────────────────────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Example: User Logs In

### Step 1: User enters email and password

```
Browser (localhost:3000)
  ↓
Login.jsx
  ↓
User clicks "Sign in"
```

### Step 2: Frontend sends request to backend

```javascript
// In Login.jsx
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ 
    email: 'admin@military.mil', 
    password: 'password123' 
  })
})
```

### Step 3: Backend receives request

```
Backend (localhost:5000)
  ↓
server.js receives POST /api/auth/login
  ↓
Routes to: src/routes/auth.js
```

### Step 4: Backend queries database

```javascript
// In auth.js
const sql = 'SELECT * FROM users WHERE email = ?'
const users = await query(sql, ['admin@military.mil'])
```

### Step 5: Database connection executes query

```
config/database.js
  ↓
mysql2 driver connects to MySQL
  ↓
Host: localhost
Port: 3306
User: root
Password: (from .env file)
Database: military_assets
  ↓
Executes: SELECT * FROM users WHERE email = 'admin@military.mil'
```

### Step 6: Database returns data

```
MySQL returns:
{
  id: 1,
  name: 'Admin User',
  email: 'admin@military.mil',
  password_hash: '$2b$10$...',
  role: 'admin',
  base_id: null
}
```

### Step 7: Backend verifies password

```javascript
// In auth.js
const validPassword = await bcrypt.compare(
  'password123',  // user entered
  user.password_hash  // from database
)
```

### Step 8: Backend creates JWT token

```javascript
const token = jwt.sign(
  { id: 1, email: 'admin@military.mil', role: 'admin' },
  'secret-key',
  { expiresIn: '24h' }
)
```

### Step 9: Backend sends response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@military.mil",
    "role": "admin"
  }
}
```

### Step 10: Frontend stores token

```javascript
// In Login.jsx
localStorage.setItem('token', response.token)
localStorage.setItem('user', JSON.stringify(response.user))
```

### Step 11: Frontend redirects to dashboard

```
User is now logged in!
Browser shows: localhost:3000/dashboard
```

## 🔐 How Authentication Works

### Every API Request After Login:

```
Frontend
  ↓
Adds token to request header:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ↓
Backend
  ↓
middleware/auth.js verifies token
  ↓
If valid: Allow request
If invalid: Return 401 Unauthorized
```

## 📁 Where Configuration Lives

### Frontend Configuration
**File:** `client/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

This tells frontend WHERE to send API requests.

### Backend Configuration
**File:** `server/.env`
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=military_assets
```

This tells backend HOW to connect to MySQL.

### Database Configuration
**Location:** MySQL Workbench
- Database name: `military_assets`
- Running on: `localhost:3306`
- User: `root`
- Password: (what you set during MySQL installation)

## 🔌 The Connection String

When backend starts, it creates this connection:

```javascript
mysql.createPool({
  host: 'localhost',        // Your computer
  port: 3306,               // MySQL port
  user: 'root',             // MySQL user
  password: 'your_password', // From .env
  database: 'military_assets' // Database we created
})
```

This is like a phone number - it tells the backend exactly where to find your database!

## 🎯 Key Points

1. **Frontend** (React) runs on port 3000
2. **Backend** (Node.js) runs on port 5000
3. **Database** (MySQL) runs on port 3306
4. All three run on **localhost** (your computer)
5. Frontend talks to Backend via HTTP
6. Backend talks to Database via mysql2 driver
7. **`.env` files** contain the connection details

## ✅ How to Verify Connection

### Check Frontend → Backend:
```javascript
// In browser console (F12)
fetch('http://localhost:5000')
  .then(r => r.json())
  .then(console.log)
```

Should return: `{ message: "Military Asset Management System API" }`

### Check Backend → Database:
When you start backend with `npm run dev`, you should see:
```
✅ Database connected successfully!
📊 Database: military_assets
🖥️  Host: localhost:3306
```

### Check Database:
In MySQL Workbench:
```sql
USE military_assets;
SELECT * FROM users;
```

Should show 4 users.

## 🚀 Summary

```
You type in browser → Frontend (React)
                        ↓
                     Sends HTTP request
                        ↓
                     Backend (Express)
                        ↓
                     Queries database
                        ↓
                     MySQL Database
                        ↓
                     Returns data
                        ↓
                     Backend processes
                        ↓
                     Sends JSON response
                        ↓
                     Frontend displays
                        ↓
                     You see the result!
```

Everything is connected automatically once you:
1. Set correct password in `server/.env`
2. Start backend: `npm run dev`
3. Start frontend: `npm run dev`

That's it! The connection happens automatically! 🎉
