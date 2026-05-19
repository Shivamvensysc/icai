import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { 
  FaUserCircle, FaBook, FaDownload, FaClock, FaHistory, 
  FaHeart, FaBookmark, FaArrowLeft
} from 'react-icons/fa'
import MemberHeader from '../components/MemberHeader'
import MemberSidebar from '../components/MemberSidebar'
import MemberPublicationsGrid from '../components/MemberPublicationsGrid'
import { publications } from '../data/publications'
import { AuthContext } from '../App'

// Member Profile Component
const MemberProfile = () => {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-icai">My Profile</h2>
      
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
          <div className="w-20 h-20 bg-icai/10 rounded-full flex items-center justify-center">
            <FaUserCircle className="text-4xl text-icai" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{user?.name || 'Member User'}</h3>
            <p className="text-gray-500">Member ID: {user?.memberId || 'MEM12345'}</p>
            <p className="text-sm text-icai font-semibold mt-1">{user?.membershipType || 'FCA'} Member</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">{user?.email || 'member@icai.org'}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">{user?.joinDate || '2010-01-15'}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Membership Status</p>
            <p className="font-medium text-green-600">Active ✓</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Publications Read</p>
            <p className="font-medium">24 Publications</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Member Dashboard Home Component
const MemberDashboardHome = () => {
  const { user } = useContext(AuthContext)
  const recentPublications = publications.slice(0, 3)
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-icai">Welcome back, {user?.name || 'Member'}!</h2>
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            <FaUserCircle className="inline mr-1" /> {user?.membershipType || 'Member'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow">
          <FaBook className="text-3xl mb-2" />
          <p className="text-2xl font-bold">{publications.length}</p>
          <p className="text-sm opacity-90">Total Publications</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow">
          <FaDownload className="text-3xl mb-2" />
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm opacity-90">Publications Read</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow">
          <FaClock className="text-3xl mb-2" />
          <p className="text-2xl font-bold">Last Week</p>
          <p className="text-sm opacity-90">5 New Reads</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-bold text-lg mb-4 text-icai flex items-center">
          <FaHistory className="mr-2" /> Recently Viewed Publications
        </h3>
        <div className="space-y-3">
          {recentPublications.map(pub => (
            <div key={pub.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{pub.title}</p>
                <p className="text-xs text-gray-500">Viewed on {pub.date}</p>
              </div>
              <Link to={`/read/${pub.id}`} className="text-icai hover:underline text-sm">
                Read Again →
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-icai to-[#002a6e] text-white rounded-xl p-6 shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <FaHeart className="text-3xl mb-2" />
            <h3 className="text-xl font-bold">Recommendations</h3>
            <p className="text-sm opacity-90 mt-1">Based on your reading history</p>
          </div>
          <Link to="/member-dashboard/publications" className="bg-white text-icai px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Explore Recommendations →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Member Publications Component
const MemberPublications = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-icai">My Publications</h2>
      <MemberPublicationsGrid publications={publications} />
    </div>
  )
}

// Saved Items Component
const SavedItems = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-icai">Saved Items</h2>
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <FaBookmark className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No saved items yet</p>
        <p className="text-sm text-gray-400 mt-2">Save publications to read them later</p>
      </div>
    </div>
  )
}

// Reading History Component
const ReadingHistory = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-icai">Reading History</h2>
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No reading history yet</p>
        <p className="text-sm text-gray-400 mt-2">Start reading publications to see your history</p>
      </div>
    </div>
  )
}

// Main Member Dashboard Component
const MemberDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MemberSidebar />
      <div className="ml-72 flex flex-col min-h-screen">
        <MemberHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<MemberDashboardHome />} />
            <Route path="/publications" element={<MemberPublications />} />
            <Route path="/saved" element={<SavedItems />} />
            <Route path="/history" element={<ReadingHistory />} />
            <Route path="/profile" element={<MemberProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default MemberDashboard