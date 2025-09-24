'use client'

import { useState } from 'react'
import PieChart from './PieChart'
import LineChart from './LineChart'
import BarChart from './BarChart'

export default function Charts({ transactions }) {
  const [activeChart, setActiveChart] = useState('pie')

  const chartTabs = [
    { id: 'pie', label: 'Répartition', component: PieChart },
    { id: 'line', label: 'Évolution', component: LineChart },
    { id: 'bar', label: 'Comparaison', component: BarChart },
  ]

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analyses</h2>
        <div className="flex space-x-2">
          {chartTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
                activeChart === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-96">
        {chartTabs.map(tab => {
          const ChartComponent = tab.component
          return (
            <div
              key={tab.id}
              className={activeChart === tab.id ? 'block' : 'hidden'}
            >
              <ChartComponent transactions={transactions} />
            </div>
          )
        })}
      </div>
    </div>
  )
}