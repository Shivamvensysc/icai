import React, { useState } from 'react'
import { 
  FaSearch, FaFilter, FaTimesCircle, FaChevronLeft, FaChevronRight,
  FaUserCheck, FaUserTimes, FaShieldAlt, FaCalendarAlt, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileExport,
  FaSort, FaSortUp, FaSortDown, FaEye, FaBan, FaCheckCircle,FaUsers 
} from 'react-icons/fa'

const UserManagement = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul.sharma@icai.org", phone: "+91 98765 43210", location: "Mumbai", type: "Member", lastLogin: "2024-05-18 14:30", status: "Active", membershipId: "MCA12345", joinDate: "2010-01-15" },
    { id: 2, name: "Priya Mehta", email: "priya.mehta@example.com", phone: "+91 98765 43211", location: "Delhi", type: "Non-Member", lastLogin: "2024-05-17 09:15", status: "Active", membershipId: "", joinDate: "2024-01-10" },
    { id: 3, name: "Amit Kumar", email: "amit.kumar@icai.org", phone: "+91 98765 43212", location: "Bangalore", type: "Member", lastLogin: "2024-05-16 18:45", status: "Blocked", membershipId: "MCA67890", joinDate: "2015-06-20" },
    { id: 4, name: "Neha Singh", email: "neha.singh@icai.org", phone: "+91 98765 43213", location: "Chennai", type: "Member", lastLogin: "2024-05-15 11:20", status: "Active", membershipId: "MCA54321", joinDate: "2018-03-12" },
    { id: 5, name: "Vikram Patel", email: "vikram.patel@example.com", phone: "+91 98765 43214", location: "Ahmedabad", type: "Non-Member", lastLogin: "2024-05-14 16:30", status: "Active", membershipId: "", joinDate: "2024-02-01" },
    { id: 6, name: "Sunita Reddy", email: "sunita.reddy@icai.org", phone: "+91 98765 43215", location: "Hyderabad", type: "Member", lastLogin: "2024-05-13 10:45", status: "Active", membershipId: "MCA11122", joinDate: "2012-08-25" },
    { id: 7, name: "Rajesh Gupta", email: "rajesh.gupta@example.com", phone: "+91 98765 43216", location: "Pune", type: "Non-Member", lastLogin: "2024-05-12 13:20", status: "Blocked", membershipId: "", joinDate: "2024-03-15" },
    { id: 8, name: "Pooja Desai", email: "pooja.desai@icai.org", phone: "+91 98765 43217", location: "Surat", type: "Member", lastLogin: "2024-05-11 09:00", status: "Active", membershipId: "MCA99887", joinDate: "2014-11-05" },
  ])

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  // Sorting states
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Get unique values for filters
  const userTypes = [...new Set(users.map(u => u.type))]
  const statuses = [...new Set(users.map(u => u.status))]
  const locations = [...new Set(users.map(u => u.location))]

  // Apply filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      (user.membershipId && user.membershipId.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = filterType === '' || user.type === filterType
    const matchesStatus = filterStatus === '' || user.status === filterStatus
    const matchesLocation = filterLocation === '' || user.location === filterLocation
    
    let matchesDate = true
    if (startDate && endDate) {
      const userDate = new Date(user.joinDate)
      const start = new Date(startDate)
      const end = new Date(endDate)
      matchesDate = userDate >= start && userDate <= end
    } else if (startDate) {
      matchesDate = user.joinDate >= startDate
    } else if (endDate) {
      matchesDate = user.joinDate <= endDate
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesLocation && matchesDate
  })

  // Apply sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]
    
    if (sortField === 'lastLogin' || sortField === 'joinDate') {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('')
    setFilterStatus('')
    setFilterLocation('')
    setStartDate('')
    setEndDate('')
    setCurrentPage(1)
  }

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' }
        : user
    ))
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400 text-xs" />
    return sortDirection === 'asc' ? <FaSortUp className="text-icai text-xs" /> : <FaSortDown className="text-icai text-xs" />
  }

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
          <FaCheckCircle size={10} /> Active
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
        <FaBan size={10} /> Blocked
      </span>
    )
  }

  const getTypeBadge = (type) => {
    if (type === 'Member') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
          <FaShieldAlt size={10} /> Member
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
        Guest
      </span>
    )
  }

  const getAvatarColor = (name) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500']
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500 text-sm mt-1">View and manage all registered users</p>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <FaFileExport className="text-sm" /> Export Users
        </button>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone or membership ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              showFilters ? 'bg-icai text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaFilter /> Filters
            {(filterType || filterStatus || filterLocation || startDate || endDate) && (
              <span className="ml-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {(searchTerm || filterType || filterStatus || filterLocation || startDate || endDate) && (
            <button
              onClick={clearFilters}
              className="text-red-500 hover:text-red-700 transition flex items-center gap-1 text-sm"
            >
              <FaTimesCircle /> Clear All
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                >
                  <option value="">All Types</option>
                  {userTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                >
                  <option value="">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="From"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="To"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results Count */}
      
      
      
      {/* Users Table - Beautiful Design */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 w-16">
                  #
                </th>
                <th 
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition min-w-[200px]"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    User {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition min-w-[180px]"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-1">
                    Contact {getSortIcon('email')}
                  </div>
                </th>
                <th 
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition w-28"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center gap-1">
                    Type {getSortIcon('type')}
                  </div>
                </th>
                <th 
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition w-28"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center gap-1">
                    Location {getSortIcon('location')}
                  </div>
                </th>
                <th 
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition w-32"
                  onClick={() => handleSort('lastLogin')}
                >
                  <div className="flex items-center gap-1">
                    Last Login {getSortIcon('lastLogin')}
                  </div>
                </th>
                <th 
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition w-24"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition group">
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${getAvatarColor(user.name)}`}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{user.name}</div>
                          {user.membershipId && (
                            <div className="text-xs text-gray-400 mt-0.5">ID: {user.membershipId}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaEnvelope className="text-gray-400 text-xs" />
                          <span className="truncate max-w-[150px]" title={user.email}>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FaPhone className="text-gray-400 text-xs" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getTypeBadge(user.type)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaMapMarkerAlt className="text-gray-400 text-xs" />
                        {user.location}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaCalendarAlt className="text-gray-400 text-xs" />
                        {user.lastLogin}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          user.status === 'Active'
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {user.status === 'Active' ? (
                          <>
                            <FaUserTimes size={12} /> Block
                          </>
                        ) : (
                          <>
                            <FaUserCheck size={12} /> Unblock
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-gray-500">
                    <FaUsers className="text-4xl mx-auto mb-2 text-gray-300" />
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition flex items-center gap-1"
            >
              <FaChevronLeft size={10} /> Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded-lg transition ${
                      currentPage === pageNum
                        ? 'bg-icai text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-2 py-1 text-sm">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1 text-sm rounded-lg hover:bg-gray-200 transition"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition flex items-center gap-1"
            >
              Next <FaChevronRight size={10} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserManagement