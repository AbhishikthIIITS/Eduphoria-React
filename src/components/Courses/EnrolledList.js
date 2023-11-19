import React from "react";
import CourseCard from "./CourseCard";
import "./CourseList.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EnrolledCourseList = ({ courses }) => {
  const user=useSelector((state)=>state.auth.user);
  const navigate=useNavigate();
  const handleReadMore = (course) => {
     navigate(`/courseContent/${course.id}`);
    
  };
  return (
    <>
      {user.role===0 && <h1 className="enrolled-heading">Your Enrolled Courses</h1>}
      {user.role===1 && <h1 className="enrolled-heading">Your Teaching Courses</h1>}
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onReadMoreClick={handleReadMore} enrolled={true}/>
        ))}
      </div>
    </>
  );
};

export default EnrolledCourseList;
