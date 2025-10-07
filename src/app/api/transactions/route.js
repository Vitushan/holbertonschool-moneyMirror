import { prisma } from '../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'


export async function POST(request) {
  try {
    const session = await getServerSession(authOptions) // retrieves session information (the logged in user)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 })
    }
    
    const { amount, type, category, date, note } = await request.json() //retrieves the body of the request sent by the client (in JSON)
    if (
      typeof amount !== 'number' || amount <= 0 || !['income', 'expense'].includes(type) || !category
    ) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }
    
   // Date validation
    let transactionDate = new Date()
    if (date) {
      const parsedDate = new Date(date)
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: 'Please enter a valid date."' }, { status: 400 })
      }
      // Future dates are not allowed
      const now = new Date()
      if (parsedDate > now) {
        return NextResponse.json({ error: 'Sorry, you can’t travel to the future.' }, { status: 400 })
      }
      transactionDate = parsedDate
    }

    const transaction = await prisma.transaction.create({ //creating the transaction with Prisma
      data: {
        userId: session.user.id,
        amount: amount,
        type: type,
        category: category,
        date: transactionDate,
        note: note,
      },
    })
    return NextResponse.json({
      success: true,
      message: 'Congrats, transaction created!',
      transaction,
    }, { status: 201 })
  } catch (error) {
    console.error('Transaction POST error:', error)
    return NextResponse.json({ error: 'Oops! Internal server error' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "User don't exist" }, { status: 401 });
    }

    // prisma.transaction allows you to access all transactions in the MySQL database
    const transactions = await prisma.transaction.findMany({ //findMany is a Prisma method used to retrieve multiple records (multiple rows) from a given table.
      where: { userId: session.user.id},
      orderBy: { date: 'desc' },
    });
    return NextResponse.json({ success: true, transactions }, { status: 200 });

  } catch (error) {
    console.error("Don't get user", error)
    return NextResponse.json({ error: "Oops! User don't exist!" });
  }
}
