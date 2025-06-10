import { Order } from "../models/order.mdel.js";
import { Purches } from "../models/purches.model.js";

export const orderData=async (res,req)=>{
  const order=req.body;
  try {
    const orderInfo=Order.create(order)
    console.log(orderInfo);

    const userId=orderInfo?.userId
const courseId=orderInfo?.courseId

res.status(201).json({message:"order details",orderInfo})
   
    
    if(orderInfo){
        //  const newPurchase = new Purches({ userId, courseId });
        //  await newPurchase.save();
        await Purches.create({userId,courseId})
    }
  } catch (error) {
    console.log("error in order:",error);
    res.status(401).json({errors:"Error in order creation"})
    
  }
}