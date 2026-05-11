import type { Request, Response } from 'express';
import * as foodService from "../services/food.services";
import { AppError } from '../utils/AppError';

export const getAvailableFoods = async (req: Request, res: Response) => {
    const page = req.query?.page
    const foods = await foodService.getAllFoods(page);

    res.status(200).json({
        status: 'success',
        results: foods.length,
        data: { foods }
    });
};


export const handleFilterQuery = async (req: Request , res:Response) =>{
    const cat =  req.query?.category 
    const query =  req.query?.query 
    const minimumPrice  = req.query?.minPrice
    const maximiumPrice = req.query?.maxPrice
    const is_vegetarian  = req.query?.isVeg
    const limit = req.query?.limit || 10


    const foods = await foodService.findFoodByFilter
    (query,cat , maximiumPrice , minimumPrice , is_vegetarian, limit

    )

    res.status(200).json({
        success: true,
        count: foods.length,
        data: foods
    });
}

export const getDetailsofSingleItem =async (req:Request , res:Response)=>{
    const {id} = req.params 

    const foods = await foodService.findFoodById(id)

    if(foods.length === 0){
        throw new AppError("Invalid food id" , 400)
    }

    res.status(200).json({
        success:true,
        count:foods.length,
        data:foods
    })
   
}
