import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout')
}

export const dashboardAPI = {
  getData: (filters) => api.get('/dashboard', { params: filters })
}

export const purchasesAPI = {
  getAll: (filters) => api.get('/purchases', { params: filters }),
  create: (data) => api.post('/purchases', data),
  update: (id, data) => api.put(`/purchases/${id}`, data),
  delete: (id) => api.delete(`/purchases/${id}`)
}

export const transfersAPI = {
  getAll: (filters) => api.get('/transfers', { params: filters }),
  create: (data) => api.post('/transfers', data),
  update: (id, data) => api.put(`/transfers/${id}`, data),
  delete: (id) => api.delete(`/transfers/${id}`)
}

export const assignmentsAPI = {
  getAll: (filters) => api.get('/assignments', { params: filters }),
  create: (data) => api.post('/assignments', data),
  markExpended: (id) => api.patch(`/assignments/${id}/expend`),
  delete: (id) => api.delete(`/assignments/${id}`)
}

export const basesAPI = {
  getAll: () => api.get('/bases')
}

export const assetTypesAPI = {
  getAll: () => api.get('/asset-types')
}

export default api
