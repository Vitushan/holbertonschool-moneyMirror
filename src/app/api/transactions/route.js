import { prisma } from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { amount, type, category, date, note } = await request.json()
    if (
      typeof amount !== 'number' ||
      !['income', 'expense'].includes(type) ||
      !category?.trim()
    ) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    // Validation de la date
    let transactionDate = new Date()
    if (date) {
      const parsedDate = new Date(date)
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: 'Date format invalide' }, { status: 400 })
      }
      // On n'autorise pas les dates dans le futur
      const now = new Date()
      if (parsedDate > now) {
        return NextResponse.json({ error: 'La date ne peut pas être dans le futur' }, { status: 400 })
      }
      transactionDate = parsedDate
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        amount,
        type,
        category,
        date: transactionDate,
        note,
      },
    })
    return NextResponse.json({ success: true, transaction }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}