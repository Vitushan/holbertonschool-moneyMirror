'use client'

import { useState, useEffect } from 'react'

const FINANCIAL_TIPS = [
  {
    title: "Règle des 50/30/20",
    content: "Allouez 50% de vos revenus aux besoins essentiels, 30% aux loisirs et 20% à l'épargne."
  },
  {
    title: "Urgences financières",
    content: "Constituez un fonds d'urgence équivalent à 3-6 mois de charges fixes."
  },
  {
    title: "Suivi quotidien",
    content: "Enregistrez vos dépenses quotidiennement pour garder le contrôle de votre budget."
  },
  {
    title: "Objectifs SMART",
    content: "Définissez des objectifs financiers Spécifiques, Mesurables, Atteignables, Réalistes et Temporels."
  },
  {
    title: "Évitez les dettes",
    content: "Ne dépensez jamais plus que ce que vous gagnez. Vivez selon vos moyens."
  },
  {
    title: "Investissement précoce",
    content: "Plus vous commencez tôt à investir, plus les intérêts composés travailleront en votre faveur."
  },
  {
    title: "Automatisation",
    content: "Automatisez vos virements d'épargne pour économiser sans effort."
  },
  {
    title: "Prix par utilisation",
    content: "Calculez le coût par utilisation avant un achat important."
  }
]

const MOTIVATIONAL_QUOTES = [
  "Chaque euro économisé vous rapproche de vos objectifs !",
  "La discipline d'aujourd'hui, c'est la liberté de demain.",
  "Un petit pas chaque jour mène à de grands résultats.",
  "Votre futur vous remerciera pour les efforts d'aujourd'hui.",
  "L'épargne n'est pas ce qui reste après les dépenses, mais ce qu'on met de côté avant.",
  "La richesse ne se mesure pas par ce qu'on gagne, mais par ce qu'on garde.",
  "Investir en soi est toujours le meilleur investissement.",
  "La patience et la persévérance sont les clés du succès financier."
]

export default function FinancialTips() {
  const [currentTip, setCurrentTip] = useState(null)
  const [currentQuote, setCurrentQuote] = useState(null)

  useEffect(() => {
    // Set random tip and quote on component mount
    setCurrentTip(FINANCIAL_TIPS[Math.floor(Math.random() * FINANCIAL_TIPS.length)])
    setCurrentQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)])
  }, [])

  const getRandomTip = () => {
    setCurrentTip(FINANCIAL_TIPS[Math.floor(Math.random() * FINANCIAL_TIPS.length)])
  }

  const getRandomQuote = () => {
    setCurrentQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)])
  }

  if (!currentTip || !currentQuote) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Financial Tip */}
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            💡 Conseil financier
          </h3>
          <button
            onClick={getRandomTip}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Nouveau conseil
          </button>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-blue-800">
            {currentTip.title}
          </h4>
          <p className="text-blue-700 text-sm leading-relaxed">
            {currentTip.content}
          </p>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="card bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            ⭐ Motivation
          </h3>
          <button
            onClick={getRandomQuote}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Nouvelle citation
          </button>
        </div>
        
        <blockquote className="text-green-700 text-sm italic leading-relaxed">
          "{currentQuote}"
        </blockquote>
      </div>

      {/* Quick Stats */}
      <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
          📊 Le saviez-vous ?
        </h3>
        
        <div className="space-y-2 text-sm text-purple-700">
          <p>• 70% des millionnaires suivent un budget mensuel</p>
          <p>• Épargner 1€/jour = 365€/an</p>
          <p>• La règle des 72 : divisez 72 par le taux d'intérêt pour connaître le temps de doublement</p>
        </div>
      </div>
    </div>
  )
}