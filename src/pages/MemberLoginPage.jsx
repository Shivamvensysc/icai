// import React, { useState, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { FaArrowLeft, FaIdCard, FaSignInAlt, FaCheckCircle, FaShieldAlt } from 'react-icons/fa'
// import { ToastContext } from '../App'

// const MemberLoginPage = () => {
//   const navigate = useNavigate()
//   const { showToast } = useContext(ToastContext)
//   const [formData, setFormData] = useState({
//     memberId: '',
//     password: ''
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (formData.memberId && formData.password) {
//       showToast(`SSO Authentication Successful! Welcome back, Member ${formData.memberId}`, 'success')
//       setTimeout(() => navigate('/'), 1500)
//     } else {
//       showToast('Please enter valid Member ID and Password', 'error')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <Link to="/" className="inline-flex items-center text-icai hover:text-[#002a6e] transition mb-8">
//           <FaArrowLeft className="mr-2" /> Back to Home
//         </Link>

//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="bg-icai text-white p-6 text-center">
//               <FaIdCard className="text-5xl mx-auto mb-3" />
//               <h1 className="text-2xl font-bold">ICAI Member Login</h1>
//               <p className="text-sm opacity-90 mt-1">Access all publications with your SSP credentials</p>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">ICAI Member ID</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your ICAI Member ID"
//                   value={formData.memberId}
//                   onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SSP Portal Password</label>
//                 <input
//                   type="password"
//                   placeholder="Enter your SSP password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
//                   required
//                 />
//               </div>

//               <button type="submit" className="w-full btn-primary py-3 text-lg">
//                 <FaSignInAlt className="inline mr-2" />Login with SSO
//               </button>

//               <div className="text-center text-sm text-gray-500 pt-4 border-t">
//                 <FaShieldAlt className="inline mr-1 text-green-600" />
//                 Secured by ICAI SSP Portal | 256-bit SSL Encryption
//               </div>
//             </form>

//             <div className="bg-gray-50 px-6 py-4 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have SSP access? <Link to="/login/guest" className="text-icai font-semibold hover:underline">Continue as Guest</Link>
//               </p>
//             </div>
//           </div>

//           <div className="mt-6 text-center text-xs text-gray-500">
//             <p>© 2024 ICAI Publication Portal. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MemberLoginPage

import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaIdCard, FaSignInAlt, FaCheckCircle, FaShieldAlt, FaUserShield, FaUser } from 'react-icons/fa'
import { ToastContext, AuthContext } from '../App'

const MemberLoginPage = () => {
  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    memberId: '',
    password: ''
  })

  // Dummy credentials
  const dummyCredentials = {
    admin: {
      memberId: 'ADMIN001',
      password: 'admin123',
      name: 'Administrator',
      role: 'admin',
      email: 'admin@icai.org'
    },
    member: {
      memberId: 'MEMBER001',
      password: 'member123',
      name: 'Rahul Sharma',
      role: 'member',
      email: 'rahul.sharma@icai.org',
      membershipType: 'FCA',
      joinDate: '2010-01-15'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check admin credentials
    if (formData.memberId === dummyCredentials.admin.memberId && 
        formData.password === dummyCredentials.admin.password) {
      login(dummyCredentials.admin)
      showToast(`Welcome Admin! Redirecting to Admin Dashboard...`, 'success')
      setTimeout(() => navigate('/admin-dashboard'), 1500)
    } 
    // Check member credentials
    else if (formData.memberId === dummyCredentials.member.memberId && 
             formData.password === dummyCredentials.member.password) {
      login(dummyCredentials.member)
      showToast(`Welcome back, ${dummyCredentials.member.name}!`, 'success')
      setTimeout(() => navigate('/member-dashboard'), 1500)
    }
    else {
      showToast('Invalid Member ID or Password. Please check the dummy credentials below.', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-icai hover:text-[#002a6e] transition mb-8">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-icai text-white p-6 text-center">
              <FaIdCard className="text-5xl mx-auto mb-3" />
              <h1 className="text-2xl font-bold">ICAI Member Login</h1>
              <p className="text-sm opacity-90 mt-1">Access all publications with your SSP credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ICAI Member ID</label>
                <input
                  type="text"
                  placeholder="Enter your ICAI Member ID"
                  value={formData.memberId}
                  onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SSP Portal Password</label>
                <input
                  type="password"
                  placeholder="Enter your SSP password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
                  required
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3 text-lg">
                <FaSignInAlt className="inline mr-2" />Login with SSO
              </button>

              <div className="text-center text-sm text-gray-500 pt-4 border-t">
                <FaShieldAlt className="inline mr-1 text-green-600" />
                Secured by ICAI SSP Portal | 256-bit SSL Encryption
              </div>
            </form>

            {/* Dummy Credentials Info */}
            <div className="bg-blue-50 px-6 py-4 border-t border-blue-100">
              <p className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <FaUserShield className="text-blue-600" />
                  <span className="font-medium text-blue-700">Admin:</span>
                  <span className="text-gray-600">ID: ADMIN001 | Password: admin123</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-green-600" />
                  <span className="font-medium text-green-700">Member:</span>
                  <span className="text-gray-600">ID: MEMBER001 | Password: member123</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have SSP access? <Link to="/login/guest" className="text-icai font-semibold hover:underline">Continue as Guest</Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>© 2024 ICAI Publication Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberLoginPage