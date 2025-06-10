import express from "express"
import { PurchasedDetails, userLogin, userLogout, userRegister } from "../controllers/user.controller.js"
import userMiddlewares from "../middleware/user.middleware.js"

const router=express.Router()

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/logout',userLogout)
router.get('/purchases',userMiddlewares,PurchasedDetails)

export default router