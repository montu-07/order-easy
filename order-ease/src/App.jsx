import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, logout } from './redux/authSlice'
import Signup from './pages/Signup'
import Login from './pages/Login'

// Simple Home component
const Home = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">OrderEase</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to OrderEase, {user?.name}!
            </h2>
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Your Profile
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="text-gray-900">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Role:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {user?.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">User ID:</span>
                    <span className="text-gray-900">{user?.id}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Orders</h3>
                  <p className="mt-2 text-sm text-gray-500">Manage your orders</p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Products</h3>
                  <p className="mt-2 text-sm text-gray-500">Browse products</p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
                  <p className="mt-2 text-sm text-gray-500">Account settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Simple Admin component
const Admin = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">OrderEase Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin: {user?.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h2>
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-red-800 mb-2">Admin Panel</h3>
              <p className="text-red-600">You have admin access to manage the system.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)
  const [currentPage, setCurrentPage] = useState('landing')

  // Check for existing token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken && !token) {
      // You might want to validate the token here
      // For now, we'll just set it
      dispatch(setCredentials({ token: storedToken }))
    }
  }, [dispatch, token])

  // Redirect based on user role
  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        setCurrentPage('admin')
      } else {
        setCurrentPage('home')
      }
    }
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
    setCurrentPage('landing')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />
      case 'login':
        return <Login onNavigate={setCurrentPage} />
      case 'home':
        return <Home user={user} onLogout={handleLogout} />
      case 'admin':
        return <Admin user={user} onLogout={handleLogout} />
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">OrderEase</h1>
                <p className="text-lg text-gray-600 mb-8">
                  Your complete solution for easy order management
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  return renderPage()
}

export default App
