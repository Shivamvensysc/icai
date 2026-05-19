// import React, { useState, createContext } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import MemberLoginPage from './pages/MemberLoginPage'
// import GuestLoginPage from './pages/GuestLoginPage'
// import ReaderPage from './pages/ReaderPage'
// import AdminPage from './pages/AdminPage'
// import Toast from './components/Toast'

// export const ToastContext = createContext()

// function App() {
//   const [toast, setToast] = useState(null)

//   const showToast = (message, type) => {
//     setToast({ message, type })
//     setTimeout(() => setToast(null), 3000)
//   }

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login/member" element={<MemberLoginPage />} />
//         <Route path="/login/guest" element={<GuestLoginPage />} />
//         <Route path="/read/:id" element={<ReaderPage />} />
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/admin/*" element={<AdminPage />} />
//       </Routes>
//       {toast && <Toast message={toast.message} type={toast.type} />}
//     </ToastContext.Provider>
//   )
// }

// export default App

import React, { useState, createContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MemberLoginPage from './pages/MemberLoginPage'
import GuestLoginPage from './pages/GuestLoginPage'
import ReaderPage from './pages/ReaderPage'
import AdminDashboard from './pages/AdminPage'
import MemberDashboard from './pages/MemberDashboard'
import Toast from './components/Toast'
import PublicationDetailPage from './components/PublicationDetailPage'

export const ToastContext = createContext()
export const AuthContext = createContext()

function App() {
  const [toast, setToast] = useState(null)
  const [user, setUser] = useState(null)

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const closeToast = () => {
    setToast(null)
  }

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    showToast('Logged out successfully', 'success')
  }

  // Check for stored user on app load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <ToastContext.Provider value={{ showToast }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/member" element={<MemberLoginPage />} />
          <Route path="/login/guest" element={<GuestLoginPage />} />
           <Route path="/publication/:id" element={<PublicationDetailPage />} />
          <Route path="/read/:id" element={<ReaderPage />} />
          <Route path="/admin-dashboard/*" element={
            user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
          } />
          <Route path="/member-dashboard/*" element={
            user?.role === 'member' ? <MemberDashboard /> : <Navigate to="/" />
          } />
        </Routes>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={closeToast}
          />
        )}
      </ToastContext.Provider>
    </AuthContext.Provider>
  )
}

export default App