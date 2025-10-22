// Page du tableau de bord, interface utilisateur principale
// Affiche les cartes de statistiques, graphiques et filtres
// Route protégée, nécessite une authentification

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Lazy loading des composants Recharts (optimisation du bundle initial)
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false })
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false })
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false })
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false })
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false })
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false })
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })


// Composant principal pour la page Dashboard
export default function DashboardPage() {
  // ÉTAPE 1 : Obtenir la session d'authentification et le routage
  const { data: session, status } = useSession()
  const router = useRouter()

  // ÉTAPE 2 : Initialiser l'état local pour les données du tableau de bord
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    revenue: 0,
    growth: 0
  })

  // Données du graphique en ligne : évolution dans le temps
  const [lineChartData, setLineChartData] = useState([])

  // Données du graphique camembert : répartition par catégories
  const [pieChartData, setPieChartData] = useState([])

  // Données du graphique en barres : comparaison par période
  const [barChartData, setBarChartData] = useState([])

  // filter : contrôle quelle période afficher (semaine/mois/année)
  const [filter, setFilter] = useState('year')

  // isLoading : suit si les données sont en cours de récupération depuis l'API
  const [isLoading, setIsLoading] = useState(true)

  // chartError : stocke les messages d'erreur pour les graphiques
  const [chartError, setChartError] = useState(null)

  // searchTerm : stocke la recherche pour le filtrage
  const [searchTerm, setSearchTerm] = useState('')

  // selectedCategory : stocke la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState('all')

  // downloadMessage : message de succès/erreur pour le téléchargement PNG
  const [downloadMessage, setDownloadMessage] = useState(null)

  // categories : liste des catégories disponibles
  const [categories, setCategories] = useState([])

  // selectedChart : quel graphique télécharger ('all', 'line', 'pie', 'bar')
  const [selectedChart, setSelectedChart] = useState('all')

  // recentTransactions: liste des dernières transactions
  const [recentTransactions, setRecentTransactions] = useState([])

  // Fonction pour récupérer les données du dashboard depuis l'API (mémoïsée avec useCallback)
  // Récupère les statistiques et les données des graphiques en fonction du filtre sélectionné
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true)
    setChartError(null)

    try {
      // Récupération des statistiques (total transactions, catégories, solde, croissance)
      const statsResponse = await fetch(`/api/dashboard/stats?filter=${filter}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!statsResponse.ok) {
        const errorData = await statsResponse.json()
        console.error('Stats API error:', errorData)
        throw new Error(errorData.error || 'Échec de récupération des statistiques')
      }
      const statsData = await statsResponse.json()

      // Récupération des données des graphiques (ligne, camembert, barres)
      const chartsResponse = await fetch(`/api/dashboard/charts?filter=${filter}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!chartsResponse.ok) {
        const errorData = await chartsResponse.json()
        console.error('Charts API error:', errorData)
        throw new Error(errorData.error || 'Échec de récupération des données de graphiques')
      }
      const chartsData = await chartsResponse.json()

      // Mise à jour de l'état avec les données récupérées
      setStats(statsData.stats)
      setLineChartData(chartsData.lineChartData)
      setPieChartData(chartsData.pieChartData)
      setBarChartData(chartsData.barChartData)

      // Extraction des catégories uniques pour le filtre de catégorie
      const uniqueCategories = chartsData.pieChartData.map(item => item.name)
      setCategories(uniqueCategories)

      // Récupération des dernières transactions
      const transactionsResponse = await fetch('/api/transactions', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json()
        // Garder seulement les 5 dernières transactions
        setRecentTransactions(transactionsData.transactions?.slice(0, 5) || [])
      }

    } catch (error) {
      console.error('Erreur lors de la récupération des données du dashboard:', error)
      setChartError('Échec du chargement des données du tableau de bord')
    } finally {
      setIsLoading(false)
    }
  }, [filter])

  // ÉTAPE 3 : Rediriger les utilisateurs non authentifiés vers la page de connexion
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // ÉTAPE 4 : Récupérer les données du tableau de bord lors de l'authentification ou du changement de filtre
  useEffect(() => {
    if (status === 'authenticated') {
      fetchDashboardData()
    }
  }, [status, fetchDashboardData])

  // Fonction pour télécharger le dashboard ou un graphique spécifique en PNG (mémoïsée avec useCallback)
  // Utilise dom-to-image-more pour convertir les éléments HTML (y compris SVG) en image
  const downloadDashboardAsPNG = useCallback(async () => {
    try {
      setDownloadMessage({ type: 'loading', text: 'Génération du fichier PNG...' })

      // Import dynamique de dom-to-image-more (meilleur pour les SVG)
      const domtoimage = (await import('dom-to-image-more')).default

      let elementToCapture
      let filename = 'dashboard'

      // Sélection de l'élément à capturer en fonction du choix de l'utilisateur
      if (selectedChart === 'all') {
        elementToCapture = document.getElementById('dashboard-content')
        filename = 'dashboard-complet'
      } else if (selectedChart === 'line') {
        elementToCapture = document.getElementById('line-chart')
        filename = 'dashboard-graphique-ligne'
      } else if (selectedChart === 'pie') {
        elementToCapture = document.getElementById('pie-chart')
        filename = 'dashboard-graphique-camembert'
      } else if (selectedChart === 'bar') {
        elementToCapture = document.getElementById('bar-chart')
        filename = 'dashboard-graphique-barres'
      }

      if (!elementToCapture) {
        throw new Error('Élément du graphique introuvable')
      }

      // Attendre que les graphiques SVG soient complètement rendus
      await new Promise(resolve => setTimeout(resolve, 500))

      // Conversion de l'élément en blob PNG avec dom-to-image
      const blob = await domtoimage.toBlob(elementToCapture, {
        quality: 1,
        bgcolor: '#ffffff',
        width: elementToCapture.scrollWidth,
        height: elementToCapture.scrollHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      })

      if (!blob) {
        throw new Error('Échec de génération de l\'image')
      }

      // Téléchargement du fichier
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const date = new Date().toISOString().split('T')[0]
      link.download = `${filename}-${date}.png`
      link.href = url
      link.click()

      URL.revokeObjectURL(url)

      setDownloadMessage({ type: 'success', text: 'Graphique téléchargé avec succès !' })

      setTimeout(() => {
        setDownloadMessage(null)
      }, 3000)

    } catch (error) {
      console.error('Erreur lors du téléchargement du dashboard:', error)
      setDownloadMessage({
        type: 'error',
        text: 'Erreur lors de la génération du graphique. Veuillez réessayer.'
      })

      setTimeout(() => {
        setDownloadMessage(null)
      }, 5000)
    }
  }, [selectedChart])

  // Filtrage des données du graphique en ligne par terme de recherche (mémoïsé pour performance)
  const filteredLineChartData = useMemo(() => {
    return lineChartData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [lineChartData, searchTerm])

  // Filtrage des données du graphique camembert UNIQUEMENT par catégorie (mémoïsé pour performance)
  // (searchTerm ne s'applique pas car les noms sont des catégories, pas des dates)
  const filteredPieChartData = useMemo(() => {
    return pieChartData.filter(item => {
      const matchesCategory = selectedCategory === 'all' ||
        item.name.toLowerCase() === selectedCategory.toLowerCase()
      return matchesCategory
    })
  }, [pieChartData, selectedCategory])

  // Filtrage des données du graphique en barres par terme de recherche (mémoïsé pour performance)
  const filteredBarChartData = useMemo(() => {
    return barChartData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [barChartData, searchTerm])

  // Couleurs pour le graphique camembert
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement du dashboard...</div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 inline-block px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm">
                Bienvenue à bord
              </h1>
              <p className="text-gray-800 font-medium mt-3">Bonjour, {session?.user?.name || 'Utilisateur'}</p>
              <p className="text-gray-600 text-sm mt-1">Gérez vos finances simplement</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => router.push('/transactions')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Voir Transactions
            </button>

            <button
              onClick={() => router.push('/transactions/add')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter Transaction
            </button>

            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les graphiques</option>
              <option value="line">Graphique Ligne</option>
              <option value="pie">Graphique Camembert</option>
              <option value="bar">Graphique Barres</option>
            </select>

            <button
              onClick={downloadDashboardAsPNG}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              disabled={downloadMessage?.type === 'loading'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {downloadMessage?.type === 'loading' ? 'Génération...' : 'Télécharger Graphique'}
            </button>
          </div>
        </div>

        {/* Download Message */}
        {downloadMessage && (
          <div className={`mb-6 px-4 py-3 rounded-lg border ${
            downloadMessage.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' :
            downloadMessage.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' :
            'bg-blue-100 border-blue-400 text-blue-700'
          }`}>
            <div className="flex items-center">
              {downloadMessage.type === 'success' && (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {downloadMessage.type === 'error' && (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {downloadMessage.text}
            </div>
          </div>
        )}

        <div id="dashboard-content">
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => setFilter('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Semaine
              </button>
              <button
                onClick={() => setFilter('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Mois
              </button>
              <button
                onClick={() => setFilter('year')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'year'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Année
              </button>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher dans les graphiques..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Carte Total Transactions */}
          <div
            onClick={() => router.push('/transactions')}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  Voir tout
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Carte Catégories Actives */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Catégories Actives</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.activeProjects}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Carte Solde Net */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Solde Net</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.revenue.toLocaleString()} €
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Carte Croissance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Croissance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.growth}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {chartError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {chartError}
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graphique en Ligne */}
          {(selectedChart === 'all' || selectedChart === 'line') && (
            <div id="line-chart" className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution dans le temps</h3>
              {filteredLineChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredLineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#0088FE" strokeWidth={2} name="Valeur" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  Aucune donnée correspondant à votre recherche
                </div>
              )}
            </div>
          )}

          {/* Graphique Camembert */}
          {(selectedChart === 'all' || selectedChart === 'pie') && (
            <div id="pie-chart" className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par catégorie</h3>
              {filteredPieChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={filteredPieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {filteredPieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  Aucune donnée correspondant à votre recherche
                </div>
              )}
            </div>
          )}

          {/* Graphique en Barres */}
          {(selectedChart === 'all' || selectedChart === 'bar') && (
            <div id="bar-chart" className={`bg-white rounded-lg shadow p-6 ${selectedChart === 'all' ? 'lg:col-span-2' : ''}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus vs Dépenses</h3>
              {filteredBarChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredBarChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenus" fill="#00C49F" name="Revenus" />
                    <Bar dataKey="dépenses" fill="#FF8042" name="Dépenses" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  Aucune donnée correspondant à votre recherche
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Transactions Section */}
        {recentTransactions.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Dernières Transactions</h2>
              <button
                onClick={() => router.push('/transactions')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                Voir tout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.description || transaction.note || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toFixed(2)} €
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => router.push(`/transactions/edit/${transaction.id}`)}
                            className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
                                router.push(`/transactions?delete=${transaction.id}`)
                              }
                            }}
                            className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section Totaux - Design élégant en bas du tableau */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-300 px-6 py-5">
                <div className="flex justify-end">
                  <div className="w-full max-w-sm">
                    <div className="text-right mb-3">
                      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Totaux</h3>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3">
                      {/* Revenus */}
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-sm text-gray-600 font-medium">Revenus</span>
                        <span className="text-base font-bold text-green-600">
                          +{recentTransactions
                            .filter(t => t.type === 'income')
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toFixed(2)} €
                        </span>
                      </div>

                      {/* Dépenses */}
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600 font-medium">Dépenses</span>
                        <span className="text-base font-bold text-red-600">
                          -{recentTransactions
                            .filter(t => t.type === 'expense')
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toFixed(2)} €
                        </span>
                      </div>

                      {/* Solde Net */}
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-sm text-gray-900 font-bold">Solde Net</span>
                        <span className={`text-lg font-bold ${
                          recentTransactions
                            .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0) >= 0
                            ? 'text-blue-600'
                            : 'text-red-600'
                        }`}>
                          {recentTransactions
                            .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0)
                            .toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  )
}