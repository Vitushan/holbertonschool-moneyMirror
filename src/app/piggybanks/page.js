'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import piggybankMessages from '@/data/piggybankMessages.json'

export default function PiggybanksPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [piggybanks, setPiggybanks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)
  const [selectedPiggybank, setSelectedPiggybank] = useState(null)
  const [showLinkedTravelModal, setShowLinkedTravelModal] = useState(false)
  const [newAddictionPiggybankId, setNewAddictionPiggybankId] = useState(null)

  // Form state pour créer une tirelire
  const [newPiggybank, setNewPiggybank] = useState({
    name: '',
    category: 'voyage',
    targetAmount: '',
    isAutomatic: false,
    autoPercentage: ''
  })

  // State pour ajouter de l'argent
  const [amountToAdd, setAmountToAdd] = useState('')

  // Catégories disponibles
  const categories = [
    { value: 'voyage', label: '🌴 Voyage', emoji: '🌴' },
    { value: 'addiction', label: '🌱 Se libérer d\'une addiction', emoji: '🌱' },
    { value: 'console', label: '🎮 Console/Gaming', emoji: '🎮' },
    { value: 'voiture', label: '🚗 Voiture', emoji: '🚗' },
    { value: 'logement', label: '🏠 Logement', emoji: '🏠' },
    { value: 'mariage', label: '💍 Mariage', emoji: '💍' },
    { value: 'formation', label: '📚 Formation/Études', emoji: '📚' },
    { value: 'urgence', label: '💰 Fonds d\'urgence', emoji: '💰' },
    { value: 'cadeau', label: '🎁 Cadeau spécial', emoji: '🎁' },
    { value: 'autre', label: '✨ Autre', emoji: '✨' }
  ]

  // Redirection si non authentifié
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Charger les tirelires
  useEffect(() => {
    if (status === 'authenticated') {
      fetchPiggybanks()
    }
  }, [status])

  const fetchPiggybanks = async () => {
    try {
      const response = await fetch('/api/piggybanks')
      const data = await response.json()

      if (data.success) {
        setPiggybanks(data.piggybanks)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tirelires:', error)
    } finally {
      setLoading(false)
    }
  }

  // Obtenir le message motivationnel selon la progression
  const getMotivationalMessage = (category, progress) => {
    const messages = piggybankMessages[category]?.messages

    if (!messages) return ''

    if (progress >= 100) return messages.completed[0]
    if (progress >= 75) return messages['75-100'][Math.floor(Math.random() * messages['75-100'].length)]
    if (progress >= 50) return messages['50-75'][Math.floor(Math.random() * messages['50-75'].length)]
    if (progress >= 25) return messages['25-50'][Math.floor(Math.random() * messages['25-50'].length)]
    return messages['0-25'][Math.floor(Math.random() * messages['0-25'].length)]
  }

  // Créer une tirelire
  const handleCreatePiggybank = async (e) => {
    e.preventDefault()

    const selectedCategory = categories.find(c => c.value === newPiggybank.category)

    try {
      const response = await fetch('/api/piggybanks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPiggybank.name,
          category: newPiggybank.category,
          emoji: selectedCategory.emoji,
          targetAmount: parseFloat(newPiggybank.targetAmount),
          isAutomatic: newPiggybank.isAutomatic,
          autoPercentage: newPiggybank.isAutomatic ? parseFloat(newPiggybank.autoPercentage) : null
        })
      })

      const data = await response.json()

      if (data.success) {
        // Si c'est une tirelire addiction, proposer de créer une tirelire voyage liée
        if (newPiggybank.category === 'addiction') {
          setNewAddictionPiggybankId(data.piggybank.id)
          setShowCreateModal(false)
          setShowLinkedTravelModal(true)
        } else {
          setShowCreateModal(false)
          setNewPiggybank({
            name: '',
            category: 'voyage',
            targetAmount: '',
            isAutomatic: false,
            autoPercentage: ''
          })
          fetchPiggybanks()
        }
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Erreur lors de la création de la tirelire')
    }
  }

  // Créer une tirelire voyage liée
  const handleCreateLinkedTravel = async () => {
    try {
      const response = await fetch('/api/piggybanks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Voyage - Nouveau Départ',
          category: 'voyage',
          emoji: '🌴',
          targetAmount: parseFloat(newPiggybank.targetAmount), // Même montant que l'addiction et le reste
          isAutomatic: newPiggybank.isAutomatic,
          autoPercentage: newPiggybank.isAutomatic ? parseFloat(newPiggybank.autoPercentage) / 2 : null, // 50% du pourcentage
          linkedPiggybankId: newAddictionPiggybankId
        })
      })

      const data = await response.json()

      if (data.success) {
        setShowLinkedTravelModal(false)
        setNewAddictionPiggybankId(null)
        setNewPiggybank({
          name: '',
          category: 'voyage',
          targetAmount: '',
          isAutomatic: false,
          autoPercentage: ''
        })
        fetchPiggybanks()
      }
    } catch (error) {
      console.error('Erreur lors de la création de la tirelire voyage:', error)
    }
  }

  // Ajouter de l'argent
  const handleAddMoney = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/piggybanks/${selectedPiggybank.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountToAdd: parseFloat(amountToAdd)
        })
      })

      const data = await response.json()

      if (data.success) {
        setShowAddMoneyModal(false)
        setAmountToAdd('')
        setSelectedPiggybank(null)
        fetchPiggybanks()
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'argent:', error)
      alert('Erreur lors de l\'ajout d\'argent')
    }
  }

  // Supprimer une tirelire
  const handleDeletePiggybank = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette tirelire ?')) return

    try {
      const response = await fetch(`/api/piggybanks/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        fetchPiggybanks()
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐷</div>
          <p className="text-gray-600">Chargement de vos tirelires...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">🐷</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Mes Tirelires</h1>
          <p className="text-lg text-gray-600">
            Transformez vos rêves en réalité, euro par euro
          </p>
        </div>

        {/* Bouton créer une tirelire */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <span className="text-2xl">➕</span>
            Créer une nouvelle tirelire
          </button>
        </div>

        {/* Liste des tirelires */}
        {piggybanks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🐷</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Aucune tirelire pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Créez votre première tirelire pour commencer à économiser pour vos rêves !
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Créer ma première tirelire
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {piggybanks.map((piggybank) => {
              const progress = (piggybank.currentAmount / piggybank.targetAmount) * 100
              const message = getMotivationalMessage(piggybank.category, progress)
              const isCompleted = progress >= 100

              return (
                <div
                  key={piggybank.id}
                  className={`bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl ${
                    isCompleted ? 'border-4 border-green-500 bg-gradient-to-br from-green-50 to-white' : ''
                  }`}
                >
                  {/* Header de la tirelire */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{piggybank.emoji}</span>
                      <span className="text-4xl">🐷</span>
                    </div>
                    {isCompleted && (
                      <div className="text-4xl animate-bounce">🎉</div>
                    )}
                  </div>

                  {/* Nom et montant */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{piggybank.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-purple-600">
                      {piggybank.currentAmount.toFixed(2)} €
                    </span>
                    <span className="text-gray-500">/ {piggybank.targetAmount.toFixed(2)} €</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {progress.toFixed(1)}% de l'objectif atteint
                  </p>

                  {/* Mode automatique */}
                  {piggybank.isAutomatic && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                        <span>🤖</span>
                        Mode automatique : {piggybank.autoPercentage}% des revenus
                      </p>
                    </div>
                  )}

                  {/* Barre de progression */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : 'bg-gradient-to-r from-pink-500 to-purple-600'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Message motivationnel */}
                  <div className={`rounded-xl p-4 mb-6 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                      : 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200'
                  }`}>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      {message}
                    </p>
                  </div>

                  {/* Message de récompense quand objectif atteint */}
                  {isCompleted && piggybankMessages[piggybank.category]?.rewardMessage && (
                    <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-xl p-5 mb-6 border-2 border-yellow-400 shadow-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🎁</span>
                        <div>
                          <p className="text-sm font-semibold text-orange-800 mb-2">
                            💡 Pensez à vous récompenser !
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {piggybankMessages[piggybank.category].rewardMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message spécial addiction → voyage */}
                  {piggybank.category === 'addiction' && piggybank.linkedPiggybankId && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4 border-l-4 border-orange-400">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        💫 {piggybankMessages.addiction.linkedTravelMessage}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    {!isCompleted && (
                      <button
                        onClick={() => {
                          setSelectedPiggybank(piggybank)
                          setShowAddMoneyModal(true)
                        }}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                      >
                        💰 Ajouter
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePiggybank(piggybank.id)}
                      className="bg-red-100 text-red-600 px-4 py-3 rounded-lg font-semibold hover:bg-red-200 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modal: Créer une tirelire */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-4xl">🐷</span>
                  Créer une tirelire
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreatePiggybank} className="space-y-6">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la tirelire
                  </label>
                  <input
                    type="text"
                    value={newPiggybank.name}
                    onChange={(e) => setNewPiggybank({ ...newPiggybank, name: e.target.value })}
                    required
                    placeholder="Ex: Voyage au Japon, Ma PS5, etc."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={newPiggybank.category}
                    onChange={(e) => setNewPiggybank({ ...newPiggybank, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Montant objectif */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant objectif (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={newPiggybank.targetAmount}
                    onChange={(e) => setNewPiggybank({ ...newPiggybank, targetAmount: e.target.value })}
                    required
                    placeholder="1000.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                {/* Mode automatique */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPiggybank.isAutomatic}
                      onChange={(e) => setNewPiggybank({ ...newPiggybank, isAutomatic: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span className="font-medium text-gray-900">
                      Activer le mode automatique
                    </span>
                  </label>
                  <p className="text-sm text-gray-600 mt-2 ml-8">
                    Un pourcentage de vos revenus sera automatiquement ajouté à cette tirelire
                  </p>

                  {newPiggybank.isAutomatic && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pourcentage des revenus (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100"
                        value={newPiggybank.autoPercentage}
                        onChange={(e) => setNewPiggybank({ ...newPiggybank, autoPercentage: e.target.value })}
                        required={newPiggybank.isAutomatic}
                        placeholder="10"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Boutons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Créer la tirelire
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Ajouter de l'argent */}
        {showAddMoneyModal && selectedPiggybank && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-3xl">💰</span>
                  Ajouter de l'argent
                </h2>
                <button
                  onClick={() => {
                    setShowAddMoneyModal(false)
                    setAmountToAdd('')
                  }}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-2">
                  {selectedPiggybank.emoji} {selectedPiggybank.name}
                </p>
                <p className="text-sm text-gray-500">
                  Actuel : {selectedPiggybank.currentAmount.toFixed(2)} € / {selectedPiggybank.targetAmount.toFixed(2)} €
                </p>
              </div>

              <form onSubmit={handleAddMoney}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant à ajouter (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(e.target.value)}
                    required
                    placeholder="10.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                    autoFocus
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddMoneyModal(false)
                      setAmountToAdd('')
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Proposition tirelire voyage liée */}
        {showLinkedTravelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl max-w-2xl w-full p-8 border-2 border-purple-300">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💡</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Conseil de MoneyMirror
                </h2>
              </div>

              <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Saviez-vous que <span className="font-bold text-purple-700">changer d'environnement</span> est l'une des méthodes
                  les plus efficaces pour briser un cycle d'addiction ?
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Partir en voyage, loin de vos déclencheurs habituels,
                  peut être <span className="font-bold text-green-700">le déclic de votre liberté</span>.
                </p>
                <p className="text-lg font-semibold text-purple-700">
                  ✨ Voulez-vous créer une tirelire "Voyage" liée à votre objectif ?
                </p>
                <p className="text-gray-600 mt-2">
                  L'argent économisé de votre addiction financera votre nouveau départ. 🌅
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowLinkedTravelModal(false)
                    setNewAddictionPiggybankId(null)
                    setNewPiggybank({
                      name: '',
                      category: 'voyage',
                      targetAmount: '',
                      isAutomatic: false,
                      autoPercentage: ''
                    })
                    fetchPiggybanks()
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Non merci
                </button>
                <button
                  onClick={handleCreateLinkedTravel}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span className="text-2xl">🌴</span>
                  Oui, créer ma tirelire voyage !
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
