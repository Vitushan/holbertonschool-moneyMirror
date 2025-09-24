const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  console.log('Created user:', user)

  // Create some sample transactions
  const transactions = [
    {
      title: 'Salaire Octobre',
      description: 'Salaire mensuel',
      amount: 2500.00,
      type: 'INCOME',
      category: 'SALARY',
      userId: user.id,
    },
    {
      title: 'Courses Carrefour',
      description: 'Courses hebdomadaires',
      amount: 85.50,
      type: 'EXPENSE',
      category: 'FOOD',
      userId: user.id,
    },
    {
      title: 'Essence',
      amount: 65.00,
      type: 'EXPENSE',
      category: 'TRANSPORT',
      userId: user.id,
    },
    {
      title: 'Netflix',
      description: 'Abonnement mensuel',
      amount: 15.99,
      type: 'EXPENSE',
      category: 'ENTERTAINMENT',
      userId: user.id,
    },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }

  console.log('Created sample transactions')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })