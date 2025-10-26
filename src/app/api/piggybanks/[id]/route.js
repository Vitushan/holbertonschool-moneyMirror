// API Route: Piggybank individuelle
// PUT: Modifier une tirelire (ajouter/retirer de l'argent, changer les paramètres)
// DELETE: Supprimer une tirelire

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

// PUT - Modifier une tirelire
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const userId = session.user.id
    const { id } = params
    const body = await request.json()

    // Vérifier que la tirelire appartient bien à l'utilisateur
    const existingPiggybank = await prisma.piggybank.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!existingPiggybank) {
      return NextResponse.json({
        error: 'Tirelire non trouvée'
      }, { status: 404 })
    }

    const {
      name,
      targetAmount,
      currentAmount,
      isAutomatic,
      autoPercentage,
      amountToAdd,
      amountToRemove
    } = body

    // Calculer le nouveau montant actuel
    let newCurrentAmount = existingPiggybank.currentAmount

    if (amountToAdd) {
      newCurrentAmount += parseFloat(amountToAdd)
    }

    if (amountToRemove) {
      newCurrentAmount -= parseFloat(amountToRemove)
      if (newCurrentAmount < 0) {
        return NextResponse.json({
          error: 'Le montant ne peut pas être négatif'
        }, { status: 400 })
      }
    }

    if (currentAmount !== undefined) {
      newCurrentAmount = parseFloat(currentAmount)
    }

    // Préparer les données de mise à jour
    const updateData = {
      currentAmount: newCurrentAmount
    }

    if (name !== undefined) updateData.name = name
    if (targetAmount !== undefined) updateData.targetAmount = parseFloat(targetAmount)
    if (isAutomatic !== undefined) updateData.isAutomatic = isAutomatic
    if (autoPercentage !== undefined) updateData.autoPercentage = isAutomatic ? parseFloat(autoPercentage) : null

    // Mettre à jour la tirelire
    const updatedPiggybank = await prisma.piggybank.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      message: 'Tirelire mise à jour avec succès !',
      piggybank: updatedPiggybank
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Supprimer une tirelire
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const userId = session.user.id
    const { id } = params

    // Vérifier que la tirelire appartient bien à l'utilisateur
    const existingPiggybank = await prisma.piggybank.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!existingPiggybank) {
      return NextResponse.json({
        error: 'Tirelire non trouvée'
      }, { status: 404 })
    }

    // Supprimer la tirelire
    await prisma.piggybank.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Tirelire supprimée avec succès !'
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
