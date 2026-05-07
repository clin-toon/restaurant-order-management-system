import type { Response } from 'express';
import * as cartService from "../services/cart.services";
import { AppError } from '../utils/AppError';
import type { AuthRequest } from '../types/express';


export const addItemToCartController = async (req:AuthRequest ,res:Response) =>{
    const user_id = req.user?.id
    const food_item_id = req.body.food_id

    if (!food_item_id) {
        throw new AppError("Please provide a food_id", 400);
    }


    const check  = await cartService.checkIfItemExistsInCart(user_id , food_item_id)

    if(check > 0){
        throw new AppError("Duplicate food id detected" , 400)
    }
    
    const quantity = 1 

    try {
        await cartService.addItemToCart(user_id , food_item_id , quantity)

        return res.status(201).json({
        status: 'success',
        message:"Item added to cart "
        });
        
    } catch (error:any) {
        throw new AppError(error , 500)
    }

}


export const updateItemOfCartController =async (req:AuthRequest , res:Response)=>{
    const {quantity} = req.body 
    const user_id = req.user?.id
    const food_item_id = req.body.food_id

    try {
        
        const results = await cartService.editQuantityOfItemInCart(user_id , food_item_id , quantity)
        return res.status(200).json({
            success:true,
            data : results
        })
    } catch (error:any) {
        throw new AppError(error , 400)
        
    }

}


export const removeFromCartController = async (req: AuthRequest, res: Response) => {
    // 1. Get user_id from your Auth Middleware
    const user_id = req.user?.id; 

    const { food_id } = req.body; 

   
    if (!food_id) {
        throw new AppError("Food item ID is required", 400);
    }

    // 3. Call the service
    const deletedItem = await cartService.removeItemFromCart(user_id, food_id);

    // 4. Check if the item existed
    if (!deletedItem) {
        throw new AppError("Item not found in cart", 404);
    }

    // 5. Success Response
    return res.status(200).json({
        status: 'success',
        message: "Item removed from cart successfully",
        data: deletedItem // Optional: show what was deleted
    });
};