import { Courses } from "../models/courses.model.js";
import cloudinary from "cloudinary";
import { Purches } from "../models/purches.model.js";
import mongoose from "mongoose";



//course create
export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;

  if (!title || !description || !price)
    return res.status(400).json({ errors: "all field are required" });

  try {
    const {image} = req.files;
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ errors: "No file uploaded" });

    const allowedFormate = ["image/png", "image/jpeg"];

    if (!allowedFormate.includes(image.mimetype))
      return res
        .status(400)
        .json({ errors: "invalid file format.only png and jpg are allowed" });

    //claudinary code
    const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloudResponse || cloudResponse.error)
      return res
        .status(400)
        .json({ errors: "Error uploading file to cloudinary" });

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloudResponse.public_id,
        url: cloudResponse.url,
      },
      creatorId: adminId,
    };
    const course = await Courses.create(courseData);
    res.json({
      message: "course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error created failed" });
  }
};

//course update
export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;
  try {
       if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID format." });

      
    }
    const courseSearch = await Courses.findById(courseId);
    if (!courseSearch)
      return res.status(401).json({ message: "course not found" });


    const updatedCourse = await Courses.findByIdAndUpdate(
  courseId,req.body,
  {
    title, description, price, image: { public_id: image?.public_id, url: image?.url },
  },
  { new: true }
);
   

    res.status(201).json({ message: "course updated successfully.",updateCourse });
  } catch (error) {
    res.status(500).json({ error: "error in course updation" });
    console.log("Error in course updation", error);
  }
};

//course delete
export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Courses.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) return res.status(404).json({ errors: "cannot delete,  created by other admin" });
    res.status(203).json({ message: "course deleted successfully" });
  } catch (error) {
    res.status(501).json({ errors: "error in course deletion" });
  }
};

//course get
export const getCourse = async (req, res) => {
  try {
    const course = await Courses.find({});
    res.status(201).json({ course });
  } catch (error) {
    res.status(504).json({ error: "error in get course" });
  }
};

//individual course get
export const courseDetails = async (req, res) => {
  try {
    const course = await Courses.findById(req.params.courseId);
    res.status(201).json({ course });
  } catch (error) {
    res.status(504).json({ error: "error in get coursedetails" });
  }
};

export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;
  try {
    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).json({ errors: "course not found" });

    if (await Purches.findOne({ userId, courseId }))
      return res
        .status(400)
        .json({ errors: "user has already purchesed this course" });


    const newPurchase = new Purches({ userId, courseId });
    await newPurchase.save();
    res
      .status(200)
      .json({ message: "course purchesed successfully",course,newPurchase, });
  } catch (error) {
    res.status(500).json({ errors: "error in course buying" });
  }
};
