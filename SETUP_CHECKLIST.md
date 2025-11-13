# Setup Checklist - Military Asset Management System

## ✅ Frontend Setup (Complete)

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env if needed (default works for local development)
```

### 3. Start Development Server
```bash
npm run dev
```

The app will run on `http://localhost:3000`

### 4. Test the Application

#### Login with Demo Accounts:
- **Admin**: admin@military.mil / password123
- **Commander**: commander@base1.mil / password123  
- **Logistics**: logistics@base1.mil / password123

#### Test Each Page:
- [ ] Dashboard - View metrics and click Net Movement
- [ ] Purchases - Create a new purchase
- [ ] Transfers - Create a transfer between bases
- [ ] Assignments - Assign an asset and mark as expended
- [ ] Logout - Test logout functionality

## 🔧 Backend Setup (To Be Implemented)

### 1. Initialize Backend Project
```bash
mkdir server
cd server
npm init -y
```

### 2. Install Backend Dependencies
```bash
npm install express cors dotenv bcrypt jsonwebtoken pg
npm install --save-dev nodemon
```

### 3. Database Setup (PostgreSQL)

#### Install PostgreSQL
- Download from https://www.postgresql.org/download/

#### Create Database
```sql
CREATE DATABASE military_assets;
```

#### Create Tables (Schema)
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  base_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bases table
CREATE TABLE bases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asset Types table
CREATE TABLE asset_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchases table
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  base_id INTEGER REFERENCES bases(id),
  asset_type_id INTEGER REFERENCES asset_types(id),
  vendor VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  purchase_date DATE NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transfers table
CREATE TABLE transfers (
  id SERIAL PRIMARY KEY,
  from_base_id INTEGER REFERENCES bases(id),
  to_base_id INTEGER REFERENCES bases(id),
  asset_type_id INTEGER REFERENCES asset_types(id),
  quantity INTEGER NOT NULL,
  authorized_officer VARCHAR(255) NOT NULL,
  transfer_date DATE NOT NULL,
  remarks TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments table
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  base_id INTEGER REFERENCES bases(id),
  asset_type_id INTEGER REFERENCES asset_types(id),
  personnel_name VARCHAR(255) NOT NULL,
  personnel_rank VARCHAR(100) NOT NULL,
  personnel_id VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  assignment_date DATE NOT NULL,
  purpose TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'assigned',
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs table
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id INTEGER,
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Seed Initial Data
```sql
-- Insert bases
INSERT INTO bases (name, location) VALUES
('Base Alpha', 'North Region'),
('Base Bravo', 'South Region'),
('Base Charlie', 'East Region');

-- Insert asset types
INSERT INTO asset_types (name, category) VALUES
('Rifles', 'Weapons'),
('Vehicles', 'Transport'),
('Ammunition', 'Supplies'),
('Radio Equipment', 'Communication');

-- Insert users (password: password123)
-- Note: Use bcrypt to hash passwords in actual implementation
INSERT INTO users (name, email, password_hash, role, base_id) VALUES
('Admin User', 'admin@military.mil', '$2b$10$...', 'admin', NULL),
('Base Commander', 'commander@base1.mil', '$2b$10$...', 'commander', 1),
('Logistics Officer', 'logistics@base1.mil', '$2b$10$...', 'logistics', 1);
```

### 5. Create Backend Structure
```
server/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rbac.js
│   │   └── logger.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── purchases.js
│   │   ├── transfers.js
│   │   ├── assignments.js
│   │   ├── bases.js
│   │   └── assetTypes.js
│   ├── controllers/
│   ├── models/
│   └── utils/
├── .env
├── .env.example
├── package.json
└── server.js
```

### 6. Backend Environment Variables
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/military_assets
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

### 7. Start Backend Server
```bash
npm run dev
```

## 🔗 Integration Steps

### 1. Update Frontend API URL
In `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Remove Mock Data
- Update each page to use API calls from `utils/api.js`
- Remove mock data arrays
- Add proper error handling

### 3. Test Integration
- [ ] Login with real authentication
- [ ] Create a purchase via API
- [ ] Create a transfer via API
- [ ] Create an assignment via API
- [ ] View dashboard with real data
- [ ] Test role-based access control

## 🧪 Testing Checklist

### Frontend Tests
- [ ] All pages render without errors
- [ ] Forms validate input correctly
- [ ] Navigation works between pages
- [ ] Logout clears session
- [ ] Responsive design works on mobile

### Backend Tests
- [ ] All API endpoints respond correctly
- [ ] Authentication works with JWT
- [ ] RBAC middleware restricts access properly
- [ ] Database transactions are atomic
- [ ] Audit logs are created for all actions

### Integration Tests
- [ ] Frontend can authenticate with backend
- [ ] CRUD operations work end-to-end
- [ ] Role-based UI matches backend permissions
- [ ] Error messages display correctly
- [ ] Loading states work properly

## 📦 Deployment Checklist

### Frontend Deployment
- [ ] Build production bundle: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Deploy to hosting (Vercel, Netlify, etc.)
- [ ] Update API URL for production

### Backend Deployment
- [ ] Set production environment variables
- [ ] Configure PostgreSQL for production
- [ ] Enable HTTPS
- [ ] Set up CORS for frontend domain
- [ ] Deploy to hosting (Heroku, AWS, etc.)

### Database Deployment
- [ ] Backup database
- [ ] Run migrations
- [ ] Seed production data
- [ ] Set up automated backups

## 🎉 Launch Checklist

- [ ] All features tested and working
- [ ] Security audit completed
- [ ] Performance optimization done
- [ ] Documentation updated
- [ ] User training completed
- [ ] Monitoring and logging set up
- [ ] Backup and recovery tested

## 📞 Support

For issues or questions:
1. Check documentation in README files
2. Review FRONTEND_IMPLEMENTATION.md
3. Check console for error messages
4. Verify environment variables are set correctly
