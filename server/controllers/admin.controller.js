import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken"

//user Register
export const adminSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // for validation

  const adminschema = z.object({
    firstName: z.string().min(3, { message: "first name is ad list 3 char" }),
    lastName: z.string().min(3, { message: "lastname atleast 2 char" }),
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "password at least 6 char" }),
  });

  const validateData = adminschema.safeParse({
    firstName,
    lastName,
    email,
    password,
  });
  if (!validateData.success) {
    const errorMessage = validateData.error.errors.map((err) => err.message);
    return res.status(400).json({ errors: errorMessage });
  }
  try {
    if (!firstName || !lastName || !email || !password)
      return res.status(401).json({ message: "All fields are required" });

    if (await Admin.findOne({ email }))
      return res.status(201).json({ message: "Admin is already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const adminData = {
      firstName,
      lastName,
      email,
      password: hashPassword,
    };

    const admin = await Admin.create(adminData);
    res.status(201).json({ message: "Admin register successfully", admin });
  } catch (error) {
    res.status(401).json({ errors: "admin signup error" });
  }
};

//user Login
export const adminLogin = async (req, res) => {
  const {email,password}=req.body
  try {
    const admin=await Admin.findOne({email}).select("+password")
    if(!admin || !(await bcrypt.compare(password,admin.password))) return res.status(400).json({errors:"invalid password or email"})

      //for jwt token
const token=jwt.sign({
  id:admin._id
},process.env.JWT_ADMIN_PASSWORD)

res.cookie("jwt",token)

 res.status(200).json({message:"admin login successfully",admin,token})
  } catch (error) {
    res.status(400).json({errors:"admin login error"})
  }
};

//user logout
export const adminLogout = async (req, res) => {
  try {
    if(!req.cookies.jwt) return res.status(401).json({errors:"kindly login first"})
    res.clearCookie("jwt")
     res.status(200).json({errors:"admin logout success"})
  } catch (error) {
     res.status(400).json({errors:"admin logout error."})
  }
};
