import { Router } from 'express';
import { getAvailableFoods , handleFilterQuery , getDetailsofSingleItem } from "../controllers/foodController";
import { addItemToCartController , updateItemOfCartController, removeFromCartController } from "../controllers/cartController";
import { foodFilterSchema } from '../validators/validationSchema';
import { validateInput } from '../middlewares/inputValidation';
import { protect, restrictTo } from '../middlewares/auth.middlware';
import type { AuthRequest } from '../types/express';
import { removeItemFromCart } from '../services/cart.services';


const router = Router();

// This is a public route (anyone can see the menu)
router.get('/food', getAvailableFoods);
router.get('/search' , handleFilterQuery)
router.get("/singleFood/:id", getDetailsofSingleItem)


// protected admin routes from here
router.get("/test" ,protect ,async (req :AuthRequest,res)=>{
    res.json(req.user)
})


// route to add food item to a cart 
router.post("/cart/:id" ,protect , addItemToCartController)
router.put("/cart/:id/:quantity" ,protect , updateItemOfCartController)
router.delete("/cart/:id",protect ,removeFromCartController )



router.get("/test/admin" ,protect ,restrictTo("admin"),async (req ,res)=>{
    res.json({
        message:"Admin middlware"
    })
} )


export default router;

