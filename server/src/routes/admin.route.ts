import {Router} from "express"
import { protect, restrictTo } from "../middlewares/auth.middlware";
import { createNewMenuItem , toogleStatusOfFood , updateStatusOfOrder} from "../controllers/adminController";
import { upload } from "../middlewares/filedUploadMiddleware";


const router = Router();


// add food item to the database 
router.post("/menu/food-items" , protect , restrictTo("admin"),upload.single("image") , createNewMenuItem)
// update the availability of the status of the food item 
router.put("/menu/food-items/toogle-status/:id" , protect , restrictTo("admin"), toogleStatusOfFood)

// Admin order routes 

router.put("/order/:id/:status" , protect , restrictTo("admin") ,updateStatusOfOrder)






export default router ;