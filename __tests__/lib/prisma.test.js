// Tests for Prisma client singleton
// Ensures proper initialization and reuse of Prisma client

// Mock PrismaClient before importing
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    transaction: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    }
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('Prisma Client', () => {
  let originalEnv;

  beforeEach(() => {
    // Save original env
    originalEnv = process.env.NODE_ENV;
    // Clear module cache to test different scenarios
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterEach(() => {
    // Restore original env
    process.env.NODE_ENV = originalEnv;
  });

  it('should export a prisma client instance', () => {
    const { prisma } = require('../../src/lib/prisma');
    expect(prisma).toBeDefined();
    expect(prisma).toHaveProperty('user');
    expect(prisma).toHaveProperty('transaction');
  });

  it('should create a new PrismaClient instance', () => {
    const { PrismaClient } = require('@prisma/client');
    const { prisma } = require('../../src/lib/prisma');

    expect(PrismaClient).toHaveBeenCalled();
    expect(prisma).toBeDefined();
  });

  it('should reuse existing prisma client in development', () => {
    process.env.NODE_ENV = 'development';

    // First import
    delete require.cache[require.resolve('../../src/lib/prisma')];
    const { prisma: prisma1 } = require('../../src/lib/prisma');

    // Store in global
    global.prisma = prisma1;

    // Second import should reuse
    delete require.cache[require.resolve('../../src/lib/prisma')];
    const { prisma: prisma2 } = require('../../src/lib/prisma');

    expect(prisma2).toBe(prisma1);
  });

  it('should store prisma client in global in non-production', () => {
    process.env.NODE_ENV = 'development';

    delete require.cache[require.resolve('../../src/lib/prisma')];
    require('../../src/lib/prisma');

    expect(global.prisma).toBeDefined();
  });

  it('should have user model methods', () => {
    const { prisma } = require('../../src/lib/prisma');
    expect(prisma.user).toBeDefined();
    expect(prisma.user.findMany).toBeDefined();
    expect(prisma.user.findUnique).toBeDefined();
    expect(prisma.user.create).toBeDefined();
  });

  it('should have transaction model methods', () => {
    const { prisma } = require('../../src/lib/prisma');
    expect(prisma.transaction).toBeDefined();
    expect(prisma.transaction.findMany).toBeDefined();
    expect(prisma.transaction.findUnique).toBeDefined();
    expect(prisma.transaction.create).toBeDefined();
  });
});
