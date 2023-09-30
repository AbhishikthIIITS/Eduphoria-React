import React from "react";
import CourseCard from "./CourseCard";
import "./CourseList.css";
import { useNavigate } from "react-router-dom";


const EnrolledCourseList = ({ courses }) => {
  const navigate=useNavigate();
  const handleReadMore = (course) => {
     navigate(`/courseContent/${course.id}`);
    
  };
  return (
    <>
      <h1 className="enrolled-heading">Your Enrolled Courses</h1>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onReadMoreClick={handleReadMore} enrolled={true}/>
        ))}
      </div>
    </>
  );
};

export default EnrolledCourseList;
