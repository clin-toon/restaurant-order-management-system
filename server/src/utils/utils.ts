import bcrypt from 'bcrypt';
import { AppError } from './AppError';

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The raw password from req.body
 * @returns The hashed string
 */


export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10; // Standard security level
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    
    throw new AppError("Error securing password", 500);
  }
};

/**
 * Compares a plain password with a hash from the DB.
 */

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};