import type { Request, Response } from 'express';
import * as foodService from "../services/food.services";

export const getAvailableFoods = async (req: Request, res: Response) => {
    const foods = await foodService.getAllFoods();
    
    res.status(200).json({
        status: 'success',
        results: foods.length,
        data: { foods }
    });
};