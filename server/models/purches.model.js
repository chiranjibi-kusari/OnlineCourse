import mongoose from "mongoose";
const purchesSchema=new mongoose.Schema({
userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
},
courseId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Courses"
},

})

export const Purches=mongoose.model("Purches",purchesSchema)