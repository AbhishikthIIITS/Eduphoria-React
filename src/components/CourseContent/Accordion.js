import React, { useState } from "react";
import "./Accordion.css";

const Accordion = ({ courseData, setSelectedVideoUrl, enrolled ,completedLessons}) => {
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

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
    if (enrolled === "true") {
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
                  <input type="checkbox" checked={completedLessons.includes(lesson.id)} onChange={() => {}}/> 
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
    </div>
  );
};

export default Accordion;
