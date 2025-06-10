import React, { useEffect, useState } from "react";

import Hero from "../components/Hero";
import Footer from "../components/Footer";
import image from "../assets/image.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //token
  useEffect(()=>{
    //  const user = JSON.parse(localStorage.getItem("user"))
    // const token=user.token;
     const token = JSON.parse(localStorage.getItem("token"))
    
    console.log(token);
    
    if(token){
     setIsLoggedIn(true)
    }else{
    setIsLoggedIn(false)
    }
  },[])

  //loggout
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/logout`,
        { withCredentials: true }
      );
      toast.success(await response.data.message);
      localStorage.removeItem("user")
      setIsLoggedIn(false);
    } catch (error) {
      console.log("error in logout", error);
      toast.error(error.response.data.errors || "Error in logout");
    }
  };
  return (
    <div className="bg-gradient-to-r from-black to-blue-950 h-screen">
      <header>
        <div className="bg-gradient-to-r from-black to-blue-950 text-white pt-4 px-32">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-4 ">
              <img
                onClick={() => navigate("/")}
                src={image}
                alt=""
                className="w-16 rounded-full"
              />
              <Link to={"/"} className="text-2xl text-orange-400">
                DIGITALEARN
              </Link>
            </div>
            <div className="space-x-4">
              {isLoggedIn ? (
                <button
                onClick={handleLogout}
                  className="bg-transparent text-white py-2 px-4 border border-white rounded"
                >
                  Logout
                </button>
          
              ) : (
                
                <div className="space-x-5">
                  <Link
                    to={"/login"}
                    className="bg-transparent text-white py-2 px-4 border border-white rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/signup"}
                    className="bg-transparent text-white py-2 px-4 border border-white rounded"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div>
        <Hero />
        <hr />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
