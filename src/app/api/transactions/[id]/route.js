import { prisma } from "../../../lib/prisma" //Import the Prisma Client instance configuré pour la DB
import { getServerSession } from "next-auth" //Imports the NextAuth function which allows you to retrieve the session on the server side (check if the user is logged in)
import { authOptions } from "../auth/[...nextauth]/route" // Imports the NextAuth configuration (providers, callbacks, etc.). getServerSession(authOptions) needs these options to validate the session
import { NextResponse } from "next/server" //Next.js utility to construct and return HTTP responses from a route handler (App Router) used to return JSON with a status.


//this is a findOne for my crud (to read a specific transaction)
// this route is used to read a single specific transaction from its unique ID.
export async function GET(request, { params }) { //{ params } = Next.js injects the dynamic parameters of the URL here (example for /api/transactions/[id], params.id contains the ID).
  try {
    let userId = null;
    const authHeader = request.headers.get('authorization');
    let jwtLib;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      jwtLib = (await import('jsonwebtoken')).default;
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwtLib.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } else {
      const session = await getServerSession(authOptions);
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const { id } = params;
    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return NextResponse.json({ error: "Invalid transaction ID" }, {status: 400 })
    }
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404});
    }
    return NextResponse.json({ success: true, transaction }, { status: 200});
  } catch (error) {
    console.error("Error fetching transaction", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    let userId = null;
    const authHeader = request.headers.get('authorization');
    let jwtLib;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      jwtLib = (await import('jsonwebtoken')).default;
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwtLib.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } else {
      const session = await getServerSession(authOptions);
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }
    if (!userId) {
      return NextResponse.json({ error: 'Please sign in to continue.' }, { status:401 })
    }
    const { id } = params;
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid Transaction Id' }, { status: 400 })
    }
    const { amount, type, category, date, note, description, currency } = await request.json();
    if (typeof amount !== 'number' || amount <= 0 || !['income', 'expense'].includes(type) || !category) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, {status: 400});
    }
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId }
    });
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found '}, { status: 404 })
    }
    let transactionDate = transaction.date;
    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: 'Please enter a valid date.'}, { status: 400 })
      }
      if (parsedDate > new Date()) {
        return NextResponse.json({ error: 'Sorry, you can’t travel to the future.' }, {status: 400})
      }
      transactionDate = parsedDate;
    }
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        amount: amount,
        type: type,
        category: category,
        date: transactionDate,
        note: note,
        description: description,
        currency: currency,
      },
    });
    return NextResponse.json({ success: true, message:'Transaction updated successfully!', transaction: updatedTransaction }, { status: 200 });
  } catch (error) {
    console.error('Error updating transaction', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params}) {
  try {
    let userId = null;
    const authHeader = request.headers.get('authorization');
    let jwtLib;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      jwtLib = (await import('jsonwebtoken')).default;
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwtLib.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } else {
      const session = await getServerSession(authOptions);
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }
    if (!userId) {
      return NextResponse.json({ error: 'Please sign in to continue '}, { status: 401 });
    }
    const { id } = params;
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid transaction ID' }, { status: 400});
    }
    const transaction = await prisma.transaction.findFirst({ where: { id, userId }});
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 400 });
    }
    await prisma.transaction.delete({ where: { id: transaction.id }});
    return NextResponse.json({ success: true, message: 'Transaction deleted successfully' }, { status: 200});
  } catch (error) {
    console.error('Error deleting transaction', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500});
  }
}
