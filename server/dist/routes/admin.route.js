"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlware_1 = require("../middlewares/auth.middlware");
const adminController_1 = require("../controllers/adminController");
const filedUploadMiddleware_1 = require("../middlewares/filedUploadMiddleware");
const inputValidation_1 = require("../middlewares/inputValidation");
const contactValidation_1 = require("../validators/contactValidation");
const admin_contact_Controller_1 = require("../controllers/admin.contact.Controller");
const admin_customer_controller_1 = require("../controllers/admin.customer.controller");
const router = (0, express_1.Router)();
// add food item to the database
router.post("/menu/food-items", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), filedUploadMiddleware_1.upload.single("image"), adminController_1.createNewMenuItem);
// update the availability of the status of the food item
router.put("/menu/food-items/toogle-status/:id", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), adminController_1.toogleStatusOfFood);
// delete the food
router.delete("/menu/food-items/:id", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), adminController_1.deleteFoodItemController);
// Admin order routes
router.put("/order/:id/:status", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), adminController_1.updateStatusOfOrder);
router.get("/order", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), adminController_1.getAllTheOrderDetails);
router.get("/order/details/:id", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), adminController_1.getSpecificOrderDetails);
// for contact routes both admin and non admin
router.post("/contact", (0, inputValidation_1.validateInput)(contactValidation_1.contactSchema), admin_contact_Controller_1.handleContactSubmitController);
router.get("/contact", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), adminController_1.getAllTheContactDetails);
router.put("/contact/:id", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), adminController_1.updateTheStatusOfContactDetails);
// this routes handles the customers page for the admin dashboard
router.get("/customer-insights", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), admin_customer_controller_1.getCustomerInsightsController);
router.get("/customer-details-insights", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), admin_customer_controller_1.getCustomerDetailsInsightsController);
exports.default = router;
//# sourceMappingURL=admin.route.js.map