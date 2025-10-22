// API Route: Dashboard Statistics
// Calculates aggregated stats from user transactions
// Supports filtering by time period (week, month, year)

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request) {
  try {
    let userId = null

    // Get session using getServerSession with authOptions
    const session = await getServerSession(authOptions)

    console.log('=== STATS API DEBUG ===')
    console.log('Session:', JSON.stringify(session, null, 2))

    if (session && session.user && session.user.id) {
      userId = session.user.id
      console.log('User ID from session:', userId)
    }

    if (!userId) {
      console.error('No userId found - user not authenticated')
      return NextResponse.json({
        error: 'User not authenticated',
        debug: {
          hasSession: !!session,
          sessionUser: session?.user
        }
      }, { status: 401 })
    }

    // Get filter parameter (week, month, year)
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'week'

    // Calculate date range based on filter
    const now = new Date()
    let startDate = new Date()

    if (filter === 'week') {
      startDate.setDate(now.getDate() - 7)
    } else if (filter === 'month') {
      startDate.setMonth(now.getMonth() - 1)
    } else if (filter === 'year') {
      startDate.setFullYear(now.getFullYear() - 1)
    }

    // Get all transactions for the user in the date range
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: now
        }
      }
    })

    console.log(`Found ${transactions.length} transactions for filter: ${filter}`)
    console.log(`Date range: ${startDate.toISOString()} to ${now.toISOString()}`)

    // Calculate statistics
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    const revenue = totalIncome - totalExpense

    console.log(`Income: ${totalIncome}, Expenses: ${totalExpense}, Revenue: ${revenue}`)

    // Calculate growth (compare with previous period)
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

    console.log(`Previous period: ${previousTransactions.length} transactions, Revenue: ${previousRevenue}`)
    console.log(`Growth calculation: ${growth}%`)

    // Count unique users (in this case, just 1 - the current user)
    // You might want to count something else like number of transactions
    const totalUsers = transactions.length

    // Count active "projects" (could be categories or transaction count)
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
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
