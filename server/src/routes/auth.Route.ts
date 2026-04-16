import {Router} from "express"
import { registerSchema , loginSchema } from "../validators/validationSchema"

import { loginController, registerController } from "../controllers/authController"
import { validateInput } from "../middlewares/inputValidation"

const router = Router() 

// auth routes 
router.post("/auth/register" ,validateInput(registerSchema),  registerController)
router.post("/auth/login" , validateInput(loginSchema) , loginController)
    


export default router 