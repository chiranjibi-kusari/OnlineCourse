import axios from "axios";
import React, { use, useEffect, useState } from "react";
import image from "../assets/image.jpg";
import { RiHome2Fill } from "react-icons/ri";
import { FaCircle, FaDiscourse, FaDownload } from "react-icons/fa";
import { CiLogout, CiLogin } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

const Purchases = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [errorMessage, setErrorMessage] = useState(true);
  const [loading,setLoading]=useState(false)
  const navigator=useNavigate()

  console.log("purchases", purchases);

  //token
  useEffect(() => {
    const user= JSON.parse(localStorage.getItem("user"));
    const token=user.token;
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  //courses fetching
  useEffect(() => {
    const fetchPurchases = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token=user.token
      if (!token) {
        setErrorMessage("Please login to purchases the courses");
        return;
      }
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/course/purchases`,
          
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setPurchases(response.data.courseData);
      } catch (error) {
        setErrorMessage(
     "failed to purchased data"
        );
      }
    };
    fetchPurchases();
  }, []);
  //loggout
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/logout`,
        { withCredentials: true }
      );
      toast.success(await response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
     
    } catch (error) {
      console.log("error in logout", error);
      toast.error(error.response.data.errors || "Error in logout");
    }
  };
  return <div className="flex h-screen">
    {/* aside */}
    <div className="w-64 bg-gray-100 p-5">
      
      <nav>
        <ul>
          <li className="mb-4">
            <Link to={'/'} className="flex items-center">
                    <span className=" mr-2">
                      <RiHome2Fill />
                    </span>
                    Home
                  </Link>
          </li>
          <li className="mb-4">
            <Link to={'/courses'} className="flex items-center">
                  
                      <FaDiscourse className="mr-2" />
                  
                    Courses
                  </Link>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center text-blue-500">
                    
                      <FaDownload  className="mr-2"/>
                   
                    Purchases
                  </a>
          </li>
           <li className="mb-4">
                  <Link to={'/settings'} className="flex items-center">
                
                      <IoMdSettings className="mr-2"/>
                  
                    Settings
                  </Link>
                </li>
                
                <li>
                  {
                    isLoggedIn ? (
                      <a href="/" className="flex items-center" onClick={handleLogout}>
                   
                      <CiLogout className="mr-2"/>
            
                    Logout
                  </a>
                    ):(
                           <Link to={'/login'} className="flex items-center" onClick={handleLogout}>
                  
                      <CiLogin className="mr-2"/>
                 
                    Login
                  </Link>
                    )
                  }
                </li>
        </ul>
      </nav>
      
    </div>
     {/* <aside className="w-64 bg-gray-100 h-screen p-5 fixed">
            <div className="flex items-center mb-10">
              <img src={image} alt="profile" className="rounded-full h-12 w-12" />
            </div>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link to={'/'} className="flex items-center">
                    <span className=" material-icons mr-2">
                      <RiHome2Fill />
                    </span>{" "}
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={'/courses'} className="flex items-center text-blue-500">
                    <span className=" material-icons mr-2">
                      <FaDiscourse />
                    </span>{" "}
                    Courses
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="/purchases" className="flex items-center">
                    <span className=" material-icons mr-2">
                      <FaDownload />
                    </span>{" "}
                    Purchases
                  </a>
                </li>
             <li className="mb-4">
                  <a href="#" className="flex items-center">
                    <span className=" material-icons mr-2">
                      <IoMdSettings />
                    </span>{" "}
                    Settings
                  </a>
                </li>
                <li>
                  {
                    isLoggedIn ? (
                      <a href="/" className="flex items-center" onClick={handleLogout}>
                    <span className=" material-icons mr-2">
                      <CiLogout />
                    </span>{" "}
                    Logout
                  </a>
                    ):(
                           <a href="/login" className="flex items-center" onClick={handleLogout}>
                    <span className=" material-icons mr-2">
                      <CiLogin />
                    </span>{" "}
                    Login
                  </a>
                    )
                  }
                </li>
                
              </ul>
            </nav>
          </aside> */}

          {/* main content */}
          <div className="flex-1 p-8 bg-gray-50">
            <h2 className="text-xl font-semibold mb-6">My Purchases</h2>
            {/* //error message */}
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">{errorMessage}</div>
            )}

            {/* render purchases */}
            {
              purchases.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {
                    purchases.map((purchase,index)=>(
                      <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-col items-center space-y-4">
                          {/* course image */}
                          <img className="rounded-lg w-full h-48 object-cover" src={purchase.image?.url} alt={purchase.title} />
                          <div className="text center">
                            <h3 className="text-lg font-bold">{purchase.title}</h3>
                            <p className="text-gray-500">
                              {
                                purchase.description.length > 100 ? `${purchase.description.slice(0,100)}...`:purchase.description
                              }
                            </p>
                            <span className="text-green-700 font-semibold text-sm">${purchase.price} only</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ):
              (
                <p className="text-gray-500">You have no purchases yet.</p>
              )
            }
          </div>
  </div>;
};

export default Purchases;
