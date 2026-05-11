import { Router } from 'express';
import { protect } from '../middlewares/auth.middlware';
import { createOrderController , getCustomerOrdersController} from '../controllers/orderController';


const router = Router();

router.post("/create" , protect , createOrderController)
router.get("/customer-orders", protect , getCustomerOrdersController)


export default router;