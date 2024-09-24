import express from 'express';
import bcrypt from 'bcryptjs';
import { ExecutiveAssistant } from '../types/types';
import { createRecord, getTable } from '../models/airtable';
const router = express.Router();

const UserTable = String(process.env.EXECUTIVEASSISTANT);
const saltRounds = 10; 

router.post('/register', async (req, res) => {
  const { username, password }: ExecutiveAssistant = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getTable(UserTable, `{username} = "${username}"`);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    // Hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Create new user
    const newUser = [
      {
        fields: {
          username: username,
          password: hashedPassword,
          LastLoginTime: null,
          refreshToken: null,
        }
      }
    ];

    // Call the createRecord method
    const createdUserIds = await createRecord(UserTable, newUser);

    res.status(201).json({ message: 'User registered successfully', userId: createdUserIds[0] });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

