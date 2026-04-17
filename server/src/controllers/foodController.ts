import type { Request, Response } from 'express';
import * as foodService from "../services/food.services";

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
    const is_vegetarian  = req.query?.is_Veg
    const limit = req.query?.limit || 10
    const response = await foodService.findFoodByFilter(query,cat , maximiumPrice , minimumPrice , is_vegetarian, limit)
    res.status(200).json(response)
}