import {Router} from "express"
import { registerSchema , loginSchema } from "../validators/validationSchema"

import { getUserDetails, handleLogOut, loginController, registerController , contactController} from "../controllers/authController"
import { validateInput } from "../middlewares/inputValidation"
import { protect } from "../middlewares/auth.middlware"
import { contactSchema } from "../validators/contactValidation"

const router = Router() 

// auth routes 

router.post("/auth/register" ,validateInput(registerSchema),  registerController)
router.post("/auth/login" , validateInput(loginSchema) , loginController)
router.post("/auth/logout", protect , handleLogOut)
router.get("/auth/me" , protect , getUserDetails)

// router for public contact page s

router.post("/contact" , validateInput(contactSchema) , contactController)




export default router 