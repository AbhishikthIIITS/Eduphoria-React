import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import "./CourseContent.css";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { FaCode, FaUniversity } from "react-icons/fa";
import Tab from "../Tabs/Tab";
import { useSelector } from "react-redux";

const CourseContent = () => {
  const user=useSelector((state)=>state.auth.user);
  const [course, setCourse] = useState([]);
  const [rating, setRating] = useState("1");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(
    "https://youtu.be/AQEc4BwX6dk?si=ER7ghHEE8PyBUYE-"
  );
  const [courseChapters,setCourseChapters]=useState([]);
  const { id: courseId } = useParams();
  const [completedLessonCount, setCompletedLessonsCount] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const courseResponse = await fetch(
          `http://localhost:8000/courses/${courseId}`
        );
        const courseData = await courseResponse.json();

        if (courseData && courseData.chapters) {
          const totalLessonsCount = courseData.chapters.reduce(
            (count, chapter) => count + chapter.lessons.length,
            0
          );
          setTotalLessons(totalLessonsCount);
        }
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    const getCompletedLessons = () => {
      fetch(`http://localhost:8000/courses/${courseId}`)
        .then((res) => res.json())
        .then((course) => {
          fetch(`http://localhost:8000/user/${user.id}`)
            .then((res) => res.json())
            .then((userData) => {
              if (userData.role === 0) {
                const studentCompletedLessons = userData.completedLessons || [];
                let completedLessonsCount = 0;

                course.chapters.forEach((chapter) => {
                  chapter.lessons.forEach((lesson) => {
                    if (studentCompletedLessons.includes(lesson.id)) {
                      completedLessonsCount++;
                    }
                  });
                });
                setCompletedLessonsCount(completedLessonsCount);
                console.log("Completed Lessons Count:", completedLessonsCount);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getCourseDetails();
    getCompletedLessons();
  }, [user.id, courseId]);

  const percentage = (completedLessonCount/totalLessons)*100;
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

  useEffect(() => {
    const getCompletedLessons = () => {
      fetch("http://localhost:8000/user/" + user.id)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          setCompletedLessons(resp.completedLessons);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getCompletedLessons();
  },[user.id]);

  

  const submitReviewHandler = (e) => {
    e.preventDefault();
    setRating('1');
    setComment("");

    const reviewData = {
      courseId: courseId, 
      studentName: user.firstName, 
      rating: parseInt(rating, 10),
      comment,
      todaysdate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews([...reviews, newReview]); 
        alert("Review added succesfully");
        
      })
      .catch((err) => {
        console.error("Error submitting review:", err.message);
      });
    
      
  };

  useEffect(() => {
    if (courseId) {
      fetch(`http://localhost:8000/reviews?courseId=${courseId}`)
        .then((res) => res.json())
        .then((fetchedReviews) => {
          if (Array.isArray(fetchedReviews)) {
            setReviews(fetchedReviews);
          } else {
            console.error("Invalid response from the server when fetching reviews");
          }
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err.message);
        });
    }
  }, [courseId]);
  

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
              <span className="student-count">10</span>
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
              <h5>{course.instructorName}</h5>
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
        <div>
        <div className="review-form-container">
          <h2>Submit a Review</h2>
          <form onSubmit={submitReviewHandler}>
            <div className="review-input">
              <label htmlFor="rating">Rating:</label>
              <select id="rating" name="rating" required onChange={(e) => setRating(e.target.value)}>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="review-input">
              <label htmlFor="comment">Comment:</label>
              <textarea id="comment" name="comment" required onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <div className="review-input">
              <button type="submit">Submit Review</button>
            </div>
          </form>
        </div>
        <div className="reviews-container">
          <h2>Reviews</h2>
          <ul className="reviews-list">
            {reviews.length===0 && <h3>No Reviews Yet!!</h3>}
            {reviews.length>0 && reviews.map((review, index) => (
              <li key={index} className="review-item">
                <div className="review-header">
                  <p className="review-author">{review.studentName}</p>
                  <p className="review-date">{review.todaysdate}</p>
                </div>
                <div className="review-rating">
                  <span className="star">&#9733;</span> {review.rating}
                </div>
                <p className="review-comment">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
                user={user}
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
          course={course}
          courseData={courseChapters}
          setSelectedVideoUrl={setSelectedVideoUrl}
          enrolled={true}
          completedLessons={completedLessons}
          percentage={percentage}
        />
      </div>
    </div>
  );
};

const updateCompletedLessons = (user, completedLessons) => {
  fetch(`http://localhost:8000/user/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user,completedLessons }),
  })
    .then((res) => res.json())
    .then((updatedUser) => {
      console.log("User data updated with completed lessons:", updatedUser);
    })
    .catch((err) => {
      console.error("Error updating user data:", err.message);
    });
};


const VideoPlayer = ({user, url, completedLessons, setCompletedLessons, courseData }) => {
  const handleVideoEnded = () => {
    const updatedCompletedLessons = [...completedLessons];

    courseData.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        if (lesson.videoUrl === url) {
          const lessonId = lesson.id;
          if (!completedLessons.includes(lessonId)) {
            updatedCompletedLessons.push(lessonId);
          }
        }
      });
    });

    setCompletedLessons(updatedCompletedLessons);
    updateCompletedLessons(user, updatedCompletedLessons);
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