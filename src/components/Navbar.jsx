// import React, { useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { FaBookOpen, FaUserCheck, FaEnvelope, FaCrown } from 'react-icons/fa'
// import { ToastContext } from '../App'

// const Navbar = () => {
//   const navigate = useNavigate()
//   const { showToast } = useContext(ToastContext)

//   return (
//     <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-[1000]">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link to="/" className="flex items-center gap-2">
//           <FaBookOpen className="text-3xl text-icai" />
//           <div>
//             <h1 className="text-2xl font-bold text-icai">ICAI Publication Portal</h1>
//             <p className="text-xs text-gray-500">Institute of Chartered Accountants of India</p>
//           </div>
//         </Link>
//         <div className="flex items-center gap-3">
//           <Link to="/login/member" className="btn-primary">
//             <FaUserCheck className="inline mr-2" />Member Login
//           </Link>
//           <Link to="/login/guest" className="btn-outline">
//             <FaEnvelope className="inline mr-2" />Guest Access
//           </Link>
//           <Link to="/admin" className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition">
//             <FaCrown className="inline mr-2" />Admin
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBookOpen, FaUserCheck, FaEnvelope, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'
import { ToastContext, AuthContext } from '../App'

const Navbar = () => {
  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)
  const { user, logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-[1000]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <FaBookOpen className="text-3xl text-icai" />
          <div>
            <h1 className="text-2xl font-bold text-icai">ICAI Publication Portal</h1>
            <p className="text-xs text-gray-500">Institute of Chartered Accountants of India</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          {user ? (
            // Logged in user - show dashboard and logout
            <>
              {user.role === 'admin' && (
                <Link to="/admin-dashboard" className="btn-primary">
                  <FaTachometerAlt className="inline mr-2" />Admin Dashboard
                </Link>
              )}
              {user.role === 'member' && (
                <Link to="/member-dashboard" className="btn-primary">
                  <FaTachometerAlt className="inline mr-2" />My Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                <FaUser className="text-icai" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn-outline">
                <FaSignOutAlt className="inline mr-2" />Logout
              </button>
            </>
          ) : (
            // Not logged in - show login buttons
            <>
              <Link to="/login/member" className="btn-primary">
                <FaUserCheck className="inline mr-2" />Member Login
              </Link>
              <Link to="/login/guest" className="btn-outline">
                <FaEnvelope className="inline mr-2" />Guest Access
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar