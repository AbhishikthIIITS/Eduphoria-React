import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./EnrollPayment.css";
import { useSelector } from "react-redux";
import { updateEnrolledCourses } from "../../Slices/UserSlice";
import { updateEnrolledStudents } from "../../Slices/CourseSlice";
const EnrollPayment = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { cid } = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [course,setCourse]=useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getCourseData = () => {
      fetch("http://localhost:8000/courses")
        .then((res) => {
          
          return res.json();
        })
        .then((courses) => {
          const foundCourse = courses.find(course => course.id === parseInt(cid,10));
          if (foundCourse) {
            setCourse(foundCourse);
          } else {
            console.error(`Course with ID ${cid} not found.`);
          }
          
        })
        .catch((err) => {
          
          console.error(err.message);
        });
    };
    getCourseData();
  }, [cid]);
  

  const validateForm = () => {
    const errors = {};

    if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = "Invalid card number";
    }

    if (!/^\d{2}\/\d{4}$/.test(expiryDate)) {
      errors.expiryDate = "Invalid expiry date";
    }

    if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "Invalid CVV";
    }

    return errors;
  };

  const handlePayment = () => {
    const formErrors = validateForm();
    const newUser = { ...user, enrolledCourses: [...(user.enrolledCourses || []), parseInt(cid, 10)] };
    const updatedCourse={...course,enrolledStudents:[...course.enrolledStudents,parseInt(user.id,10)]};
    console.log(updatedCourse);
    fetch('http://localhost:8000/courses/'+cid,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        },
      body:JSON.stringify(updatedCourse),

    }).then((res)=>res.json())
    .catch((err)=>{
      console.log(err.message);
    })

  
    if (Object.keys(formErrors).length === 0) {
      setTimeout(() => {
        console.log("Processing payment for course:", cid);
        if (user.role === 0) {
          fetch("http://localhost:8000/user/" + user.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((updatedUser) => {
              dispatch(updateEnrolledCourses({ userId: user.id, courseId: cid }));
              dispatch(updateEnrolledStudents({ userId: user.id, courseId: cid }));
              navigate(`/courseContent/${cid}`);
              alert("Course enrolled successfully");
            })
            .catch((err) => {
              console.error(err.message);
              alert("Error enrolling in the course");
            });
        }
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };
  

  return (
    <div className="enroll-payment-container">
      <h2>Enrollment Payment Page</h2>
      <form className="enroll-payment-form">
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter your card number"
            className="enroll-input"
          />
          {errors.cardNumber && (
            <span className="enroll-error">{errors.cardNumber}</span>
          )}
        </label>
        <br />
        <label>
          Expiry Date:
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YYYY"
            className="enroll-input"
          />
          {errors.expiryDate && (
            <span className="enroll-error">{errors.expiryDate}</span>
          )}
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="Enter CVV"
            className="enroll-input"
          />
          {errors.cvv && <span className="enroll-error">{errors.cvv}</span>}
        </label>
        <br />
        <button type="button" onClick={handlePayment} className="enroll-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default EnrollPayment;
