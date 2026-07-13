
import pool from "../config/db"
import { AppError } from "../utils/AppError";
import { hashPassword, comparePassword } from "../utils/utils";
import type { ContactInput } from "../validators/contactValidation";
import type { RegisterInput } from "../validators/validationSchema";
import type { Response } from "express";
import { getTheContactStatus } from "./admin.contact.services";

export const isUserAlreadyRegistered = async (email:string , tbl_name:string) =>{
   try {
     const result = await pool.query(
      `SELECT * FROM ${tbl_name} WHERE email = $1`,
      [email]
    );
    return result.rowCount
  } catch (error) {
    
    console.error('Error fetching user by email:', error);
    throw new AppError(`Database error , ${error}` , 500);

  }
}

//creating a customer on database after successfull validation
export const createCustomer = async (userData: RegisterInput) => {
    const hashedPassword = await hashPassword(userData.password);
    const query = `
        INSERT INTO customers (
            first_name, 
            last_name, 
            email, 
            username, 
            password, 
            phone, 
            role
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id, first_name, last_name, email, username, role, created_at;
    `;
    const {firstName , lastName , email , username , phone } = userData
    const values = [
       firstName , lastName , email, username , hashedPassword, phone, "customer"
    ];

    try {
         const result = await pool.query(query, values);
    
    return result.rows[0];
    } catch (error : any) {
        throw new AppError(error , 500)
    }

   
};


export const loginUser = async (email: string, pass: string) => {
     // Check if user exists in the database 
    const result = await pool.query(
        'SELECT * FROM customers WHERE email = $1', 
        [email]
    );
    const user = result.rows[0];

    if (!user || !(await comparePassword(pass, user.password))) {
        throw new AppError("Invalid email or password", 401);
    }
    // 3. Remove password from the object before returning
    delete user.password;
    return user;
};


export const registerContactInfo = async(contactObj:ContactInput ) =>{

    const {first_name , last_name , email , phone , message} = contactObj 
    let results;
 

  
    const query = `
        INSERT INTO contacts (
            first_name, 
            last_name, 
            email, 
            message, 
            phone ,
            status
        ) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING c_id, first_name, last_name, email, phone, message, status, created_at;
    `;

    const values = [first_name , last_name , email , message , phone , "pending"]




    results = await pool.query(query, values);
    
    return results.rows[0];

}
