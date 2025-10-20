// transactions.test.js (test for transactions)
// Unit and integration tests for the API endpoints related to transactions.
// Verifies CRUD functionalities: create, read, update, and delete.

import { GET, POST } from "@/app/api/transactions/route";
import { GET as GET_BY_ID, PUT, DELETE } from "@/app/api/transactions/[id]/route";
import { NextRequest } from "next/server"; // Fake HTTP request for testing
import { prisma } from "@/lib/prisma"; // Import Prisma ORM

// Mock Prisma to avoid real database calls during tests
jest.mock('@/lib/prisma', () => ({ // Replace Prisma with a fake version
    prisma: {
        // findMany is a method to get several data
        transaction: {
            findMany: jest.fn(), // jest.fn() = create a spy function that can be controlled (to not touch the real DB) [find several transactions]
            findFirst: jest.fn(), // Find the first transaction
            create: jest.fn(), // Create a transaction
            update: jest.fn(), // Update a transaction
            delete: jest.fn(), // Delete a transaction
            count: jest.fn(), // Count the number of transactions
        },
    },
}));

// Mock NextAuth to simulate authenticated user
jest.mock('next-auth', () => ({
    getServerSession: jest.fn(() =>
        Promise.resolve({ user: { id: 'test-user-id', email: 'test@example.com' } })
    ),
}));

