import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import {z} from "zod"

import jwt from "jsonwebtoken"

import { Purches } from "../models/purches.model.js";
import { Courses } from "../models/courses.model.js";

//user Register
export const userRegister=async (req,res)=>{
  const {firstName,lastName,email,password}=req.body
  

  //for validation
const userSchema=z.object({
  firstName:z.string().min(3,{message:"firstname atlest 3 character"}),
  lastName:z.string().min(2,{message:"lastname atleast 2 character"}),
  email:z.string().email({message:"Invalid email address"}),
  password:z.string().min(6,{message:"password must be at least 6 character"})
})
const validateDate=userSchema.safeParse({firstName,lastName,email,password})

if(!validateDate.success){
  const errorMessage=validateDate.error.errors.map((err)=>err.message)
 return res.status(400).json({errors:errorMessage});
}

  if(!firstName || !lastName || !email || !password) return res.json({errors:"all field are required"})

    try {
    
        if(await User.findOne({email})) return res.status(401).json({errors:"user already exist"})
          
    const hashPassword=await bcrypt.hash(password, 10)

  const userdata={
    firstName,lastName,email,password:hashPassword
  }
      const user=await User.create(userdata)
      res.status(200).json({message:"user create successfully",user})
    } catch (error) {
      console.log(error);
      res.status(401).json({error:"user create in error"})
    }
}

//user Login
export const userLogin=async (req,res)=>{
  const {email,password}=req.body
  try {
    const user=await User.findOne({email}).select("+password")

    if(!user || !(await bcrypt.compare(password,user.password))) return res.status(400).json({errors:"Invalid email or password"})

//jwt token 
const token=jwt.sign({
  id:user._id
},
  process.env.JWT_SECRET_KEY
)
res.cookie("jwt",token)

      res.status(200).json({ message: "user login successfully." ,user,token});
  } catch (error) {
    res.status(400).json({error:"error in user login"})
  }

}

//user logout
export const userLogout=async (req,res)=>{
  try {
    // if(!req.cookies.jwt) return res.status(401).json({errors:"kindly login first"})
    res.clearCookie("jwt")

    res.status(201).json({message:"user Logout successfully"})
  } catch (error) {
    res.status(401).json({error:"error in user logout"})
  }

}

export const PurchasedDetails=async (req,res)=>{
  const userId=req.userId
  try {
    const purchased=await Purches.find({userId})
    let purchasedCourseId=[]
     for(let i=0; i<purchased.length; i++)
     {
      purchasedCourseId.push(purchased[i].courseId)
     
     }
      const courseData=await Courses.find({
        _id:{$in:purchasedCourseId}
      })
    res.status(201).json({purchased,courseData})
  } catch (error) {
    res.status(401).json({errors:"error in purchased details"})
  }

}