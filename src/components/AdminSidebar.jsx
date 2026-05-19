import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  FaTachometerAlt, FaBook, FaUsers, FaChartBar, 
  FaCog, FaSignOutAlt, FaUserCircle 
} from 'react-icons/fa'
import { AuthContext } from '../App'
import { ToastContext } from '../App'

const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)

  const handleLogout = () => {
    logout()
    showToast('Logged out successfully', 'success')
    navigate('/')
  }

  const sections = [
    { id: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard', path: '/admin-dashboard' },
    { id: 'publications', icon: FaBook, label: 'Manage Publications', path: '/admin-dashboard/publications' },
    { id: 'users', icon: FaUsers, label: 'User Management', path: '/admin-dashboard/users' },
    { id: 'analytics', icon: FaChartBar, label: 'Analytics & Reports', path: '/admin-dashboard/analytics' },
    { id: 'settings', icon: FaCog, label: 'System Settings', path: '/admin-dashboard/settings' }
  ]

  const getActiveSection = () => {
    const currentPath = location.pathname
    if (currentPath === '/admin-dashboard') return 'dashboard'
    if (currentPath.includes('/admin-dashboard/publications')) return 'publications'
    if (currentPath.includes('/admin-dashboard/users')) return 'users'
    if (currentPath.includes('/admin-dashboard/analytics')) return 'analytics'
    if (currentPath.includes('/admin-dashboard/settings')) return 'settings'
    return 'dashboard'
  }

  const activeSection = getActiveSection()

  return (
    <div className="admin-sidebar w-72 min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #001f4d 0%, #001540 100%)' }}>
      {/* Logo Area */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <FaBook className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">ICAI Portal</h2>
            <p className="text-white/60 text-xs">Admin Control Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          
          return (
            <Link
              key={section.id}
              to={section.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon className={`text-lg ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
              <span className="font-medium">{section.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-8 bg-white rounded-full"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section at Bottom */}
      <div className="p-4 border-t border-white/20 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 py-2 rounded-lg transition duration-200"
          >
            <FaSignOutAlt className="text-sm" />
            <span className="text-sm font-medium">Logout</span>
          </button>
    
      </div>
    </div>
  )
}

export default AdminSidebar