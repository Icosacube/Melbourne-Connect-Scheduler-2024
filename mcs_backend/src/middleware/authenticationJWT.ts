import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const pathResolve = require('node:path');
require('dotenv').config({ path: pathResolve.resolve(__dirname, '../../.env') });
const JWT_SECRET = String(process.env.JWT_SECRET);

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateJWT;


