"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationSchema_js_1 = require("../validators/validationSchema.js");
const authController_1 = require("../controllers/authController");
const inputValidation_1 = require("../middlewares/inputValidation");
const auth_middlware_1 = require("../middlewares/auth.middlware");
const contactValidation_1 = require("../validators/contactValidation");
const ratelimiter_1 = require("../middlewares/ratelimiter");
const router = (0, express_1.Router)();
// auth routes
router.post("/auth/register", ratelimiter_1.signupLimiter, (0, inputValidation_1.validateInput)(validationSchema_js_1.registerSchema), authController_1.registerController);
router.post("/auth/login", ratelimiter_1.loginLimiter, (0, inputValidation_1.validateInput)(validationSchema_js_1.loginSchema), authController_1.loginController);
router.post("/auth/logout", auth_middlware_1.protect, authController_1.handleLogOut);
router.get("/auth/me", auth_middlware_1.protect, authController_1.getUserDetails);
// router for public contact page s
router.post("/contact", (0, inputValidation_1.validateInput)(contactValidation_1.contactSchema), authController_1.contactController);
exports.default = router;
//# sourceMappingURL=auth.Route.js.map