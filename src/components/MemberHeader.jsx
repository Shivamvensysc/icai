import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaBell, FaUserCircle, FaSignOutAlt, FaUser, FaCog, FaLock, FaBookmark, FaHistory } from 'react-icons/fa'
import { AuthContext } from '../App'
import { ToastContext } from '../App'

const MemberHeader = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const handleLogout = () => {
    logout()
    showToast('Logged out successfully', 'success')
    navigate('/')
    setIsProfileOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition flex items-center gap-2 text-gray-700">
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">Back to Portal</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Bell Icon */}
            <button className="relative hover:bg-gray-100 p-2 rounded-lg transition text-gray-600">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">{user?.name || 'Member User'}</p>
                  <p className="text-xs text-gray-500">{user?.membershipType || 'Member'}</p>
                </div>
                <div className="w-10 h-10 bg-icai/10 rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-2xl text-icai" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-icai/5 to-[#002a6e]/5 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-icai/20 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-3xl text-icai" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user?.name || 'Member User'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'member@icai.org'}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {user?.membershipType || 'Member'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/member-dashboard/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700"
                    >
                      <FaUser className="text-gray-400" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/member-dashboard/publications"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700"
                    >
                      <FaBookmark className="text-gray-400" />
                      <span>Saved Publications</span>
                    </Link>
                    <Link
                      to="/member-dashboard/history"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700"
                    >
                      <FaHistory className="text-gray-400" />
                      <span>Reading History</span>
                    </Link>
                    <Link
                      to="#"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700"
                    >
                      <FaCog className="text-gray-400" />
                      <span>Account Settings</span>
                    </Link>
                    <Link
                      to="#"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700"
                    >
                      <FaLock className="text-gray-400" />
                      <span>Change Password</span>
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-red-600"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberHeader