import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middlware";
import {
  createNewMenuItem,
  deleteFoodItemController,
  toogleStatusOfFood,
  updateStatusOfOrder,
  getAllTheOrderDetails,
  getAllTheContactDetails,
  updateTheStatusOfContactDetails,
  getSpecificOrderDetails,
} from "../controllers/adminController";
import { upload } from "../middlewares/filedUploadMiddleware";
import { validateInput } from "../middlewares/inputValidation";
import { contactSchema } from "../validators/contactValidation";
import { handleContactSubmitController } from "../controllers/admin.contact.Controller";
import {
  getCustomerDetailsInsightsController,
  getCustomerInsightsController,
} from "../controllers/admin.customer.controller";

const router = Router();

// add food item to the database
router.post(
  "/menu/food-items",
  protect,
  restrictTo("admin"),
  upload.single("image"),
  createNewMenuItem,
);
// update the availability of the status of the food item
router.put(
  "/menu/food-items/toogle-status/:id",
  protect,
  restrictTo("admin"),
  toogleStatusOfFood,
);
// delete the food
router.delete(
  "/menu/food-items/:id",
  protect,
  restrictTo("admin"),
  deleteFoodItemController,
);

// Admin order routes
router.put(
  "/order/:id/:status",
  protect,
  restrictTo("admin"),
  updateStatusOfOrder,
);
router.get("/order", protect, restrictTo("admin"), getAllTheOrderDetails);
router.get(
  "/order/details/:id",
  protect,
  restrictTo("admin"),
  getSpecificOrderDetails,
);

// for contact routes both admin and non admin
router.post(
  "/contact",
  validateInput(contactSchema),
  handleContactSubmitController,
);

router.get("/contact", protect, restrictTo("admin"), getAllTheContactDetails);
router.put(
  "/contact/:id",
  protect,
  restrictTo("admin"),
  updateTheStatusOfContactDetails,
);

// this routes handles the customers page for the admin dashboard
router.get(
  "/customer-insights",
  protect,
  restrictTo("admin"),
  getCustomerInsightsController,
);
router.get(
  "/customer-details-insights",
  protect,
  restrictTo("admin"),
  getCustomerDetailsInsightsController,
);
export default router;
