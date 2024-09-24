import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getTable, updateRecord } from '../models/airtable';
import { setCache } from '../utils/caching';

const loginRouter = require('../controller/Login');

const app = express();
app.use(express.json()); 
app.use("/", loginRouter);

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../models/airtable');
jest.mock('../utils/caching');

describe('Login Route Tests', () => {
  const mockUser = {
    id: 'rec12345',
    username: 'testuser',
    password: '$2a$10$abcd', // Ensure this is a valid bcrypt hash
    LastLoginTime: '2024-08-01T12:34:56.789Z',
    refreshToken: 'mock_refresh_token',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully with correct credentials', async () => {
    (getTable as jest.Mock).mockResolvedValue([{ id: mockUser.id, username: mockUser.username, password: mockUser.password }]);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValueOnce('mock_access_token').mockReturnValueOnce('mock_refresh_token');
    (updateRecord as jest.Mock).mockResolvedValue(true);
    (setCache as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
      .post('/login')
      .send({
        username: mockUser.username,
        password: 'correct_password',
      })
      .expect(200);

    expect(response.body.username).toBe(mockUser.username);
    expect(response.body.accessToken).toBe('mock_access_token');
    expect(response.body.LastLoginTime).toBeDefined();
    expect(setCache).toHaveBeenCalledWith('USER', expect.anything());
  });

  it('should return 404 if user is not found', async () => {
    (getTable as jest.Mock).mockResolvedValue([]);

    const response = await request(app)
      .post('/login')
      .send({
        username: 'nonexistent_user',
        password: 'password',
      })
      .expect(404);

    expect(response.body.message).toBe('User not found');
  });

  it('should return 401 for invalid password', async () => {
    (getTable as jest.Mock).mockResolvedValue([{ id: mockUser.id, username: mockUser.username, password: mockUser.password }]);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send({
        username: mockUser.username,
        password: 'wrong_password',
      })
      .expect(401);

    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should refresh access token with valid refresh token', async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ username: mockUser.username });
    (jwt.sign as jest.Mock).mockReturnValue('new_mock_access_token');

    const response = await request(app)
      .post('/login/refresh-token')
      .set('Cookie', 'refreshToken=mock_refresh_token')
      .expect(200);

    expect(response.body.accessToken).toBe('new_mock_access_token');
  });

  it('should return 403 if no refresh token is provided', async () => {
    const response = await request(app)
      .post('/login/refresh-token')
      .expect(403);

    expect(response.body.message).toBe('Refresh token not provided');
  });

  it('should log out user and clear refresh token', async () => {
    (getTable as jest.Mock).mockResolvedValue([{ id: mockUser.id, username: mockUser.username, password: mockUser.password }]);
    (updateRecord as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
      .post('/login/logout')
      .send({
        username: mockUser.username,
      })
      .expect(200);

    expect(response.body.message).toBe('Logged out successfully');
  });
});


