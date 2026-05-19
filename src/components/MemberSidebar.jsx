import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  FaTachometerAlt, FaBook, FaUserCircle, FaSignOutAlt,
  FaHistory, FaBookmark, FaHeart, FaEnvelope, FaPhone
} from 'react-icons/fa'
import { AuthContext } from '../App'
import { ToastContext } from '../App'

const MemberSidebar = () => {
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
    { id: 'home', icon: FaTachometerAlt, label: 'Dashboard', path: '/member-dashboard' },
    { id: 'publications', icon: FaBook, label: ' Publications', path: '/member-dashboard/publications' },
    { id: 'saved', icon: FaBookmark, label: 'Saved Items', path: '/member-dashboard/saved' },
    { id: 'history', icon: FaHistory, label: 'Reading History', path: '/member-dashboard/history' },
    { id: 'profile', icon: FaUserCircle, label: 'Profile', path: '/member-dashboard/profile' }
  ]

  const getActiveSection = () => {
    const currentPath = location.pathname
    if (currentPath === '/member-dashboard') return 'home'
    if (currentPath.includes('/member-dashboard/publications')) return 'publications'
    if (currentPath.includes('/member-dashboard/saved')) return 'saved'
    if (currentPath.includes('/member-dashboard/history')) return 'history'
    if (currentPath.includes('/member-dashboard/profile')) return 'profile'
    return 'home'
  }

  const activeSection = getActiveSection()

  return (
    <div 
      className="member-sidebar w-72 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto"
      style={{ 
        background: 'linear-gradient(180deg, #001f4d 0%, #001540 100%)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#ffffff30 transparent'
      }}
    >
      {/* Logo Area */}
      <div className="p-6 border-b border-white/20 sticky top-0 bg-inherit">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <FaBook className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">ICAI Portal</h2>
            <p className="text-white/60 text-xs">Member Dashboard</p>
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
      <div className="p-4 border-t border-white/20 bg-inherit">
        
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 py-2.5 rounded-lg transition duration-200 font-medium"
        >
          <FaSignOutAlt className="text-sm" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .member-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .member-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .member-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

export default MemberSidebar