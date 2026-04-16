import{ createCustomer, isUserAlreadyRegistered, loginUser} from "../services/user.services"
import type { Request , Response } from "express"
import { AppError } from "../utils/AppError"
import { signToken } from "../utils/utils"

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

export const loginController = async(req : Request , res:Response) =>{
    const { email, password } = req.body;

    // 1. Authenticate user via service
    const user = await loginUser(email, password);

    // 2. Generate Token (Payload usually contains ID and Role)
    const token = signToken({ id: user.id, role: user.role });

    // 3. Send Response
    res.status(200).json({
        status: 'success',
        token,
        data: { user }
    });
}