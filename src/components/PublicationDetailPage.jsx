// import React, { useContext } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { FaArrowLeft, FaBookOpen, FaCalendarAlt, FaDownload, FaStar, FaEye, FaShareAlt } from 'react-icons/fa'
// import { publications } from '../data/publications'
// import { AuthContext } from '../App'
// import { ToastContext } from '../App'

// const PublicationDetailPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const { user } = useContext(AuthContext)
//   const { showToast } = useContext(ToastContext)
  
//   // Find publication by ID - handle both string and number IDs
//   const publication = publications.find(p => {
//     // Convert both to string for comparison
//     return String(p.id) === String(id)
//   })

//   if (!publication) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="text-red-500 text-6xl mb-4">📄</div>
//           <p className="text-xl text-gray-600 mb-2">Publication not found</p>
//           <p className="text-sm text-gray-400 mb-4">The publication you're looking for doesn't exist or has been removed.</p>
//           <Link to="/" className="text-icai hover:underline mt-4 inline-block">
//             ← Go back home
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const handleReadNow = () => {
//     if (user) {
//       navigate(`/read/${publication.id}`)
//     } else {
//       showToast('Please login or register as guest to read this publication', 'info')
//       navigate('/login/guest')
//     }
//   }

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: publication.title,
//         text: publication.description,
//         url: window.location.href
//       })
//     } else {
//       navigator.clipboard.writeText(`${publication.title} - ICAI Publication Portal`)
//       showToast('Link copied to clipboard!', 'success')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <Link to="/" className="inline-flex items-center text-icai hover:text-[#002a6e] transition">
//             <FaArrowLeft className="mr-2" /> Back to Home
//           </Link>
//         </div>
//       </div>

//       {/* Publication Detail */}
//       <div className="container mx-auto px-4 py-8 max-w-6xl">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Left Column - Cover Image */}
//             <div className="p-6 md:p-8">
//               <div className="relative">
//                 <img 
//                   src={publication.cover} 
//                   alt={publication.title} 
//                   className="w-full h-auto rounded-xl shadow-lg object-cover"
//                   onError={(e) => {
//                     e.target.src = 'https://placehold.co/400x500/f8f9fa/2c3e50?text=No+Image'
//                   }}
//                 />
//                 {publication.isFeatured && (
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
//                       <FaStar className="text-xs" /> Featured
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right Column - Details */}
//             <div className="p-6 md:p-8">
//               {/* Badges */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
//                   {publication.committee.split(' ')[0]}
//                 </span>
//                 <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
//                   {publication.topic}
//                 </span>
//                 {publication.isLatest && (
//                   <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
//                     Latest Release
//                   </span>
//                 )}
//               </div>

//               {/* Title */}
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//                 {publication.title}
//               </h1>

//               {/* Meta Info */}
//               <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
//                 <span className="flex items-center gap-1">
//                   <FaCalendarAlt /> {publication.date}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <FaDownload /> {publication.downloads.toLocaleString()} downloads
//                 </span>
//               </div>

//               {/* Description */}
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">About this publication</h2>
//                 <p className="text-gray-600 leading-relaxed">
//                   {publication.description}
//                 </p>
//               </div>

//               {/* Additional Info */}
//               <div className="bg-gray-50 rounded-xl p-4 mb-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-xs text-gray-500">Committee</p>
//                     <p className="text-sm font-medium text-gray-800">{publication.committee}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Category</p>
//                     <p className="text-sm font-medium text-gray-800">{publication.topic}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Publication Date</p>
//                     <p className="text-sm font-medium text-gray-800">{publication.date}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Total Downloads</p>
//                     <p className="text-sm font-medium text-gray-800">{publication.downloads.toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleReadNow}
//                   className="flex-1 btn-primary py-3 text-lg flex items-center justify-center gap-2"
//                 >
//                   <FaBookOpen /> Read Now
//                 </button>
//                 <button
//                   onClick={handleShare}
//                   className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center justify-center gap-2"
//                 >
//                   <FaShareAlt /> Share
//                 </button>
//               </div>

//               {/* Authentication Notice */}
//               {!user && (
//                 <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
//                   <p className="text-xs text-amber-700 text-center">
//                     🔒 You need to login or register as guest to read this publication
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Related Publications Section */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Publications</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {publications
//               .filter(p => p.id !== publication.id && p.topic === publication.topic)
//               .slice(0, 3)
//               .map(relatedPub => (
//                 <Link 
//                   key={relatedPub.id} 
//                   to={`/publication/${relatedPub.id}`}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
//                 >
//                   <img 
//                     src={relatedPub.cover} 
//                     alt={relatedPub.title} 
//                     className="w-full h-40 object-cover rounded-lg mb-3"
//                     onError={(e) => {
//                       e.target.src = 'https://placehold.co/400x300/f8f9fa/2c3e50?text=No+Image'
//                     }}
//                   />
//                   <h3 className="font-semibold text-gray-800 line-clamp-2">{relatedPub.title}</h3>
//                   <p className="text-xs text-gray-500 mt-1">{relatedPub.date}</p>
//                 </Link>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PublicationDetailPage


import React, { useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaBookOpen, FaCalendarAlt, FaDownload, FaStar, FaEye, FaShareAlt, FaBook, FaUsers, FaChartLine, FaTags, FaComments, FaEnvelope } from 'react-icons/fa'
import { publications } from '../data/publications'
import { FaListAlt,FaFilePdf  } from "react-icons/fa";
import { AuthContext } from '../App'
import { ToastContext } from '../App'

const PublicationDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)
  
  // Find publication by ID - handle both string and number IDs
  const publication = publications.find(p => {
    return String(p.id) === String(id)
  })

  if (!publication) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">📄</div>
          <p className="text-xl text-gray-600 mb-2">Publication not found</p>
          <p className="text-sm text-gray-400 mb-4">The publication you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-icai hover:underline mt-4 inline-block">
            ← Go back home
          </Link>
        </div>
      </div>
    )
  }

  const handleReadNow = () => {
    if (user) {
      navigate(`/read/${publication.id}`)
    } else {
      showToast('Please login or register as guest to read this publication', 'info')
      navigate('/login/guest')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: publication.title,
        text: publication.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${publication.title} - ICAI Publication Portal`)
      showToast('Link copied to clipboard!', 'success')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-icai hover:text-[#002a6e] transition">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Publication Detail */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cover Image and Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="p-6">
                <div className="relative">
                  <img 
                    src={publication.cover} 
                    alt={publication.title} 
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x500/f8f9fa/2c3e50?text=No+Image'
                    }}
                  />
                  {publication.isFeatured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <FaStar className="text-xs" /> Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Info Sidebar */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Format:</span>
                    <span className="text-sm font-semibold text-gray-800">PDF eBook</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Pages:</span>
                    <span className="text-sm font-semibold text-gray-800">342 pages</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Language:</span>
                    <span className="text-sm font-semibold text-gray-800">English</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">ISBN:</span>
                    <span className="text-sm font-semibold text-gray-800">978-81-1234-567-8</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6">
                  <button
                    onClick={handleReadNow}
                    className="w-full btn-primary py-3 text-lg flex items-center justify-center gap-2"
                  >
                    <FaBookOpen /> Read Now
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full mt-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <FaShareAlt /> Share Publication
                  </button>
                </div>

                {/* Authentication Notice */}
                {!user && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-700 text-center">
                      🔒 You need to login or register as guest to read this publication
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                  {publication.committee.split(' ')[0]}
                </span>
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {publication.topic}
                </span>
                {publication.isLatest && (
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    Latest Release
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {publication.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500 pb-4 border-b">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> Published: {publication.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaDownload /> {publication.downloads.toLocaleString()} downloads
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> 1,234 views
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaBook className="text-icai" /> About this publication
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {publication.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaTags className="text-icai" /> Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Latest amendments and updates
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Practical examples and case studies
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Expert commentary and analysis
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Downloadable PDF format
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaListAlt className="text-icai" /> Table of Contents
                </h2>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Chapter 1: Introduction</span>
                      <span className="text-gray-400">Page 1</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Chapter 2: Basic Concepts</span>
                      <span className="text-gray-400">Page 25</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Chapter 3: Practical Applications</span>
                      <span className="text-gray-400">Page 58</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Chapter 4: Case Studies</span>
                      <span className="text-gray-400">Page 102</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Chapter 5: Conclusion</span>
                      <span className="text-gray-400">Page 178</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-icai/5 to-[#002a6e]/5 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Committee</p>
                    <p className="text-sm font-medium text-gray-800">{publication.committee}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium text-gray-800">{publication.topic}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Publication Date</p>
                    <p className="text-sm font-medium text-gray-800">{publication.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Downloads</p>
                    <p className="text-sm font-medium text-gray-800">{publication.downloads.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reader Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaComments className="text-icai" /> Reader Reviews
              </h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-icai/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-icai">RS</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Rahul Sharma</p>
                      <div className="flex text-yellow-400 text-xs">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Excellent publication! Very helpful for my practice.</p>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-icai/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-icai">PM</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Priya Mehta</p>
                      <div className="flex text-yellow-400 text-xs">
                        ★★★★☆
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Well-structured content with practical examples.</p>
                </div>
              </div>

              <button className="mt-4 text-icai text-sm hover:underline flex items-center gap-1">
                Write a Review →
              </button>
            </div>

            {/* Related Resources */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBook className="text-icai" /> Related Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-icai/10 rounded-lg flex items-center justify-center">
                    <FaFilePdf className="text-icai" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Supplementary Materials</p>
                    <p className="text-xs text-gray-500">Download additional resources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-icai/10 rounded-lg flex items-center justify-center">
                    <FaChartLine className="text-icai" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Related Publications</p>
                    <p className="text-xs text-gray-500">Browse similar content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-icai to-[#002a6e] rounded-2xl shadow-lg p-6 md:p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-sm opacity-90 mb-4">Get notified about new publications and updates</p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-icai px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
                  <FaEnvelope /> Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Publications Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {publications
              .filter(p => p.id !== publication.id && p.topic === publication.topic)
              .slice(0, 4)
              .map(relatedPub => (
                <Link 
                  key={relatedPub.id} 
                  to={`/publication/${relatedPub.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition group overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedPub.cover} 
                      alt={relatedPub.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x300/f8f9fa/2c3e50?text=No+Image'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm">{relatedPub.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{relatedPub.date}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicationDetailPage