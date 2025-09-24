'use client'

import { useState, useMemo } from 'react'

const categoryIcons = {
  'FOOD': '🍕',
  'TRANSPORT': '🚗',
  'ENTERTAINMENT': '🎬',
  'UTILITIES': '⚡',
  'HEALTHCARE': '🏥',
  'SHOPPING': '🛍️',
  'INCOME': '💰',
  'OTHER': '📋'
}

const categoryLabels = {
  'FOOD': 'Alimentation',
  'TRANSPORT': 'Transport',
  'ENTERTAINMENT': 'Divertissement',
  'UTILITIES': 'Factures',
  'HEALTHCARE': 'Santé',
  'SHOPPING': 'Achats',
  'INCOME': 'Revenus',
  'OTHER': 'Autre'
}

export default function TransactionList({ 
  transactions = [], 
  onEdit, 
  onDelete, 
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions

    // Apply category filter
    if (filterCategory !== 'ALL') {
      filtered = filtered.filter(t => t.category === filterCategory)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === 'amount') {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
      } else if (sortBy === 'date') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [transactions, sortBy, sortOrder, filterCategory, searchTerm])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    })
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement...</span>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">💰</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune transaction trouvée
        </h3>
        <p className="text-gray-500">
          Commencez par ajouter votre première transaction !
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">Toutes les catégories</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {categoryIcons[key]} {label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        <button
          onClick={() => handleSort('date')}
          className={`px-3 py-1 text-sm rounded-md ${
            sortBy === 'date' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
        
        <button
          onClick={() => handleSort('amount')}
          className={`px-3 py-1 text-sm rounded-md ${
            sortBy === 'amount' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Montant {sortBy === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>

        <button
          onClick={() => handleSort('title')}
          className={`px-3 py-1 text-sm rounded-md ${
            sortBy === 'title' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Titre {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        {filteredAndSortedTransactions.length} transaction(s) trouvée(s)
      </p>

      {/* Transaction List */}
      <div className="space-y-2">
        {filteredAndSortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="text-2xl">
                {categoryIcons[transaction.category] || '📋'}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {transaction.title}
                </h4>
                {transaction.description && (
                  <p className="text-sm text-gray-500 truncate">
                    {transaction.description}
                  </p>
                )}
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>{categoryLabels[transaction.category]}</span>
                  <span>•</span>
                  <span>{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className={`font-semibold ${
                  transaction.type === 'INCOME' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </div>

              <div className="flex space-x-1">
                {onEdit && (
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Modifier"
                  >
                    ✏️
                  </button>
                )}
                
                {onDelete && (
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Précédent
          </button>
          
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}