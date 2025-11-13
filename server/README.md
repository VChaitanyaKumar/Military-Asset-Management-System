# Military Asset Management System - Backend

Node.js + Express backend API with MySQL database.

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment

```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your MySQL password
```

**Edit the `.env` file:**
```env
PORT=5000
NODE_ENV=development

# IMPORTANT: Change this to your MySQL root password
DB_PASSWORD=your_mysql_password_here

JWT_SECRET=your-super-secret-jwt-key-change-this
```

### Step 3: Update Database with Correct Password Hashes

The database needs proper bcrypt hashes. Run this command:

```bash
node src/utils/hashPassword.js
```

This will generate a hash for "password123". Copy that hash and update the database:

**In MySQL Workbench, run:**
```sql
USE military_assets;

-- Update all users with the correct hash (replace YOUR_HASH_HERE with the generated hash)
UPDATE users SET password_hash = 'YOUR_HASH_HERE';
```

### Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
✅ Database connected successfully!
📊 Database: military_assets
🖥️  Host: localhost:3306
🚀 Server running on port 5000
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout

### Dashboard
- `GET /api/dashboard` - Get dashboard metrics

### Purchases
- `GET /api/purchases` - Get all purchases
- `POST /api/purchases` - Create new purchase

### Transfers
- `GET /api/transfers` - Get all transfers
- `POST /api/transfers` - Create new transfer

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create new assignment
- `PATCH /api/assignments/:id/expend` - Mark as expended

### Reference Data
- `GET /api/bases` - Get all bases
- `GET /api/asset-types` - Get all asset types

## 🔐 Authentication

All endpoints (except `/api/auth/login`) require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 👥 Test Users

All passwords: `password123`

- **admin@military.mil** - Admin (full access)
- **commander@base1.mil** - Commander (Base Alpha only)
- **logistics@base1.mil** - Logistics Officer
- **commander@base2.mil** - Commander (Base Bravo only)

## 🧪 Testing the API

### Using curl:

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@military.mil\",\"password\":\"password123\"}"
```

**Get Dashboard (with token):**
```bash
curl http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman or Thunder Client:

1. POST to `http://localhost:5000/api/auth/login`
2. Body: `{"email":"admin@military.mil","password":"password123"}`
3. Copy the token from response
4. Add header to other requests: `Authorization: Bearer TOKEN`

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| DB_HOST | MySQL host | localhost |
| DB_PORT | MySQL port | 3306 |
| DB_USER | MySQL user | root |
| DB_PASSWORD | MySQL password | (required) |
| DB_NAME | Database name | military_assets |
| JWT_SECRET | JWT signing key | (required) |
| JWT_EXPIRES_IN | Token expiration | 24h |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## 📊 Database Connection

The backend connects to MySQL using these settings from `.env`:

```javascript
{
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'YOUR_PASSWORD',
  database: 'military_assets'
}
```

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based auth
- **bcrypt Password Hashing** - Passwords never stored in plain text
- **Role-Based Access Control** - Middleware checks user permissions
- **Audit Logging** - All actions logged to database
- **CORS Protection** - Only frontend can access API
- **SQL Injection Protection** - Parameterized queries

## 🐛 Troubleshooting

### "Database connection failed"
- Check if MySQL is running
- Verify password in `.env` file
- Ensure `military_assets` database exists

### "Invalid email or password"
- Make sure you updated password hashes (Step 3)
- Check if user exists in database

### "Access denied"
- Check if JWT token is included in header
- Verify token hasn't expired

### Port already in use
- Change PORT in `.env` file
- Or stop other process using port 5000

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js       # MySQL connection
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   ├── rbac.js           # Role checks
│   │   └── logger.js         # Audit logging
│   ├── routes/
│   │   ├── auth.js           # Login/logout
│   │   ├── dashboard.js      # Dashboard data
│   │   ├── purchases.js      # Purchases CRUD
│   │   ├── transfers.js      # Transfers CRUD
│   │   ├── assignments.js    # Assignments CRUD
│   │   ├── bases.js          # Get bases
│   │   └── assetTypes.js     # Get asset types
│   └── utils/
│       └── hashPassword.js   # Password hashing utility
├── .env                      # Your configuration
├── .env.example              # Template
├── package.json
└── server.js                 # Main entry point
```

## 🔄 Next Steps

1. ✅ Backend is running
2. ⏭️ Update frontend API URL
3. ⏭️ Test login from frontend
4. ⏭️ Test all features end-to-end

## 📞 Support

If you see errors:
1. Check the console output
2. Verify `.env` configuration
3. Ensure database is set up correctly
4. Check if all npm packages installed
