# MySQL Workbench Setup Guide

## 📋 Step-by-Step Instructions

### Step 1: Open the SQL Script File
1. In your project folder, go to `database/setup.sql`
2. Open it with any text editor (Notepad, VS Code, etc.)
3. **Select ALL the text** (Ctrl+A)
4. **Copy it** (Ctrl+C)

### Step 2: Paste into MySQL Workbench
1. Go back to MySQL Workbench (you should see the window with the big white area)
2. **Click in the big white area** in the middle (this is the Query Editor)
3. **Paste the SQL code** (Ctrl+V)

### Step 3: Execute the Script
1. Look at the toolbar at the top
2. Find the **lightning bolt icon** ⚡ (it says "Execute" when you hover over it)
3. **Click the lightning bolt**
4. Wait a few seconds...

### Step 4: Check if it Worked
You should see:
- In the **Output panel** at the bottom: "Database setup completed successfully!"
- In the **SCHEMAS panel** on the left: A new database called `military_assets`

### Step 5: Explore Your Database
1. In the left sidebar (SCHEMAS), click the **refresh icon** 🔄
2. You should now see `military_assets` in the list
3. Click the **triangle** next to `military_assets` to expand it
4. Click **Tables** to see all 8 tables:
   - bases
   - users
   - asset_types
   - purchases
   - transfers
   - assignments
   - audit_logs

## ✅ What Was Created

### Database: `military_assets`

### Tables (8):
1. **bases** - Military bases (3 sample bases)
2. **users** - System users (4 sample users)
3. **asset_types** - Types of assets (8 types)
4. **purchases** - Purchase records (4 samples)
5. **transfers** - Transfer records (3 samples)
6. **assignments** - Assignment records (4 samples)
7. **audit_logs** - Activity logs (empty, will be filled by backend)

### Sample Data Included:

#### Bases:
- Base Alpha (North Region)
- Base Bravo (South Region)
- Base Charlie (East Region)

#### Users (All passwords: `password123`):
- admin@military.mil (Admin - Full Access)
- commander@base1.mil (Commander - Base Alpha)
- logistics@base1.mil (Logistics - Base Alpha)
- commander@base2.mil (Commander - Base Bravo)

#### Asset Types:
- Rifles, Pistols, Vehicles, Trucks, Ammunition, Radio Equipment, Body Armor, Night Vision

## 🔍 How to View Data

### To see what's in a table:
1. In the left sidebar, expand `military_assets` → `Tables`
2. **Right-click** on any table (e.g., `users`)
3. Select **"Select Rows - Limit 1000"**
4. You'll see all the data in that table!

## ❓ Troubleshooting

### Error: "Access denied"
- Make sure you're connected as `root` user
- Check your MySQL password

### Error: "Database already exists"
- The script will drop and recreate it automatically
- Just run it again

### Can't see the new database
- Click the **refresh icon** 🔄 in the SCHEMAS panel

### Script runs but nothing happens
- Check the **Output** panel at the bottom for messages
- Look for any red error messages

## 🎯 Next Steps

After the database is set up:
1. ✅ Database is ready
2. ⏭️ Next: Create the Backend Server (Node.js + Express)
3. ⏭️ Then: Connect Frontend to Backend

## 📞 Need Help?

If you see any errors:
1. Take a screenshot of the error message
2. Check which line number has the error
3. Share the error and I'll help you fix it!
