import React, { useState, useEffect } from "react";
import "./CourseCard.css";
import { useSelector } from "react-redux";
const ProgressBar = ({ completed, total }) => {
  const percentage = (completed / total) * 100;

  return (
    <>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p>
        <strong>{percentage}% Completed</strong>
      </p>
    </>
  );
};

const CourseProgress = ({ user, courseId }) => {
  const [completedLessons, setCompletedLessons] = useState(0);
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
                setCompletedLessons(completedLessonsCount);
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

  return (
    <div className="course-progress">
      <ProgressBar completed={completedLessons} total={totalLessons} />
    </div>
  );
};

const CourseCard = ({ course, onReadMoreClick, enrolled }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div
      className="course-card"
      style={{
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        {!enrolled && <p className="course-price">₹{course.price}</p>}
        <p className="course-instructor">
          <b>Instructor</b>: {course.instructorName}
        </p>
        <p className="course-students">
          <b>Enrolled Students</b>: {course.enrolledStudents.length}
        </p>
        {!enrolled && (
          <button
            className="read-more-button"
            onClick={() => onReadMoreClick(course)}
          >
            Read More
          </button>
        )}
        {enrolled && (
          <button
            className="read-more-button"
            onClick={() => onReadMoreClick(course)}
          >
            Open Course
          </button>
        )}
        {enrolled && user.role === 0 && (
          <CourseProgress user={user} courseId={course.id} />
        )}
      </div>
    </div>
  );
};

export default CourseCard;
