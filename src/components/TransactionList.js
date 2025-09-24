'use client'

const CATEGORY_LABELS = {
  FOOD: 'Alimentation',
  TRANSPORT: 'Transport',
  ENTERTAINMENT: 'Divertissement',
  SHOPPING: 'Shopping',
  BILLS: 'Factures',
  RENT: 'Loyer',
  HEALTHCARE: 'Santé',
  EDUCATION: 'Éducation',
  TRAVEL: 'Voyage',
  OTHER_EXPENSE: 'Autres dépenses',
  SALARY: 'Salaire',
  FREELANCE: 'Freelance',
  BUSINESS: 'Business',
  INVESTMENT: 'Investissements',
  OTHER_INCOME: 'Autres revenus',
}

export default function TransactionList({ transactions, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des transactions...</p>
        </div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <p className="text-gray-600">Aucune transaction trouvée.</p>
          <p className="text-sm text-gray-500 mt-1">
            Commencez par ajouter votre première transaction !
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Dernières transactions ({transactions.length})
      </h3>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">
                  {transaction.title}
                </h4>
                <span className={`text-lg font-bold ${
                  transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'INCOME' ? '+' : '-'}{transaction.amount.toFixed(2)} €
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {CATEGORY_LABELS[transaction.category]}
                </span>
                <span>
                  {new Date(transaction.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              {transaction.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {transaction.description}
                </p>
              )}
            </div>
            
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(transaction)}
                className="text-blue-600 hover:text-blue-700 p-2"
                title="Modifier"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-red-600 hover:text-red-700 p-2"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}