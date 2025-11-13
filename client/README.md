# Military Asset Management System - Frontend

React-based frontend for the Military Asset Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
client/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout.jsx
│   │   ├── NetMovementModal.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Purchases.jsx
│   │   ├── Transfers.jsx
│   │   ├── Assignments.jsx
│   │   └── Login.jsx
│   ├── utils/           # Utility functions
│   │   ├── api.js       # API client
│   │   └── constants.js # App constants
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env.example         # Environment variables template
└── package.json
```

## 🎨 Features

### Implemented Pages

1. **Dashboard**
   - View asset metrics across all bases
   - Filter by date, base, and equipment type
   - Click Net Movement to see detailed breakdown

2. **Purchases**
   - Record new asset purchases
   - View purchase history
   - Track vendor and cost information

3. **Transfers**
   - Transfer assets between bases
   - Record authorized officer
   - View transfer history

4. **Assignments & Expenditure**
   - Assign assets to personnel
   - Track expended assets
   - Mark assignments as expended

5. **Login**
   - JWT-based authentication (ready for backend)
   - Role-based access control

### Role-Based Access

- **Admin**: Full access to all features and bases
- **Base Commander**: Access limited to their assigned base
- **Logistics Officer**: Can manage purchases and transfers only

## 🧪 Demo Accounts

For testing (when backend is not connected):

- **Admin**: admin@military.mil / password123
- **Commander**: commander@base1.mil / password123
- **Logistics**: logistics@base1.mil / password123

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- Custom military theme colors defined in `tailwind.config.js`
- Responsive design for mobile and desktop

## 🔌 API Integration

The app is ready for backend integration. API utilities are in `src/utils/api.js`:

```javascript
import { dashboardAPI, purchasesAPI } from './utils/api'

// Example usage
const data = await dashboardAPI.getData(filters)
const purchases = await purchasesAPI.getAll()
```

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚧 Next Steps

1. **Backend Integration**
   - Replace mock data with actual API calls
   - Connect authentication flow
   - Implement error handling

2. **Enhancements**
   - Add pagination for large datasets
   - Implement search functionality
   - Add export to CSV/PDF features
   - Add data visualization charts

## 🛠️ Tech Stack

- **React 18** - UI framework
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Vite** - Build tool

## 📄 License

Proprietary - Military Use Only
