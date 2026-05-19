import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaBook,
  FaSort, FaSortUp, FaSortDown, FaTimesCircle, 
  FaChevronLeft, FaChevronRight, FaFileExport
} from 'react-icons/fa'
import { publications as initialPublications } from '../data/publications'

const ManagePublications = () => {
  const navigate = useNavigate()
  const [publications, setPublications] = useState(initialPublications)
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCommittee, setFilterCommittee] = useState('')
  const [filterTopic, setFilterTopic] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  // Sorting states
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Get unique committees and topics for filters
  const committees = [...new Set(publications.map(p => p.committee))]
  const topics = [...new Set(publications.map(p => p.topic))]

  // Apply filters
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCommittee = filterCommittee === '' || pub.committee === filterCommittee
    const matchesTopic = filterTopic === '' || pub.topic === filterTopic
    
    let matchesDate = true
    if (startDate && endDate) {
      matchesDate = pub.date >= startDate && pub.date <= endDate
    } else if (startDate) {
      matchesDate = pub.date >= startDate
    } else if (endDate) {
      matchesDate = pub.date <= endDate
    }
    
    return matchesSearch && matchesCommittee && matchesTopic && matchesDate
  })

  // Apply sorting
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]
    
    if (sortField === 'downloads') {
      aVal = Number(aVal)
      bVal = Number(bVal)
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedPublications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPublications = sortedPublications.slice(startIndex, startIndex + itemsPerPage)

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
    setFilterCommittee('')
    setFilterTopic('')
    setStartDate('')
    setEndDate('')
    setCurrentPage(1)
  }

  const handleEdit = (publication) => {
    navigate('/admin-dashboard/publications/create', { state: { publication, isEdit: true } })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      setPublications(publications.filter(pub => pub.id !== id))
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400 text-xs" />
    return sortDirection === 'asc' ? <FaSortUp className="text-icai text-xs" /> : <FaSortDown className="text-icai text-xs" />
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Publications</h2>
          <p className="text-gray-500 text-sm mt-1">Add, edit, or remove publications from the portal</p>
        </div>
        <Link 
          to="/admin-dashboard/publications/create"
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus className="text-sm" /> Add New Publication
        </Link>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, committee, topic..."
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
            {(filterCommittee || filterTopic || startDate || endDate) && (
              <span className="ml-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {(searchTerm || filterCommittee || filterTopic || startDate || endDate) && (
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Committee</label>
                <select
                  value={filterCommittee}
                  onChange={(e) => setFilterCommittee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                >
                  <option value="">All Committees</option>
                  {committees.map(committee => (
                    <option key={committee} value={committee}>{committee}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                >
                  <option value="">All Topics</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
     
     
      
      {/* Publications Table - Only Vertical Scrollable */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-16">
                  S.No
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition min-w-[200px]"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-1">
                    Title {getSortIcon('title')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition min-w-[180px]"
                  onClick={() => handleSort('committee')}
                >
                  <div className="flex items-center gap-1">
                    Committee {getSortIcon('committee')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition min-w-[120px]"
                  onClick={() => handleSort('topic')}
                >
                  <div className="flex items-center gap-1">
                    Topic {getSortIcon('topic')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition w-28"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date {getSortIcon('date')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition w-24"
                  onClick={() => handleSort('downloads')}
                >
                  <div className="flex items-center gap-1">
                    Downloads {getSortIcon('downloads')}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPublications.length > 0 ? (
                paginatedPublications.map((pub, index) => (
                  <tr key={pub.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800 truncate max-w-[250px]" title={pub.title}>
                        {pub.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">ID: {pub.id}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div className="truncate max-w-[180px]" title={pub.committee}>
                        {pub.committee}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs whitespace-nowrap">
                        {pub.topic}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {pub.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {pub.downloads.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(pub)}
                          className="text-blue-600 hover:text-blue-800 transition p-1"
                          title="Edit Publication"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(pub.id)}
                          className="text-red-600 hover:text-red-800 transition p-1"
                          title="Delete Publication"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-gray-500">
                    <FaBook className="text-4xl mx-auto mb-2 text-gray-300" />
                    No publications found matching your criteria
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

export default ManagePublications