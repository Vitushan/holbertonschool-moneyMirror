// Global setup file for Playwright E2E tests
// This file runs once before all tests to prepare the test environment

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Initialize Prisma client for database operations
const prisma = new PrismaClient();

// Test user credentials that will be used in E2E tests
const TEST_USER = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

// Global setup function
export default async function globalSetup() {
  try {
    // Hash the test user password using bcrypt
    const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);

    // Create or update the test user in the database
    // Using upsert to avoid duplicate errors if user already exists
    await prisma.user.upsert({
      where: { email: TEST_USER.email },
      update: {
        password: hashedPassword,
        name: TEST_USER.name,
      },
      create: {
        name: TEST_USER.name,
        email: TEST_USER.email,
        password: hashedPassword,
      },
    });

    // Close the Prisma connection
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error in global setup:', error);
    await prisma.$disconnect();
    throw error;
  }
}
