import React from 'react'
import { FaShieldAlt, FaSyncAlt, FaLock, FaMobileAlt } from 'react-icons/fa'

const WhyChoose = () => {
  const features = [
    { icon: FaShieldAlt, title: "Authority", desc: "Officially recognized by Ministry of Corporate Affairs" },
    { icon: FaSyncAlt, title: "Regular Updates", desc: "Stay current with latest amendments" },
    { icon: FaLock, title: "Secure Access", desc: "DRM protected content with SSO integration" },
    { icon: FaMobileAlt, title: "Mobile Ready", desc: "Access anytime, anywhere on any device" }
  ]

  return (
    <div className="mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-icai">Why Choose ICAI Publications?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Trusted resources for accounting professionals worldwide</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(0, 31, 77, 0.1)' }}>
              <feature.icon className="text-2xl text-icai" />
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyChoose