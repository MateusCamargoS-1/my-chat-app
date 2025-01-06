import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('A chave secreta JWT (JWT_SECRET_KEY) não está definida nas variáveis de ambiente!');
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({
      success: false,
      message: 'Token não fornecido!',
    });

    return
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado!',
      details: error,
    });
  }
};

export default authMiddleware;
