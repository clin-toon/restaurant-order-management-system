import { Router } from 'express';
import { getAvailableFoods , handleFilterQuery , getDetailsofSingleItem } from "../controllers/foodController";
import { foodFilterSchema } from '../validators/validationSchema';
import { validateInput } from '../middlewares/inputValidation';


const router = Router();

// This is a public route (anyone can see the menu)
router.get('/food', getAvailableFoods);
router.get('/search' ,validateInput(foodFilterSchema), handleFilterQuery)
router.get("/singleFood/:id", getDetailsofSingleItem)

export default router;

//252cea0e-e4c1-49a6-99eb-133df0597513