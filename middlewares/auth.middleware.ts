import { Response, NextFunction } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/types';

interface DataStoredInToken {
  userId: string;
}

export const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authorization: string | undefined = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const token: string = authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.get('jwtSecret')) as DataStoredInToken;

    req.user = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' });
  }
};
