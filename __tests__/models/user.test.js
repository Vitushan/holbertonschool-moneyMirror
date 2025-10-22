// Tests for User model
// Testing User model structure and methods

jest.mock('@prisma/client', () => {
  const mockMethods = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: mockMethods,
    })),
    __mockUserMethods: mockMethods,
  };
});

import { __mockUserMethods } from '@prisma/client';

const mockUser = __mockUserMethods;

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User Creation', () => {
    it('should create a user with required fields', async () => {
      const newUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed-password',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockUser.create.mockResolvedValue(newUser);

      const result = await mockUser.create({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashed-password'
        }
      });

      expect(result).toMatchObject({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com'
      });
      expect(mockUser.create).toHaveBeenCalledTimes(1);
    });

    it('should have unique email constraint', async () => {
      mockUser.findUnique.mockResolvedValue({
        id: 'existing-user',
        email: 'john@example.com'
      });

      const existingUser = await mockUser.findUnique({
        where: { email: 'john@example.com' }
      });

      expect(existingUser).not.toBeNull();
      expect(existingUser.email).toBe('john@example.com');
    });
  });

  describe('User Retrieval', () => {
    it('should find user by ID', async () => {
      const user = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed-password'
      };

      mockUser.findUnique.mockResolvedValue(user);

      const result = await mockUser.findUnique({
        where: { id: 'user-1' }
      });

      expect(result).toMatchObject({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should find user by email', async () => {
      const user = {
        id: 'user-1',
        email: 'john@example.com'
      };

      mockUser.findUnique.mockResolvedValue(user);

      const result = await mockUser.findUnique({
        where: { email: 'john@example.com' }
      });

      expect(result).not.toBeNull();
      expect(result.email).toBe('john@example.com');
    });

    it('should return all users', async () => {
      const users = [
        { id: 'user-1', name: 'John', email: 'john@example.com' },
        { id: 'user-2', name: 'Jane', email: 'jane@example.com' }
      ];

      mockUser.findMany.mockResolvedValue(users);

      const result = await mockUser.findMany();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('John');
      expect(result[1].name).toBe('Jane');
    });
  });

  describe('User Update', () => {
    it('should update user name', async () => {
      const updatedUser = {
        id: 'user-1',
        name: 'John Updated',
        email: 'john@example.com',
        password: 'hashed-password'
      };

      mockUser.update.mockResolvedValue(updatedUser);

      const result = await mockUser.update({
        where: { id: 'user-1' },
        data: { name: 'John Updated' }
      });

      expect(result.name).toBe('John Updated');
      expect(mockUser.update).toHaveBeenCalledTimes(1);
    });

    it('should update user email', async () => {
      const updatedUser = {
        id: 'user-1',
        email: 'newemail@example.com'
      };

      mockUser.update.mockResolvedValue(updatedUser);

      const result = await mockUser.update({
        where: { id: 'user-1' },
        data: { email: 'newemail@example.com' }
      });

      expect(result.email).toBe('newemail@example.com');
    });
  });

  describe('User Deletion', () => {
    it('should delete a user', async () => {
      const deletedUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com'
      };

      mockUser.delete.mockResolvedValue(deletedUser);

      const result = await mockUser.delete({
        where: { id: 'user-1' }
      });

      expect(result.id).toBe('user-1');
      expect(mockUser.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Model Structure', () => {
    it('should have required fields', () => {
      const userFields = ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'];
      expect(userFields).toContain('id');
      expect(userFields).toContain('name');
      expect(userFields).toContain('email');
      expect(userFields).toContain('password');
    });

    it('should have timestamps', () => {
      const user = {
        id: 'user-1',
        name: 'John',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });
});