describe('Transactions API', () => { // Regroup all test transactions API
    // Clear all mocks before each test to ensure clean state
    beforeEach(() => {  // Runs before each test
        jest.clearAllMocks(); // Resets the counters (each test starts clean)
    });

    // Tests for GET /api/transactions (retrieve all transactions)
    describe('GET /api/transactions', () => {
        it("should return all transactions for authenticated user", async () => {
            // Mock data to be returned by Prisma
            const mockTransactions = [
                {
                    id: '1',
                    amount: 100,
                    type: 'income',
                    category: 'salary',
                    description: '',
                    note: '',
                    currency: 'EUR',
                    currencyType: 'currency',
                    date: new Date("2025-10-19"),
                    userId: "test-user-id",
                },
            ];

            // Mock Prisma responses - tell Prisma what to return
            prisma.transaction.findMany.mockResolvedValue(mockTransactions);
            prisma.transaction.count.mockResolvedValue(1);

            // Create a mock GET request
            const request = new NextRequest('http://localhost:3000/api/transactions');

            // Call the API endpoint
            const response = await GET(request);
            const data = await response.json();

            // Verify response status and data
            expect(response.status).toBe(200); // HTTP 200 = OK
            expect(data.transactions).toEqual(mockTransactions); // Data matches
            expect(prisma.transaction.findMany).toHaveBeenCalledTimes(1); // Called once
        });

        it('should return 401 if user is not authenticated', async () => {
            // Mock unauthenticated session (no user logged in)
            const { getServerSession } = require('next-auth');
            getServerSession.mockResolvedValueOnce(null); // Return null = no user

            // Create a mock GET request
            const request = new NextRequest('http://localhost:3000/api/transactions');
            
            // Call the API endpoint
            const response = await GET(request);
            const data = await response.json();

            // Verify unauthorized response
            expect(response.status).toBe(401); // HTTP 401 = Unauthorized
            expect(data.error).toBe('User not authenticated'); // Error message
        });
    });

    // Tests for POST /api/transactions (create new transaction)
    describe('POST /api/transactions', () => {
        it('should create a new transaction', async () => {
            // New transaction data to send
            const newTransaction = {
                amount: 50,
                type: 'expense',
                category: 'food',
                description: 'groceries',
                note: '',
                currency: 'EUR',
                currencyType: 'currency',
                date: '2025-01-15',
            };

            // Expected created transaction (what Prisma should return)
            const createdTransaction = {
                id: '2',
                ...newTransaction, // Spread operator: copy all properties
                date: new Date(newTransaction.date), // Convert string to Date
                userId: 'test-user-id'
            };

            // Mock Prisma create response
            prisma.transaction.create.mockResolvedValue(createdTransaction);

            // Create mock POST request with body
            const request = new NextRequest('http://localhost:3000/api/transactions', {
                method: 'POST',
                body: JSON.stringify(newTransaction), // Convert object to JSON
            });

            // Call the API endpoint
            const response = await POST(request);
            const data = await response.json();

            // Verify creation success
            expect(response.status).toBe(201); // HTTP 201 = Created
            expect(data.transaction).toMatchObject({ // Check if object contains these properties
                amount: 50,
                type: 'expense',
                category: 'food',
            });
            expect(prisma.transaction.create).toHaveBeenCalledTimes(1); // Called once
        });

        it('should return 400 if required fields are missing', async () => {
            // Invalid transaction (missing type and category)
            const invalidTransaction = {
                amount: 40,
                // Missing: type, category, date (required fields)
            };

            // Create mock POST request with invalid data
            const request = new NextRequest('http://localhost:3000/api/transactions', {
                method: 'POST',
                body: JSON.stringify(invalidTransaction),
            });

            // Call the API endpoint
            const response = await POST(request);
            const data = await response.json();

            // Verify validation error
            expect(response.status).toBe(400); // HTTP 400 = Bad Request
            expect(data.error).toBeDefined(); // Error message exists
        });
    });

    // Tests for GET /api/transactions/[id] (retrieve one transaction by ID)
    describe('GET /api/transactions/[id]', () => {
        it('should return a single transaction by ID', async () => {
            
            // Mock transaction data
            const mockTransaction = {
                id: '1',
                amount: 100,
                type: 'income',
                category: 'salary',
                description: 'monthly salary',
                note: 'test note',
                currency: 'EUR',
                currencyType: 'currency',
                date: new Date('2025-10-10'),
                userId: 'test-user-id',
            };

            // Mock Prisma response - tell Prisma to return this transaction
            prisma.transaction.findFirst.mockResolvedValue(mockTransaction);

            // Create mock request with ID in URL
            const request = new NextRequest('http://localhost:3000/api/transactions/1');

            // Call the API endpoint with ID parameter
            const response = await GET_BY_ID(request, { params: { id: '1' } });
            const data = await response.json();

            // Verify response
            expect(response.status).toBe(200); // HTTP 200 = OK
            expect(data.transaction).toEqual(mockTransaction); // Data matches
            expect(prisma.transaction.findFirst).toHaveBeenCalledWith({
                where: { id: '1', userId: 'test-user-id' }, // Verify correct query
            });
        });

        it('should return 404 if transaction not found', async () => {

            // Mock no transaction found - Prisma returns null
            prisma.transaction.findFirst.mockResolvedValue(null);

            // Create mock request with non-existent ID
            const request = new NextRequest('http://localhost:3000/api/transactions/999');

            // Call the API endpoint
            const response = await GET_BY_ID(request, { params: { id: '999' } });
            const data = await response.json();

            // Verify 404 response
            expect(response.status).toBe(404); // HTTP 404 = Not Found
            expect(data.error).toBe('Transaction not found'); // Error message
        });
    });

    // Tests for PUT /api/transactions/[id] (update a transaction)
    describe('PUT /api/transactions/[id]', () => {
        it('should update a transaction', async () => {
            // Existing transaction (before update)
            const existingTransaction = {
                id: '1',
                amount: 100,
                type: 'income',
                category: 'Salary',
                userId: 'test-user-id',
                date: new Date('2025-10-10'),
            };

            // Updated data to send
            const updatedData = {
                amount: 150,
                type: 'income',
                category: 'Bonus',
                description: 'Year-end bonus',
                note: 'Updated',
                currency: 'EUR',
                date: '2025-10-12'
            };

            // Mock Prisma responses
            prisma.transaction.findFirst.mockResolvedValue(existingTransaction); // Transaction exists
            prisma.transaction.update.mockResolvedValue({
                ...existingTransaction,
                ...updatedData, // Merge old and new data
                date: new Date(updatedData.date),
            });

            // Create mock PUT request
            const request = new NextRequest('http://localhost:3000/api/transactions/1', {
                method: 'PUT',
                body: JSON.stringify(updatedData),
            });

            // Call the API endpoint
            const response = await PUT(request, { params: { id: '1'} });
            const data = await response.json();

            // Verify update success
            expect(response.status).toBe(200); // HTTP 200 = OK
            expect(data.message).toBe('Transaction updated successfully!'); // Success message
            expect(prisma.transaction.update).toHaveBeenCalledTimes(1); // Called once
        });

        it('should return 404 if transaction to update not found', async () => {
            // Mock no transaction found
            prisma.transaction.findFirst.mockResolvedValue(null);

            // Create mock PUT request
            const request = new NextRequest('http://localhost:3000/api/transactions/999', {
                method: 'PUT',
                body: JSON.stringify({ amount: 100, type: 'income', category: 'test' }),
            });

            // Call the API endpoint
            const response = await PUT(request, { params: { id: '999' } });
            const data = await response.json();

            // Verify 404 response
            expect(response.status).toBe(404); // HTTP 404 = Not Found
            expect(data.error).toBe('Transaction not found '); // Error message
        });
    });

    // Tests for DELETE /api/transactions/[id] (delete a transaction)
    describe('DELETE /api/transactions/[id]', () => {
        it('should delete a transaction', async () => {
            // Existing transaction to delete
            const existingTransaction = {
                id: '1',
                amount: 100,
                type: 'income',
                category: 'salary',
                userId: 'test-user-id',
                date: new Date('2025-10-09'),
            };

            // Mock Prisma responses
            prisma.transaction.findFirst.mockResolvedValue(existingTransaction); // Transaction exists
            prisma.transaction.delete.mockResolvedValue(existingTransaction); // Transaction deleted

            // Create mock DELETE request
            const request = new NextRequest('http://localhost:3000/api/transactions/1', {
                method: 'DELETE',
            });

            // Call the API endpoint
            const response = await DELETE(request, { params: { id: '1' } });
            const data = await response.json();

            // Verify deletion success
            expect(response.status).toBe(200); // HTTP 200 = OK
            expect(data.message).toBe('Transaction deleted successfully!'); // Success message
            expect(prisma.transaction.delete).toHaveBeenCalledTimes(1); // Called once
            expect(prisma.transaction.delete).toHaveBeenCalledWith({
                where: { id: '1' }, // Verify correct ID
            });
        });

        it('should return 404 if transaction to delete not found', async () => {
            // Mock no transaction found
            prisma.transaction.findFirst.mockResolvedValue(null);

            // Create mock DELETE request
            const request = new NextRequest('http://localhost:3000/api/transactions/999', {
                method: 'DELETE',
            });

            // Call the API endpoint
            const response = await DELETE(request, { params: { id: '999' } });
            const data = await response.json();

            // Verify 404 response
            expect(response.status).toBe(404); // HTTP 404 = Not Found
            expect(data.error).toBe('Transaction not found'); // Error message
        });
    });
});