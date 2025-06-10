import express from "express"
import { adminLogin, adminLogout, adminSignup, } from "../controllers/admin.controller.js"

const router=express.Router()

router.post("/signup",adminSignup)
router.post("/login",adminLogin)
router.get("/logout",adminLogout)

export default router