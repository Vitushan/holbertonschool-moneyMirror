import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'



export async function POST(request) {
  try {
    let userId = null;
    // Vérifier l'authentification par token bearer
    const authHeader = request.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } else {
      // Sinon, utiliser la session NextAuth
      let session = null;
      try {
        session = await getServerSession(authOptions);
      } catch (err) {
        return NextResponse.json({ error: 'Error retrieving session', details: String(err) }, { status: 500 });
      }
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, type, category, date, note, description, currency } = body;
    if (
      typeof amount !== 'number' || amount <= 0 || !['income', 'expense'].includes(type) || !category
    ) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 });
    }

    // Validation de la date
    let transactionDate = new Date();
    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: 'Please enter a valid date."' }, { status: 400 });
      }
      // Les dates futures ne sont pas autorisées
      const now = new Date();
      if (parsedDate > now) {
        return NextResponse.json({ error: "Sorry, you can't travel to the future." }, { status: 400 });
      }
      transactionDate = parsedDate;
    }


    const transaction = await prisma.transaction.create({
      data: {
        userId: userId,
        amount: amount,
        type: type,
        category: category,
        date: transactionDate,
        note: note,
        description: description,
        currency: currency,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Congrats, transaction created!',
      transaction,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Oops! Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    let userId = null;

    // Vérifier Authorization: Bearer token
    const authHeader = request.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } else {
      // Sinon, utiliser la session NextAuth
      const session = await getServerSession(authOptions);
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Récupérer toutes les transactions depuis la base de données pour l'utilisateur authentifié
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ success: true, transactions }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Oops! Internal server error" }, { status: 500 });
  }
}
