// transactions.test.js (test for transactions)
// Unit and integration tests for the API endpoints related to transactions.
// Verifies CRUD functionalities: create, read, update, and delete.

import { GET, POST } from "@/app/api/transactions/route";
import { GET as GET_BY_ID, PUT, DELETE } from "@/app/api/transactions/[id]/route";
import { NextRequest } from "next/server"; // fake request HTTP
import { prisma } from "@/lib/prisma"; // import prisma

// Mock Prisma to avoid real database calls during tests
jest.mock('@/lib/prisma', () => ({ //replace Prisma with a fake version
    prisma: {
        //Findmany is a method for get several data
        transaction: {
            findMany: jest.fn(), //jest.fn() = create a spy function that can be controlled (for don't touch the real db) [found several transactions]
            findFirst: jest.fn(), // found the first transaction
            create: jest.fn(), // create a transaction
            update: jest.fn(), //update
            delete: jest.fn(), //delete
            count: jest.fn(), //count the transactions numbers
        },
    },
}));

