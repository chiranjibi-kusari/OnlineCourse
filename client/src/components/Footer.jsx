import React from 'react'
import image from "../assets/image.jpg"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"
const Footer = () => {
  return (
    <div className='text-white px-32 flex justify-between items-center text-center mt-1'>
      <div>
        <div className='flex items-center gap-2'>
                <img src={image} alt="" className='w-8 rounded-full'/>
                <h2 className='text-md text-orange-400'>DIGITALEARN</h2>
        </div>
        <div className='mt-2'>
          <h1 className='text-sm pb-4' >Follow us</h1>
          <div className='flex gap-4 '>
            <a href=""><FaFacebook className='hover:text-blue-400 duration-300' size={15}/></a>
            <a href=""><FaInstagram className='hover:text-pink-600 duration-300' size={15}/></a>
            <a href=""><FaTwitter className='hover:text-blue-600 duration-300' size={15}/></a>
          </div>
        </div>

      </div>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold items-center text-center text-sm'>Connects</h1>
        <p className='text-gray-500'>youtube-digitalearn</p>
        <p className='text-gray-500'>github-giditallearn</p>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold items-center text-center'>Copyrights 2025</h1>
        <p className='text-gray-500'>Terms & Conditions</p>
        <p className='text-gray-500'>Privacy Policy</p>
        <p className='text-gray-500'>Refund & Cancellation</p>
      </div>
    </div>
  )
}

export default Footer