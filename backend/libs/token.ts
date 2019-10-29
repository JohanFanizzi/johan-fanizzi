import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IPayload from '../interfaces/IPayload';
import ErrorException from '../controllers/error.controller';

// Obtner secret
const secret: string = process.env.TOKEN_SECRET || 'secretkey';

export const getToken = (id: string): string => {
  const token: string = jwt.sign({ _id: id }, secret, {
    expiresIn: 60 * 60 * 2
  });

  return token;
}

// Middleware para validar el token
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obtener token del header
    const token = req.header('auth-token') as string;

    // Validar Token
    if(!token) {
      return await ErrorException(true, 'Access Denied', req, res, 401);
    }

    // Obtener Id
    const payload = jwt.verify(token, secret) as IPayload;
    req.UserId = payload._id;

    next();
  } catch (err) {
    return await ErrorException(true, 'Invalid Token', req, res, 400);
  }
}
