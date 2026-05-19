// import React, { useState } from 'react'
// import { Routes, Route, useNavigate, Link } from 'react-router-dom'
// import { 
//   FaFilePdf, FaUsers, FaDownload, FaEye, FaChartLine, 
//   FaUserPlus, FaSearch, FaBook, FaBell, FaPlus, 
//   FaEdit, FaArchive, FaFileExport, FaCog, FaTrash
// } from 'react-icons/fa'
// import AdminHeader from '../components/AdminHeader'
// import AdminSidebar from '../components/AdminSidebar'
// import { publications as initialPublications } from '../data/publications'
// import CreatePublicationPage from '../pages/CreatePublicationPage'

// // Dashboard Home Component
// const AdminDashboardHome = () => {
//   const [publications] = useState(initialPublications)
  
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
//           <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
//         </div>
//         <div className="flex gap-2">
//           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             Live
//           </span>
//         </div>
//       </div>
      
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-icai">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total Publications</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">{publications.length}</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//               <FaFilePdf className="text-icai text-xl" />
//             </div>
//           </div>
//           <div className="mt-4 text-sm text-green-600">
//             ↑ 12% from last month
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-green-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Registered Users</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">15,234</p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//               <FaUsers className="text-green-600 text-xl" />
//             </div>
//           </div>
//           <div className="mt-4 text-sm text-green-600">
//             ↑ 8% from last month
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-purple-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total Downloads</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">8,942</p>
//             </div>
//             <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//               <FaDownload className="text-purple-600 text-xl" />
//             </div>
//           </div>
//           <div className="mt-4 text-sm text-green-600">
//             ↑ 23% from last month
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-orange-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Active Sessions</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">342</p>
//             </div>
//             <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//               <FaEye className="text-orange-600 text-xl" />
//             </div>
//           </div>
//           <div className="mt-4 text-sm text-green-600">
//             ↑ 5% from last month
//           </div>
//         </div>
//       </div>

//       {/* Charts and Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h3 className="font-bold mb-4 text-gray-800 flex items-center">
//             <FaChartLine className="mr-2 text-icai" /> Recent Activity
//           </h3>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//               <span><FaDownload className="text-green-500 inline mr-2" />Auditing Standards downloaded</span>
//               <span className="text-sm text-gray-500">2 mins ago</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//               <span><FaUserPlus className="text-blue-500 inline mr-2" />New member registered</span>
//               <span className="text-sm text-gray-500">15 mins ago</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//               <span><FaSearch className="text-purple-500 inline mr-2" />Search: "Taxation" performed</span>
//               <span className="text-sm text-gray-500">1 hour ago</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//               <span><FaBook className="text-orange-500 inline mr-2" />New publication added</span>
//               <span className="text-sm text-gray-500">2 hours ago</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h3 className="font-bold mb-4 text-gray-800 flex items-center">
//             <FaBell className="mr-2 text-icai" /> Quick Actions
//           </h3>
//           <div className="space-y-3">
//             <Link 
//               to="/admin-dashboard/publications/create"
//               className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition flex items-center justify-between group"
//             >
//               <span>
//                 <FaPlus className="text-blue-600 inline mr-2 group-hover:scale-110 transition" /> 
//                 Add New Publication
//               </span>
//               <span className="text-blue-600 group-hover:translate-x-1 transition">→</span>
//             </Link>
//             <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition flex items-center justify-between group">
//               <span><FaUsers className="text-green-600 inline mr-2 group-hover:scale-110 transition" /> Manage Users</span>
//               <span className="text-green-600 group-hover:translate-x-1 transition">→</span>
//             </button>
//             <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition flex items-center justify-between group">
//               <span><FaChartLine className="text-purple-600 inline mr-2 group-hover:scale-110 transition" /> Generate Reports</span>
//               <span className="text-purple-600 group-hover:translate-x-1 transition">→</span>
//             </button>
//             <button className="w-full text-left p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition flex items-center justify-between group">
//               <span><FaCog className="text-orange-600 inline mr-2 group-hover:scale-110 transition" /> System Settings</span>
//               <span className="text-orange-600 group-hover:translate-x-1 transition">→</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Manage Publications Component with Edit Functionality
// const ManagePublications = () => {
//   const navigate = useNavigate()
//   const [publications, setPublications] = useState(initialPublications)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   // Filter publications based on search
//   const filteredPublications = publications.filter(pub =>
//     pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     pub.committee.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   // Pagination
//   const totalPages = Math.ceil(filteredPublications.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginatedPublications = filteredPublications.slice(startIndex, startIndex + itemsPerPage)

