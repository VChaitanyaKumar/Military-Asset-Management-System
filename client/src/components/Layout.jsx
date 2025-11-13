import { Outlet, Link, useLocation } from 'react-router-dom'

function Layout({ user, onLogout }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-gray-900 border-b-2 border-gray-900' 
      : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-gray-900 text-lg font-semibold">🪖 Military Asset Management</span>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-1">
                {/* Dashboard - Everyone sees this */}
                <Link
                  to="/dashboard"
                  className={`${isActive('/dashboard')} px-4 py-2 text-sm font-medium transition-colors`}
                >
                  Dashboard
                </Link>

                {/* Purchases - Only Admin & Logistics */}
                {(user?.role === 'admin' || user?.role === 'logistics') && (
                  <Link
                    to="/purchases"
                    className={`${isActive('/purchases')} px-4 py-2 text-sm font-medium transition-colors`}
                  >
                    Purchases
                  </Link>
                )}

                {/* Transfers - Only Admin & Logistics */}
                {(user?.role === 'admin' || user?.role === 'logistics') && (
                  <Link
                    to="/transfers"
                    className={`${isActive('/transfers')} px-4 py-2 text-sm font-medium transition-colors`}
                  >
                    Transfers
                  </Link>
                )}

                {/* Assignments - Only Admin & Commander */}
                {(user?.role === 'admin' || user?.role === 'commander') && (
                  <Link
                    to="/assignments"
                    className={`${isActive('/assignments')} px-4 py-2 text-sm font-medium transition-colors`}
                  >
                    Assignments
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-sm font-medium">
                {user?.name} <span className="text-gray-500">({user?.role})</span>
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
