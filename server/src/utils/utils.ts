import bcrypt from 'bcrypt';
import { AppError } from './AppError';
import jwt from 'jsonwebtoken';

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The raw password from req.body
 * @returns The hashed string
 */


/*
  * Hash Password 
  * Convets plain password into hash and returns it 
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


const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = '1d'; // Token valid for 1 day

/*
  * Function that signs jwt to the valid user
*/
export const signToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};