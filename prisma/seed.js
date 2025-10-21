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

  // Create sample transactions with different dates
  const now = new Date()

  const transactions = [
    // This week
    {
      amount: 3000.00,
      type: 'income',
      category: 'Salary',
      date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      note: 'Monthly salary',
      description: 'October salary',
      currency: 'USD',
      userId: user.id,
    },
    {
      amount: 150.50,
      type: 'expense',
      category: 'Food',
      date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      note: 'Groceries',
      description: 'Carrefour shopping',
      currency: 'USD',
      userId: user.id,
    },
    {
      amount: 65.00,
      type: 'expense',
      category: 'Transport',
      date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      note: 'Gas station',
      description: 'Fill up tank',
      currency: 'USD',
      userId: user.id,
    },
    {
      amount: 45.99,
      type: 'expense',
      category: 'Entertainment',
      date: now,
      note: 'Streaming services',
      description: 'Netflix + Spotify',
      currency: 'USD',
      userId: user.id,
    },
    // This month
    {
      amount: 2800.00,
      type: 'income',
      category: 'Salary',
      date: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      note: 'Previous salary',
      description: 'September salary',
      currency: 'USD',
      userId: user.id,
    },
    {
      amount: 200.00,
      type: 'expense',
      category: 'Shopping',
      date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      note: 'Clothing',
      description: 'New clothes',
      currency: 'USD',
      userId: user.id,
    },
    {
      amount: 85.00,
      type: 'expense',
      category: 'Food',
      date: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
      note: 'Restaurant',
      description: 'Dinner with friends',
      currency: 'USD',
      userId: user.id,
    },
    // This year
    {
      amount: 500.00,
      type: 'income',
      category: 'Freelance',
      date: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
      note: 'Side project',
      description: 'Website development',
      currency: 'USD',
      userId: user.id,
    },
    {
      amount: 1200.00,
      type: 'expense',
      category: 'Housing',
      date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      note: 'Rent',
      description: 'Monthly rent payment',
      currency: 'USD',
      userId: user.id,
    },
    {
      amount: 75.00,
      type: 'expense',
      category: 'Utilities',
      date: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
      note: 'Electricity bill',
      description: 'Electric company',
      currency: 'USD',
      userId: user.id,
    },
  ]

  console.log('Creating transactions...')
  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }
  console.log(`✅ Created ${transactions.length} sample transactions`)
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