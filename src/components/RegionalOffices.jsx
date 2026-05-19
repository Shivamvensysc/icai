import React from 'react'
import { FaBuilding, FaCity, FaLandmark, FaUniversity, FaChurch, FaGlobe } from 'react-icons/fa'

const RegionalOffices = () => {
  const offices = [
    { icon: FaBuilding, name: "New Delhi", region: "Headquarters" },
    { icon: FaCity, name: "Mumbai", region: "Western Region" },
    { icon: FaLandmark, name: "Chennai", region: "Southern Region" },
    { icon: FaUniversity, name: "Kolkata", region: "Eastern Region" },
    { icon: FaChurch, name: "Kanpur", region: "Central Region" },
    { icon: FaGlobe, name: "185+", region: "Branches Nationwide" }
  ]

  return (
    <div className="rounded-2xl p-8 mb-12 text-white" style={{ background: 'linear-gradient(135deg, #001f4d, #002a6e)' }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Presence Across India</h2>
        <p className="text-gray-300">Headquarters & Regional Offices serving members nationwide</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        {offices.map((office, index) => (
          <div key={index} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition">
            <office.icon className="text-2xl mb-2 mx-auto" />
            <p className="font-semibold">{office.name}</p>
            <p className="text-xs text-gray-300">{office.region}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegionalOffices