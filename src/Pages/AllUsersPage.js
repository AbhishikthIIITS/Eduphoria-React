import React, { useEffect, useState } from "react";
import AllUsers from "../components/AdminDashboard/AllUsers";
import { useTitle } from "../Hooks/title-hook";
import { motion } from "framer-motion";
import GoBackButton from "../shared/components/FrontendTools/GoBack";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  useTitle("All Users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const usersData = await response.json();

        if (usersData && usersData.length > 0) {
          const filteredUsersData = usersData.filter(user => user.role !== 2);

          const usersWithCourses = await Promise.all(
            filteredUsersData.map(async (user) => {
              const courseIds =
                user.role === 0 ? user.enrolledCourses : user.teachingCourses;
              const userCourses = await Promise.all(
                courseIds.map(async (courseId) => {
                  const responseCourse = await fetch(
                    `http://localhost:8000/courses/${courseId}`
                  );
                  if (!responseCourse.ok) {
                    throw new Error("Network response was not ok");
                  }

                  const courseDetails = await responseCourse.json();
                  return courseDetails;
                })
              );

              return { ...user, courses: userCourses };
            })
          );

          setUsers(usersWithCourses);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
        <GoBackButton/>
      <h1>All Users</h1>
      <AllUsers users={users} />;
    </motion.div>
  );
};

export default AllUsersPage;
