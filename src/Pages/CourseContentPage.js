import React from "react";
import CourseContent from "../components/CourseContent/CourseContent";
import GoBackButton from "../shared/components/FrontendTools/GoBack";
import { useTitle } from "../Hooks/title-hook";
import { motion } from "framer-motion";
const CourseContentPage = () => {
  useTitle("Course Content Page");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GoBackButton />
      <CourseContent />
    </motion.div>
  );
};

export default CourseContentPage;
