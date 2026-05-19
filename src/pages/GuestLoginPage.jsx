// import React, { useState, useContext, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { FaArrowLeft, FaEnvelope, FaPaperPlane, FaCheckCircle, FaUser, FaMobileAlt, FaTimes, FaShieldAlt, FaClock, FaRedoAlt } from 'react-icons/fa'
// import { ToastContext } from '../App'

// const GuestLoginPage = () => {
//   const navigate = useNavigate()
//   const { showToast } = useContext(ToastContext)
//   const [step, setStep] = useState('register')
//   const [showOtpModal, setShowOtpModal] = useState(false)
//   const [otp, setOtp] = useState(['', '', '', '', '', ''])
//   const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
//   const [canResend, setCanResend] = useState(false)
//   const inputRefs = useRef([])
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//   })

//   // Timer effect
//   useEffect(() => {
//     if (showOtpModal && timeLeft > 0) {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer)
//             setCanResend(true)
//             return 0
//           }
//           return prev - 1
//         })
//       }, 1000)
//       return () => clearInterval(timer)
//     }
//   }, [showOtpModal, timeLeft])

//   // Reset timer when modal opens
//   useEffect(() => {
//     if (showOtpModal) {
//       setTimeLeft(300)
//       setCanResend(false)
//       setOtp(['', '', '', '', '', ''])
//     }
//   }, [showOtpModal])

//   // Dummy data for demo
//   const dummyData = {
//     name: "Guest User",
//     email: "guest@example.com",
//     mobile: "9876543210"
//   }

//   const handleSendOTP = (e) => {
//     e.preventDefault()
    
//     let dataToUse = { ...formData }
    
//     if (!formData.name && !formData.email && !formData.mobile) {
//       dataToUse = dummyData
//       setFormData(dataToUse)
//     }
    
//     if (dataToUse.name && dataToUse.email && dataToUse.mobile) {
//       setShowOtpModal(true)
//       // Simulate sending OTP
//       console.log('OTP sent: 123456')
//     } else {
//       showToast('Please fill all fields', 'error')
//     }
//   }

//   const handleOtpChange = (index, value) => {
//     // Only allow numbers
//     if (value && !/^\d+$/.test(value)) return
    
//     const newOtp = [...otp]
//     newOtp[index] = value.slice(0, 1)
//     setOtp(newOtp)
    
//     // Auto-focus next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus()
//     }
//   }

//   const handleKeyDown = (index, e) => {
//     // Handle backspace to move to previous input
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus()
//     }
//   }

//   const handlePaste = (e) => {
//     e.preventDefault()
//     const pastedData = e.clipboardData.getData('text')
//     if (pastedData && /^\d+$/.test(pastedData)) {
//       const pastedOtp = pastedData.slice(0, 6).split('')
//       const newOtp = [...otp]
//       for (let i = 0; i < pastedOtp.length; i++) {
//         newOtp[i] = pastedOtp[i]
//       }
//       setOtp(newOtp)
//       // Focus on last filled input
//       const lastIndex = Math.min(pastedOtp.length, 5)
//       if (lastIndex <= 5) {
//         inputRefs.current[lastIndex]?.focus()
//       }
//     }
//   }

//   const handleVerifyOTP = () => {
//     const enteredOtp = otp.join('')
//     if (enteredOtp === '123456') {
//       setShowOtpModal(false)
//       showToast('Authentication Successful! Welcome Guest User', 'success')
      
//       const guestUser = {
//         name: formData.name,
//         email: formData.email,
//         mobile: formData.mobile,
//         role: 'guest',
//         loginTime: new Date().toISOString()
//       }
//       localStorage.setItem('guestUser', JSON.stringify(guestUser))
      
//       setTimeout(() => navigate('/'), 1500)
//     } else {
//       showToast('Invalid OTP. Please try again.', 'error')
//       setOtp(['', '', '', '', '', ''])
//       inputRefs.current[0].focus()
//     }
//   }

