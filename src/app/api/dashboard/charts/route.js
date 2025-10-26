// Route API : Données des Graphiques du Dashboard
// Génère les données pour les graphiques en ligne, camembert et barres
// Agrège les données de transactions par période et catégorie

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request) {
  try {
    let userId = null

    // Récupérer la session en utilisant getServerSession avec authOptions
    const session = await getServerSession(authOptions)

    if (session && session.user && session.user.id) {
      userId = session.user.id
    }

    if (!userId) {
      console.error('Aucun userId trouvé - utilisateur non authentifié')
      return NextResponse.json({
        error: 'Utilisateur non authentifié',
        debug: {
          hasSession: !!session,
          sessionUser: session?.user
        }
      }, { status: 401 })
    }

    // Récupérer le paramètre de filtre (semaine, mois, année)
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'week'

    // Calculer la plage de dates en fonction du filtre
    const now = new Date()
    let startDate = new Date()

    if (filter === 'week') {
      startDate.setDate(now.getDate() - 7)
    } else if (filter === 'month') {
      startDate.setMonth(now.getMonth() - 1)
    } else if (filter === 'year') {
      startDate.setFullYear(now.getFullYear() - 1)
    }

    // Récupérer toutes les transactions de l'utilisateur dans la plage de dates
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: now
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    // Générer les données du GRAPHIQUE EN LIGNE (tendance dans le temps)
    let lineChartData = []

    if (filter === 'week') {
      // Grouper par jour de la semaine
      const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
      const dailyData = {}

      // Initialiser tous les jours
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(now.getDate() - (6 - i))
        const dayName = days[date.getDay()]
        dailyData[dayName] = 0
      }

      // Agréger les transactions par jour
      transactions.forEach(t => {
        const dayName = days[new Date(t.date).getDay()]
        const value = t.type === 'income' ? t.amount : -t.amount
        dailyData[dayName] += value
      })

      // Convertir au format tableau
      Object.keys(dailyData).forEach(day => {
        lineChartData.push({
          name: day,
          value: Math.round(dailyData[day])
        })
      })

    } else if (filter === 'month') {
      // Grouper par semaine
      const weekData = { 'Semaine 1': 0, 'Semaine 2': 0, 'Semaine 3': 0, 'Semaine 4': 0 }

      transactions.forEach(t => {
        const daysDiff = Math.floor((new Date(t.date) - startDate) / (1000 * 60 * 60 * 24))
        const weekNum = Math.min(Math.floor(daysDiff / 7) + 1, 4)
        const weekKey = `Semaine ${weekNum}`
        const value = t.type === 'income' ? t.amount : -t.amount
        weekData[weekKey] += value
      })

      Object.keys(weekData).forEach(week => {
        lineChartData.push({
          name: week,
          value: Math.round(weekData[week])
        })
      })

    } else if (filter === 'year') {
      // Grouper par mois
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']
      const monthData = {}

      // Initialiser tous les mois
      for (let i = 0; i < 12; i++) {
        const date = new Date()
        date.setMonth(now.getMonth() - (11 - i))
        const monthName = months[date.getMonth()]
        monthData[monthName] = 0
      }

      // Agréger les transactions par mois
      transactions.forEach(t => {
        const monthName = months[new Date(t.date).getMonth()]
        const value = t.type === 'income' ? t.amount : -t.amount
        monthData[monthName] += value
      })

      // Convertir au format tableau
      Object.keys(monthData).forEach(month => {
        lineChartData.push({
          name: month,
          value: Math.round(monthData[month])
        })
      })
    }

    // Générer les données du GRAPHIQUE CAMEMBERT (répartition par catégorie)
    const categoryData = {}

    transactions.forEach(t => {
      if (!categoryData[t.category]) {
        categoryData[t.category] = 0
      }
      categoryData[t.category] += t.amount
    })

    const pieChartData = Object.keys(categoryData).map(category => ({
      name: category,
      value: Math.round(categoryData[category])
    }))

    // Générer les données du GRAPHIQUE EN BARRES (comparaison revenus vs dépenses)
    let barChartData = []

    if (filter === 'week') {
      // Grouper par jour de la semaine
      const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
      const dailyData = {}

      // Initialiser tous les jours
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(now.getDate() - (6 - i))
        const dayName = days[date.getDay()]
        dailyData[dayName] = { revenus: 0, dépenses: 0 }
      }

      // Agréger les transactions par jour
      transactions.forEach(t => {
        const dayName = days[new Date(t.date).getDay()]
        if (t.type === 'income') {
          dailyData[dayName].revenus += t.amount
        } else {
          dailyData[dayName].dépenses += t.amount
        }
      })

      // Convertir au format tableau
      Object.keys(dailyData).forEach(day => {
        barChartData.push({
          name: day,
          revenus: Math.round(dailyData[day].revenus),
          dépenses: Math.round(dailyData[day].dépenses)
        })
      })

    } else if (filter === 'month') {
      // Grouper par semaine
      const weekData = {
        'Semaine 1': { revenus: 0, dépenses: 0 },
        'Semaine 2': { revenus: 0, dépenses: 0 },
        'Semaine 3': { revenus: 0, dépenses: 0 },
        'Semaine 4': { revenus: 0, dépenses: 0 }
      }

      transactions.forEach(t => {
        const daysDiff = Math.floor((new Date(t.date) - startDate) / (1000 * 60 * 60 * 24))
        const weekNum = Math.min(Math.floor(daysDiff / 7) + 1, 4)
        const weekKey = `Semaine ${weekNum}`

        if (t.type === 'income') {
          weekData[weekKey].revenus += t.amount
        } else {
          weekData[weekKey].dépenses += t.amount
        }
      })

      Object.keys(weekData).forEach(week => {
        barChartData.push({
          name: week,
          revenus: Math.round(weekData[week].revenus),
          dépenses: Math.round(weekData[week].dépenses)
        })
      })

    } else if (filter === 'year') {
      // Grouper par trimestre
      const quarterData = {
        'Q1': { revenus: 0, dépenses: 0 },
        'Q2': { revenus: 0, dépenses: 0 },
        'Q3': { revenus: 0, dépenses: 0 },
        'Q4': { revenus: 0, dépenses: 0 }
      }

      transactions.forEach(t => {
        const month = new Date(t.date).getMonth()
        const quarter = Math.floor(month / 3) + 1
        const quarterKey = `Q${quarter}`

        if (t.type === 'income') {
          quarterData[quarterKey].revenus += t.amount
        } else {
          quarterData[quarterKey].dépenses += t.amount
        }
      })

      Object.keys(quarterData).forEach(quarter => {
        barChartData.push({
          name: quarter,
          revenus: Math.round(quarterData[quarter].revenus),
          dépenses: Math.round(quarterData[quarter].dépenses)
        })
      })
    }

    return NextResponse.json({
      success: true,
      lineChartData,
      pieChartData,
      barChartData
    }, { status: 200 })

  } catch (error) {
    console.error('Erreur graphiques dashboard:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
