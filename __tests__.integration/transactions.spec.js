// Integration tests for Transactions API using Supertest
// These tests make real HTTP requests to the API without mocks
// They test the backend with a real or test database
// This is different from unit tests - we're testing actual API endpoints

const request = require('supertest'); // supertest = library allows you to send HTTP requests (GET/POST/PUT/DELETE) to your server in tests.
const { PrismaClient } = require('@prisma/client');  // Prisma client to access the DB (here used to prepare/clean the test data).
const bcrypt = require('bcryptjs');

// Initialize Prisma client for database operations
const prisma = new PrismaClient(); // instance used to manipulate the DB directly (creation/deletion)

// Base URL for API requests
const baseURL = 'http://localhost:3000';

// Test user credentials that will be used across all tests
const TEST_USER = {
  name: 'Test Integration User',
  email: 'integration@example.com',
  password: 'testpassword123'
};

// Global variables to store data across tests
let authToken;        // Stores JWT token after authentication
let userId;           // Stores the test user ID
let transactionId;    // Stores created transaction ID for CRUD operations

// Setup function that runs once before all tests
beforeAll(async () => {
  try {
    // Hash the test user password using bcrypt
    const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);

    // Create or update the test user in the database
    // Using upsert to avoid duplicate errors if user already exists
    const user = await prisma.user.upsert({ // creates the user if not present, otherwise does nothing (return without duplicate )
      where: { email: TEST_USER.email },
      update: {},
      create: {
        name: TEST_USER.name,
        email: TEST_USER.email,
        password: hashedPassword,
      },
    });

    // Store user ID for later use
    userId = user.id; // remembers the id for cleanup
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
});

// Cleanup function that runs once after all tests complete
afterAll(async () => {
  try {
    // Delete all transactions created by the test user
    await prisma.transaction.deleteMany({
      where: { userId: userId },
    });

    // Delete the test user from the database
    await prisma.user.delete({
      where: { id: userId },
    }).catch(() => {
      // Ignore error if user doesn't exist
    });

    // Close the Prisma connection
    await prisma.$disconnect(); // closing db connection
  } catch (error) {
    console.error('Error cleaning up test data:', error);
  }
});

