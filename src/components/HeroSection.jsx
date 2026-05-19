import React from 'react'
import { FaUsers, FaGraduationCap, FaGlobe } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <section className="text-white py-16" style={{ background: '#001f4d' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up">
          Centralized Publication Portal
        </h2>
        <p className="text-xl opacity-90 mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Discover, Read, and Access ICAI Publications Securely
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-4 transform hover:scale-105 transition-all duration-300">
            <FaUsers className="text-4xl mb-2 mx-auto" />
            <p className="text-3xl font-bold">407,629+</p>
            <p className="text-sm opacity-90">Members</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-4 transform hover:scale-105 transition-all duration-300">
            <FaGraduationCap className="text-4xl mb-2 mx-auto" />
            <p className="text-3xl font-bold">45,000 </p>
            <p className="text-sm opacity-90">International Member</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-4 transform hover:scale-105 transition-all duration-300">
            <FaGlobe className="text-4xl mb-2 mx-auto" />
            <p className="text-3xl font-bold">2nd Largest</p>
            <p className="text-sm opacity-90">Accounting Body Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection