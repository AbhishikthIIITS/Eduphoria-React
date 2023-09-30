import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import "./CourseContent.css";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { FaCode, FaUniversity } from "react-icons/fa";
import Tab from "../Tabs/Tab";
const CourseContent = () => {
  const [course, setCourse] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(
    "https://youtu.be/AQEc4BwX6dk?si=ER7ghHEE8PyBUYE-"
  );
  const [courseChapters,setCourseChapters]=useState([]);
  const { id: courseId } = useParams();
  useEffect(() => {
    const getCourse = () => {
      fetch("http://localhost:8000/courses")
        .then((res) => {
          return res.json();
        })
        .then((courses) => {
          const reqcourse = courses.find(
            (cou) => cou.id === parseInt(courseId)
          );
          setCourse(reqcourse);
          setCourseChapters(reqcourse.chapters);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getCourse();
  }, [courseId]);
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
      label: "Overview",
      content: (
        <>
          <div>
            <h2>
              Course Title :{" "}
              <span style={{ fontWeight: "bolder", color: "Highlight" }}>
                {course.title}
              </span>
            </h2>
            <div>
              <h2>Description:</h2>
              {course.description}
            </div>
          </div>
          <div className="course-information">
            <div className="rating-section">
              <span className="star-rating">
                4.5 <i className="fas fa-star"></i>
              </span>
              <br />
              <p className="rating-count">5 Ratings</p>
            </div>
            <div className="student-section">
              <span className="student-count">1000</span>
              <br />
              Students
            </div>
            <div className="hours-section">
              <span className="hours-count">10 Hours</span>
              <br />
              Total
            </div>
          </div>
          <div className="what-learn">
            <h2>What you'll Learn</h2>
            <ul className="learn-list">
              <li>Course Introduction</li>
              <li>Understanding Course Objectives</li>
              <li>Exploring Key Concepts</li>
              <li>Hands-on Practice</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      label: "Instuctor",
      content: (
        <>
          <div className="instructor-container">
            <div className="instructor-info">
              <h5>Dr.Krishna Rao</h5>
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
              love both worlds nowadays!
            </p>
          </div>
        </>
      ),
    },
    {
      label: "Reviews",
      content: (
        <>
          <div className="review-form-container">
            <h2>Submit a Review</h2>
            <form>
              <div className="review-input">
                <label for="rating">Rating:</label>
                <select id="rating" name="rating" required>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <div className="review-input">
                <label for="comment">Comment:</label>
                <textarea id="comment" name="comment" required></textarea>
              </div>
              <div className="review-input">
                <button type="submit">Submit Review</button>
              </div>
            </form>
          </div>
          <div className="reviews-container">
            <h2>Reviews</h2>
            <ul className="reviews-list">
              {reviews.map((review, index) => (
                <li key={index} className="review-item">
                  <div className="review-header">
                    <p className="review-author">{review.author}</p>
                    <p className="review-date">{review.date}</p>
                  </div>
                  <div className="review-rating">
                    <span className="star">&#9733;</span> {review.rating}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="course-page">
      <div className="course-content">
        <div className="main-content">
          <div className="video-player-container">
            {selectedVideoUrl && (
              <VideoPlayer
                url={selectedVideoUrl}
                completedLessons={completedLessons}
                setCompletedLessons={setCompletedLessons}
                courseData={courseChapters}
              />
            )}
          </div>
          <div className="course-details-section">
            {course && <Tab tabs={tabs} />}
          </div>
        </div>
      </div>

      <div className="sidebar">
        <Accordion
          courseData={courseChapters}
          setSelectedVideoUrl={setSelectedVideoUrl}
          enrolled="true"
          completedLessons={completedLessons}
        />
      </div>
    </div>
  );
};

const VideoPlayer = ({ url, completedLessons, setCompletedLessons, courseData }) => {
  const handleVideoEnded = () => {
    const updatedCompletedLessons = [...completedLessons];
    
    courseData.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        if (lesson.videoUrl === url) {
          const lessonId = lesson.id;
          if (!completedLessons.includes(lessonId)) {
            updatedCompletedLessons.push(lessonId);
            setCompletedLessons(updatedCompletedLessons);
          }
        }
      });
    });
  };

  return (
    <div className="video-player">
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        className="react-player"
        onEnded={handleVideoEnded}
      />
    </div>
  );
};

export default CourseContent;