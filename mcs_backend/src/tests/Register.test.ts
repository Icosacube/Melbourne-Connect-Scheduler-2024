import request from 'supertest';
import express from 'express';
import bcrypt from 'bcryptjs';
import { createRecord, getTable } from '../models/airtable';
const RegisterRouter = require('../controller/Register'); 

const app = express();
app.use(express.json()); 
app.use("/", RegisterRouter);

jest.mock('bcryptjs');
jest.mock('../models/airtable');

describe('Register Route Tests', () => {
  const mockUserTable = String(process.env.EXECUTIVEASSISTANT);
  const mockNewUser = {
    username: 'testuser',
    password: 'plaintextpassword',
  };
  const mockCreatedUserIds = ['rec12345'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    (getTable as jest.Mock).mockResolvedValue([]);

    // hashed password
    (bcrypt.genSaltSync as jest.Mock).mockReturnValue('mock_salt');
    (bcrypt.hashSync as jest.Mock).mockReturnValue('mock_hashed_password');
    (createRecord as jest.Mock).mockResolvedValue(mockCreatedUserIds);

    const response = await request(app).post('/register').send(mockNewUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.userId).toBe(mockCreatedUserIds[0]);

    // Ensure that getTable, bcrypt, and createRecord were called correctly
    expect(getTable).toHaveBeenCalledWith(mockUserTable, `{username} = "${mockNewUser.username}"`);
    expect(bcrypt.genSaltSync).toHaveBeenCalledWith(10);
    expect(bcrypt.hashSync).toHaveBeenCalledWith(mockNewUser.password, 'mock_salt');
    expect(createRecord).toHaveBeenCalledWith(mockUserTable, [
      {
        fields: {
          username: mockNewUser.username,
          password: 'mock_hashed_password',
          LastLoginTime: null,
          refreshToken: null,
        },
      },
    ]);
  });

  it('should return 409 if the username already exists', async () => {
    (getTable as jest.Mock).mockResolvedValue([{ id: 'rec12345' }]);

    const response = await request(app).post('/register').send(mockNewUser);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Username already exists');

    expect(getTable).toHaveBeenCalledWith(mockUserTable, `{username} = "${mockNewUser.username}"`);
    expect(createRecord).not.toHaveBeenCalled();
  });

  it('should return 500 for internal server errors', async () => {
    (getTable as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).post('/register').send(mockNewUser);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');

    expect(getTable).toHaveBeenCalledWith(mockUserTable, `{username} = "${mockNewUser.username}"`);
    expect(createRecord).not.toHaveBeenCalled();
  });
});
