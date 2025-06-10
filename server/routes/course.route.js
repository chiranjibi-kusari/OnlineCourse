import express from "express"
import { buyCourses, courseDetails, createCourse, deleteCourse, getCourse, updateCourse } from "../controllers/course.controll.js"
import userMiddlewares from "../middleware/user.middleware.js"
import adminMiddleware from "../middleware/admin.middlewate.js"


const router=express.Router()

router.post("/create",adminMiddleware,createCourse)
router.put("/update/:courseId",adminMiddleware,updateCourse)
router.delete("/delete/:courseId",adminMiddleware,deleteCourse)
router.get("/courses",getCourse)
router.get("/:courseId",courseDetails)

router.post("/buy/:courseId",userMiddlewares,buyCourses)

export default router