import React, {  useState } from "react";
import "./Accordion.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Certificate from "../Certificate/Certificate";
const Accordion = ({
  course,
  courseData,
  setSelectedVideoUrl,
  enrolled,
  completedLessons,
  percentage
}) => {
  const user = useSelector((state) => state.auth.user);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const id = course.id;

  const toggleChapter = (chapterIndex) => {
    if (activeChapter === chapterIndex) {
      setActiveChapter(null);
      setActiveLesson(null);
    } else {
      setActiveChapter(chapterIndex);
      setActiveLesson(null);
    }
  };

  const toggleLesson = (lessonIndex) => {
    setActiveLesson(lessonIndex);
  };

  const handleLessonClick = (videoUrl) => {
    if (enrolled === true) {
      setSelectedVideoUrl(videoUrl);
    }
  };

  return (
    <div className="accordion">
      <h2>Course Content</h2>
      {courseData.map((chapter, chapterIndex) => (
        <div key={chapterIndex}>
          <div
            className={`accordion-title ${
              chapterIndex === activeChapter ? "active" : ""
            }`}
            onClick={() => toggleChapter(chapterIndex)}
          >
            {chapter.chapterName}
          </div>
          {enrolled && (
            <div
              className={`accordion-chapters ${
                chapterIndex === activeChapter ? "open" : ""
              }`}
            >
              {chapter.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`lesson-item ${
                    lesson.id === activeLesson ? "active" : ""
                  }`}
                  onClick={() => {
                    toggleLesson(lesson.id);
                    handleLessonClick(lesson.videoUrl);
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={completedLessons.includes(lesson.id)}
                      onChange={() => {}}
                    />
                    {lesson.lessonName}
                  </label>
                </div>
              ))}
            </div>
          )}
          {!enrolled && (
            <div
              className={`accordion-chapters ${
                chapterIndex === activeChapter ? "open" : ""
              }`}
            >
              {chapter.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className={`lesson-item ${
                    lessonIndex === activeLesson ? "active" : ""
                  }`}
                  onClick={() => {
                    toggleLesson(lessonIndex);
                  }}
                >
                  {lesson.lessonName}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
     {loggedIn && user.role===0 && percentage>=30 && <Certificate userName={user.firstName} courseTitle={course.title} instructorName={course.instructorName}/>}
      {loggedIn && user.role === 1  && (
        <>
          <div className="edit-div">
            <Link to={`/course/edit/${id}`}>
              <button className="edit">Edit</button>
            </Link>
          </div>
          <div className="upload-div">
            <Link to={`/course/upload/${id}`}>
              <button className="upload">Upload</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Accordion;
