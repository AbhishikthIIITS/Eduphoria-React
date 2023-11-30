import React from "react";
import EditCourse from "../components/TeacherHomeComponents/EditCourse";
import { useTitle } from "../Hooks/title-hook";
import { motion } from "framer-motion";
import GoBackButton from "../shared/components/FrontendTools/GoBack";
const EditCoursePage = () => {
  useTitle("Add Course");
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
      <GoBackButton/>
      <EditCourse/>
    </motion.div>
  );
};

export default EditCoursePage;
