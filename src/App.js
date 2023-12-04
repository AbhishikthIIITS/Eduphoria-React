import React,{useEffect} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainNavbar from "./shared/components/Navigation/MainNavbar";
import Footer from "./shared/components/Footer/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchAllCourses } from "./Actions/CourseActions";
import { fetchAllUsers } from "./Actions/UserActions";
function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return (
    <React.Fragment>
      <ToastContainer theme="colored" autoClose={3000} />
        <Router>
          <MainNavbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </Router>

    </React.Fragment>
  );
}

export default App;
