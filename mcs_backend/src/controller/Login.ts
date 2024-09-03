import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ExecutiveAssistant } from '../types/types'; 
import { setCache } from '../utils/caching'; 
import { Cachekeys } from '../Enum/Cachekeys';
import {
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords,
  } from '../models/airtable';
const router = express.Router();
const UserTable = String(process.env.EXECUTIVEASSISTANT);
// Secret key 
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Login route
router.post('/login', async (req, res) => {
  const { username, password }: ExecutiveAssistant = req.body;
  
  try {

    // check username
    const user = await getTable(UserTable, `{username} = "${username}"`);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const formattedUser: { [k: string]: any; }[] = [];
    user.forEach((fields) => {
      const plainFields = Object.fromEntries(fields); 
      formattedUser.push(plainFields);
    });
    //check password
    // const isPasswordValid = await bcrypt.compare(password, formattedUser[0].password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }
    
    // Password is valid, create JWT token
    const token = jwt.sign({ username: formattedUser[0].username }, JWT_SECRET, {
      expiresIn: 24 * 60 * 60, 
    });

    const LastLoginTime = new Date().toISOString();

    // // Update last login time 
    await updateRecord(UserTable, [{
      id: formattedUser[0].id, 
      fields: { LastLoginTime,token }
    }]);

    setCache(Cachekeys.USER, { username: formattedUser[0].username, LastLoginTime, token });

    res.json({
      username: formattedUser[0].username,
      token,
      LastLoginTime,

    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