//   // Handle Edit - Navigate to create page with state
//   const handleEdit = (publication) => {
//     navigate('/admin-dashboard/publications/create', { state: { publication, isEdit: true } })
//   }

//   // Handle Delete
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this publication?')) {
//       setPublications(publications.filter(pub => pub.id !== id))
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center flex-wrap gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Manage Publications</h2>
//           <p className="text-gray-500 text-sm mt-1">Add, edit, or remove publications from the portal</p>
//         </div>
//         <Link 
//           to="/admin-dashboard/publications/create"
//           className="btn-primary flex items-center gap-2"
//         >
//           <FaPlus className="text-sm" /> Add New Publication
//         </Link>
//       </div>
      
//       {/* Search Bar */}
//       <div className="flex justify-between items-center gap-4">
//         <div className="flex-1 max-w-md">
//           <input
//             type="text"
//             placeholder="Search publications by title or committee..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
//           />
//         </div>
//         <div className="text-sm text-gray-500">
//           Total: {filteredPublications.length} publications
//         </div>
//       </div>
      
//       {/* Publications Table - Fixed Format */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">S.No</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Committee</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Topic</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Downloads</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedPublications.length > 0 ? (
//                 paginatedPublications.map((pub, index) => (
//                   <tr key={pub.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 text-sm text-gray-600">{startIndex + index + 1}</td>
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-800">{pub.title}</div>
//                       <div className="text-xs text-gray-400 mt-1">ID: {pub.id}</div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{pub.committee}</td>
//                     <td className="px-6 py-4">
//                       <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                         {pub.topic}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{pub.date}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{pub.downloads.toLocaleString()}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleEdit(pub)}
//                           className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
//                           title="Edit Publication"
//                         >
//                           <FaEdit className="text-sm" />
//                           <span className="text-xs">Edit</span>
//                         </button>
//                         <button
//                           onClick={() => handleDelete(pub.id)}
//                           className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
//                           title="Delete Publication"
//                         >
//                           <FaTrash className="text-sm" />
//                           <span className="text-xs">Delete</span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <FaBook className="text-4xl mx-auto mb-2 text-gray-300" />
//                     No publications found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition"
//             >
//               Previous
//             </button>
//             <div className="flex gap-2">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-3 py-1 text-sm rounded-lg transition ${
//                     currentPage === page
//                       ? 'bg-icai text-white'
//                       : 'hover:bg-gray-200'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//             </div>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // User Management Component
// const UserManagement = () => {
//   const users = [
//     { id: 1, name: "Rahul Sharma", email: "rahul@example.com", type: "Member", lastLogin: "2024-05-18 14:30", status: "Active" },
//     { id: 2, name: "Priya Mehta", email: "priya@example.com", type: "Non-Member", lastLogin: "2024-05-17 09:15", status: "Active" },
//     { id: 3, name: "Amit Kumar", email: "amit@example.com", type: "Member", lastLogin: "2024-05-16 18:45", status: "Blocked" },
//     { id: 4, name: "Neha Singh", email: "neha@example.com", type: "Member", lastLogin: "2024-05-15 11:20", status: "Active" },
//   ]

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
//         <p className="text-gray-500 text-sm mt-1">View and manage all registered users</p>
//       </div>
      
