// Tests for Dashboard Charts API
// Testing chart data retrieval

jest.mock('@prisma/client', () => {
  const mockMethods = {
    findMany: jest.fn(),
    groupBy: jest.fn(),
  };

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      transaction: mockMethods,
    })),
    __mockTransactionMethods: mockMethods,
  };
});

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(() =>
    Promise.resolve({ user: { id: 'test-user-id', email: 'test@example.com' } })
  ),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
}));

import { GET } from '../../../src/app/api/dashboard/charts/route';
import { NextRequest } from 'next/server';
import { __mockTransactionMethods } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const mockTransaction = __mockTransactionMethods;

describe('Dashboard Charts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getServerSession.mockResolvedValue({ user: { id: 'test-user-id' } });
  });

  describe('GET /api/dashboard/charts', () => {
    it('should return chart data for authenticated user', async () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      mockTransaction.findMany.mockResolvedValue([
        { date: today, amount: 100, type: 'income', category: 'Salary' },
        { date: yesterday, amount: 50, type: 'expense', category: 'Food' }
      ]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts?filter=month');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.lineChartData).toBeDefined();
      expect(data.pieChartData).toBeDefined();
      expect(data.barChartData).toBeDefined();
    });

    it('should return 401 if user is not authenticated', async () => {
      getServerSession.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Utilisateur non authentifié');
    });

    it('should handle week filter', async () => {
      mockTransaction.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts?filter=week');
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockTransaction.findMany).toHaveBeenCalled();
    });

    it('should handle year filter', async () => {
      mockTransaction.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts?filter=year');
      const response = await GET(request);

      expect(response.status).toBe(200);
    });

    it('should return arrays for all chart types', async () => {
      mockTransaction.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts');
      const response = await GET(request);
      const data = await response.json();

      expect(Array.isArray(data.lineChartData)).toBe(true);
      expect(Array.isArray(data.pieChartData)).toBe(true);
      expect(Array.isArray(data.barChartData)).toBe(true);
    });

    it('should group transactions by category for pie chart', async () => {
      mockTransaction.findMany.mockResolvedValue([
        { date: new Date('2025-01-01'), category: 'Food', amount: 100, type: 'expense' },
        { date: new Date('2025-01-02'), category: 'Food', amount: 50, type: 'expense' },
        { date: new Date('2025-01-03'), category: 'Salary', amount: 2000, type: 'income' }
      ]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts');
      const response = await GET(request);
      const data = await response.json();

      expect(data.pieChartData.length).toBeGreaterThan(0);
    });

    it('should handle empty transactions', async () => {
      mockTransaction.findMany.mockResolvedValue([]);

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.lineChartData).toEqual([]);
      expect(data.pieChartData).toEqual([]);
      expect(data.barChartData).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockTransaction.findMany.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/dashboard/charts');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });
  });
});
