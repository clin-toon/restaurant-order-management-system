"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlware_1 = require("../middlewares/auth.middlware");
const orderController_1 = require("../controllers/orderController");
const inputValidation_1 = require("../middlewares/inputValidation");
const order_schema_1 = require("../validators/admin/order.schema");
const ratelimiter_1 = require("../middlewares/ratelimiter");
const router = (0, express_1.Router)();
router.post("/create", ratelimiter_1.orderLimiter, auth_middlware_1.protect, (0, inputValidation_1.validateInput)(order_schema_1.deliveryAddressSchema), orderController_1.createOrderController);
router.get("/customer-orders", auth_middlware_1.protect, orderController_1.getCustomerOrdersController);
exports.default = router;
//# sourceMappingURL=order.routes.js.map