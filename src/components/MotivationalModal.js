'use client'

import { useEffect } from 'react'
import MotivationalMessage from './MotivationalMessage'

export default function MotivationalModal({ isOpen, onClose, messageType }) {
  // Fermeture automatique après 10 secondes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 10000) // 10 secondes

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  // Fermeture avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay sombre */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 animate-fadeIn backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal centré */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl animate-modalSlideIn">
          {/* Bouton fermeture */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="bg-white hover:bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Fermer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenu du modal */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <MotivationalMessage messageType={messageType} variant="alert" />
          </div>

          {/* Barre de progression (10 secondes) */}
          <div className="mt-3 bg-gray-300 rounded-full h-1.5 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full animate-progressBar" />
          </div>
        </div>
      </div>
    </>
  )
}
