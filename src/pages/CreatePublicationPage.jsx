import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { 
  FaArrowLeft, FaSave, FaTimes, FaUpload, FaTrash, 
  FaCalendarAlt, FaTag, FaBook, FaUsers, FaFilePdf, 
  FaImage, FaCheckCircle, FaEye, FaEyeSlash, FaEdit
} from 'react-icons/fa'
import { ToastContext } from '../App'

const CreatePublicationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useContext(ToastContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get edit data from navigation state
  const editPublication = location.state?.publication
  const isEditMode = location.state?.isEdit || false

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    committee: '',
    topic: '',
    description: '',
    publicationDate: '',
    pdfUrl: '',
    coverImage: '',
    isFeatured: false,
    isLatest: true,
    tags: [],
    author: '',
    edition: '',
    isbn: '',
    pages: '',
    language: 'English'
  })

  const [tagInput, setTagInput] = useState('')
  const [coverPreview, setCoverPreview] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)

  // Populate form data when in edit mode
  useEffect(() => {
    if (isEditMode && editPublication) {
      setFormData({
        title: editPublication.title || '',
        committee: editPublication.committee || '',
        topic: editPublication.topic || '',
        description: editPublication.description || '',
        publicationDate: editPublication.date || '',
        pdfUrl: editPublication.pdfUrl || '',
        coverImage: editPublication.cover || '',
        isFeatured: editPublication.isFeatured || false,
        isLatest: editPublication.isLatest !== undefined ? editPublication.isLatest : true,
        tags: editPublication.tags || [],
        author: editPublication.author || '',
        edition: editPublication.edition || '',
        isbn: editPublication.isbn || '',
        pages: editPublication.pages || '',
        language: editPublication.language || 'English'
      })
      
      if (editPublication.cover) {
        setCoverPreview(editPublication.cover)
      }
    }
  }, [isEditMode, editPublication])

  const committees = [
    'Auditing & Assurance Standards Board',
    'Taxation Committee',
    'Ethics Board',
    'Financial Reporting',
    'Corporate Laws',
    'Research & Publication',
    'Information Technology Committee',
    'International Affairs Committee'
  ]

  const topics = [
    'Audit & Assurance',
    'Taxation',
    'Ethics & Independence',
    'Financial Reporting',
    'Corporate Law',
    'Information Technology',
    'Management Accounting',
    'International Taxation'
  ]

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleCoverUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result)
        setFormData(prev => ({ ...prev, coverImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePdfUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, pdfUrl: reader.result }))
      }
      reader.readAsDataURL(file)
    } else {
      showToast('Please upload a valid PDF file', 'error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title || !formData.committee || !formData.topic || !formData.description) {
      showToast('Please fill all required fields', 'error')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Publication Data:', formData)
      showToast(isEditMode ? 'Publication updated successfully!' : 'Publication created successfully!', 'success')
      setIsSubmitting(false)
      navigate('/admin-dashboard/publications')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link 
                to="/admin-dashboard/publications" 
                className="text-gray-600 hover:text-gray-800 transition flex items-center gap-2"
              >
                <FaArrowLeft /> Back
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? 'Edit Publication' : 'Create New Publication'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {isEditMode ? 'Update existing publication details' : 'Add a new publication to the ICAI portal'}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/admin-dashboard/publications')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary px-6 py-2 flex items-center gap-2"
              >
                <FaSave />
                {isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Publication' : 'Create Publication')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaBook className="text-icai" /> Basic Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publication Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter publication title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Committee <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="committee"
                          value={formData.committee}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                          required
                        >
                          <option value="">Select Committee</option>
                          {committees.map(committee => (
                            <option key={committee} value={committee}>{committee}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Topic/Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="topic"
                          value={formData.topic}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                          required
                        >
                          <option value="">Select Topic</option>
                          {topics.map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter publication description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai resize-none"
                        required
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author(s)
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleChange}
                          placeholder="Enter author name(s)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Edition
                        </label>
                        <input
                          type="text"
                          name="edition"
                          value={formData.edition}
                          onChange={handleChange}
                          placeholder="e.g., 3rd Edition"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaCalendarAlt className="inline mr-2" /> Publication Date
                        </label>
                        <input
                          type="date"
                          name="publicationDate"
                          value={formData.publicationDate}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ISBN/ISSN
                        </label>
                        <input
                          type="text"
                          name="isbn"
                          value={formData.isbn}
                          onChange={handleChange}
                          placeholder="Enter ISBN or ISSN number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Pages
                        </label>
                        <input
                          type="number"
                          name="pages"
                          value={formData.pages}
                          onChange={handleChange}
                          placeholder="Total pages"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                        >
                          {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaTag className="text-icai" /> Tags & Keywords
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Add tags (e.g., GST, Income Tax, Audit)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-icai focus:ring-1 focus:ring-icai"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        Add Tag
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-blue-900 ml-1"
                          >
                            <FaTimes size={12} />
                          </button>
                        </span>
                      ))}
                      {formData.tags.length === 0 && (
                        <p className="text-sm text-gray-400">No tags added yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Media & Settings */}
              <div className="space-y-6">
                {/* Cover Image Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaImage className="text-icai" /> Cover Image
                  </h2>
                  
                  <div className="space-y-4">
                    {coverPreview ? (
                      <div className="relative">
                        <img
                          src={coverPreview}
                          alt="Cover Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCoverPreview('')
                            setCoverFile(null)
                            setFormData(prev => ({ ...prev, coverImage: '' }))
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-icai transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaUpload className="text-3xl text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload cover image</p>
                          <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* PDF Upload Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaFilePdf className="text-icai" /> PDF Document
                  </h2>
                  
                  <div className="space-y-4">
                    {pdfFile || formData.pdfUrl ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <FaFilePdf className="text-red-500 text-2xl" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {pdfFile ? pdfFile.name : 'PDF Document Uploaded'}
                            </p>
                            {pdfFile && (
                              <p className="text-xs text-gray-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPdfFile(null)
                            setFormData(prev => ({ ...prev, pdfUrl: '' }))
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-icai transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaFilePdf className="text-3xl text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload PDF</p>
                          <p className="text-xs text-gray-400">PDF files only (Max 50MB)</p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Publication Settings Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-icai" /> Publication Settings
                  </h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                      <div>
                        <span className="font-medium text-gray-700">Featured Publication</span>
                        <p className="text-xs text-gray-500">Display on featured section</p>
                      </div>
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="w-5 h-5 text-icai rounded focus:ring-icai"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                      <div>
                        <span className="font-medium text-gray-700">Latest Release</span>
                        <p className="text-xs text-gray-500">Show in latest releases section</p>
                      </div>
                      <input
                        type="checkbox"
                        name="isLatest"
                        checked={formData.isLatest}
                        onChange={handleChange}
                        className="w-5 h-5 text-icai rounded focus:ring-icai"
                      />
                    </label>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="bg-gradient-to-r from-icai/5 to-[#002a6e]/5 rounded-xl p-6 border border-icai/20">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <FaEye className="text-icai" /> Publication Preview
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Title:</span> {formData.title || '—'}</p>
                    <p><span className="text-gray-500">Committee:</span> {formData.committee || '—'}</p>
                    <p><span className="text-gray-500">Topic:</span> {formData.topic || '—'}</p>
                    <p><span className="text-gray-500">Author:</span> {formData.author || '—'}</p>
                    <p><span className="text-gray-500">Edition:</span> {formData.edition || '—'}</p>
                    <p><span className="text-gray-500">Language:</span> {formData.language || '—'}</p>
                    <p><span className="text-gray-500">Status:</span> 
                      <span className="ml-2 text-green-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Ready to Publish
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePublicationPage