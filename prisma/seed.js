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

  // Create some sample transactions
  const transactions = [
    {
      title: 'October Salary',
      description: 'Monthly salary',
      amount: 2500.00,
      type: 'INCOME',
      category: 'SALARY',
      userId: user.id,
    },
    {
      title: 'Carrefour Groceries',
      description: 'Weekly groceries',
      amount: 85.50,
      type: 'EXPENSE',
      category: 'FOOD',
      userId: user.id,
    },
    {
      title: 'Gas',
      amount: 65.00,
      type: 'EXPENSE',
      category: 'TRANSPORT',
      userId: user.id,
    },
    {
      title: 'Netflix',
      description: 'Monthly subscription',
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