//   const handleResendOTP = () => {
//     if (canResend) {
//       setTimeLeft(300)
//       setCanResend(false)
//       setOtp(['', '', '', '', '', ''])
//       showToast('OTP resent successfully!', 'success')
//       inputRefs.current[0].focus()
//     }
//   }

//   const closeModal = () => {
//     setShowOtpModal(false)
//     setOtp(['', '', '', '', '', ''])
//     setTimeLeft(300)
//     setCanResend(false)
//   }

//   const fillDummyData = () => {
//     setFormData(dummyData)
//   }

//   // Format time as MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <Link to="/" className="inline-flex items-center text-icai hover:text-[#002a6e] transition mb-8">
//           <FaArrowLeft className="mr-2" /> Back to Home
//         </Link>

//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="bg-gradient-to-r from-icai to-[#002a6e] text-white p-6 text-center">
//               <FaEnvelope className="text-5xl mx-auto mb-3" />
//               <h1 className="text-2xl font-bold">Guest Access</h1>
//               <p className="text-sm opacity-90 mt-1">Register with email to access publications</p>
//             </div>

//             {step === 'register' ? (
//               <form onSubmit={handleSendOTP} className="p-6 space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaUser className="inline mr-1" /> Full Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaEnvelope className="inline mr-1" /> Email Address
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaMobileAlt className="inline mr-1" /> Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     placeholder="Enter mobile number"
//                     value={formData.mobile}
//                     onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
//                     required
//                   />
//                 </div>

//                 <button type="submit" className="w-full btn-primary py-3 text-lg">
//                   <FaPaperPlane className="inline mr-2" />Send OTP
//                 </button>

//                 <button
//                   type="button"
//                   onClick={fillDummyData}
//                   className="w-full text-icai text-sm hover:underline mt-2 flex items-center justify-center gap-2"
//                 >
//                   <FaShieldAlt /> Use Dummy Data for Demo
//                 </button>
//               </form>
//             ) : (
//               <div className="p-6 text-center">
//                 <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">
//                   <FaCheckCircle className="inline mr-1" />
//                   OTP sent to {formData.email}
//                 </div>
//                 <button
//                   onClick={() => setStep('register')}
//                   className="text-icai text-sm hover:underline"
//                 >
//                   ← Back to Registration
//                 </button>
//               </div>
//             )}

//             <div className="bg-gray-50 px-6 py-4 text-center">
//               <p className="text-sm text-gray-600">
//                 Already a member? <Link to="/login/member" className="text-icai font-semibold hover:underline">Login with SSP</Link>
//               </p>
//             </div>
//           </div>

//           <div className="mt-6 text-center text-xs text-gray-500">
//             <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
//           </div>
//         </div>
//       </div>

//       {/* OTP Modal Popup with 6 Boxes */}
//       {showOtpModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-up">
//           <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-icai to-[#002a6e] text-white p-5 rounded-t-2xl">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
//                     <FaShieldAlt className="text-2xl" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold">Verify OTP</h3>
//                     <p className="text-xs opacity-90">Enter the 6-digit code sent to your email</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="hover:bg-white/20 p-2 rounded-lg transition -mt-2 -mr-2"
//                 >
//                   <FaTimes className="text-xl" />
//                 </button>
//               </div>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
            
            

//               {/* Timer Display */}
//               <div className="text-center mb-6">
//                 <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
//                   timeLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
//                 }`}>
//                   <FaClock className={`${timeLeft < 60 ? 'animate-pulse' : ''}`} />
//                   <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
//                   <span className="text-xs">remaining</span>
//                 </div>
//               </div>

//               {/* 6 Box OTP Input */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
//                   Enter Verification Code
//                 </label>
//                 <div className="flex justify-center gap-3">
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => (inputRefs.current[index] = el)}
//                       type="text"
//                       value={digit}
//                       onChange={(e) => handleOtpChange(index, e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(index, e)}
//                       onPaste={index === 0 ? handlePaste : undefined}
//                       className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-2 focus:ring-icai/20 transition-all"
//                       maxLength="1"
//                       autoFocus={index === 0}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-center text-xs text-gray-400 mt-3">
//                   Enter 6-digit OTP • You can paste the code
//                 </p>
//               </div>

