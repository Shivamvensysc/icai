import React from 'react'
import { FaFilePdf, FaUsers, FaChartLine, FaDownload, FaClock } from 'react-icons/fa'

const StatsBanner = () => {
  const stats = [
    { icon: FaFilePdf, value: "250+", label: "Publications" },
    { icon: FaUsers, value: "15,234", label: "Active Readers" },
    { icon: FaChartLine, value: "45+", label: "Committees" },
    { icon: FaDownload, value: "8,942", label: "Total Downloads" },
    { icon: FaClock, value: "24/7", label: "Access Available" }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <stat.icon className="text-3xl text-icai mx-auto" />
          <p className="text-2xl font-bold bg-gradient-to-r from-icai to-[#002a6e] bg-clip-text text-transparent mt-2">
            {stat.value}
          </p>
          <p className="text-gray-500 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsBanner