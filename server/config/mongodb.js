import dotenv from 'dotenv'
import mongoose from "mongoose"
dotenv.config()

export const mongodbconnection=async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("mongobd connected sussfully");
    
  } catch (error) {
    console.log("mongodb connected failed",error);
    
  }
}