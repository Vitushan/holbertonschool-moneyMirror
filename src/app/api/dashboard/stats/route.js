// Route API : Statistiques du Dashboard
// Calcule les statistiques agrégées des transactions utilisateur
// Supporte le filtrage par période (semaine, mois, année)

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
      }
    })

    // Calculer les statistiques
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    const revenue = totalIncome - totalExpense

    // Calculer la croissance (comparaison avec la période précédente)
    let previousStartDate = new Date(startDate)
    let previousEndDate = new Date(startDate)

    if (filter === 'week') {
      previousStartDate.setDate(previousStartDate.getDate() - 7)
    } else if (filter === 'month') {
      previousStartDate.setMonth(previousStartDate.getMonth() - 1)
    } else if (filter === 'year') {
      previousStartDate.setFullYear(previousStartDate.getFullYear() - 1)
    }

    const previousTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: previousStartDate,
          lte: previousEndDate
        }
      }
    })

    const previousRevenue = previousTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0) -
      previousTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

    // Calcul de la croissance avec gestion des cas limites
    let growth = 0
    if (previousRevenue === 0 && revenue > 0) {
      // Si on passe de 0 à positif, c'est une croissance de 100%
      growth = 100
    } else if (previousRevenue === 0 && revenue < 0) {
      // Si on passe de 0 à négatif, c'est une décroissance de -100%
      growth = -100
    } else if (previousRevenue !== 0) {
      // Calcul normal de la croissance
      growth = ((revenue - previousRevenue) / Math.abs(previousRevenue)) * 100
    }
    // Si les deux sont à 0, on garde growth = 0

    // Compter les utilisateurs uniques (dans ce cas, juste 1 - l'utilisateur actuel)
    // Vous pourriez vouloir compter autre chose comme le nombre de transactions
    const totalUsers = transactions.length

    // Compter les "projets" actifs (pourrait être des catégories ou le nombre de transactions)
    const activeProjects = new Set(transactions.map(t => t.category)).size

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        activeProjects,
        revenue: Math.round(revenue),
        growth: Math.round(growth * 10) / 10
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Erreur statistiques dashboard:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