//       <div className="flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search users by name or email..."
//           className="px-4 py-2 border rounded-xl w-full max-w-md focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
//         />
//         <button className="btn-outline flex items-center gap-2">
//           <FaFileExport className="text-sm" /> Export Users
//         </button>
//       </div>
      
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-600">Email</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-600">Type</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-600">Last Login</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user.id} className={`border-b hover:bg-gray-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
//                   <td className="p-4">{user.name}</td>
//                   <td className="p-4">{user.email}</td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       user.type === 'Member' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
//                     }`}>
//                       {user.type}
//                     </span>
//                   </td>
//                   <td className="p-4">{user.lastLogin}</td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <button className={`text-sm font-medium transition ${
//                       user.status === 'Active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
//                     }`}>
//                       {user.status === 'Active' ? 'Block' : 'Unblock'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Analytics Reports Component
// const AnalyticsReports = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>
//         <p className="text-gray-500 text-sm mt-1">Track performance and generate insights</p>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h3 className="font-bold mb-4 text-gray-800">Top Publications</h3>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-1 text-sm">
//                 <span className="font-medium">Auditing Standards</span>
//                 <span className="text-gray-600">1,245 downloads</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="rounded-full h-2 bg-icai transition-all duration-500" style={{ width: '100%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-1 text-sm">
//                 <span className="font-medium">Code of Ethics</span>
//                 <span className="text-gray-600">2,100 downloads</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="rounded-full h-2 bg-icai transition-all duration-500" style={{ width: '100%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-1 text-sm">
//                 <span className="font-medium">Direct Tax Laws</span>
//                 <span className="text-gray-600">892 downloads</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="rounded-full h-2 bg-icai transition-all duration-500" style={{ width: '70%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-1 text-sm">
//                 <span className="font-medium">Financial Reporting</span>
//                 <span className="text-gray-600">567 downloads</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="rounded-full h-2 bg-icai transition-all duration-500" style={{ width: '45%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h3 className="font-bold mb-4 text-gray-800">User Registration Trend</h3>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span>This Week</span>
//               <span className="font-bold text-green-600">+342 new users</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span>Last Week</span>
//               <span className="font-bold text-gray-700">298 new users</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span>This Month</span>
//               <span className="font-bold text-green-600">+1,234 new users</span>
//             </div>
//             <div className="mt-4 p-3 bg-green-50 rounded-lg">
//               <FaChartLine className="inline text-green-600 mr-1" />
//               <span className="text-green-600 font-semibold">+15% growth vs last month</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <h3 className="font-bold mb-4 text-gray-800">Generate Report</h3>
//         <div className="flex gap-4 flex-wrap">
//           <select className="px-4 py-2 border rounded-lg focus:outline-none focus:border-icai">
//             <option>Last 7 days</option>
//             <option>Last 30 days</option>
//             <option>Last 90 days</option>
//             <option>Last 12 months</option>
//           </select>
//           <select className="px-4 py-2 border rounded-lg focus:outline-none focus:border-icai">
//             <option>PDF Format</option>
//             <option>CSV Format</option>
//             <option>Excel Format</option>
//           </select>
//           <button className="btn-primary">Generate & Export</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // System Settings Component
// const SystemSettings = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
//         <p className="text-gray-500 text-sm mt-1">Configure system parameters and security settings</p>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h3 className="font-bold mb-4 text-gray-800">OTP Configuration</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">OTP Expiry (seconds)</label>
//               <input type="number" defaultValue="300" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Max Retry Attempts</label>
//               <input type="number" defaultValue="3" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h3 className="font-bold mb-4 text-gray-800">Session Configuration</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
//               <input type="number" defaultValue="30" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Sessions</label>
//               <input type="number" defaultValue="5" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
//           <h3 className="font-bold mb-4 text-gray-800">Security Settings</h3>
//           <div className="space-y-3">
//             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
//               <span className="text-gray-700">Enforce HTTPS for all connections</span>
//               <input type="checkbox" defaultChecked className="w-4 h-4 text-icai rounded" />
//             </label>
//             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
//               <span className="text-gray-700">Enable Rate Limiting</span>
//               <input type="checkbox" defaultChecked className="w-4 h-4 text-icai rounded" />
//             </label>
//             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
//               <span className="text-gray-700">DRM Protection for PDFs</span>
//               <input type="checkbox" defaultChecked className="w-4 h-4 text-icai rounded" />
//             </label>
//             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
//               <span className="text-gray-700">Two-Factor Authentication for Admin</span>
//               <input type="checkbox" className="w-4 h-4 text-icai rounded" />
//             </label>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex justify-end">
//         <button className="btn-primary px-8">Save All Settings</button>
//       </div>
//     </div>
//   )
// }

// // Main Admin Dashboard Component
// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <AdminSidebar />
//       <div className="flex-1 flex flex-col">
//         <AdminHeader />
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Routes>
//             <Route path="/" element={<AdminDashboardHome />} />
//             <Route path="/publications" element={<ManagePublications />} />
//             <Route path="/publications/create" element={<CreatePublicationPage />} />
//             <Route path="/users" element={<UserManagement />} />
//             <Route path="/analytics" element={<AnalyticsReports />} />
//             <Route path="/settings" element={<SystemSettings />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard


