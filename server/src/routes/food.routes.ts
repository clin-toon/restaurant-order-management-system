import { Router } from 'express';
import { getAvailableFoods , handleFilterQuery } from "../controllers/foodController";
import { foodFilterSchema } from '../validators/validationSchema';
import { validateInput } from '../middlewares/inputValidation';


const router = Router();

// This is a public route (anyone can see the menu)
router.get('/food', getAvailableFoods);
router.get('/search' ,validateInput(foodFilterSchema), handleFilterQuery)

export default router;