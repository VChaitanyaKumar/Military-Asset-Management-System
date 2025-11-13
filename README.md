# 🪖 Military Asset Management System

## 🎯 Objective
Develop a secure, web-based Military Asset Management System that allows commanders and logistics officers to track, manage, and control the movement, assignment, and expenditure of critical military assets such as vehicles, weapons, and ammunition across multiple bases. The system should ensure transparency, accountability, and role-based access control (RBAC).

## ⚙️ Core Functionalities

### 1. Dashboard
- Displays key metrics for each base:
  - Opening Balance
  - Purchases
  - Transfers (In/Out)
  - Assigned & Expended
  - Closing Balance
- Provides filters for Date, Base, and Equipment Type
- Clicking Net Movement opens a pop-up showing detailed Purchases, Transfers In, and Transfers Out

### 2. Purchases Module
- Record asset purchases for each base
- Store vendor, quantity, cost, and purchase date
- Allow filtering by equipment type or date
- Show historical purchase data

### 3. Transfers Module
- Handle asset transfers between bases
- Record details: from-base, to-base, quantity, date, and authorized officer
- Maintain complete transfer history for auditing

### 4. Assignments & Expenditure
- Assign assets (like weapons or vehicles) to personnel
- Track used or expended assets (e.g., ammunition fired)
- Ensure accountability and clear tracking of who used what

### 5. Role-Based Access Control (RBAC)
- **Admin**: Full access to all bases and data
- **Base Commander**: Access limited to their own base
- **Logistics Officer**: Can manage purchases and transfers only
- Implemented via backend middleware to ensure proper access levels

## 🧩 Technology Stack

### Frontend
- **Technology**: React JS (with JSX)
- **Libraries**: Tailwind CSS (for styling), React Router DOM (for navigation), Axios or Fetch API (for API calls)
- **Purpose**: Build a responsive and interactive web interface for dashboards and forms
- **Justification**: React + JSX makes component-based UI development fast, modular, and readable; Tailwind ensures a modern responsive design

### Backend
- **Technology**: Node.js with Express.js
- **Optional Enhancement**: TypeScript (for better code reliability and type safety)
- **Purpose**: Handle business logic, validation, authentication, and communication with the database via RESTful APIs
- **Features**:
  - REST APIs for all operations (purchases, transfers, assignments, dashboard)
  - JWT-based authentication
  - Middleware for RBAC & API logging
  - Input validation and error handling

### Database
- **Technology**: PostgreSQL (Relational SQL Database)
- **Purpose**: Store structured data — assets, bases, purchases, transfers, assignments, and users
- **Justification**:
  - Supports ACID transactions and relational links
  - Allows accurate stock, transfer, and audit calculations
  - Suitable for structured and secure military data management

## 🔐 Security Features
- **Authentication**: JWT (JSON Web Token) based login system
- **Authorization**: RBAC via Express middleware
- **Password Protection**: Hashing with bcrypt
- **Logging**: All asset transactions are logged in an audit table
- **HTTPS Encryption**: Ensures secure data transmission

## 🧱 System Architecture
- **Frontend (React JS)**: User dashboard, forms, and reports
- **Backend (Node + Express)**: Handles API logic, authentication, and role validation
- **Database (PostgreSQL)**: Stores and manages all structured records
- **Auth Layer (JWT + RBAC)**: Verifies users and permissions
- **Audit Layer**: Logs every activity for transparency

### Flow Example:
1. User logs in
2. React frontend sends API requests to backend
3. Backend verifies JWT and user role
4. Authorized operations update the PostgreSQL database
5. Dashboard fetches and displays updated metrics

## 🧾 Database Entities
- **asset_types** → stores categories (vehicles, weapons, ammo)
- **bases** → stores base details
- **assets** → stores each asset record (optional unique tag)
- **purchases** → records new acquisitions
- **transfers** → records base-to-base movements
- **assignments** → records issued items to personnel
- **users** → stores login credentials and role info
- **audit_logs** → logs every transaction for review

## 📊 Example Calculation
```
Closing Balance = Opening Balance + Purchases + Transfers In − Transfers Out − Expended
```

## ⚡ Non-Functional Requirements

| Category | Description |
|----------|-------------|
| Performance | Fast response time, optimized queries |
| Security | JWT, RBAC, bcrypt, HTTPS |
| Scalability | Modular design, easy to add more bases |
| Auditability | Full logging of all transactions |
| Usability | Clean and intuitive UI |
| Reliability | Database constraints and ACID compliance |

## 🚫 Note
- No payment integration is needed
- Only record financial details (like unit cost, vendor), not real payment processing

## ✅ Expected Outcome
A secure and transparent web application for managing military assets that provides:
- Real-time visibility across all bases
- Easy tracking of asset movements and usage
- Strong role-based security
- Full audit trail for accountability
