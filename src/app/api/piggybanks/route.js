// API Route: Piggybanks
// GET: Récupérer toutes les tirelires de l'utilisateur
// POST: Créer une nouvelle tirelire

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

// GET - Récupérer toutes les tirelires
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const userId = session.user.id

    // Récupérer toutes les tirelires de l'utilisateur
    const piggybanks = await prisma.piggybank.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      piggybanks
    }, { status: 200 })

  } catch (error) {
    console.error('Erreur lors de la récupération des tirelires:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST - Créer une nouvelle tirelire
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()

    const {
      name,
      category,
      emoji,
      targetAmount,
      isAutomatic,
      autoPercentage,
      linkedPiggybankId
    } = body

    // Validation
    if (!name || !category || !emoji || !targetAmount) {
      return NextResponse.json({
        error: 'Tous les champs obligatoires doivent être remplis'
      }, { status: 400 })
    }

    if (targetAmount <= 0) {
      return NextResponse.json({
        error: 'Le montant objectif doit être positif'
      }, { status: 400 })
    }

    if (isAutomatic && (!autoPercentage || autoPercentage <= 0 || autoPercentage > 100)) {
      return NextResponse.json({
        error: 'Le pourcentage automatique doit être entre 1 et 100'
      }, { status: 400 })
    }

    // Créer la tirelire
    const piggybank = await prisma.piggybank.create({
      data: {
        userId,
        name,
        category,
        emoji,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
        isAutomatic: isAutomatic || false,
        autoPercentage: isAutomatic ? parseFloat(autoPercentage) : null,
        linkedPiggybankId: linkedPiggybankId || null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Tirelire créée avec succès !',
      piggybank
    }, { status: 201 })

  } catch (error) {
    console.error('Erreur lors de la création de la tirelire:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
