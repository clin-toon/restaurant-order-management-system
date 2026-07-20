import { Router } from "express";
import { registerSchema, loginSchema } from "../validators/validationSchema.js";

import {
  getUserDetails,
  handleLogOut,
  loginController,
  registerController,
  contactController,
} from "../controllers/authController";
import { validateInput } from "../middlewares/inputValidation";
import { protect } from "../middlewares/auth.middlware";
import { contactSchema } from "../validators/contactValidation";
import { loginLimiter, signupLimiter } from "../middlewares/ratelimiter";

const router = Router();

// auth routes

router.post(
  "/auth/register",
  signupLimiter,
  validateInput(registerSchema),
  registerController,
);
router.post(
  "/auth/login",
  loginLimiter,
  validateInput(loginSchema),
  loginController,
);
router.post("/auth/logout", protect, handleLogOut);
router.get("/auth/me", protect, getUserDetails);

// router for public contact page s

router.post("/contact", validateInput(contactSchema), contactController);

export default router;
