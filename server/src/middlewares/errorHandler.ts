import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  if (err instanceof ZodError) {
    console.log(err.message)
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      // .flatten() makes the error much easier for the frontend to read
      errors: err.flatten().fieldErrors, 

    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};


