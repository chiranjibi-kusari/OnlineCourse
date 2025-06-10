import { Navigate, Route, Routes,} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Courses from "./components/Courses";
import Buy from "./components/Buy";
import Purchases from "./components/Purchases";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import CourseCreate from "./admin/CourseCreate";
import UpdateCourse from "./admin/UpdateCourse";
import OurCourses from "./admin/OurCourses";

function App() {
  const user=JSON.parse(localStorage.getItem("user"))
  const admin=JSON.parse(localStorage.getItem("admin"))

  
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route path="/purchases" element={user ? <Purchases />:<Navigate to={'/login'}/>} />

        {/* admin routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/Dashboard" element={admin ? <Dashboard /> : <Navigate to={'/admin/login'}/>} />
        <Route path="/admin/create-course" element={<CourseCreate />} />
        <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
        <Route path="/admin/our-course" element={<OurCourses />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