import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { 
  FaFilePdf, FaUsers, FaDownload, FaEye, FaChartLine, 
  FaUserPlus, FaSearch, FaBook, FaBell, FaPlus, 
  FaCog, FaFileExport
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import ManagePublications from '../components/ManagePublications'
import UserManagement from '../components/UserManagement'
import CreatePublicationPage from '../pages/CreatePublicationPage'

// Dashboard Home Component
const AdminDashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live
          </span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-icai">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Publications</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">6</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaFilePdf className="text-icai text-xl" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">↑ 12% from last month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Registered Users</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">15,234</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">↑ 8% from last month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Downloads</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">8,942</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaDownload className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">↑ 23% from last month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Sessions</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">342</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaEye className="text-orange-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">↑ 5% from last month</div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-4 text-gray-800 flex items-center">
            <FaChartLine className="mr-2 text-icai" /> Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <span><FaDownload className="text-green-500 inline mr-2" />Auditing Standards downloaded</span>
              <span className="text-sm text-gray-500">2 mins ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <span><FaUserPlus className="text-blue-500 inline mr-2" />New member registered</span>
              <span className="text-sm text-gray-500">15 mins ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <span><FaSearch className="text-purple-500 inline mr-2" />Search: "Taxation" performed</span>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <span><FaBook className="text-orange-500 inline mr-2" />New publication added</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-4 text-gray-800 flex items-center">
            <FaBell className="mr-2 text-icai" /> Quick Actions
          </h3>
          <div className="space-y-3">
            <Link 
              to="/admin-dashboard/publications/create"
              className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition flex items-center justify-between group"
            >
              <span><FaPlus className="text-blue-600 inline mr-2 group-hover:scale-110 transition" /> Add New Publication</span>
              <span className="text-blue-600 group-hover:translate-x-1 transition">→</span>
            </Link>
            <Link 
              to="/admin-dashboard/users"
              className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition flex items-center justify-between group"
            >
              <span><FaUsers className="text-green-600 inline mr-2 group-hover:scale-110 transition" /> Manage Users</span>
              <span className="text-green-600 group-hover:translate-x-1 transition">→</span>
            </Link>
            <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition flex items-center justify-between group">
              <span><FaChartLine className="text-purple-600 inline mr-2 group-hover:scale-110 transition" /> Generate Reports</span>
              <span className="text-purple-600 group-hover:translate-x-1 transition">→</span>
            </button>
            <button className="w-full text-left p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition flex items-center justify-between group">
              <span><FaCog className="text-orange-600 inline mr-2 group-hover:scale-110 transition" /> System Settings</span>
              <span className="text-orange-600 group-hover:translate-x-1 transition">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Analytics Reports Component
const AnalyticsReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>
        <p className="text-gray-500 text-sm mt-1">Track performance and generate insights</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-4 text-gray-800">Top Publications</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Auditing Standards</span>
                <span>1,245 downloads</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="rounded-full h-2 bg-icai" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Code of Ethics</span>
                <span>2,100 downloads</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="rounded-full h-2 bg-icai" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Direct Tax Laws</span>
                <span>892 downloads</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="rounded-full h-2 bg-icai" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-4 text-gray-800">User Registration Trend</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>This Week</span>
              <span className="font-bold text-green-600">+342 new users</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Last Week</span>
              <span className="font-bold">298 new users</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>This Month</span>
              <span className="font-bold text-green-600">+1,234 new users</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold mb-4 text-gray-800">Generate Report</h3>
        <div className="flex gap-4 flex-wrap">
          <select className="px-4 py-2 border rounded-lg">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="btn-primary">Generate & Export</button>
        </div>
      </div>
    </div>
  )
}

// System Settings Component
const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Configure system parameters and security settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-4 text-gray-800">OTP Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OTP Expiry (seconds)</label>
              <input type="number" defaultValue="300" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-icai" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Retry Attempts</label>
              <input type="number" defaultValue="3" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-icai" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-4 text-gray-800">Session Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input type="number" defaultValue="30" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-icai" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="font-bold mb-4 text-gray-800">Security Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span>Enforce HTTPS for all connections</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-icai rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span>Enable Rate Limiting</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-icai rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span>DRM Protection for PDFs</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-icai rounded" />
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="btn-primary px-8">Save All Settings</button>
      </div>
    </div>
  )
}

// Main Admin Dashboard Component
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<AdminDashboardHome />} />
            <Route path="/publications" element={<ManagePublications />} />
            <Route path="/publications/create" element={<CreatePublicationPage />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/analytics" element={<AnalyticsReports />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard