import type {  Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import type { AuthRequest } from '../types/express';
import { AppError } from '../utils/AppError';


export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        // Extract token from the header 
       
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({
                status:false,
                message:"Log in required"
            })
            
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        
        // 3. Check if user still exists in DB (Security Best Practice)
        const userResult = await pool.query(
            'SELECT id, first_name, email, phone , role FROM customers WHERE id = $1', 
            [decoded.id]
        );
        
        if (userResult.rowCount === 0) {
            throw new AppError("The user belonging to this token no longer exists." , 401)
         
        }
        req.user = userResult.rows[0];
        next();
    } catch (error:unknown) {


        if (error instanceof Error) {
       
            return res.status(401).json({ message: error.message });    
        } else {
        
            return res.status(401).json({ message: error });
        }
        
        
    }
};


export const restrictTo = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        
        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError("You do not have the necessary permissions to perform this action." , 403)
        }
        next();
    };
};