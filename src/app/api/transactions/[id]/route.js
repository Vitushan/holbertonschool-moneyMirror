import { prisma } from "../../../../lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"



export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const { id } = params // get the ID from the URL

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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}