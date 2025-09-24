'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import TransactionForm from '@/components/forms/TransactionForm'
import TransactionList from '@/components/TransactionList'
import Charts from '@/components/charts/Charts'
import FinancialTips from '@/components/FinancialTips'

export default function DashboardClient({ user }) {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error('Erreur lors du chargement des transactions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTransactionSubmit = async (transactionData) => {
    try {
      const url = editingTransaction 
        ? `/api/transactions/${editingTransaction.id}`
        : '/api/transactions'
      
      const method = editingTransaction ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      })

      if (response.ok) {
        await fetchTransactions()
        setShowForm(false)
        setEditingTransaction(null)
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    }
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      try {
        const response = await fetch(`/api/transactions/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          await fetchTransactions()
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
      }
    }
  }

  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">MoneyMirror</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bonjour, {user.name || user.email}</span>
              <button
                onClick={() => signOut()}
                className="btn-secondary"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenus</h3>
            <p className="text-3xl font-bold text-green-600">
              {totalIncome.toFixed(2)} €
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Dépenses</h3>
            <p className="text-3xl font-bold text-red-600">
              {totalExpenses.toFixed(2)} €
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Solde</h3>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {balance.toFixed(2)} €
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <Charts transactions={transactions} />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <button
            onClick={() => {
              setEditingTransaction(null)
              setShowForm(true)
            }}
            className="btn-primary"
          >
            Nouvelle transaction
          </button>
        </div>

        {/* Transaction Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                {editingTransaction ? 'Modifier la transaction' : 'Nouvelle transaction'}
              </h3>
              <TransactionForm
                initialData={editingTransaction}
                onSubmit={handleTransactionSubmit}
                onCancel={() => {
                  setShowForm(false)
                  setEditingTransaction(null)
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transactions List */}
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Financial Tips */}
          <div className="lg:col-span-1">
            <FinancialTips />
          </div>
        </div>
      </main>
    </div>
  )
}