//               {/* Demo OTP Hint */}
//               <div className="bg-amber-50 rounded-lg p-3 mb-6 border border-amber-200">
//                 <p className="text-xs text-amber-700 text-center flex items-center justify-center gap-2">
//                   <FaShieldAlt className="text-amber-600" />
//                   <span>Demo Mode: Use OTP <strong className="text-base font-mono">123456</strong></span>
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleVerifyOTP}
//                   disabled={otp.some(digit => !digit)}
//                   className={`flex-1 px-4 py-3 rounded-xl text-white font-medium transition flex items-center justify-center gap-2 ${
//                     otp.every(digit => digit)
//                       ? 'bg-icai hover:bg-[#002a6e] transform hover:scale-105'
//                       : 'bg-gray-300 cursor-not-allowed'
//                   }`}
//                 >
//                   <FaCheckCircle /> Verify
//                 </button>
//               </div>
//             </div>

//             {/* Modal Footer with Resend */}
//             <div className="bg-gray-50 px-6 py-4 rounded-b-2xl text-center">
//               {canResend ? (
//                 <button
//                   onClick={handleResendOTP}
//                   className="text-icai font-semibold hover:underline flex items-center justify-center gap-2 w-full"
//                 >
//                   <FaRedoAlt /> Resend OTP
//                 </button>
//               ) : (
//                 <p className="text-xs text-gray-500">
//                   Didn't receive the code? Wait for the timer to expire
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default GuestLoginPage


import React, { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaArrowLeft, FaEnvelope, FaPaperPlane, FaCheckCircle, FaUser, FaMobileAlt, FaTimes, FaShieldAlt, FaClock, FaRedoAlt } from 'react-icons/fa'
import { ToastContext, AuthContext } from '../App'

const GuestLoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useContext(ToastContext)
  const { login } = useContext(AuthContext)
  const [step, setStep] = useState('register')
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(300)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = React.useRef([])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  })

  // Get the return URL from location state
  const from = location.state?.from?.pathname || '/'

  // Timer effect
  React.useEffect(() => {
    if (showOtpModal && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showOtpModal, timeLeft])

  React.useEffect(() => {
    if (showOtpModal) {
      setTimeLeft(300)
      setCanResend(false)
      setOtp(['', '', '', '', '', ''])
    }
  }, [showOtpModal])

  const dummyData = {
    name: "Guest User",
    email: "guest@example.com",
    mobile: "9876543210"
  }

  const handleSendOTP = (e) => {
    e.preventDefault()
    
    let dataToUse = { ...formData }
    
    if (!formData.name && !formData.email && !formData.mobile) {
      dataToUse = dummyData
      setFormData(dataToUse)
    }
    
    if (dataToUse.name && dataToUse.email && dataToUse.mobile) {
      setShowOtpModal(true)
    } else {
      showToast('Please fill all fields', 'error')
    }
  }

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    if (pastedData && /^\d+$/.test(pastedData)) {
      const pastedOtp = pastedData.slice(0, 6).split('')
      const newOtp = [...otp]
      for (let i = 0; i < pastedOtp.length; i++) {
        newOtp[i] = pastedOtp[i]
      }
      setOtp(newOtp)
      const lastIndex = Math.min(pastedOtp.length, 5)
      if (lastIndex <= 5) {
        inputRefs.current[lastIndex]?.focus()
      }
    }
  }

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join('')
    if (enteredOtp === '123456') {
      setShowOtpModal(false)
      
      // Create guest user object
      const guestUser = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: 'guest',
        membershipType: 'Guest User',
        loginTime: new Date().toISOString()
      }
      
      // Login the user
      login(guestUser)
      showToast(`Welcome ${formData.name}!`, 'success')
      
      // Redirect to the page they came from or home
      setTimeout(() => navigate(from, { replace: true }), 500)
    } else {
      showToast('Invalid OTP. Please try again.', 'error')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0].focus()
    }
  }

  const handleResendOTP = () => {
    if (canResend) {
      setTimeLeft(300)
      setCanResend(false)
      setOtp(['', '', '', '', '', ''])
      showToast('OTP resent successfully!', 'success')
      inputRefs.current[0].focus()
    }
  }

  const closeModal = () => {
    setShowOtpModal(false)
    setOtp(['', '', '', '', '', ''])
    setTimeLeft(300)
    setCanResend(false)
  }

  const fillDummyData = () => {
    setFormData(dummyData)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-icai hover:text-[#002a6e] transition mb-8">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-icai to-[#002a6e] text-white p-6 text-center">
              <FaEnvelope className="text-5xl mx-auto mb-3" />
              <h1 className="text-2xl font-bold">Guest Access</h1>
              <p className="text-sm opacity-90 mt-1">Register with email to access publications</p>
            </div>

            {step === 'register' ? (
              <form onSubmit={handleSendOTP} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-1" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-1" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMobileAlt className="inline mr-1" /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai transition"
                    required
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-3 text-lg">
                  <FaPaperPlane className="inline mr-2" />Send OTP
                </button>

                <button
                  type="button"
                  onClick={fillDummyData}
                  className="w-full text-icai text-sm hover:underline mt-2 flex items-center justify-center gap-2"
                >
                  <FaShieldAlt /> Use Dummy Data for Demo
                </button>
              </form>
            ) : (
              <div className="p-6 text-center">
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">
                  <FaCheckCircle className="inline mr-1" />
                  OTP sent to {formData.email}
                </div>
                <button
                  onClick={() => setStep('register')}
                  className="text-icai text-sm hover:underline"
                >
                  ← Back to Registration
                </button>
              </div>
            )}

            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-sm text-gray-600">
                Already a member? <Link to="/login/member" className="text-icai font-semibold hover:underline">Login with SSP</Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-up">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-icai to-[#002a6e] text-white p-5 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Verify OTP</h3>
                    <p className="text-xs opacity-90">Enter the 6-digit code sent to your email</p>
                  </div>
                </div>
                <button onClick={closeModal} className="hover:bg-white/20 p-2 rounded-lg transition">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Verifying for</p>
                    <p className="font-semibold text-gray-800">{formData.name}</p>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                  </div>
                  <div className="w-10 h-10 bg-icai/10 rounded-full flex items-center justify-center">
                    <FaUser className="text-icai" />
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  timeLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
                }`}>
                  <FaClock className={timeLeft < 60 ? 'animate-pulse' : ''} />
                  <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                  <span className="text-xs">remaining</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter Verification Code
                </label>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-2 focus:ring-icai/20 transition-all"
                      maxLength="1"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 mb-6 border border-amber-200">
                <p className="text-xs text-amber-700 text-center flex items-center justify-center gap-2">
                  <FaShieldAlt className="text-amber-600" />
                  <span>Demo Mode: Use OTP <strong className="text-base font-mono">123456</strong></span>
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={closeModal} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleVerifyOTP}
                  disabled={otp.some(digit => !digit)}
                  className={`flex-1 px-4 py-3 rounded-xl text-white font-medium transition flex items-center justify-center gap-2 ${
                    otp.every(digit => digit)
                      ? 'bg-icai hover:bg-[#002a6e] transform hover:scale-105'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <FaCheckCircle /> Verify
                </button>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl text-center">
              {canResend ? (
                <button onClick={handleResendOTP} className="text-icai font-semibold hover:underline flex items-center justify-center gap-2 w-full">
                  <FaRedoAlt /> Resend OTP
                </button>
              ) : (
                <p className="text-xs text-gray-500">Didn't receive the code? Wait for the timer to expire</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestLoginPage