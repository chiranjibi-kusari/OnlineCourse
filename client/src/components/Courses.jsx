import axios from "axios";
import React, { useEffect, useState } from "react";
import image from "../assets/image.jpg";
import { RiHome2Fill } from "react-icons/ri";
import { FaCircle, FaDiscourse, FaDownload } from "react-icons/fa";
import { CiLogout,CiLogin } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom'
import { BACKEND_URL } from "../utils/utils";

const Courses = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate =useNavigate()

  //token
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"))
    // const token=user.token;
       const token = JSON.parse(localStorage.getItem("token"))
    
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  //courses fetching
  useEffect(() => {
    const fetchCources = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/course`,
          { withCredentials: true }
        );
        console.log(response.data.course);
        setCourses(response.data.course);
      } catch (error) {
        console.log("error in fetchCourse", error);
      }
    };
    fetchCources();
  }, []);
  //loggout
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/logout`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      localStorage.removeItem("user")
      setIsLoggedIn(false);
    } catch (error) {
      console.log("error in logout", error);
      toast.error(error.response.data.errors || "Error in logout");
    }
  };

  return (
    <div className="flex">
      {/* sidebar */}
      <aside className="w-64 bg-gray-100 h-screen p-5 fixed">
        <div className="flex items-center mb-4">
          <img onClick={()=>navigate('/')} src={image} alt="profile" className="rounded-full h-18 w-16" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/" className="flex items-center">
                <span className=" material-icons mr-2">
                  <RiHome2Fill />
                </span>{" "}
                Home
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <span className=" material-icons mr-2">
                  <FaDiscourse />
                </span>{" "}
                Courses
              </a>
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
      </aside>
      {/* main content */}
      <main className="ml-[20%] w-[80%] bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold">Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input type="text" placeholder="Type here to search..." className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"/>
              <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
                <FiSearch className="text-xl text-gray-600"/>
              </button>
            </div>
            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {/* vertically scrollable courses section */}
        <div className="overflow-y-auto h-[75vh]">
          {
            loading ? (
              <p className="text-center text-gray-500">Loading....</p>
            ):courses.length===0?( //check if courses array is empty
              <p className="text-center text-gray-500">No course posted yet by admin</p>
            ):(
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                  courses.map((course)=>(
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                      <img src={course.image.url} alt={course.title}  className="rounded mb-4"/>
                      <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                      <p className="text-gray-600 mb-4">{course.description.length>100 ? `${course.description.slice(0,100)}...`:course.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-xl">
                          Rs{course.price} {' '}
                          <span className="text-gray-500 line-through">5999</span>
                        </span>
                        <span className="text-green-600">20% off</span>
                      </div>

                      {/* buy page */}
                      <Link to={`/buy/${course._id}`} className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300">Buy Now</Link>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
};

export default Courses;
