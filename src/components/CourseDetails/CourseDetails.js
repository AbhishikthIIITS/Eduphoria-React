import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tab from "../Tabs/Tab";
import { FaCode, FaUniversity } from "react-icons/fa";
import "./CourseDetails.css";
import Accordion from "../CourseContent/Accordion";

import {
  FaStar,
  FaStarHalfAlt,
  FaPlay,
  FaVideo,
  FaDownload,
  FaNewspaper,
  FaMobileAlt,
  FaTrophy,
} from "react-icons/fa";
const CourseDetails = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [courseChapters,setCourseChapters]=useState([]);
  useEffect(() => {
    const getCourse = () => {
      fetch("http://localhost:8000/courses")
        .then((res) => {
          return res.json();
        })
        .then((courses) => {
          const reqcourse = courses.find(
            (course) => course.id === parseInt(courseId)
          );
          setCourse(reqcourse);
          setCourseChapters(reqcourse.chapters);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getCourse();
  }, [courseId,course.chapters]);
 
  const reviews = [
    {
      author: "Preetham Jayam",
      date: "August 15, 2023",
      rating: 5,
      comment: "Great course! I learned a lot.",
    },
    {
      author: "Anil Kumar",
      date: "August 10, 2023",
      rating: 4,
      comment: "Informative content, but could use more quizzes.",
    },
  ];

  const tabs = [
    {
      label: "Curriculum",
      content: (
        <>
        <Accordion
          courseData={courseChapters}
        />
          
        </>
      ),
    },
    {
      label: "Instuctor",
      content: (
        <>
          <div className="instructor-container">
            <div className="instructor-info">
              <h5>Dr.Kevin </h5>
              <p>Web Developer</p>
            </div>
            <div className="instructor-updated">
              <p>
                <FaCode /> Updated on March 2023
              </p>
            </div>
            <div className="instructor-institute">
              <p>
                <FaUniversity /> Institute: IIT KGP
              </p>
            </div>
          </div>
          <div className="instructor-experience">
            <h2>Experience:</h2>
            <p>
              Experience as (Web) Developer Starting out at the age of 12 I
              never stopped learning new programming skills and languages. Early
              I started creating websites for friends and just for fun as well.
              Besides web development I also explored Python and other
              non-web-only languages. This passion has since lasted and lead to
              my decision of working as a freelance web developer and
              consultant. The success and fun I have in this job is immense and
              really keeps that passion burningly alive. Starting web
              development on the backend (PHP with Laravel, NodeJS, Python) I
              also became more and more of a frontend developer using modern
              frameworks like React, Angular or VueJS in a lot of projects. I
              love both worlds nowadays! I also build full-stack applications
              and acquired expert DevOps and cloud computing knowledge - proven
              by the many AWS certifications I hold (incl. the top-level
              Solutions Architect Professional certification). As a self-taught
              developer I had the chance to broaden my horizon by studying
              Business Administration where I hold a Master's degree. That
              enabled me to work in a major strategy consultancy as well as a
              bank. While learning, that I enjoy development more than these
              fields, the time in this sector greatly improved my overall
              experience and skills.
            </p>
          </div>
        </>
      ),
    },
    {
      label: "Reviews",
      content: <>
      <div className="reviews-container">
            <h2 className="reviews-title">Student Reviews</h2>
            <div className="review-list">
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <div className="review-author">{review.author}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                  <div className="review-rating">
                    <span className="star">&#9733;</span> {review.rating}
                  </div>
                  <div className="review-comment">{review.comment}</div>
                </div>
              ))}
            </div>
          </div>
      </>,
    },
  ];

  return (
    <div className="course-main-box">
      <div className="course-header">
        <div className="box">
          <h2 className="course-title">
            Course Title :
            <span style={{ fontWeight: "normal", color: "#06bbcc" }}>
              {course.title}
            </span>
          </h2>
          <div className="rating">
            <div className="custom-box">
              <span className="average-rating">(4.5)</span>
              <span className="average-stars">
                <FaStar className="i-star" />
                <FaStar className="i-star" />
                <FaStar className="i-star" />
                <FaStar className="i-star" />
                <FaStarHalfAlt className="i-star" />
              </span>
              <span className="reviews">(5 Reviews)</span>
            </div>

            <ul>
              <li className="items-4">
                Enrolled students - <span>10</span>
              </li>
              <li className="items-4">
                Created by - <span>Dr. Kevin</span>
              </li>
              <li className="items-4">
                Last Updated - <span>10/08/23</span>
              </li>
              <li className="items-4">
                Language - <span>English</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="box">
          <div className="course-details-section">
            {course && <Tab tabs={tabs} />}
          </div>
        </div>
      </div>

      <div className="course-sidebar">
        <div className="img-box position-relative">
          <img src={course.image} className="course-image" alt={course.title} />
          <div className="play-icon">
            <FaPlay />
          </div>
          <h2 style={{ textAlign: "center" }}>Course Preview</h2>
        </div>
        <div className="center-items">
          <div className="price">
            <span className="price-old">₹4999</span>
            <span className="price-new">₹{course.price}</span>
            <span className="price-discount">41% off</span>
          </div>
          <h3>Course Features:</h3>
          <ul className="features-list">
            <li>
              <FaVideo />
              Total 15 Lessons
            </li>
            <li>
              <FaDownload />
              Downloadable resources
            </li>
            <li>
              <FaNewspaper />
              10 articles
            </li>
            <li>
              <FaMobileAlt />
              Access on mobile
            </li>
            <li>
              <FaTrophy />
              Certificate of Completion
            </li>
          </ul>

          <button className="join-button">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
