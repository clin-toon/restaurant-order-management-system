import { Router } from 'express';
import { getAvailableFoods , handleFilterQuery , getDetailsofSingleItem } from "../controllers/foodController";
import { foodFilterSchema } from '../validators/validationSchema';
import { validateInput } from '../middlewares/inputValidation';
import { protect, restrictTo } from '../middlewares/auth.middlware';
import type { AuthRequest } from '../types/express';


const router = Router();

// This is a public route (anyone can see the menu)
router.get('/food', getAvailableFoods);
router.get('/search' ,validateInput(foodFilterSchema), handleFilterQuery)
router.get("/singleFood/:id", getDetailsofSingleItem)


// protected admin routes from here

router.get("/test" ,protect ,async (req :AuthRequest,res)=>{
    res.json(req.user)
} )



router.get("/test/admin" ,protect ,restrictTo("admin"),async (req ,res)=>{
    res.json({
        message:"Admin middlware"
    })
} )


export default router;

