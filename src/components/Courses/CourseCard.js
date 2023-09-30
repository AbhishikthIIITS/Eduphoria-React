import React from 'react';
import './CourseCard.css';
const CourseCard = ({ course, onReadMoreClick ,enrolled}) => {
 
  return (
    <div className="course-card" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        {!enrolled && <p className="course-price">₹{course.price}</p> }
        <p className="course-instructor"><b>Instructor</b>: {course.instructorName}</p>
        <p className="course-students"><b>Enrolled Students</b>: {course.enrolledStudents.length }</p>
        {!enrolled && <button className="read-more-button" onClick={() => onReadMoreClick(course)}>Read More</button> }
        {enrolled && <button className="read-more-button" onClick={() => onReadMoreClick(course)}>Open Course</button> }
      </div>
    </div>
  );
};

export default CourseCard;
