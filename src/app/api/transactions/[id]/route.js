import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth" // Importe la fonction NextAuth qui permet de récupérer la session côté serveur (vérifier si l'utilisateur est connecté)
import { authOptions } from '../../auth/[...nextauth]/route' // Correction du chemin d'import pour NextAuth config
import { NextResponse } from "next/server" // Utilitaire Next.js pour construire et retourner des réponses HTTP depuis un gestionnaire de route (App Router) utilisé pour retourner du JSON avec un statut.


// Ceci est un findOne pour mon CRUD (pour lire une transaction spécifique)
// Cette route est utilisée pour lire une seule transaction spécifique à partir de son ID unique.
export async function GET(request, { params }) { // { params } = Next.js injecte les paramètres dynamiques de l'URL ici (exemple: /api/transactions/[id], params.id contient l'ID)
  try {
    let userId = null;
    // Vérifier Authorization: Bearer <token>
    const authHeader = request.headers.get('authorization');
    let jwtLib;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      jwtLib = (await import('jsonwebtoken')).default;
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwtLib.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Jeton invalide' }, { status: 401 });
      }
    } else {
      // Sinon, utiliser la session NextAuth
      const session = await getServerSession(authOptions);
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }
    if (!userId) {
      return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }
    const { id } = params;
    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return NextResponse.json({ error: "ID de transaction invalide" }, {status: 400 })
    }
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!transaction) {
      return NextResponse.json({ error: "Transaction introuvable" }, { status: 404});
    }
    return NextResponse.json({ success: true, transaction }, { status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    let userId = null;
    // Vérifier Authorization: Bearer <token>
    const authHeader = request.headers.get('authorization');
    let jwtLib;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      jwtLib = (await import('jsonwebtoken')).default;
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwtLib.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Jeton invalide' }, { status: 401 });
      }
    } else {
      // Sinon, utiliser la session NextAuth
      const session = await getServerSession(authOptions);
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Veuillez vous connecter pour continuer.' }, { status:401 })
    }

    const { id } = params;
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'ID de transaction invalide' }, { status: 400 })
    }
    const { amount, type, category, date, note, description, currency } = await request.json();
    if (typeof amount !== 'number' || amount <= 0 || !['income', 'expense'].includes(type) || !category) {
      return NextResponse.json({ error: 'Veuillez remplir tous les champs obligatoires.' }, {status: 400});
    }

    const transaction = await prisma.transaction.findFirst({
      where: { id, userId }
    });
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction introuvable'}, { status: 404 })
    }

    let transactionDate = transaction.date;
    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: 'Veuillez entrer une date valide.'}, { status: 400 })
      }
      if (parsedDate > new Date()) {
        return NextResponse.json({ error: 'Désolé, vous ne pouvez pas voyager dans le futur.' }, {status: 400})
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

    return NextResponse.json({ success: true, message:'Transaction mise à jour avec succès !', transaction: updatedTransaction }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function DELETE(request, { params}) {
  try {
    let userId = null;
    // Vérifier Authorization: Bearer <token>
    const authHeader = request.headers.get('authorization');
    let jwtLib;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      jwtLib = (await import('jsonwebtoken')).default;
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwtLib.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
        userId = decoded.id;
      } catch (err) {
        return NextResponse.json({ error: 'Jeton invalide' }, { status: 401 });
      }
    } else {
      // Sinon, utiliser la session NextAuth
      const session = await getServerSession(authOptions);
      if (session && session.user && session.user.id) {
        userId = session.user.id;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Veuillez vous connecter pour continuer'}, { status: 401 });
    }

    const { id } = params;
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'ID de transaction invalide' }, { status: 400});
    }

    const transaction = await prisma.transaction.findFirst({ where: { id, userId }});
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction introuvable' }, { status: 400 });
    }

    await prisma.transaction.delete({ where: { id: transaction.id }});
    return NextResponse.json({ success: true, message: 'Transaction supprimée avec succès' }, { status: 200});
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500});
  }
}
