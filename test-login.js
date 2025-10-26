const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  try {
    // Chercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: 'integration@example.com' }
    });

    if (!user) {
      console.log('❌ Utilisateur non trouvé !');
      return;
    }

    console.log('✅ Utilisateur trouvé !');
    console.log('Email:', user.email);
    console.log('Password hash:', user.password.substring(0, 20) + '...');

    // Tester le mot de passe
    const isValid = await bcrypt.compare('testpassword123', user.password);

    if (isValid) {
      console.log('✅ Le mot de passe correspond !');
    } else {
      console.log('❌ Le mot de passe ne correspond PAS !');

      // Recréer le hash
      const newHash = await bcrypt.hash('testpassword123', 10);
      console.log('\nNouveau hash créé:', newHash.substring(0, 20) + '...');

      // Tester le nouveau hash
      const newIsValid = await bcrypt.compare('testpassword123', newHash);
      console.log('Test nouveau hash:', newIsValid ? '✅ OK' : '❌ FAIL');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
