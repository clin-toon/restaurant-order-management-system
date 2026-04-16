import {Router} from "express"
import { registerSchema } from "../validators/validationSchema"

import { registerController } from "../controllers/authController"
import { validateInput } from "../middlewares/inputValidation"

const router = Router() 

router.post("/register" ,validateInput(registerSchema),  registerController)


    


export default router 