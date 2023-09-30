import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTitle } from "../Hooks/title-hook";
import HeroBanner from "../components/HomeComponents/HeroBanner";
import Testimonial from "../components/HomeComponents/Testimonial";
import Teach from "../components/HomeComponents/Teach";
import Instructors from "../components/HomeComponents/Instructors";
import CourseList from "../components/Courses/CourseList";
import { useSelector } from "react-redux";
import EnrolledCourseList from "../components/Courses/EnrolledList";
import Header from "../components/Header/Header";

const Home = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);
  const [courseData, setCourseData] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  
  useEffect(() => {
    if (loggedIn && user && user.id) { 
      fetch(`http://localhost:8000/user/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((userData) => {
          if (userData && userData.enrolledCourses) {
            const courseIds = userData.enrolledCourses;
  
            const courseForUser = courseIds.map((courseId) =>
              fetch(`http://localhost:8000/courses/${courseId}`).then(
                (response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json();
                }
              )
            );
  
            Promise.all(courseForUser)
              .then((courseDetails) => {
                setUserCourses(courseDetails);
              })
              .catch((error) => {
                console.error("Error fetching course details:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [loggedIn, user ]);
  
  useEffect(() => {
    const getCourseData = () => {
      fetch("http://localhost:8000/courses")
        .then((res) => {
          return res.json();
        })
        .then((courses) => {
          setCourseData(courses);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getCourseData();
  }, []);
  

  useTitle("Home Page");

  const courses=courseData.slice(0,4);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!loggedIn && (
        <>
          <HeroBanner />
          <h1>Popular Courses</h1>
          <CourseList courses={courses} />
          <Teach />
        </>
      )}

      {loggedIn && <Header user={user} />}
      {loggedIn && user.role === 0 && (
        <EnrolledCourseList courses={userCourses} />
      )}

      <Testimonial />
      <Instructors />
    </motion.div>
  );
};

export default Home;
