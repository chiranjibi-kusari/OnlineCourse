import mongose from 'mongoose'

const orderSchema=new mongose.Schema({
email:String,
userId:String,
courseId:String,
paymentId:String,
amount:Number,
status:String
})
export const Order=mongose.model("Order",orderSchema)