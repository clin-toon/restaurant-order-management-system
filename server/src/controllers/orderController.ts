import { createOrderService, getUserOrdersService } from "../services/order.services";
import type { AuthRequest } from "../types/express";
import type { Response } from "express";
import { AppError } from "../utils/AppError";

export const createOrderController = async(req:AuthRequest , res:Response) =>{


try {
    const result = await createOrderService(req.user?.id ,req.body )

    if(result){
        return res.status(201).json({
            success:true,
            message:"Order created successfully",
            data:result
        })
    }
    
} catch (error:any) {
    throw new AppError(error ,500 )
}
}



export const getCustomerOrdersController = async (req: AuthRequest,res: Response, ) => {
  try {
    const userId = req.user?.id; 
    const orders = await getUserOrdersService(userId);

    res.status(200).json({
      success: true,
      message:"Successfully fetched order details",
      count: orders.length,
      data: orders
    });
  } catch (error :any) {

    throw new AppError(error , 500)
    
  }
};