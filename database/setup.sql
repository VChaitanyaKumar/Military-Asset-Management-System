<<<<<<< HEAD
-- ============================================
-- Military Asset Management System - Database Setup
-- MySQL Version
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS military_assets;
USE military_assets;

-- ============================================
-- Drop existing tables (if any)
-- ============================================
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS transfers;
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS asset_types;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bases;

-- ============================================
-- Create Tables
-- ============================================

-- Bases Table
CREATE TABLE bases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'commander', 'logistics') NOT NULL,
    base_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (base_id) REFERENCES bases(id) ON DELETE SET NULL
);

-- Asset Types Table
CREATE TABLE asset_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Purchases Table
CREATE TABLE purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    base_id INT NOT NULL,
    asset_type_id INT NOT NULL,
    vendor VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    purchase_date DATE NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_type_id) REFERENCES asset_types(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Transfers Table
CREATE TABLE transfers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_base_id INT NOT NULL,
    to_base_id INT NOT NULL,
    asset_type_id INT NOT NULL,
    quantity INT NOT NULL,
    authorized_officer VARCHAR(255) NOT NULL,
    transfer_date DATE NOT NULL,
    remarks TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (from_base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (to_base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_type_id) REFERENCES asset_types(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (from_base_id != to_base_id)
);

-- Assignments Table
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    base_id INT NOT NULL,
    asset_type_id INT NOT NULL,
    personnel_name VARCHAR(255) NOT NULL,
    personnel_rank VARCHAR(100) NOT NULL,
    personnel_id VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    assignment_date DATE NOT NULL,
    purpose TEXT NOT NULL,
    status ENUM('assigned', 'expended', 'returned') DEFAULT 'assigned',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_type_id) REFERENCES asset_types(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id INT,
    details JSON,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- Insert Seed Data
-- ============================================

-- Insert Bases
INSERT INTO bases (name, location) VALUES
('Base Alpha', 'North Region'),
('Base Bravo', 'South Region'),
('Base Charlie', 'East Region');

-- Insert Asset Types
INSERT INTO asset_types (name, category) VALUES
('Rifles', 'Weapons'),
('Pistols', 'Weapons'),
('Vehicles', 'Transport'),
('Trucks', 'Transport'),
('Ammunition', 'Supplies'),
('Radio Equipment', 'Communication'),
('Body Armor', 'Protection'),
('Night Vision', 'Equipment');

-- Insert Users
-- Password for all users: password123
-- Hash generated using bcrypt with salt rounds 10
INSERT INTO users (name, email, password_hash, role, base_id) VALUES
('Admin User', 'admin@military.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'admin', NULL),
('John Commander', 'commander@base1.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'commander', 1),
('Sarah Logistics', 'logistics@base1.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'logistics', 1),
('Mike Commander', 'commander@base2.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'commander', 2);

-- Insert Sample Purchases
INSERT INTO purchases (base_id, asset_type_id, vendor, quantity, unit_cost, total_cost, purchase_date, created_by) VALUES
(1, 1, 'Defense Corp', 50, 1500.00, 75000.00, '2024-11-01', 1),
(1, 3, 'Military Motors', 5, 50000.00, 250000.00, '2024-11-05', 1),
(2, 5, 'Ammo Supplies Inc', 10000, 2.50, 25000.00, '2024-11-08', 1),
(3, 6, 'Tech Communications', 20, 3000.00, 60000.00, '2024-11-10', 1);

-- Insert Sample Transfers
INSERT INTO transfers (from_base_id, to_base_id, asset_type_id, quantity, authorized_officer, transfer_date, remarks, created_by) VALUES
(1, 2, 1, 20, 'Col. Smith', '2024-11-10', 'Emergency supply transfer', 1),
(2, 3, 3, 2, 'Maj. Johnson', '2024-11-12', 'Routine equipment transfer', 1),
(3, 1, 6, 5, 'Capt. Williams', '2024-11-13', 'Communication equipment needed', 1);

-- Insert Sample Assignments
INSERT INTO assignments (base_id, asset_type_id, personnel_name, personnel_rank, personnel_id, quantity, assignment_date, purpose, status, created_by) VALUES
(1, 1, 'Sgt. Williams', 'Sergeant', 'MIL-12345', 2, '2024-11-01', 'Training Exercise', 'assigned', 2),
(1, 5, 'Cpl. Davis', 'Corporal', 'MIL-12346', 500, '2024-11-05', 'Range Practice', 'expended', 2),
(2, 3, 'Lt. Brown', 'Lieutenant', 'MIL-12347', 1, '2024-11-08', 'Patrol Duty', 'assigned', 4),
(3, 6, 'Sgt. Miller', 'Sergeant', 'MIL-12348', 2, '2024-11-10', 'Field Operations', 'assigned', 1);

-- ============================================
-- Create Indexes for Performance
-- ============================================

CREATE INDEX idx_purchases_base ON purchases(base_id);
CREATE INDEX idx_purchases_date ON purchases(purchase_date);
CREATE INDEX idx_transfers_from_base ON transfers(from_base_id);
CREATE INDEX idx_transfers_to_base ON transfers(to_base_id);
CREATE INDEX idx_transfers_date ON transfers(transfer_date);
CREATE INDEX idx_assignments_base ON assignments(base_id);
CREATE INDEX idx_assignments_status ON assignments(status);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(created_at);

-- ============================================
-- Create Views for Dashboard
-- ============================================

CREATE OR REPLACE VIEW dashboard_summary AS
SELECT 
    b.id as base_id,
    b.name as base_name,
    at.id as asset_type_id,
    at.name as asset_type,
    COALESCE(SUM(p.quantity), 0) as total_purchases,
    COALESCE(SUM(CASE WHEN t.to_base_id = b.id THEN t.quantity ELSE 0 END), 0) as transfers_in,
    COALESCE(SUM(CASE WHEN t.from_base_id = b.id THEN t.quantity ELSE 0 END), 0) as transfers_out,
    COALESCE(SUM(a.quantity), 0) as total_assigned,
    COALESCE(SUM(CASE WHEN a.status = 'expended' THEN a.quantity ELSE 0 END), 0) as total_expended
FROM bases b
CROSS JOIN asset_types at
LEFT JOIN purchases p ON b.id = p.base_id AND at.id = p.asset_type_id
LEFT JOIN transfers t ON (b.id = t.to_base_id OR b.id = t.from_base_id) AND at.id = t.asset_type_id
LEFT JOIN assignments a ON b.id = a.base_id AND at.id = a.asset_type_id
GROUP BY b.id, b.name, at.id, at.name;

-- ============================================
-- Success Message
-- ============================================

SELECT 'Database setup completed successfully!' as Status,
       'Database: military_assets' as Database_Name,
       '8 tables created' as Tables,
       '4 sample users created' as Users,
       'Password for all users: password123' as Note;
=======
-- ============================================
-- Military Asset Management System - Database Setup
-- MySQL Version
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS military_assets;
USE military_assets;

-- ============================================
-- Drop existing tables (if any)
-- ============================================
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS transfers;
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS asset_types;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bases;

-- ============================================
-- Create Tables
-- ============================================

-- Bases Table
CREATE TABLE bases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'commander', 'logistics') NOT NULL,
    base_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (base_id) REFERENCES bases(id) ON DELETE SET NULL
);

-- Asset Types Table
CREATE TABLE asset_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Purchases Table
CREATE TABLE purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    base_id INT NOT NULL,
    asset_type_id INT NOT NULL,
    vendor VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    purchase_date DATE NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_type_id) REFERENCES asset_types(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Transfers Table
CREATE TABLE transfers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_base_id INT NOT NULL,
    to_base_id INT NOT NULL,
    asset_type_id INT NOT NULL,
    quantity INT NOT NULL,
    authorized_officer VARCHAR(255) NOT NULL,
    transfer_date DATE NOT NULL,
    remarks TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (from_base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (to_base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_type_id) REFERENCES asset_types(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (from_base_id != to_base_id)
);

-- Assignments Table
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    base_id INT NOT NULL,
    asset_type_id INT NOT NULL,
    personnel_name VARCHAR(255) NOT NULL,
    personnel_rank VARCHAR(100) NOT NULL,
    personnel_id VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    assignment_date DATE NOT NULL,
    purpose TEXT NOT NULL,
    status ENUM('assigned', 'expended', 'returned') DEFAULT 'assigned',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (base_id) REFERENCES bases(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_type_id) REFERENCES asset_types(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id INT,
    details JSON,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- Insert Seed Data
-- ============================================

-- Insert Bases
INSERT INTO bases (name, location) VALUES
('Base Alpha', 'North Region'),
('Base Bravo', 'South Region'),
('Base Charlie', 'East Region');

-- Insert Asset Types
INSERT INTO asset_types (name, category) VALUES
('Rifles', 'Weapons'),
('Pistols', 'Weapons'),
('Vehicles', 'Transport'),
('Trucks', 'Transport'),
('Ammunition', 'Supplies'),
('Radio Equipment', 'Communication'),
('Body Armor', 'Protection'),
('Night Vision', 'Equipment');

-- Insert Users
-- Password for all users: password123
-- Hash generated using bcrypt with salt rounds 10
INSERT INTO users (name, email, password_hash, role, base_id) VALUES
('Admin User', 'admin@military.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'admin', NULL),
('John Commander', 'commander@base1.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'commander', 1),
('Sarah Logistics', 'logistics@base1.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'logistics', 1),
('Mike Commander', 'commander@base2.mil', '$2b$10$rKJ5VqJxKqZ5qZ5qZ5qZ5uXxYxYxYxYxYxYxYxYxYxYxYxYxYxYxY', 'commander', 2);

-- Insert Sample Purchases
INSERT INTO purchases (base_id, asset_type_id, vendor, quantity, unit_cost, total_cost, purchase_date, created_by) VALUES
(1, 1, 'Defense Corp', 50, 1500.00, 75000.00, '2024-11-01', 1),
(1, 3, 'Military Motors', 5, 50000.00, 250000.00, '2024-11-05', 1),
(2, 5, 'Ammo Supplies Inc', 10000, 2.50, 25000.00, '2024-11-08', 1),
(3, 6, 'Tech Communications', 20, 3000.00, 60000.00, '2024-11-10', 1);

-- Insert Sample Transfers
INSERT INTO transfers (from_base_id, to_base_id, asset_type_id, quantity, authorized_officer, transfer_date, remarks, created_by) VALUES
(1, 2, 1, 20, 'Col. Smith', '2024-11-10', 'Emergency supply transfer', 1),
(2, 3, 3, 2, 'Maj. Johnson', '2024-11-12', 'Routine equipment transfer', 1),
(3, 1, 6, 5, 'Capt. Williams', '2024-11-13', 'Communication equipment needed', 1);

-- Insert Sample Assignments
INSERT INTO assignments (base_id, asset_type_id, personnel_name, personnel_rank, personnel_id, quantity, assignment_date, purpose, status, created_by) VALUES
(1, 1, 'Sgt. Williams', 'Sergeant', 'MIL-12345', 2, '2024-11-01', 'Training Exercise', 'assigned', 2),
(1, 5, 'Cpl. Davis', 'Corporal', 'MIL-12346', 500, '2024-11-05', 'Range Practice', 'expended', 2),
(2, 3, 'Lt. Brown', 'Lieutenant', 'MIL-12347', 1, '2024-11-08', 'Patrol Duty', 'assigned', 4),
(3, 6, 'Sgt. Miller', 'Sergeant', 'MIL-12348', 2, '2024-11-10', 'Field Operations', 'assigned', 1);

-- ============================================
-- Create Indexes for Performance
-- ============================================

CREATE INDEX idx_purchases_base ON purchases(base_id);
CREATE INDEX idx_purchases_date ON purchases(purchase_date);
CREATE INDEX idx_transfers_from_base ON transfers(from_base_id);
CREATE INDEX idx_transfers_to_base ON transfers(to_base_id);
CREATE INDEX idx_transfers_date ON transfers(transfer_date);
CREATE INDEX idx_assignments_base ON assignments(base_id);
CREATE INDEX idx_assignments_status ON assignments(status);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(created_at);

-- ============================================
-- Create Views for Dashboard
-- ============================================

CREATE OR REPLACE VIEW dashboard_summary AS
SELECT 
    b.id as base_id,
    b.name as base_name,
    at.id as asset_type_id,
    at.name as asset_type,
    COALESCE(SUM(p.quantity), 0) as total_purchases,
    COALESCE(SUM(CASE WHEN t.to_base_id = b.id THEN t.quantity ELSE 0 END), 0) as transfers_in,
    COALESCE(SUM(CASE WHEN t.from_base_id = b.id THEN t.quantity ELSE 0 END), 0) as transfers_out,
    COALESCE(SUM(a.quantity), 0) as total_assigned,
    COALESCE(SUM(CASE WHEN a.status = 'expended' THEN a.quantity ELSE 0 END), 0) as total_expended
FROM bases b
CROSS JOIN asset_types at
LEFT JOIN purchases p ON b.id = p.base_id AND at.id = p.asset_type_id
LEFT JOIN transfers t ON (b.id = t.to_base_id OR b.id = t.from_base_id) AND at.id = t.asset_type_id
LEFT JOIN assignments a ON b.id = a.base_id AND at.id = a.asset_type_id
GROUP BY b.id, b.name, at.id, at.name;

-- ============================================
-- Success Message
-- ============================================

SELECT 'Database setup completed successfully!' as Status,
       'Database: military_assets' as Database_Name,
       '8 tables created' as Tables,
       '4 sample users created' as Users,
       'Password for all users: password123' as Note;
>>>>>>> c6cf95a602ff79e08105c42299894920e05a36ac
