import React, { useEffect, useState } from 'react'
import axios from "axios"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';

const Hero = () => {
  const [courses,setCourses]=useState([])

  const navigate=useNavigate()

 useEffect(()=>{
   const fetchCources=async()=>{
  try {
     const response=await axios.get(`${BACKEND_URL}/course/course`,{withCredentials:true})
     console.log(response.data.course);
     setCourses(response.data.course)
     

  } catch (error) {
console.log("error in fetchCourse",error);

  }
  }
  fetchCources()
 },[])

 //for slider
 var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='text-white text-center px-32'>
      <h1 className='text-orange-400 font-bold text-xl'>DIGITALEARN</h1>
      <p className='text-gray-500 py-2'>Sharp yout skills with courses crafted by experts.</p>
      <div className='flex justify-center gap-4 py-2'>
        <Link className='bg-green-500 py-1 px-2 rounded-md font-semibold text-md hover:text-black duration-300 transition-all' to={('/courses')}>Explore Courses</Link>
        <Link to={'https://www.youtube.com/@crwvlogs9273'} className='bg-white text-black py-1 px-2 rounded-md font-semibold text-md hover:text-red-600 duration-300 transition-all'>Courses Videos</Link>
      </div>
      <div className='py-4'>
      <Slider {...settings}>
       {
        courses.map((course)=>(
          <div key={course._id} className='p-4'>
            <div className='relative flex-shrink-0 w-40 transition-transform duration-300 hover:scale-105 '>
              <div className='bg-gray-900 rounded-lg overflow-hidden items-center flex flex-col'>
              <img src={course.image.url} alt="" className='h-16 w-16'/>
              <div className='p-4 text-center'>
                <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                <button className='bg-orange-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-500 duration-300'>Enroll Now</button>
                </div>
              </div>
            </div>
          </div>
        ))
       }
        
      </Slider>
      </div>

    </div>
  )
}

export default Hero