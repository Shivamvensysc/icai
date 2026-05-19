// import React from 'react'
// import { FaStar, FaCalendarAlt, FaDownload, FaBookOpen, FaShareAlt } from 'react-icons/fa'

// const PublicationsGrid = ({ publications, onRead, onShare }) => {
//   if (publications.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <FaBookOpen className="text-6xl text-gray-300 mb-4 mx-auto" />
//         <p className="text-gray-500">No publications found</p>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {publications.map(pub => (
//         <div key={pub.id} className="publication-card animate-fade-up">
//           <img src={pub.cover} alt={pub.title} className="w-full h-64 object-cover rounded-xl mb-4" />
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
//               {pub.committee.split(' ')[0]}
//             </span>
//             <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
//               {pub.topic}
//             </span>
//             {pub.isFeatured && (
//               <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
//                 <FaStar className="inline text-xs" /> Featured
//               </span>
//             )}
//           </div>
//           <h3 className="font-bold text-lg mb-2 line-clamp-2">{pub.title}</h3>
//           <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pub.description}</p>
//           <div className="flex justify-between items-center">
//             <span className="text-xs text-gray-500">
//               <FaCalendarAlt className="inline mr-1" />{pub.date}
//             </span>
//             <span className="text-xs text-gray-500">
//               <FaDownload className="inline mr-1" />{pub.downloads}
//             </span>
//           </div>
//           <div className="mt-4 flex gap-2">
//             <button onClick={() => onRead(pub)} className="flex-1 btn-primary text-sm py-2">
//               <FaBookOpen className="inline mr-1" /> Read Now
//             </button>
//             <button onClick={() => onShare(pub.title)} className="bg-gray-100 hover:bg-gray-200 px-3 rounded-xl transition">
//               <FaShareAlt className="text-gray-600" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default PublicationsGrid


import React, { useState } from 'react'
import { FaStar, FaCalendarAlt, FaDownload, FaBookOpen, FaShareAlt, FaSearch, FaFilter, FaTimesCircle } from 'react-icons/fa'

const PublicationsGrid = ({ publications, onRead, onShare }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCommittee, setFilterCommittee] = useState('')
  const [filterTopic, setFilterTopic] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique values for filters
  const committees = [...new Set(publications.map(p => p.committee))]
  const topics = [...new Set(publications.map(p => p.topic))]

  // Filter publications
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCommittee = filterCommittee === '' || pub.committee === filterCommittee
    const matchesTopic = filterTopic === '' || pub.topic === filterTopic
    
    return matchesSearch && matchesCommittee && matchesTopic
  })

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setFilterCommittee('')
    setFilterTopic('')
  }

  const handleShare = (title) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: 'Check out this ICAI publication',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${title} - ICAI Publication Portal`)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
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
            {(filterCommittee || filterTopic) && (
              <span className="ml-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          {(searchTerm || filterCommittee || filterTopic) && (
            <button
              onClick={clearFilters}
              className="text-red-500 hover:text-red-700 transition flex items-center gap-1 text-sm"
            >
              <FaTimesCircle /> Clear All Filters
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Committee</label>
                <select
                  value={filterCommittee}
                  onChange={(e) => setFilterCommittee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai"
                >
                  <option value="">All Topics</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>Showing {filteredPublications.length} of {publications.length} publications</div>
        {(searchTerm || filterCommittee || filterTopic) && (
          <button
            onClick={clearFilters}
            className="text-icai hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Publications Grid */}
      {filteredPublications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <FaBookOpen className="text-6xl text-gray-300 mb-4 mx-auto" />
          <p className="text-gray-500 text-lg">No publications found</p>
          <p className="text-sm text-gray-400 mt-2">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-icai hover:underline text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map(pub => (
            <div key={pub.id} className="publication-card animate-fade-up">
              <img src={pub.cover} alt={pub.title} className="w-full h-64 object-cover rounded-xl mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {pub.committee.split(' ')[0]}
                </span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {pub.topic}
                </span>
                {pub.isFeatured && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    <FaStar className="inline text-xs" /> Featured
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{pub.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pub.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  <FaCalendarAlt className="inline mr-1" />{pub.date}
                </span>
                <span className="text-xs text-gray-500">
                  <FaDownload className="inline mr-1" />{pub.downloads}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => onRead(pub)} className="flex-1 btn-primary text-sm py-2">
                  <FaBookOpen className="inline mr-1" /> Read Now
                </button>
                <button onClick={() => handleShare(pub.title)} className="bg-gray-100 hover:bg-gray-200 px-3 rounded-xl transition">
                  <FaShareAlt className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PublicationsGrid