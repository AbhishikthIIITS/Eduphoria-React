import React, { useState, useEffect } from "react";
import { useTitle } from "../Hooks/title-hook";
import { motion } from "framer-motion";
import CourseList from "../components/Courses/CourseList";
import { useSelector } from "react-redux";
import GoBackButton from "../shared/components/FrontendTools/GoBack";
import Loader from "../components/Loader/Loader";

const Courses = () => {
  useTitle("Courses Page");
 
  const [courseData, setCourseData] = useState([]);
  const user=useSelector((state)=>state.auth.user);
  const isLoggedIn=useSelector((state)=>state.auth.loggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [sortValue,setSortValue]=useState("");

  const otherCourses= user && user.role===0 && courseData.filter((course)=>!user.enrolledCourses.includes(course.id));

  
  

  useEffect(() => {
    const getCourseData = () => {
      fetch("http://localhost:8000/courses")
        .then((res) => {
          setIsLoading(true);
          return res.json();
        })
        .then((courses) => {
          setCourseData(courses);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err.message);
        });
    };
    getCourseData();
  }, []);

  const sortHandler=()=>{
    if(sortValue === "price:asc"){
      setCourseData([...courseData].sort((a,b)=>a.price-b.price));
    } 
    else if(sortValue === "price:desc"){
      setCourseData([...courseData].sort((a,b)=>b.price-a.price));
    } else if (sortValue === "title:asc") {
      setCourseData([...courseData].sort((a, b) => a.title.localeCompare(b.title)));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GoBackButton />
      <div className="courses">
        <h2
          style={{
            fontSize: "2.5rem",
            margin: "2rem 0",
            color: "#000",
            textDecoration: "underline",
            textAlign: "center",
          }}
        >
          Courses Page
        </h2>
        <div className="sortFilter">
          <div className="sort-formGroup">
            <label className="sort-label" htmlFor="sort">
              Sort by:
            </label>
            <select
              className="sort-select"
              name="sort"
              id="sort"
              onChange={(e)=>setSortValue(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="title:asc">Title: A to Z</option>
            </select>
            <button
              type="button"
              id="sort-button"
              className="read-more-button"
              onClick={sortHandler}
            >
              Sort
            </button>
          </div>
        </div>
        {isLoading ? <Loader /> : (isLoggedIn ? <CourseList courses={user.role===0 ?otherCourses : courseData} /> :<CourseList courses={courseData} />)}
      </div>
    </motion.div>
  );
};

export default Courses;
