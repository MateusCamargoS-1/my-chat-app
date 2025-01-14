import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || ''; 
const EXPIRES_IN = '1h';

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: EXPIRES_IN });
};
