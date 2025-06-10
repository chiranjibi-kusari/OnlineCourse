import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors"
import { mongodbconnection } from "../server/config/mongodb.js";

import courseRouter from "../server/routes/course.route.js"
import userRouter from "../server/routes/user.route.js"
import adminRouter from '../server/routes/admin.route.js'
import orderRouter from "../server/routes/order.route.js"


dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({
  origin:["http://localhost:5173",'https://online-course-tau.vercel.app'],
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-Type","Authorization"],

}))
app.use(express.json())
app.use(cookieParser())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//mongodb connection from config folder
await mongodbconnection();

app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/order",orderRouter)

//cloudinary configuration code
cloudinary.config({ 
        cloud_name: "chiran", 
        api_key: "894533762472941", 
        api_secret: process.env.api_secret 
    });


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
