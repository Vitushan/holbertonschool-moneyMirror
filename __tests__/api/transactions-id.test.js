// Tests for transactions/[id] API route (GET, PUT, DELETE)
import { GET, PUT, DELETE } from '../../src/app/api/transactions/[id]/route';
import { prisma } from '../../src/lib/prisma';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../../src/lib/prisma', () => ({
  prisma: {
    transaction: {
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('jsonwebtoken');

const { getServerSession } = require('next-auth');

describe('Transactions/[id] API Route', () => {
  let mockTransaction;
  let mockRequest;
  let mockParams;

  beforeEach(() => {
    jest.clearAllMocks();

    mockTransaction = {
      id: 'transaction-123',
      userId: 'user-123',
      amount: 100,
      type: 'expense',
      category: 'Food',
      date: new Date('2024-01-01'),
      note: 'Test note',
      description: 'Test description',
      currency: 'USD',
    };

    mockParams = { id: 'transaction-123' };
  });

  // ========== GET Tests ==========
  describe('GET - Read single transaction', () => {
    it('should get transaction with valid Bearer token', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await GET(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.transaction.id).toBe(mockTransaction.id);
      expect(data.transaction.userId).toBe(mockTransaction.userId);
      expect(data.transaction.amount).toBe(mockTransaction.amount);
    });

    it('should get transaction with NextAuth session', async () => {
      getServerSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      };

      const response = await GET(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return 401 if not authenticated', async () => {
      getServerSession.mockResolvedValue(null);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      };

      const response = await GET(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Utilisateur non authentifié');
    });

    it('should return 401 with invalid Bearer token', async () => {
      jwt.verify = jest.fn().mockImplementation(() => {
        throw new Error('Jeton invalide');
      });

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer invalid-token'),
        },
      };

      const response = await GET(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Jeton invalide');
    });

    it('should return 400 with invalid transaction ID', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await GET(mockRequest, { params: { id: '' } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de transaction invalide');
    });

    it('should return 404 if transaction not found', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(null);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await GET(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Transaction introuvable');
    });

    it('should handle database errors', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockRejectedValue(new Error('DB error'));

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await GET(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Erreur interne du serveur');
    });
  });

  // ========== PUT Tests ==========
  describe('PUT - Update transaction', () => {
    let mockUpdatedTransaction;

    beforeEach(() => {
      mockUpdatedTransaction = { ...mockTransaction, amount: 200 };
    });

    it('should update transaction with valid Bearer token', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);
      prisma.transaction.update.mockResolvedValue(mockUpdatedTransaction);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({
          amount: 200,
          type: 'expense',
          category: 'Food',
          date: '2024-01-01',
          note: 'Updated note',
          description: 'Updated description',
          currency: 'USD',
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Transaction mise à jour avec succès !');
    });

    it('should update transaction with NextAuth session', async () => {
      getServerSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);
      prisma.transaction.update.mockResolvedValue(mockUpdatedTransaction);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
        json: jest.fn().mockResolvedValue({
          amount: 200,
          type: 'expense',
          category: 'Food',
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return 401 if not authenticated', async () => {
      getServerSession.mockResolvedValue(null);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
        json: jest.fn().mockResolvedValue({}),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Veuillez vous connecter pour continuer.');
    });

    it('should return 400 with invalid transaction ID', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({}),
      };

      const response = await PUT(mockRequest, { params: { id: '   ' } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid Transaction Id');
    });

    it('should return 400 with invalid amount', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({
          amount: -10,
          type: 'expense',
          category: 'Food',
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Veuillez remplir tous les champs obligatoires.');
    });

    it('should return 400 with invalid type', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({
          amount: 100,
          type: 'invalid-type',
          category: 'Food',
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Veuillez remplir tous les champs obligatoires.');
    });

    it('should return 404 if transaction not found', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(null);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({
          amount: 200,
          type: 'expense',
          category: 'Food',
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Transaction introuvable');
    });

    it('should return 400 with invalid date format', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({
          amount: 200,
          type: 'expense',
          category: 'Food',
          date: 'invalid-date',
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Veuillez entrer une date valide.');
    });

    it('should return 400 with future date', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);

      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({
          amount: 200,
          type: 'expense',
          category: 'Food',
          date: futureDate.toISOString(),
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("future");
    });

    it('should handle database errors', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockRejectedValue(new Error('DB error'));

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
        json: jest.fn().mockResolvedValue({
          amount: 200,
          type: 'expense',
          category: 'Food',
        }),
      };

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Erreur interne du serveur');
    });
  });

  // ========== DELETE Tests ==========
  describe('DELETE - Remove transaction', () => {
    it('should delete transaction with valid Bearer token', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);
      prisma.transaction.delete.mockResolvedValue(mockTransaction);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await DELETE(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Transaction supprimée avec succès');
    });

    it('should delete transaction with NextAuth session', async () => {
      getServerSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      prisma.transaction.findFirst.mockResolvedValue(mockTransaction);
      prisma.transaction.delete.mockResolvedValue(mockTransaction);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      };

      const response = await DELETE(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return 401 if not authenticated', async () => {
      getServerSession.mockResolvedValue(null);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      };

      const response = await DELETE(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Veuillez vous connecter pour continuer');
    });

    it('should return 401 with invalid Bearer token', async () => {
      jwt.verify = jest.fn().mockImplementation(() => {
        throw new Error('Jeton invalide');
      });

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer invalid-token'),
        },
      };

      const response = await DELETE(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Jeton invalide');
    });

    it('should return 400 with invalid transaction ID', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await DELETE(mockRequest, { params: { id: '' } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de transaction invalide');
    });

    it('should return 400 if transaction not found', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockResolvedValue(null);

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await DELETE(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Transaction introuvable');
    });

    it('should handle database errors', async () => {
      jwt.verify = jest.fn().mockReturnValue({ id: 'user-123' });
      prisma.transaction.findFirst.mockRejectedValue(new Error('DB error'));

      mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('Bearer valid-token'),
        },
      };

      const response = await DELETE(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Erreur interne du serveur');
    });
  });
});
