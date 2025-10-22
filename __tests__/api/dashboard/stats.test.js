// Tests for Dashboard Stats API
// Testing statistics retrieval

jest.mock('@prisma/client', () => {
  const mockMethods = {
    count: jest.fn(),
    findMany: jest.fn(),
  };

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      transaction: mockMethods,
    })),
    __mockTransactionMethods: mockMethods,
  };
});

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() =>
    Promise.resolve({ user: { id: 'test-user-id', email: 'test@example.com' } })
  ),
}));

import { GET } from '../../../src/app/api/dashboard/stats/route';
import { NextRequest } from 'next/server';
import { __mockTransactionMethods } from '@prisma/client';
import { getServerSession } from 'next-auth';

const mockTransaction = __mockTransactionMethods;

describe('Dashboard Stats API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getServerSession.mockResolvedValue({ user: { id: 'test-user-id' } });
  });

  describe('GET /api/dashboard/stats', () => {
    it('should return stats for authenticated user', async () => {
      mockTransaction.count.mockResolvedValue(10);
      mockTransaction.findMany.mockResolvedValue([
        { type: 'income', amount: 1000, category: 'Salary' },
        { type: 'expense', amount: 500, category: 'Food' },
        { type: 'income', amount: 500, category: 'Freelance' }
      ]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/stats?filter=month');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.stats).toBeDefined();
      expect(data.stats.totalUsers).toBe(10);
    });

    it('should return 401 if user is not authenticated', async () => {
      getServerSession.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/dashboard/stats');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('User not authenticated');
    });

    it('should handle filter parameter - week', async () => {
      mockTransaction.count.mockResolvedValue(5);
      mockTransaction.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/stats?filter=week');
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockTransaction.findMany).toHaveBeenCalled();
    });

    it('should handle filter parameter - year', async () => {
      mockTransaction.count.mockResolvedValue(100);
      mockTransaction.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/stats?filter=year');
      const response = await GET(request);

      expect(response.status).toBe(200);
    });

    it('should calculate revenue and growth correctly', async () => {
      mockTransaction.count.mockResolvedValue(10);
      mockTransaction.findMany.mockResolvedValue([
        { type: 'income', amount: 2000 },
        { type: 'expense', amount: 800 }
      ]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/stats');
      const response = await GET(request);
      const data = await response.json();

      expect(data.stats.revenue).toBe(1200);
    });

    it('should handle empty transactions', async () => {
      mockTransaction.count.mockResolvedValue(0);
      mockTransaction.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/stats');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.stats.totalUsers).toBe(0);
    });

    it('should handle database errors', async () => {
      mockTransaction.count.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/dashboard/stats');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });
  });
});
