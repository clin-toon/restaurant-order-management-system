import{ createCustomer, isUserAlreadyRegistered} from "../services/user.services"
import type { Request , Response } from "express"
import { AppError } from "../utils/AppError"

export const registerController = async (req : Request , res:Response)=>{
    const {email} = req.body 
 
    const exists = await isUserAlreadyRegistered(email);
    if (exists) throw new AppError("User exists ", 409);

    const newCustomer= await createCustomer(req.body) 

    res.status(201).json({
        status: 'success',
        data: { user: newCustomer }
    });

}