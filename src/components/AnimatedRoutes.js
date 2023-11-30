import React from "react";
import Home from "../Pages/Home";
import About from "../Pages/About";
import SignIn from "../Pages/SignIn";
import Courses from "../Pages/Courses";
import StudentSignup from "../Pages/StudentSignup";
import TeacherSignup from "../Pages/TeacherSignup";
import TeacherHome from "../Pages/TeacherHome";
import CourseContentPage from "../Pages/CourseContentPage";
import CourseDetailsPage from "../Pages/CourseDetails";
import AddCourse from "../Pages/AddCourse";
import Help from "../Pages/Help";
import { AnimatePresence } from "../../node_modules/framer-motion/dist/framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../Pages/ProfilePage";
import EnrollPayment from "./Payment/EnrollPayment";
import CourseUploadPage from "../Pages/CourseUploadPage";
import AllUsersPage from "../Pages/AllUsersPage";
import EditCoursePage from "../Pages/EditCourse";
import ResultsPage from "../Pages/ResultsPage";

const AnimatedRoutes = () => {
  const location = useLocation();
  

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route  path="/" element={<Home/>} />
        <Route  path="/about" element={<About />} />
        <Route  path='/help' element={<Help/>} />
        <Route  path="/signin" element={<SignIn />} />
        <Route  path="/signup" element={<StudentSignup />} />
        <Route  path="/tsignup" element={<TeacherSignup />} />
        <Route  path='/courses' element={<Courses />}/>
        <Route path='/courseDetails/:id' element={<CourseDetailsPage />}/>
        <Route  path='/thome' element={<ProtectedRoute><TeacherHome/></ProtectedRoute>}/>
        <Route  path='/courseContent/:id' element={<ProtectedRoute><CourseContentPage/></ProtectedRoute>}/>
        <Route path='/AddCourse' element={<ProtectedRoute><AddCourse/></ProtectedRoute>} />
        <Route path='/course/edit/:id' element={<ProtectedRoute><EditCoursePage/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/enroll/:cid' element={<ProtectedRoute><EnrollPayment/></ProtectedRoute>} />
        <Route path='/course/upload/:id' element={<ProtectedRoute><CourseUploadPage/></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><AllUsersPage/></ProtectedRoute>} />
        <Route path='/results' element={<ResultsPage/>}/>

        
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