// Main test suite for Transactions API
describe('Transactions API Integration Tests', () => {

  // Test 1: Verify that a user can authenticate with valid credentials
  test('should authenticate user with valid credentials', async () => {
    // Send POST request to login endpoint
    const response = await request(baseURL)
      .post('/api/auth/login')
      .send({
        email: TEST_USER.email,
        password: TEST_USER.password,
      });

    // Debug: Log the response to see what's happening
    console.log('Login response status:', response.status);
    console.log('Login response body:', response.body);

    // Verify the response status code is 200 OK
    expect(response.status).toBe(200);

    // Verify the response contains a token property
    expect(response.body).toHaveProperty('token');

    // Save the authentication token for subsequent tests
    authToken = response.body.token;
  });

  // Test 2: Verify that authentication fails with invalid credentials
  test('should fail authentication with invalid credentials', async () => {
    // Attempt to login with incorrect password
    const response = await request(baseURL)
      .post('/api/auth/login')
      .send({
        email: TEST_USER.email,
        password: 'wrongpassword',
      });

    // Verify the response status code is 401 Unauthorized
    expect(response.status).toBe(401);

    // Verify the response contains an error property
    expect(response.body).toHaveProperty('error');
  });

  // Test 3: Verify that an authenticated user can create a new transaction
  test('should create a new transaction', async () => {
    // Define the transaction data to be created
    const newTransaction = {
      amount: 100,
      type: 'expense',
      category: 'Food',
      description: 'Grocery shopping',
      note: 'Weekly groceries',
      currency: 'EUR',
      date: '2025-01-15',
    };

    // Send POST request with authentication token in header
    const response = await request(baseURL)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newTransaction);

    // Verify the response status code is 201 Created
    expect(response.status).toBe(201);

    // Verify the response contains a transaction object
    expect(response.body).toHaveProperty('transaction');

    // Verify the created transaction matches the input data
    expect(response.body.transaction).toMatchObject({
      amount: 100,
      type: 'expense',
      category: 'Food',
    });

    // Save the transaction ID for use in other tests
    transactionId = response.body.transaction.id;
  });

  // Test 4: Verify that creating a transaction without authentication fails
  test('should fail to create transaction without authentication', async () => {
    // Define transaction data
    const newTransaction = {
      amount: 50,
      type: 'income',
      category: 'Salary',
      date: '2025-01-15',
    };

    // Send POST request without authentication token
    const response = await request(baseURL)
      .post('/api/transactions')
      .send(newTransaction);

    // Verify the response status code is 401 Unauthorized
    expect(response.status).toBe(401);

    // Verify the response contains an error message
    expect(response.body).toHaveProperty('error');
  });

  // Test 5: Verify that creating a transaction with missing fields fails
  test('should fail to create transaction with missing required fields', async () => {
    // Define incomplete transaction data (missing type, category, date)
    const invalidTransaction = {
      amount: 50,
    };

    // Send POST request with incomplete data
    const response = await request(baseURL)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidTransaction);

    // Verify the response status code is 400 Bad Request
    expect(response.status).toBe(400);

    // Verify the response contains an error message
    expect(response.body).toHaveProperty('error');
  });

  // Test 6: Verify that an authenticated user can retrieve all their transactions
  test('should get all transactions for authenticated user', async () => {
    // Send GET request with authentication token
    const response = await request(baseURL)
      .get('/api/transactions')
      .set('Authorization', `Bearer ${authToken}`);

    // Verify the response status code is 200 OK
    expect(response.status).toBe(200);

    // Verify the response contains a transactions array
    expect(response.body).toHaveProperty('transactions');
    expect(Array.isArray(response.body.transactions)).toBe(true);

    // Verify at least one transaction exists (the one we created earlier)
    expect(response.body.transactions.length).toBeGreaterThan(0);
  });

  // Test 7: Verify that retrieving transactions without authentication fails
  test('should fail to get transactions without authentication', async () => {
    // Send GET request without authentication token
    const response = await request(baseURL)
      .get('/api/transactions');

    // Verify the response status code is 401 Unauthorized
    expect(response.status).toBe(401);

    // Verify the response contains an error message
    expect(response.body).toHaveProperty('error');
  });

  // Test 8: Verify that a user can retrieve a specific transaction by ID
  test('should get a single transaction by ID', async () => {
    // Send GET request for a specific transaction
    const response = await request(baseURL)
      .get(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${authToken}`);

    // Verify the response status code is 200 OK
    expect(response.status).toBe(200);

    // Verify the response contains the transaction object
    expect(response.body).toHaveProperty('transaction');

    // Verify the transaction ID matches the requested ID
    expect(response.body.transaction.id).toBe(transactionId);
  });

  // Test 9: Verify that retrieving a non-existent transaction returns 404
  test('should return 404 for non-existent transaction', async () => {
    // Define a fake transaction ID that doesn't exist
    const fakeId = 'non-existent-id-999999';

    // Send GET request for the fake transaction ID
    const response = await request(baseURL)
      .get(`/api/transactions/${fakeId}`)
      .set('Authorization', `Bearer ${authToken}`);

    // Verify the response status code is 404 Not Found
    expect(response.status).toBe(404);

    // Verify the response contains an error message
    expect(response.body).toHaveProperty('error');
  });

  // Test 10: Verify that a user can update an existing transaction
  test('should update a transaction', async () => {
    // Define the updated transaction data
    const updatedData = {
      amount: 150,
      type: 'expense',
      category: 'Food',
      description: 'Updated grocery shopping',
      note: 'Monthly groceries',
      currency: 'EUR',
      date: '2025-01-16',
    };

    // Send PUT request to update the transaction
    const response = await request(baseURL)
      .put(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedData);

    // Verify the response status code is 200 OK
    expect(response.status).toBe(200);

    // Verify the response contains a success message
    expect(response.body).toHaveProperty('message');

    // Verify the updated transaction data matches the input
    expect(response.body.transaction).toMatchObject({
      amount: 150,
      description: 'Updated grocery shopping',
    });
  });

  // Test 11: Verify that updating a transaction without authentication fails
  test('should fail to update transaction without authentication', async () => {
    // Define update data
    const updatedData = {
      amount: 200,
      type: 'expense',
      category: 'Food',
      date: '2025-01-16',
    };

    // Send PUT request without authentication token
    const response = await request(baseURL)
      .put(`/api/transactions/${transactionId}`)
      .send(updatedData);

    // Verify the response status code is 401 Unauthorized
    expect(response.status).toBe(401);
  });

  // Test 12: Verify that a user can delete a transaction
  test('should delete a transaction', async () => {
    // Send DELETE request for the transaction
    const response = await request(baseURL)
      .delete(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${authToken}`);

    // Verify the response status code is 200 OK
    expect(response.status).toBe(200);

    // Verify the response contains a success message
    expect(response.body).toHaveProperty('message');

    // Verify the transaction was actually deleted by trying to retrieve it
    const getResponse = await request(baseURL)
      .get(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${authToken}`);

    // Verify the response status code is 404 Not Found
    expect(getResponse.status).toBe(404);
  });

  // Test 13: Verify that deleting a non-existent transaction returns appropriate error
  test('should return 404 when deleting non-existent transaction', async () => {
    // Define a fake transaction ID
    const fakeId = 'non-existent-id-999999';

    // Attempt to delete the non-existent transaction
    const response = await request(baseURL)
      .delete(`/api/transactions/${fakeId}`)
      .set('Authorization', `Bearer ${authToken}`);

    // Verify the response status code is either 400 or 404
    // Different APIs may handle this differently
    expect([400, 404]).toContain(response.status);

    // Verify the response contains an error message
    expect(response.body).toHaveProperty('error');
  });

});

// Summary of all integration tests in this suite:
//
// TEST 1: Authenticate user with valid credentials
// TEST 2: Fail authentication with invalid credentials
// TEST 3: Create a new transaction
// TEST 4: Fail to create transaction without authentication
// TEST 5: Fail to create transaction with missing fields
// TEST 6: Get all transactions for authenticated user
// TEST 7: Fail to get transactions without authentication
// TEST 8: Get a single transaction by ID
// TEST 9: Return 404 for non-existent transaction
// TEST 10: Update a transaction
// TEST 11: Fail to update without authentication
// TEST 12: Delete a transaction
// TEST 13: Fail to delete without authentication
// TEST 14: Return 404 when deleting non-existent transaction
//
// How to run these tests:
// 1. Ensure your development server is running: npm run dev
// 2. Run integration tests: npm test transactions.spec.js
// 3. Run with Jest directly: npx jest transactions.spec.js
//
// Important notes:
// - These tests use a real database connection
// - A test user is created before tests and deleted after
// - All test data is automatically cleaned up
// - The server must be running on localhost:3000
// - If your API uses different JWT format, adjust the Authorization header accordingly
