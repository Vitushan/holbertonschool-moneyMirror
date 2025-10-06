import { prisma } from "../../../../lib/prisma" //Import the Prisma Client instance configured for the MySQL DB
import { getServerSession } from "next-auth" //Imports the NextAuth function which allows you to retrieve the session on the server side (check if the user is logged in)
import { authOptions } from "../auth/[...nextauth]/route" // Imports the NextAuth configuration (providers, callbacks, etc.). getServerSession(authOptions) needs these options to validate the session
import { NextResponse } from "next/server" //Next.js utility to construct and return HTTP responses from a route handler (App Router) used to return JSON with a status.


//this is a findOne for my crud (to read a specific transaction)
// this route is used to read a single specific transaction from its unique ID.
export async function GET(request, { params }) { //{ params } = Next.js injects the dynamic parameters of the URL here (e.g. for /api/transactions/[id], params.id contains the ID).
  try {
    const session = await getServerSession(authOptions) //Retrieves the user session (if the user is logged in)
    if (!session || !session.user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const { id } = params // get the ID from the URL
    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return NextResponse.json({ error: "Invalid transaction ID" }, {status: 400 })
    }
    //findFirst allows you to add multiple conditions (id + userId).
    const transaction = await prisma.transaction.findFirst({ // Searches for the matching transaction belonging to the user (Prisma Query)
      where: {
        id: id, //search for the requested ID
        userId: session.user.id, // we check that the transaction belongs to the connected user (security/ownership).
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
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Please sign in to continue.' }, { status:401 })
    }
  
    const { id } = params
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid Transaction Id' }, { status: 400 })
    }
    const { amount, type, category, date, note } = await request.json()
    if (typeof amount !== 'number' || amount <= 0 || !['income', 'expense'].includes(type) || !category) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, {status: 400});
    }
  
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId: session.user.id }
    })
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found '}, { status: 404 })
    }
  
    let transactionDate = transaction.date
    if (date) {
      const parsedDate = new Date(date) //parseDate: date convert to JavaScript Date object
      if (isNaN(parsedDate.getTime())) { //checks that the date is valid (otherwise it is NaN).
        return NextResponse.json({ error: 'Please enter a valid date.'}, { status: 400 })
      }
      if (parsedDate > new Date()) { //parsed = convert in a format that can be manipulated
        return NextResponse.json({ error: 'Sorry, you can’t travel to the future.' }, {status: 400})
      }
      transactionDate = parsedDate //convert data into a manipulable type
    }
  
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        amount,
        type,
        category,
        date: transactionDate,
        note,
      },
    });
  
    return NextResponse.json({ success: true, message:'Transaction updated successfully!', transaction: updatedTransaction }, { status: 200 });
  } catch (error) {
    console.error('Error updating transaction', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
