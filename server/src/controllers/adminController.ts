import type { Request , Response } from "express";
import { foodItemSchema } from "../validators/admin/menu.schema";
import { createNewItemService, toogleStatusOfFoodService } from "../services/admin.menu.services";
import { AppError } from "../utils/AppError";
import { uploadToCloudinary } from "../utils/utils";
import type { AuthRequest } from "../types/express";
import { OrderStatusSchema } from "../validators/admin/order.schema";
import { updateOrderStatusService } from "../services/order.services";

/* 
This controller expects name,
description, price, category, is_available, is_vegetarian
form fields from the front end 
*/
export const createNewMenuItem = async (req:Request ,res:Response) =>{
const validatedData = foodItemSchema.parse(req.body);
if (!req.file) {
    return res.status(400).json({ message: "Please upload image file" });
}

try {
    
    const cloudRes = await uploadToCloudinary(req.file.buffer);

    const foodItemCreatedObject = await createNewItemService(
        validatedData, 
        cloudRes.secure_url // Use the fresh URL from the manual upload
    );

    return res.status(201).json({
        success: true,
        message: "Food item created successfully",
        data: foodItemCreatedObject
    });

} catch (error: any) {
    // This catches errors from Cloudinary upload or the Service
    throw new AppError(error.message || "Internal Server Error", 500);
}

   
}


export const toogleStatusOfFood = async(req:AuthRequest ,res:Response) =>{
const id = req.params.id
const status = req.query?.status
if(id === undefined ) throw new AppError("Id parameter is required" , 400)
const result  = await toogleStatusOfFoodService(id , status)
return res.status(200).json({
    success:true,
    message:`Successfully changed the status to ${status}`,
    data:result
})
}


/*
    order specific routes
*/

export const updateStatusOfOrder =async (req:AuthRequest, res:Response) =>{
    const validatedData = OrderStatusSchema.parse(req.params)
    const {id , status} = validatedData
    try {
        const result  = await updateOrderStatusService(id , status)
        return res.status(200).json({
        success:true,
        message:`Successfully changed the status to ${status}`,
        data:result
        })
    } catch (error:any) {
        throw new AppError(error , 500)
    }
}