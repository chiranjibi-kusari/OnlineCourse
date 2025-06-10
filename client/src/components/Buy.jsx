import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import { BACKEND_URL } from '../utils/utils';

const Buy = () => {
  const {courseId}=useParams();
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()


  //token
  //  const user=JSON.parse(localStorage.getItem("user"));
  //  const token=user.token;
      const token = JSON.parse(localStorage.getItem("token"))
    
    console.log(token);



  const handlePurchase=async()=>{
    if(!token){
      toast.error("Please login to purchase the courses.")
      return;
    }
    try {
      const response=await axios.post(`${BACKEND_URL}/course/buy/${courseId}`,{},{
        headers:{
          Authorization:`Bearer ${token}`,
      
        },
        withCredentials:true,
      })
      console.log(response.data);
      // const paymentInfo={
      //   // email:user?.user?.email,
      //   // userId:user?.user._id,
      //   courseId:courseId,
      // }
      // await axios.post("http://localhost:4001/api/v1/order",paymentInfo,{
      //    headers:{
      //     Authorization:`Bearer ${token}`,
      //   },
      //   withCredentials:true
      // })
      toast.success(response.data.message || "Course purchased successfully!")
      navigate('/purchases')
      setLoading(false)

    } catch (error) {
       setLoading(false)
       if(error?.response?.status===400){
        toast.error("you have already purchased this coursed")
          navigate("/purchases")
       }else{
        toast.error(error.response?.data?.errors)
        console.log(error);
        
       }
    }
 
    }

    
  
  return (
    <div className='flex h-screen items-center justify-center'>
      
      <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-300' onClick={handlePurchase} disabled={loading}>{loading ? "processing" : "Buy Now"}</button>
    </div>

  )
}

export default Buy