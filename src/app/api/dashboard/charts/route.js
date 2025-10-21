// API Route: Dashboard Charts Data
// Generates data for line, pie, and bar charts
// Aggregates transaction data by time period and category

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

    console.log('=== CHARTS API DEBUG ===')
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
      },
      orderBy: {
        date: 'asc'
      }
    })

    // Generate LINE CHART data (trend over time)
    let lineChartData = []

    if (filter === 'week') {
      // Group by day of week
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const dailyData = {}

      // Initialize all days
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(now.getDate() - (6 - i))
        const dayName = days[date.getDay()]
        dailyData[dayName] = 0
      }

      // Aggregate transactions by day
      transactions.forEach(t => {
        const dayName = days[new Date(t.date).getDay()]
        const value = t.type === 'income' ? t.amount : -t.amount
        dailyData[dayName] += value
      })

      // Convert to array format
      Object.keys(dailyData).forEach(day => {
        lineChartData.push({
          name: day,
          value: Math.round(dailyData[day])
        })
      })

    } else if (filter === 'month') {
      // Group by week
      const weekData = { 'Week 1': 0, 'Week 2': 0, 'Week 3': 0, 'Week 4': 0 }

      transactions.forEach(t => {
        const daysDiff = Math.floor((new Date(t.date) - startDate) / (1000 * 60 * 60 * 24))
        const weekNum = Math.min(Math.floor(daysDiff / 7) + 1, 4)
        const weekKey = `Week ${weekNum}`
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
      // Group by month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthData = {}

      // Initialize all months
      for (let i = 0; i < 12; i++) {
        const date = new Date()
        date.setMonth(now.getMonth() - (11 - i))
        const monthName = months[date.getMonth()]
        monthData[monthName] = 0
      }

      // Aggregate transactions by month
      transactions.forEach(t => {
        const monthName = months[new Date(t.date).getMonth()]
        const value = t.type === 'income' ? t.amount : -t.amount
        monthData[monthName] += value
      })

      // Convert to array format
      Object.keys(monthData).forEach(month => {
        lineChartData.push({
          name: month,
          value: Math.round(monthData[month])
        })
      })
    }

    // Generate PIE CHART data (distribution by category)
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

    // Generate BAR CHART data (income vs expenses comparison)
    let barChartData = []

    if (filter === 'week') {
      // Group by day of week
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const dailyData = {}

      // Initialize all days
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(now.getDate() - (6 - i))
        const dayName = days[date.getDay()]
        dailyData[dayName] = { revenus: 0, dépenses: 0 }
      }

      // Aggregate transactions by day
      transactions.forEach(t => {
        const dayName = days[new Date(t.date).getDay()]
        if (t.type === 'income') {
          dailyData[dayName].revenus += t.amount
        } else {
          dailyData[dayName].dépenses += t.amount
        }
      })

      // Convert to array format
      Object.keys(dailyData).forEach(day => {
        barChartData.push({
          name: day,
          revenus: Math.round(dailyData[day].revenus),
          dépenses: Math.round(dailyData[day].dépenses)
        })
      })

    } else if (filter === 'month') {
      // Group by week
      const weekData = {
        'Week 1': { revenus: 0, dépenses: 0 },
        'Week 2': { revenus: 0, dépenses: 0 },
        'Week 3': { revenus: 0, dépenses: 0 },
        'Week 4': { revenus: 0, dépenses: 0 }
      }

      transactions.forEach(t => {
        const daysDiff = Math.floor((new Date(t.date) - startDate) / (1000 * 60 * 60 * 24))
        const weekNum = Math.min(Math.floor(daysDiff / 7) + 1, 4)
        const weekKey = `Week ${weekNum}`

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
      // Group by quarter
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
    console.error('Dashboard charts error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
