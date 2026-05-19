// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { FaStar, FaCalendarAlt, FaDownload, FaBookOpen, FaShareAlt, FaSearch, FaFilter } from 'react-icons/fa'

// const MemberPublicationsGrid = ({ publications }) => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterCommittee, setFilterCommittee] = useState('')
//   const [filterTopic, setFilterTopic] = useState('')

//   // Get unique values for filters
//   const committees = [...new Set(publications.map(p => p.committee))]
//   const topics = [...new Set(publications.map(p => p.topic))]

//   // Filter publications
//   const filteredPublications = publications.filter(pub => {
//     const matchesSearch = searchTerm === '' || 
//       pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pub.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pub.topic.toLowerCase().includes(searchTerm.toLowerCase())
    
//     const matchesCommittee = filterCommittee === '' || pub.committee === filterCommittee
//     const matchesTopic = filterTopic === '' || pub.topic === filterTopic
    
//     return matchesSearch && matchesCommittee && matchesTopic
//   })

//   const handleShare = (title) => {
//     if (navigator.share) {
//       navigator.share({
//         title: title,
//         text: 'Check out this ICAI publication',
//         url: window.location.href
//       })
//     } else {
//       navigator.clipboard.writeText(`${title} - ICAI Publication Portal`)
//       alert('Link copied to clipboard!')
//     }
//   }

//   if (filteredPublications.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <FaBookOpen className="text-6xl text-gray-300 mb-4 mx-auto" />
//         <p className="text-gray-500">No publications found</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-xl shadow-sm p-4">
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search publications..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
//               />
//             </div>
//           </div>
//           <select
//             value={filterCommittee}
//             onChange={(e) => setFilterCommittee(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai"
//           >
//             <option value="">All Committees</option>
//             {committees.map(committee => (
//               <option key={committee} value={committee}>{committee}</option>
//             ))}
//           </select>
//           <select
//             value={filterTopic}
//             onChange={(e) => setFilterTopic(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai"
//           >
//             <option value="">All Topics</option>
//             {topics.map(topic => (
//               <option key={topic} value={topic}>{topic}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Publications Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPublications.map(pub => (
//           <div key={pub.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-up group">
//             {/* Cover Image */}
//             <div className="relative overflow-hidden h-56">
//               <img 
//                 src={pub.cover} 
//                 alt={pub.title} 
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//               {pub.isFeatured && (
//                 <div className="absolute top-3 left-3">
//                   <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
//                     <FaStar className="text-xs" /> Featured
//                   </span>
//                 </div>
//               )}
//             </div>
            
//             {/* Content */}
//             <div className="p-5">
//               {/* Badges */}
//               <div className="flex flex-wrap items-center gap-2 mb-3">
//                 <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
//                   {pub.committee.split(' ')[0]}
//                 </span>
//                 <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
//                   {pub.topic}
//                 </span>
//               </div>
              
//               {/* Title */}
//               <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-icai transition">
//                 {pub.title}
//               </h3>
              
//               {/* Description */}
//               <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                 {pub.description}
//               </p>
              
//               {/* Meta Info */}
//               <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
//                 <span className="flex items-center gap-1">
//                   <FaCalendarAlt /> {pub.date}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <FaDownload /> {pub.downloads.toLocaleString()}
//                 </span>
//               </div>
              
//               {/* Actions */}
//               <div className="flex gap-2">
//                 <Link 
//                   to={`/read/${pub.id}`} 
//                   className="flex-1 bg-icai text-white text-center py-2 rounded-xl font-medium hover:bg-[#002a6e] transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <FaBookOpen className="text-sm" /> Read Now
//                 </Link>
//                 <button 
//                   onClick={() => handleShare(pub.title)}
//                   className="bg-gray-100 hover:bg-gray-200 w-10 rounded-xl transition-all duration-300 flex items-center justify-center"
//                 >
//                   <FaShareAlt className="text-gray-600" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MemberPublicationsGrid


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaCalendarAlt, FaDownload, FaBookOpen, FaShareAlt, FaSearch, FaFilter } from 'react-icons/fa'

const MemberPublicationsGrid = ({ publications }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCommittee, setFilterCommittee] = useState('')
  const [filterTopic, setFilterTopic] = useState('')

  // Get unique values for filters
  const committees = [...new Set(publications.map(p => p.committee))]
  const topics = [...new Set(publications.map(p => p.topic))]

  // Filter publications
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.topic.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCommittee = filterCommittee === '' || pub.committee === filterCommittee
    const matchesTopic = filterTopic === '' || pub.topic === filterTopic
    
    return matchesSearch && matchesCommittee && matchesTopic
  })

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
      {/* Search and Filter Bar - Always visible */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
              />
            </div>
          </div>
          <select
            value={filterCommittee}
            onChange={(e) => setFilterCommittee(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai"
          >
            <option value="">All Committees</option>
            {committees.map(committee => (
              <option key={committee} value={committee}>{committee}</option>
            ))}
          </select>
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai"
          >
            <option value="">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Found {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
      </div>

      {/* Publications Grid - Conditional rendering */}
      {filteredPublications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FaBookOpen className="text-6xl text-gray-300 mb-4 mx-auto" />
          <p className="text-gray-500 text-lg">No publications found</p>
          <p className="text-sm text-gray-400 mt-2">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setFilterCommittee('')
              setFilterTopic('')
            }}
            className="mt-4 text-icai hover:underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map(pub => (
            <div key={pub.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-up group">
              {/* Cover Image */}
              <div className="relative overflow-hidden h-56">
                <img 
                  src={pub.cover} 
                  alt={pub.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {pub.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-xs" /> Featured
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    {pub.committee.split(' ')[0]}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {pub.topic}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-icai transition">
                  {pub.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {pub.description}
                </p>
                
                {/* Meta Info */}
                <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {pub.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaDownload /> {pub.downloads.toLocaleString()}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Link 
                    to={`/read/${pub.id}`} 
                    className="flex-1 bg-icai text-white text-center py-2 rounded-xl font-medium hover:bg-[#002a6e] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaBookOpen className="text-sm" /> Read Now
                  </Link>
                  <button 
                    onClick={() => handleShare(pub.title)}
                    className="bg-gray-100 hover:bg-gray-200 w-10 rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <FaShareAlt className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MemberPublicationsGrid