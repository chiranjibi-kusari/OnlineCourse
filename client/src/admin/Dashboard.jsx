import React from 'react'
import { Link } from 'react-router-dom'
import image from "../assets/image.jpg";

const Dashboard = () => {
  return (
    <div className='flex h-screen'>
      {/* sidebar */}
      <div className='w-64 bg-gray-100 p-5'>
        <div className='flex items-center flex-col mb-10'>
          <img src={image} alt="profile" className='rounded-full h-20 w-20'/>
          <h2>Iam Admin</h2>
        </div>
        <nav className='flex flex-col space-y-4'>
          <Link to={'/admin/our-course'}>
          <button className='w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded'>Our Courses</button>
          </Link>
            <Link to={'/admin/create-course'}>
          <button className='w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded'>Create Courses</button>
          </Link>
            <Link to={'/'}>
          <button className='w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded'>Home</button>
          </Link>
            <Link to={'/admin/login'}>
          <button className='w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded'>Logout</button>
          </Link>
        </nav>
      </div>
      {/* main text */}
      <div className='flex h-screen items-center justify-center ml-[40%]'>Welcome!!!</div>
    </div>
  )
}

export default Dashboard