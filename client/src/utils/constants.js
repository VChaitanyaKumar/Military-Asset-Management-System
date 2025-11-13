<<<<<<< HEAD
// User Roles
export const ROLES = {
  ADMIN: 'admin',
  COMMANDER: 'commander',
  LOGISTICS: 'logistics'
}

// Assignment Status
export const ASSIGNMENT_STATUS = {
  ASSIGNED: 'assigned',
  EXPENDED: 'expended',
  RETURNED: 'returned'
}

// Date Formats
export const DATE_FORMAT = 'YYYY-MM-DD'

// Mock Data for Development
export const MOCK_BASES = [
  { id: 1, name: 'Base Alpha', location: 'North Region' },
  { id: 2, name: 'Base Bravo', location: 'South Region' },
  { id: 3, name: 'Base Charlie', location: 'East Region' }
]

export const MOCK_ASSET_TYPES = [
  { id: 1, name: 'Rifles', category: 'Weapons' },
  { id: 2, name: 'Vehicles', category: 'Transport' },
  { id: 3, name: 'Ammunition', category: 'Supplies' },
  { id: 4, name: 'Radio Equipment', category: 'Communication' }
]

export const MOCK_USERS = {
  'admin@military.mil': { 
    name: 'Admin User', 
    role: ROLES.ADMIN, 
    baseId: null 
  },
  'commander@base1.mil': { 
    name: 'Base Commander', 
    role: ROLES.COMMANDER, 
    baseId: 1 
  },
  'logistics@base1.mil': { 
    name: 'Logistics Officer', 
    role: ROLES.LOGISTICS, 
    baseId: 1 
  }
}

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
}
=======
// User Roles
export const ROLES = {
  ADMIN: 'admin',
  COMMANDER: 'commander',
  LOGISTICS: 'logistics'
}

// Assignment Status
export const ASSIGNMENT_STATUS = {
  ASSIGNED: 'assigned',
  EXPENDED: 'expended',
  RETURNED: 'returned'
}

// Date Formats
export const DATE_FORMAT = 'YYYY-MM-DD'

// Mock Data for Development
export const MOCK_BASES = [
  { id: 1, name: 'Base Alpha', location: 'North Region' },
  { id: 2, name: 'Base Bravo', location: 'South Region' },
  { id: 3, name: 'Base Charlie', location: 'East Region' }
]

export const MOCK_ASSET_TYPES = [
  { id: 1, name: 'Rifles', category: 'Weapons' },
  { id: 2, name: 'Vehicles', category: 'Transport' },
  { id: 3, name: 'Ammunition', category: 'Supplies' },
  { id: 4, name: 'Radio Equipment', category: 'Communication' }
]

export const MOCK_USERS = {
  'admin@military.mil': { 
    name: 'Admin User', 
    role: ROLES.ADMIN, 
    baseId: null 
  },
  'commander@base1.mil': { 
    name: 'Base Commander', 
    role: ROLES.COMMANDER, 
    baseId: 1 
  },
  'logistics@base1.mil': { 
    name: 'Logistics Officer', 
    role: ROLES.LOGISTICS, 
    baseId: 1 
  }
}

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
}
>>>>>>> c6cf95a602ff79e08105c42299894920e05a36ac
