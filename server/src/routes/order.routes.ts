import { Router } from "express";
import { protect } from "../middlewares/auth.middlware";
import {
  createOrderController,
  getCustomerOrdersController,
} from "../controllers/orderController";
import { validateInput } from "../middlewares/inputValidation";
import { deliveryAddressSchema } from "../validators/admin/order.schema";

const router = Router();

router.post(
  "/create",
  protect,
  validateInput(deliveryAddressSchema),
  createOrderController,
);
router.get("/customer-orders", protect, getCustomerOrdersController);

export default router;
