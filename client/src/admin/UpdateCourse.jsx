import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../utils/utils'

const UpdateCourse = () => {
  const {id}=useParams()

    const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [image,setImage]=useState("")
  const [imagePreview,setImagePreview]=useState("")
  const [loading,setLoading]=useState(true)

  const navigate=useNavigate()

  useEffect(()=>{
  const fetchCourseData=async ()=>{
    try {
           const {data}=await axios.get(`${BACKEND_URL}/course/course/${id}`,{withCredentials:true})
      console.log("data",data);
      setTitle(data.course.title)
      setDescription(data.course.description)
      setPrice(data.course.price)
      setImagePreview(data.course.image.url)
      setImage(data.course.image.url)
      
      setLoading(false)
    } catch (error) {
 console.log(error)
 toast.error("failed to fetch course data")
 setLoading(false)
    }
  }
  fetchCourseData();
  },[id])

    const changePhotoHanduler=(e)=>{
      const file=e.target.files[0]
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setImagePreview(reader.result)
      setImage(file)
    }
  }

  const handleUpdateCourse=async (e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append("title",title)
    formData.append("description",description)
    formData.append("price",price)
     formData.append("image",image)
    
    // if(image){
    //   formData.append("image",image)
    // }

    const admin=JSON.parse(localStorage.getItem("admin"))
    const token=admin.token
    console.log(token);
    
    if(!token){
      navigate('/admin/login')
      return;
    }
    try {
      const response=await axios.put(`${BACKEND_URL}/course/update/${id}`,formData,{
        headers:{
          Authorization:`Bearer ${token}`
        },
        withCredentials:true,
      })
      console.log(response.data);
      toast.success(response.data.message || 'Course updated successfully')
      navigate('/admin/our-course')
      setDescription("")
      setTitle("")
      setImage("")
      setPrice("")
      setImagePreview("")
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors)
    }
  }
  return (
    <div>
      <div className='min-h-screen py-10'>
        <div className='max-w-4xl mx-auto p-6 border rounded-lg shadow-lg'>
          <h3 className='text-2xl font-semibold mb-8'>Update Course</h3>
          <form onSubmit={handleUpdateCourse} className='space-y-6'>
            <div className='space-y-2'>
              <label className='block text-lg'>Title</label>
              <input type="text" placeholder='Enter your course title' value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full px-3 py-2 border border-gray-400 rounded-md outline-none'/>
            </div>
             <div className='space-y-2'>
              <label className='block text-lg'>Description</label>
              <input type="text" placeholder='Enter your course Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full px-3 py-2 border border-gray-400 rounded-md outline-none'/>
            </div>
             <div className='space-y-2'>
              <label className='block text-lg'>Price</label>
              <input type="text" placeholder='Enter your course title' value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full px-3 py-2 border border-gray-400 rounded-md outline-none'/>
            </div>
             <div className='space-y-2'>
              <label className='block text-lg'>Course Image</label>
              <div className='flex items-center justify-center'>
                <img src={imagePreview ? `${imagePreview}`: "/imgPL.webp"} alt="course" className='w-full max-w-sm h-auto rounded-md object-cover'/>
              </div>
              <input type="file" placeholder='Enter your course title' onChange={changePhotoHanduler} className='w-full px-3 py-2 border border-gray-400 rounded-md outline-none'/>
            </div>
            <button type='submit' className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200'>Update Course</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateCourse