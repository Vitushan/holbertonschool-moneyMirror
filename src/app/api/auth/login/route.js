import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma' //import prisma for speak with MySQL
import bcrypt from 'bcryptjs' //import bcrypt for compare passwords

export async function POST(request) {
    try {
        console.log('POST request received at /api/auth/login')

        //Get login data (email and password from login form)
        const { email, password } = await request.json()
        console.log('Login attempt for:', email)

        // Basic validation
        if (!email || !password) {
            return NextResponse.json(
                {error: 'Email and password are required'},
                { status: 400 }
            )
        }

        //Find user in Database by email
        const user = await prisma.user.findUnique({
            where: { email }
        })

        //Check if user exists
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        console.log('User found:', user.email)

        //Compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password '},
                { status: 401}
            )
        }

        //If login successful: return user info without password
        return NextResponse.json({
            success: true,
            message: 'Login successful',
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