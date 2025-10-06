import { prisma } from "../../../../lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"


// this route is used to read a single specific transaction from its unique ID.
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const { id } = params // get the ID from the URL
    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return NextResponse.json({ error: "Invalid transaction ID" }, {status: 400 })
    }
    //findFirst allows you to add multiple conditions (id + userId).
    const transaction = await prisma.transaction.findFirst({ // Searches for the matching transaction belonging to the user
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404});
    }
    return NextResponse.json({ success: true, transaction }, { status: 200});

  } catch (error) {
    console.log("Error fetching transaction", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
