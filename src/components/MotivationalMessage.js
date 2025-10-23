'use client'

import { useState, useEffect, useCallback } from 'react'
import motivationalMessages from '@/data/motivationalMessages.json'

export default function MotivationalMessage({ messageType = 'general', variant = 'default' }) {
  const [currentMessage, setCurrentMessage] = useState(null)

  // Fonction pour obtenir un message aléatoire selon le type - mémoïsée avec useCallback
  const getRandomMessage = useCallback(() => {
    const messages = motivationalMessages[messageType] || motivationalMessages.general
    const randomIndex = Math.floor(Math.random() * messages.length)
    return messages[randomIndex]
  }, [messageType])

  // Charger un message aléatoire au montage du composant ou quand le type change
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

  // Configuration du style selon le variant et le type
  const getStyles = () => {
    if (variant === 'alert') {
      if (messageType === 'income') {
        return {
          container: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-500 shadow-xl animate-slideIn',
          icon: '🎉',
          iconBg: 'bg-green-500',
          title: 'Félicitations !',
          titleColor: 'text-green-800',
          textColor: 'text-green-900',
          buttonBg: 'bg-green-600 hover:bg-green-700',
          buttonText: 'text-white'
        }
      } else if (messageType === 'expense') {
        return {
          container: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-500 shadow-xl animate-slideIn',
          icon: '⚠️',
          iconBg: 'bg-orange-500',
          title: 'Conseil Financier',
          titleColor: 'text-orange-800',
          textColor: 'text-orange-900',
          buttonBg: 'bg-orange-600 hover:bg-orange-700',
          buttonText: 'text-white'
        }
      }
    }

    // Style par défaut (footer)
    return {
      container: 'bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 shadow-sm',
      icon: '💡',
      iconBg: 'bg-green-600',
      title: null,
      titleColor: 'text-gray-900',
      textColor: 'text-gray-900',
      buttonBg: 'bg-white hover:bg-green-50 border border-green-300 hover:border-green-400',
      buttonText: 'text-green-600 hover:text-green-700'
    }
  }

  const styles = getStyles()

  return (
    <div className={`${styles.container} p-5 md:p-6 rounded-xl transition-all duration-300`}>
      {variant === 'alert' && (
        <div className="flex items-start gap-4 mb-3">
          <div className={`${styles.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
            {styles.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${styles.titleColor} mb-1`}>
              {styles.title}
            </h3>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        {/* Contenu */}
        <div className="flex-1">
          <p className={`text-sm md:text-base ${styles.textColor} leading-relaxed font-medium ${variant === 'alert' ? 'text-base md:text-lg' : ''}`}>
            {currentMessage.text}
          </p>
        </div>

        {/* Bouton nouvelle inspiration */}
        <button
          onClick={handleNewMessage}
          className={`flex-shrink-0 ${styles.buttonBg} ${styles.buttonText} px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap`}
          aria-label={variant === 'alert' ? 'Voir un autre conseil' : 'Voir une autre inspiration du jour'}
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden sm:inline">{variant === 'alert' ? 'Autre conseil' : 'Inspiration du jour'}</span>
          <span className="sm:hidden">Autre</span>
        </button>
      </div>
    </div>
  )
}
