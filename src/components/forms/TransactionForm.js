'use client'

import { useState } from 'react'

const TRANSACTION_CATEGORIES = {
  INCOME: [
    { value: 'SALARY', label: 'Salaire' },
    { value: 'FREELANCE', label: 'Freelance' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'INVESTMENT', label: 'Investissement' },
    { value: 'OTHER_INCOME', label: 'Autre revenu' },
  ],
  EXPENSE: [
    { value: 'FOOD', label: 'Alimentation' },
    { value: 'TRANSPORT', label: 'Transport' },
    { value: 'ENTERTAINMENT', label: 'Divertissement' },
    { value: 'SHOPPING', label: 'Shopping' },
    { value: 'BILLS', label: 'Factures' },
    { value: 'RENT', label: 'Loyer' },
    { value: 'HEALTHCARE', label: 'Santé' },
    { value: 'EDUCATION', label: 'Éducation' },
    { value: 'TRAVEL', label: 'Voyage' },
    { value: 'OTHER_EXPENSE', label: 'Autre dépense' },
  ],
}

export default function TransactionForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    amount: initialData?.amount || '',
    type: initialData?.type || 'EXPENSE',
    category: initialData?.category || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' && { category: '' })
    }))
  }

  const availableCategories = TRANSACTION_CATEGORIES[formData.type] || []

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="label">
          Titre *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="input-field"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Courses, Salaire..."
        />
      </div>

      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="input-field"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description optionnelle"
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="amount" className="label">
          Montant (€) *
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          required
          className="input-field"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
        />
      </div>

      <div>
        <label htmlFor="type" className="label">
          Type *
        </label>
        <select
          id="type"
          name="type"
          required
          className="input-field"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="INCOME">Revenu</option>
          <option value="EXPENSE">Dépense</option>
        </select>
      </div>

      <div>
        <label htmlFor="category" className="label">
          Catégorie *
        </label>
        <select
          id="category"
          name="category"
          required
          className="input-field"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Sélectionnez une catégorie</option>
          {availableCategories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="label">
          Date *
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          className="input-field"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {initialData ? 'Modifier' : 'Ajouter'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 btn-secondary"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}