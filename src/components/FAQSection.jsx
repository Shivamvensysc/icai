import React, { useState } from 'react'
import { FaChevronDown, FaHeadset, FaEnvelope, FaPhone, FaCommentDots } from 'react-icons/fa'

const FAQSection = ({ onLiveChat, onShowToast }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    { q: "How do I access publications as an ICAI member?", a: "ICAI members can log in using their ICAI Member ID and SSP Portal credentials. The portal integrates with the existing ICAI Single Sign-On (SSO) system for seamless authentication. Once logged in, members get full access to all publications with personalized dashboard features.", category: "Authentication" },
    { q: "Can non-members access the publication portal?", a: "Yes, non-members can access the portal through a secure email-based authentication system. Users need to register with their full name, email address, and mobile number. A one-time password (OTP) is sent to their email for verification. Non-members can read publications but may have limited download capabilities compared to members.", category: "Access" },
    { q: "What is Digital Rights Management (DRM) and how does it protect content?", a: "DRM ensures that ICAI's intellectual property is protected from unauthorized distribution. Key features include: session-based content delivery (no persistent URLs), disabled right-click and keyboard shortcuts on reader pages, no persistent caching of publication content on client devices, and print/download functions disabled in the reader interface. Content is only accessible during active authenticated sessions.", category: "Security" },
    { q: "What features does the flipbook-style eBook reader offer?", a: "The eBook reader provides a modern flipbook-style experience with: page-by-page navigation with previous/next controls, direct page jump capability, zoom in/out controls with fit-to-page and fit-to-width modes, in-publication full-text search with highlighted keyword results, responsive layout adapting to desktop, tablet, and mobile screen sizes, and session-based access control.", category: "Reading Experience" },
    { q: "How can I search for specific publications?", a: "The portal features an advanced search engine that covers multiple layers of publication data including: metadata search (title, committee name, topic, publication date, keywords), full-text PDF content search (indexed from uploaded PDF source files), filter combinations (committee + topic + date range + publication type), auto-suggest/type-ahead based on titles and categories, and relevance-ranked results with snippet previews showing matched content.", category: "Search" },
    { q: "What analytics and reports are available for administrators?", a: "The CMS Admin tool provides comprehensive analytics including: dashboard displaying total users, active sessions, and top publications, publication access reports by date range, committee, and user type, login frequency and user registration trend reports, export analytics to CSV/PDF, user management with activity history visibility, and PDF URL generation with strict authorization controls.", category: "Admin" },
    { q: "Is the portal mobile-responsive?", a: "Yes, the portal is fully responsive and works seamlessly on desktop, tablet, and mobile devices. The flipbook reader adapts to different screen sizes, and all features including search, filters, and navigation are optimized for touch interfaces on mobile devices.", category: "Compatibility" },
    { q: "What security measures are implemented to protect user data?", a: "The portal implements enterprise-grade security including: HTTPS enforcement across all endpoints, SSL certificate protection, session-based content delivery, OTP brute-force protection with lockout after defined failed attempts, SQL injection, XSS, and CSRF protection across all input surfaces, Role-Based Access Control (RBAC) for admin panel, audit logging of all admin actions, and regular automated vulnerability scanning.", category: "Security" },
    { q: "How can I share a publication with colleagues?", a: "The portal allows controlled sharing of publications via email to respective users. You can use the share button on any publication card to share via email or copy the link. Note that due to DRM protections, shared links will require the recipient to authenticate their identity before accessing the content.", category: "Sharing" },
    { q: "How often are publications updated?", a: "Publications are updated regularly as new standards, amendments, and guidelines are released. The Latest Releases section surfaces the most recently published titles, and administrators can schedule publication release dates. Users are notified of new publications in their areas of interest based on their reading history and preferences.", category: "Content" }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-icai">Frequently Asked Questions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about the ICAI Publication Portal</p>
        <div className="w-20 h-1 bg-icai mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.q} <span className="faq-category">{faq.category}</span></span>
              <FaChevronDown />
            </div>
            <div className="faq-answer">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #e8f0fe, #f0f4f8)' }}>
        <FaHeadset className="text-4xl mb-4 mx-auto text-icai" />
        <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">Our support team is here to help you</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={() => onShowToast('Email: support@icai.org', 'info')} className="btn-outline">
            <FaEnvelope className="inline mr-2" />support@icai.org
          </button>
          <button onClick={() => onShowToast('Call: 1800-123-ICAI', 'info')} className="btn-outline">
            <FaPhone className="inline mr-2" />Toll Free: 1800-123-ICAI
          </button>
          <button onClick={onLiveChat} className="btn-primary">
            <FaCommentDots className="inline mr-2" />Live Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default FAQSection