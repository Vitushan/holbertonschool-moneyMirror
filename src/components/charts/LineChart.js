'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function LineChart({ transactions }) {
  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expenses: 0 }
    }
    
    if (transaction.type === 'INCOME') {
      acc[monthYear].income += transaction.amount
    } else {
      acc[monthYear].expenses += transaction.amount
    }
    
    return acc
  }, {})

  // Sort months and get last 6 months
  const sortedMonths = Object.keys(monthlyData).sort().slice(-6)

  const data = {
    labels: sortedMonths.map(month => {
      const [year, monthNum] = month.split('-')
      return new Date(year, monthNum - 1).toLocaleDateString('fr-FR', { 
        month: 'short', 
        year: 'numeric' 
      })
    }),
    datasets: [
      {
        label: 'Revenus',
        data: sortedMonths.map(month => monthlyData[month]?.income || 0),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Dépenses',
        data: sortedMonths.map(month => monthlyData[month]?.expenses || 0),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Évolution des revenus et dépenses',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.formattedValue} €`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' €'
          }
        }
      },
    },
  }

  if (sortedMonths.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Aucune donnée à afficher
      </div>
    )
  }

  return <Line data={data} options={options} />
}