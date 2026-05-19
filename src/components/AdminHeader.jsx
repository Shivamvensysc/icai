// import React, { useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { FaArrowLeft, FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
// import { AuthContext } from '../App'
// import { ToastContext } from '../App'

// const AdminHeader = () => {
//   const navigate = useNavigate()
//   const { user, logout } = useContext(AuthContext)
//   const { showToast } = useContext(ToastContext)

//   const handleLogout = () => {
//     logout()
//     showToast('Logged out successfully', 'success')
//     navigate('/')
//   }

//   return (
//     <div className="bg-icai text-white shadow-lg">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="hover:opacity-80 transition flex items-center gap-2">
//             <FaArrowLeft className="text-lg" />
//             <span className="font-medium">Back to Portal</span>
//           </Link>
          
          
          
//           <div className="flex items-center gap-4">
//             {/* Bell Icon with Notification Badge */}
//             <button className="relative hover:bg-white/10 p-2 rounded-lg transition">
//               <FaBell className="text-xl" />
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 3
//               </span>
//             </button>
            
//             {/* User Profile */}
//             <div className="flex items-center gap-3">
//               <div className="text-right hidden sm:block">
//                 <p className="text-sm font-semibold">{user?.name || 'Admin User'}</p>
//                 <p className="text-xs opacity-80">Administrator</p>
//               </div>
//               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                 <FaUserCircle className="text-2xl" />
//               </div>
             
             
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminHeader

import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaBell, FaUserCircle, FaSignOutAlt, FaUser, FaCog, FaLock } from 'react-icons/fa'
import { AuthContext } from '../App'
import { ToastContext } from '../App'

const AdminHeader = () => {
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

  // Close dropdown when clicking outside
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
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition flex items-center gap-2 text-gray-700">
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">Back to Portal</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Bell Icon with Notification Badge */}
            <button className="relative hover:bg-gray-100 p-2 rounded-lg transition text-gray-600">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* User Profile with Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-icai/10 rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-2xl text-icai" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  {/* Profile Header */}
                  <div className="bg-icai/5 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-icai/20 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-3xl text-icai" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'admin@icai.org'}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Administrator
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700">
                      <FaUser className="text-gray-400" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700">
                      <FaCog className="text-gray-400" />
                      <span>Account Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700">
                      <FaLock className="text-gray-400" />
                      <span>Change Password</span>
                    </button>
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

export default AdminHeader