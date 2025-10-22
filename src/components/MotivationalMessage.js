'use client'

import { useState, useEffect, useCallback } from 'react'
import motivationalMessages from '@/data/motivationalMessages.json'

export default function MotivationalMessage() {
  const [currentMessage, setCurrentMessage] = useState(null)

  // Fonction pour obtenir un message aléatoire - mémoïsée avec useCallback
  const getRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length)
    return motivationalMessages[randomIndex]
  }, [])

  // Charger un message aléatoire au montage du composant
  useEffect(() => {
    setCurrentMessage(getRandomMessage())
  }, [getRandomMessage])

  // Fonction pour charger un nouveau message - mémoïsée avec useCallback
  const handleNewMessage = useCallback(() => {
    setCurrentMessage(getRandomMessage())
  }, [getRandomMessage])

  // Ne rien afficher tant que le message n'est pas chargé
  if (!currentMessage) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 p-4 md:p-5 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        {/* Contenu */}
        <div className="flex-1">
          <p className="text-sm md:text-base text-gray-900 leading-relaxed font-medium">
            {currentMessage.text}
          </p>
        </div>

        {/* Bouton nouvelle inspiration */}
        <button
          onClick={handleNewMessage}
          className="flex-shrink-0 bg-white hover:bg-green-50 text-green-600 hover:text-green-700 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 shadow-sm border border-green-300 hover:border-green-400 hover:shadow-md flex items-center gap-2 whitespace-nowrap"
          aria-label="Voir une autre inspiration du jour"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span className="hidden sm:inline">Inspiration du jour</span>
          <span className="sm:hidden">Inspiration</span>
        </button>
      </div>
    </div>
  )
}
