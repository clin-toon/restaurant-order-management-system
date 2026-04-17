import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const validateInput = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
  const errorMessage = result.error.issues[0].message;
    throw new AppError( errorMessage, 400);
  }

  req.body = result.data;
  next();
};