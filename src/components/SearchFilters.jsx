// import React, { useState } from 'react'
// import { FaSearch } from 'react-icons/fa'

// const SearchFilters = ({ onSearch, committees, topics }) => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [committeeFilter, setCommitteeFilter] = useState('')
//   const [topicFilter, setTopicFilter] = useState('')
//   const [activeFilter, setActiveFilter] = useState('all')

//   const handleSearch = () => {
//     onSearch({ searchTerm, committeeFilter, topicFilter, activeFilter })
//   }

//   const filters = [
//     { key: 'all', label: 'All Publications' },
//     { key: 'latest', label: 'Latest Releases' },
//     { key: 'featured', label: 'Featured' },
//     { key: 'popular', label: 'Most Popular' }
//   ]

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//       <div className="flex flex-col md:flex-row gap-4 mb-4">
//         <div className="flex-1 relative">
//           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//             placeholder="Search by title, committee, topic, or full-text content..."
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai"
//           />
//         </div>
//         <select
//           value={committeeFilter}
//           onChange={(e) => setCommitteeFilter(e.target.value)}
//           className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai"
//         >
//           <option value="">All Committees</option>
//           {committees.map(committee => (
//             <option key={committee} value={committee}>{committee}</option>
//           ))}
//         </select>
//         <select
//           value={topicFilter}
//           onChange={(e) => setTopicFilter(e.target.value)}
//           className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai"
//         >
//           <option value="">All Topics</option>
//           {topics.map(topic => (
//             <option key={topic} value={topic}>{topic}</option>
//           ))}
//         </select>
//         <button onClick={handleSearch} className="btn-primary px-8">
//           <FaSearch className="inline mr-2" />Search
//         </button>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {filters.map(filter => (
//           <span
//             key={filter.key}
//             onClick={() => {
//               setActiveFilter(filter.key)
//               onSearch({ searchTerm, committeeFilter, topicFilter, activeFilter: filter.key })
//             }}
//             className={`filter-chip ${activeFilter === filter.key ? 'active' : ''}`}
//           >
//             {filter.label}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default SearchFilters

import React, { useState } from 'react'
import { FaSearch, FaTimesCircle, FaFilter } from 'react-icons/fa'

const SearchFilters = ({ onSearch, committees, topics }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [committeeFilter, setCommitteeFilter] = useState('')
  const [topicFilter, setTopicFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const handleSearch = () => {
    onSearch({ searchTerm, committeeFilter, topicFilter, activeFilter })
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('')
    setCommitteeFilter('')
    setTopicFilter('')
    setActiveFilter('all')
    onSearch({ searchTerm: '', committeeFilter: '', topicFilter: '', activeFilter: 'all' })
  }

  // Check if any filter is active
  const isFilterActive = searchTerm !== '' || committeeFilter !== '' || topicFilter !== '' || activeFilter !== 'all'

  const filters = [
    { key: 'all', label: 'All Publications' },
    { key: 'latest', label: 'Latest Releases' },
    { key: 'featured', label: 'Featured' },
    { key: 'popular', label: 'Most Popular' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by title, committee, topic, or full-text content..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai"
          />
        </div>
        <select
          value={committeeFilter}
          onChange={(e) => setCommitteeFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai"
        >
          <option value="">All Committees</option>
          {committees.map(committee => (
            <option key={committee} value={committee}>{committee}</option>
          ))}
        </select>
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-icai"
        >
          <option value="">All Topics</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
        <button onClick={handleSearch} className="btn-primary px-8">
          <FaSearch className="inline mr-2" />Search
        </button>
        
        {/* Clear All Filters Button */}
        {isFilterActive && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition flex items-center gap-2"
          >
            <FaTimesCircle /> Clear All
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <span
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key)
                onSearch({ searchTerm, committeeFilter, topicFilter, activeFilter: filter.key })
              }}
              className={`filter-chip ${activeFilter === filter.key ? 'active' : ''}`}
            >
              {filter.label}
            </span>
          ))}
        </div>
        
        {/* Active Filters Display */}
        {isFilterActive && (
          <div className="text-sm text-gray-500">
            <span className="font-medium">Active Filters:</span>
            {searchTerm && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                Search: {searchTerm}
                <button
                  onClick={() => {
                    setSearchTerm('')
                    onSearch({ searchTerm: '', committeeFilter, topicFilter, activeFilter })
                  }}
                  className="hover:text-blue-900 ml-1"
                >
                  ✕
                </button>
              </span>
            )}
            {committeeFilter && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Committee: {committeeFilter}
                <button
                  onClick={() => {
                    setCommitteeFilter('')
                    onSearch({ searchTerm, committeeFilter: '', topicFilter, activeFilter })
                  }}
                  className="hover:text-green-900 ml-1"
                >
                  ✕
                </button>
              </span>
            )}
            {topicFilter && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                Topic: {topicFilter}
                <button
                  onClick={() => {
                    setTopicFilter('')
                    onSearch({ searchTerm, committeeFilter, topicFilter: '', activeFilter })
                  }}
                  className="hover:text-purple-900 ml-1"
                >
                  ✕
                </button>
              </span>
            )}
            {activeFilter !== 'all' && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                Filter: {filters.find(f => f.key === activeFilter)?.label}
                <button
                  onClick={() => {
                    setActiveFilter('all')
                    onSearch({ searchTerm, committeeFilter, topicFilter, activeFilter: 'all' })
                  }}
                  className="hover:text-orange-900 ml-1"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilters