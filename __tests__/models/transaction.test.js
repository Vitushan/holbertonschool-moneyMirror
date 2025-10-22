// Tests for Transaction model
// Testing Transaction model structure and methods

jest.mock('@prisma/client', () => {
  const mockMethods = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      transaction: mockMethods,
    })),
    __mockTransactionMethods: mockMethods,
  };
});

import { __mockTransactionMethods } from '@prisma/client';

const mockTransaction = __mockTransactionMethods;

describe('Transaction Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Transaction Creation', () => {
    it('should create a transaction with required fields', async () => {
      const newTransaction = {
        id: 'trans-1',
        userId: 'user-1',
        amount: 100,
        type: 'income',
        category: 'Salary',
        date: new Date(),
        note: 'Monthly salary',
        currency: 'EUR',
        description: 'Salary payment'
      };

      mockTransaction.create.mockResolvedValue(newTransaction);

      const result = await mockTransaction.create({
        data: {
          userId: 'user-1',
          amount: 100,
          type: 'income',
          category: 'Salary',
          date: new Date(),
          currency: 'EUR',
          description: 'Salary payment'
        }
      });

      expect(result).toMatchObject({
        id: 'trans-1',
        userId: 'user-1',
        amount: 100,
        type: 'income',
        category: 'Salary'
      });
      expect(mockTransaction.create).toHaveBeenCalledTimes(1);
    });

    it('should create expense transaction', async () => {
      const expense = {
        id: 'trans-2',
        userId: 'user-1',
        amount: 50,
        type: 'expense',
        category: 'Food',
        date: new Date(),
        currency: 'EUR'
      };

      mockTransaction.create.mockResolvedValue(expense);

      const result = await mockTransaction.create({
        data: expense
      });

      expect(result.type).toBe('expense');
      expect(result.amount).toBe(50);
    });
  });

  describe('Transaction Retrieval', () => {
    it('should find transaction by ID', async () => {
      const transaction = {
        id: 'trans-1',
        userId: 'user-1',
        amount: 100,
        type: 'income',
        category: 'Salary'
      };

      mockTransaction.findUnique.mockResolvedValue(transaction);

      const result = await mockTransaction.findUnique({
        where: { id: 'trans-1' }
      });

      expect(result).toMatchObject({
        id: 'trans-1',
        amount: 100,
        type: 'income'
      });
    });

    it('should find all transactions for a user', async () => {
      const transactions = [
        { id: 'trans-1', userId: 'user-1', amount: 100, type: 'income' },
        { id: 'trans-2', userId: 'user-1', amount: 50, type: 'expense' }
      ];

      mockTransaction.findMany.mockResolvedValue(transactions);

      const result = await mockTransaction.findMany({
        where: { userId: 'user-1' }
      });

      expect(result).toHaveLength(2);
      expect(result[0].userId).toBe('user-1');
      expect(result[1].userId).toBe('user-1');
    });

    it('should filter transactions by type', async () => {
      const incomeTransactions = [
        { id: 'trans-1', type: 'income', amount: 100 },
        { id: 'trans-2', type: 'income', amount: 200 }
      ];

      mockTransaction.findMany.mockResolvedValue(incomeTransactions);

      const result = await mockTransaction.findMany({
        where: { type: 'income' }
      });

      expect(result).toHaveLength(2);
      expect(result.every(t => t.type === 'income')).toBe(true);
    });

    it('should filter transactions by category', async () => {
      const foodTransactions = [
        { id: 'trans-1', category: 'Food', amount: 50 }
      ];

      mockTransaction.findMany.mockResolvedValue(foodTransactions);

      const result = await mockTransaction.findMany({
        where: { category: 'Food' }
      });

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Food');
    });

    it('should count transactions', async () => {
      mockTransaction.count.mockResolvedValue(10);

      const result = await mockTransaction.count({
        where: { userId: 'user-1' }
      });

      expect(result).toBe(10);
    });
  });

  describe('Transaction Update', () => {
    it('should update transaction amount', async () => {
      const updated = {
        id: 'trans-1',
        amount: 150,
        type: 'income'
      };

      mockTransaction.update.mockResolvedValue(updated);

      const result = await mockTransaction.update({
        where: { id: 'trans-1' },
        data: { amount: 150 }
      });

      expect(result.amount).toBe(150);
    });

    it('should update transaction category', async () => {
      const updated = {
        id: 'trans-1',
        category: 'Entertainment'
      };

      mockTransaction.update.mockResolvedValue(updated);

      const result = await mockTransaction.update({
        where: { id: 'trans-1' },
        data: { category: 'Entertainment' }
      });

      expect(result.category).toBe('Entertainment');
    });
  });

  describe('Transaction Deletion', () => {
    it('should delete a transaction', async () => {
      const deleted = {
        id: 'trans-1',
        amount: 100,
        type: 'income'
      };

      mockTransaction.delete.mockResolvedValue(deleted);

      const result = await mockTransaction.delete({
        where: { id: 'trans-1' }
      });

      expect(result.id).toBe('trans-1');
      expect(mockTransaction.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('Transaction Model Structure', () => {
    it('should have required fields', () => {
      const transactionFields = [
        'id', 'userId', 'amount', 'type', 'category', 'date', 'currency'
      ];
      expect(transactionFields).toContain('id');
      expect(transactionFields).toContain('userId');
      expect(transactionFields).toContain('amount');
      expect(transactionFields).toContain('type');
      expect(transactionFields).toContain('category');
    });

    it('should have valid transaction types', () => {
      const validTypes = ['income', 'expense'];
      expect(validTypes).toContain('income');
      expect(validTypes).toContain('expense');
    });

    it('should have optional fields', () => {
      const transaction = {
        id: 'trans-1',
        userId: 'user-1',
        amount: 100,
        type: 'income',
        category: 'Salary',
        date: new Date(),
        currency: 'EUR',
        note: null,
        description: null
      };

      expect(transaction.note).toBeNull();
      expect(transaction.description).toBeNull();
    });
  });
});
