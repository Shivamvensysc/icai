import React from 'react'
import { FaChartLine, FaCoins, FaHandPeace, FaChartPie, FaBuilding, FaMicrophone } from 'react-icons/fa'

const CommitteesSection = () => {
  const committees = [
    { icon: FaChartLine, name: "Auditing & Assurance", subtitle: "Standards Board", count: "45+" },
    { icon: FaCoins, name: "Taxation Committee", subtitle: "Direct & Indirect Taxes", count: "38+" },
    { icon: FaHandPeace, name: "Ethics Board", subtitle: "Professional Standards", count: "22+" },
    { icon: FaChartPie, name: "Financial Reporting", subtitle: "Ind AS & IFRS", count: "35+" },
    { icon: FaBuilding, name: "Corporate Laws", subtitle: "Companies Act & FEMA", count: "28+" },
    { icon: FaMicrophone, name: "Research & Publication", subtitle: "Academic & Research", count: "52+" }
  ]

  return (
    <div className="mt-16 mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-icai">ICAI Committees & Departments</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore publications from various ICAI committees and expert departments</p>
        <div className="w-20 h-1 bg-icai mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {committees.map((committee, index) => (
          <div key={index} className="committee-card">
            <committee.icon className="text-3xl mb-3" />
            <h3 className="text-xl font-bold mb-2">{committee.name}</h3>
            <p className="text-sm opacity-90">{committee.subtitle}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-2xl font-bold">{committee.count}</span>
              <span className="text-sm">Publications</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommitteesSection