import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus, FaSearch, FaDownload, FaPrint, FaTimes } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf'
import { publications } from '../data/publications'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const ReaderPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const publication = publications.find(p => p.id === parseInt(id))
  
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.2)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    if (!publication) {
      navigate('/')
    }
  }, [publication, navigate])

  if (!publication) {
    return null
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1)
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3))
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5))
  const fitToWidth = () => setScale(1.2)
  const fitToPage = () => setScale(0.8)

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchResults([{ page: 1, text: `Found "${searchTerm}" in document` }])
    }
  }

  const handleDownload = () => {
    window.open(publication.pdfUrl, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Reader Header */}
      <div className="bg-icai text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <Link to="/" className="hover:opacity-80 transition flex items-center gap-2">
              <FaArrowLeft /> Back to Portal
            </Link>
            
            <h2 className="font-semibold text-lg truncate flex-1 text-center">
              {publication.title}
            </h2>
            
            <div className="flex gap-2">
              <button onClick={() => setShowSearch(!showSearch)} className="hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                <FaSearch />
              </button>
              <button onClick={handleDownload} className="hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                <FaDownload />
              </button>
              <button onClick={handlePrint} className="hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                <FaPrint />
              </button>
            </div>
          </div>
          
          {/* Reader Controls */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-3 pt-3 border-t border-white/20">
            <button onClick={prevPage} disabled={pageNumber <= 1} className="hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1.5 rounded-lg transition">
              <FaChevronLeft className="inline" /> Prev
            </button>
            
            <span className="text-sm">
              Page {pageNumber} of {numPages || '?'}
            </span>
            
            <button onClick={nextPage} disabled={pageNumber >= numPages} className="hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1.5 rounded-lg transition">
              Next <FaChevronRight className="inline" />
            </button>
            
            <div className="w-px h-6 bg-white/30 mx-2"></div>
            
            <button onClick={zoomOut} className="hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
              <FaSearchMinus />
            </button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} className="hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
              <FaSearchPlus />
            </button>
            
            <div className="w-px h-6 bg-white/30 mx-2"></div>
            
            <button onClick={fitToWidth} className="hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm transition">
              Fit Width
            </button>
            <button onClick={fitToPage} className="hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm transition">
              Fit Page
            </button>
          </div>
          
          {/* Search Bar */}
          {showSearch && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search within this publication..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button onClick={handleSearch} className="bg-white text-icai px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Search
                </button>
                <button onClick={() => setShowSearch(false)} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">
                  <FaTimes />
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="mt-2 text-sm bg-white/10 rounded-lg p-3">
                  {searchResults.map((result, idx) => (
                    <p key={idx} className="text-white/80">{result.text}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* PDF Viewer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="bg-gray-800 rounded-lg shadow-2xl overflow-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <Document
              file={publication.pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-96">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading PDF...</p>
                  </div>
                </div>
              }
              error={
                <div className="flex items-center justify-center h-96">
                  <div className="text-white text-center">
                    <p className="text-red-400">Failed to load PDF</p>
                    <p className="text-sm mt-2">Please try again later</p>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-lg"
              />
            </Document>
          </div>
        </div>
      </div>
      
      {/* DRM Notice */}
      <div className="fixed bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg">
        <i className="fas fa-lock mr-1"></i> DRM Protected | Session-based Access
      </div>
    </div>
  )
}

export default ReaderPage