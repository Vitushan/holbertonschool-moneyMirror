'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const CATEGORY_COLORS = {
  FOOD: '#FF6384',
  TRANSPORT: '#36A2EB',
  ENTERTAINMENT: '#FFCE56',
  SHOPPING: '#4BC0C0',
  BILLS: '#9966FF',
  RENT: '#FF9F40',
  HEALTHCARE: '#FF6384',
  EDUCATION: '#C9CBCF',
  TRAVEL: '#4BC0C0',
  OTHER_EXPENSE: '#36A2EB',
  SALARY: '#4CAF50',
  FREELANCE: '#2196F3',
  BUSINESS: '#FF9800',
  INVESTMENT: '#9C27B0',
  OTHER_INCOME: '#607D8B',
}

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

export default function PieChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      return acc
    }, {})

  const data = {
    labels: Object.keys(expensesByCategory).map(cat => CATEGORY_LABELS[cat]),
    datasets: [
      {
        label: 'Dépenses par catégorie',
        data: Object.values(expensesByCategory),
        backgroundColor: Object.keys(expensesByCategory).map(cat => CATEGORY_COLORS[cat]),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.formattedValue} €`
          }
        }
      }
    },
  }

  if (Object.keys(expensesByCategory).length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Aucune dépense à afficher
      </div>
    )
  }

  return <Pie data={data} options={options} />
}