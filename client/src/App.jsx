import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Purchases from './pages/Purchases'
import Transfers from './pages/Transfers'
import Assignments from './pages/Assignments'
import Layout from './components/Layout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <SignIn onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        
        <Route path="/" element={isAuthenticated ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="purchases" element={<Purchases user={user} />} />
          <Route path="transfers" element={<Transfers user={user} />} />
          <Route path="assignments" element={<Assignments user={user} />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
