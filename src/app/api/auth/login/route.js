import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs' //import bcrypt for compare passwords
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        // Get login data (email and password from login form)
        const { email, password } = await request.json();

        // Basic validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user in Database by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Check if user exists
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Compare password with hashed password in database
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
        console.error('Error in login:', error)
        return NextResponse.json(
            { error: 'Server error: ' + error.message },
            { status: 500 }
        )
    }
}