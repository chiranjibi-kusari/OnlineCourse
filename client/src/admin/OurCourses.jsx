import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';

const OurCourses = () => {
 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()

   const admin= JSON.parse(localStorage.getItem("admin"));
   const token=admin.token
   console.log(token);
   
   if(!token){
    toast.error("please login to admin")
    navigate('/admin/login')
   }

    //courses fetching
  useEffect(() => {
    const fetchCources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/course/courses",
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

  // delete course
  const handleDeleteCourse=async (id)=>{
    try {
      const response=await axios.delete(`${BACKEND_URL}/course/delete/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        },
        withCredentials:true})
      toast.success(response.data.message);
      const updatedCourses=courses.filter((course)=>course.id !==id);
      setCourses(updatedCourses)
  
    } catch (error) {
      console.log("error in deletion course",error);
      toast.error(error.response.data.errors || "Error in deletion course.")
    }
  }

  if(loading){
    return <p className='text-center text-gray-500'>Loading....</p>
  }
  return (
    <div className='bg-gray-100 p-8 space-y-4 mt-3'>
      <h1 className='text-3xl font-bold text-center mb-8'>Our Courses</h1>
      <Link className='bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300' to={'/admin/dashboard'}>Go to dashboard</Link>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courses.map((course)=>(
          <div key={course._id} className='bg-white shadow-md rounded-lg p-4'>
            {/* course image */}
             <img src={course?.image?.url} alt={course.title}  className='h-40 w-full object-cover rounded-t-lg'/> 
            {/* course title */}
            <h2 className='text-xl font-semibold mt-4 text-gray-800'>{course.title}</h2>

            {/* course descriprion */}
            <p className='text-gray-600 mt-2 text-sm'>
              {course.description.length>200 ? `${course.description.slice(0,200)}...`:course.description}
            </p>
            {/* course price */}
            <div className='flex justify-between mt-4 text-gray-800 font-bold'>
              <div>
                {" "}
                Rs{course.price} {" "}
                <span className='line-through text-gray-500'>Rs300</span>
              </div>
              <div className='text-green-600 text-sm mt-2'>10 % off</div>
            </div>
            <div className='flex justify-between'>
              <Link to={`/admin/update-course/${course._id}`} className='bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600'>Update</Link>

              <button onClick={()=>handleDeleteCourse(course._id)} className='bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurCourses