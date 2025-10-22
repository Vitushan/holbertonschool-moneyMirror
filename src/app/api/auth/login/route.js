import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        // Récupérer les données de connexion (email et mot de passe du formulaire de connexion)
        const { email, password } = await request.json();

        // Validation de base
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Trouver l'utilisateur dans la base de données par email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Vérifier si l'utilisateur existe
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Comparer le mot de passe avec le mot de passe haché dans la base de données
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // ✨ AJOUT : Créer un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.NEXTAUTH_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        )

        // Retourner avec le token
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            token, // ← Ajout du token
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.error('Erreur lors de la connexion:', error)
        return NextResponse.json(
            { error: 'Server error: ' + error.message },
            { status: 500 }
        )
    }
}