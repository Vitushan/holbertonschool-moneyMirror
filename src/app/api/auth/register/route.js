import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return Response.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return Response.json(
        { error: 'Le nom doit contenir au moins 2 caractères' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Format d\'email invalide' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return Response.json({
      success: true,
      message: 'Utilisateur créé avec succès !',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
    
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  }
}

export async function GET() {
  return Response.json({ message: 'La méthode GET fonctionne ! L\'API est en ligne !' })
}