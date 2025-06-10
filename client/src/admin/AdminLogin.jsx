import axios from "axios";
import React, { useState } from "react";
import image from "../assets/image.jpg"
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { BACKEND_URL } from "../utils/utils";


const AdminLogin = () => {
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const navigate=useNavigate();

 const handleSubmit=async (e)=>{
  e.preventDefault();
  try {
   const response=await axios.post(`${BACKEND_URL}/admin/login`,{
    email,password
   },{
    withCredentials:true,
    headers:{"Content-Type":"application/json"}
   })
   console.log("admin login success",response.data);
  
   toast.success(response.data.message)

   localStorage.setItem("admin",JSON.stringify(response.data));

   navigate('/admin/dashboard');
  } catch (error) {
 if(error.response){
  setErrorMessage(error.response.data.errors || "Admin failed!!")
 }

  }
  
 }
 
 
    return (
      
    <div className="bg-gradient-to-r from-black to-blue-950 text-white">
      <header>
        <div className='bg-gradient-to-r from-black to-blue-950 text-white pt-4 px-32'>
     <div className='flex justify-between items-center'>
      <div className='flex justify-center items-center gap-4 '>
        <img onClick={()=>navigate('admin/dashboard')} src={image} alt="" className='w-16 rounded-full'/>
        <Link to={'/admin/dashboard'} className='text-2xl text-orange-400'>DIGITALEARN</Link>
      </div>
      <div className='flex justify-center gap-6'>
        <button onClick={()=>navigate('/admin/signup')} className='border border-white rounded-md py-2 px-4 font-bold text-xl hover:text-lg transition-all duration-300'>Signup</button>
         <button onClick={()=>navigate('/admin/signup')} className='border border-white rounded-md py-2 px-4 font-bold text-xl hover:text-lg transition-all duration-300 bg-orange-400'>Join now</button>
      </div>
     </div>
    </div>
      </header>
      <div className="h-screen container mx-auto flex items-center justify-center text-white">
        <div className="bg-gray-900 rounded-lg shadow-lg w-[400px] p-8 mt-20 mb-32 ">
          <h2 className="text-center mb-4 font-bold text-2xl">
            Welcome to <span className="text-orange-400">DIGIDALEARN</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Log in to access admin dashboard!
          </p>
          <form onSubmit={handleSubmit}>
          
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-400 mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={((e)=>{
                  setEmail(e.target.value)
                })}
                placeholder="Type your email"
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={((e)=>{
                    setPassword(e.target.value)
                  })}
                  placeholder="******"
                  className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                
                />
              </div>
            </div>
             {errorMessage && (
              <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
            >
              Login
            </button>
            <p className="mt-2 items-center text-center text-xl">If you do not an Account <Link className="pl-2 text-blue-500 underline" to={'/admin/signup'}>Signup</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
