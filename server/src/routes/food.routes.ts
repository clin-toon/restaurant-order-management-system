import { Router } from 'express';
import { getAvailableFoods } from "../controllers/foodController";

const router = Router();

// This is a public route (anyone can see the menu)
router.get('/food/getAllFoods', getAvailableFoods);

export default router;