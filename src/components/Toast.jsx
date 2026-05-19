import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  const icons = {
    success: <FaCheckCircle className="text-xl" />,
    error: <FaExclamationCircle className="text-xl" />,
    info: <FaInfoCircle className="text-xl" />
  }

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  }

  const titles = {
    success: 'Success!',
    error: 'Error!',
    info: 'Info'
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 animate-fade-up`}>
      <div className={`${colors[type]} rounded-xl shadow-2xl max-w-md overflow-hidden`}>
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 text-white">
            {icons[type]}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">
              {titles[type]}
            </p>
            <p className="text-xs text-white/90 mt-0.5">
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              if (onClose) onClose()
            }}
            className="ml-4 flex-shrink-0 text-white/70 hover:text-white transition"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Progress bar animation */}
        <div className="h-1 bg-white/30">
          <div 
            className={`h-full bg-white/70 rounded-r-full animate-progress`}
            style={{ width: '100%', animation: 'shrink 3s linear forwards' }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-progress {
          animation: shrink 3s linear forwards;
        }
      `}</style>
    </div>
  )
}

export default Toast