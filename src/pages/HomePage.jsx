import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import StatsBanner from '../components/StatsBanner'
import SearchFilters from '../components/SearchFilters'
import PublicationsGrid from '../components/PublicationsGrid'
import CommitteesSection from '../components/CommitteesSection'
import RegionalOffices from '../components/RegionalOffices'
import WhyChoose from '../components/WhyChoose'
import FAQSection from '../components/FAQSection'
import { publications as initialPublications } from '../data/publications'
import { ToastContext } from '../App'

const HomePage = () => {
  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)
  const [publications, setPublications] = useState(initialPublications)
  const [filteredPublications, setFilteredPublications] = useState(initialPublications)

  const committees = [...new Set(initialPublications.map(p => p.committee))]
  const topics = [...new Set(initialPublications.map(p => p.topic))]

  const handleSearch = ({ searchTerm, committeeFilter, topicFilter, activeFilter }) => {
    let filtered = [...initialPublications]

    if (searchTerm) {
      filtered = filtered.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.topic.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (committeeFilter) {
      filtered = filtered.filter(pub => pub.committee === committeeFilter)
    }

    if (topicFilter) {
      filtered = filtered.filter(pub => pub.topic === topicFilter)
    }

    if (activeFilter === 'latest') {
      filtered = filtered.filter(p => p.isLatest)
    } else if (activeFilter === 'featured') {
      filtered = filtered.filter(p => p.isFeatured)
    } else if (activeFilter === 'popular') {
      filtered = [...filtered].sort((a, b) => b.downloads - a.downloads)
    }

    setFilteredPublications(filtered)
  }

  // const handleRead = (publication) => {
  //   navigate(`/read/${publication.id}`)
  // }

   const handleRead = (publication) => {
    navigate(`/publication/${publication.id}`)  // Changed from `/read/${publication.id}`
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
      showToast('Link copied to clipboard!', 'success')
    }
  }

  const handleLiveChat = () => {
    showToast('Live chat support would open here', 'info')
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <StatsBanner />
        <PublicationsGrid
          publications={filteredPublications}
          onRead={handleRead}
          onShare={handleShare}
        />
        <CommitteesSection />
        <RegionalOffices />
        <WhyChoose />
        <FAQSection onLiveChat={handleLiveChat} onShowToast={showToast} />
      </div>
    </>
  )
}

export default HomePage