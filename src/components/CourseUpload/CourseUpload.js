import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './CourseUpload.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseUpload = () => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  const [course, setCourse] = useState({});
  const [courseChapters, setCourseChapters] = useState([]);

  useEffect(() => {
    const getCourse = () => {
      fetch(`http://localhost:8000/courses/${courseId}`)
        .then((res) => res.json())
        .then((data) => {
          setCourse(data);
          setCourseChapters(data.chapters);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    getCourse();
  }, [courseId]);

  const handleChapterNameChange = (index, value) => {
    setCourseChapters((prevChapters) => {
      const updatedChapters = [...prevChapters];
      updatedChapters[index].chapterName = value;
      return updatedChapters;
    });
  };

  const handleLessonNameChange = (chapterIndex, lessonIndex, value) => {
    setCourseChapters((prevChapters) => {
      const updatedChapters = [...prevChapters];
      updatedChapters[chapterIndex].lessons[lessonIndex].lessonName = value;
      return updatedChapters;
    });
  };

  const handleVideoUrlChange = (chapterIndex, lessonIndex, value) => {
    setCourseChapters((prevChapters) => {
      const updatedChapters = [...prevChapters];
      updatedChapters[chapterIndex].lessons[lessonIndex].videoUrl = value;
      return updatedChapters;
    });
  };

  const addChapter = () => {
    setCourseChapters((prevChapters) => [
      ...prevChapters,
      { chapterName: '', lessons: [] },
    ]);
  };

  const addLesson = (chapterIndex) => {
    const updatedChapters = [...courseChapters];
    const newLesson = {
      id: Date.now(),
      lessonName: '',
      videoUrl: '',
    };
    updatedChapters[chapterIndex].lessons.push(newLesson);
    setCourseChapters(updatedChapters);
  };
  

  const updateCourse = useCallback(() => {
    fetch(`http://localhost:8000/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...course,
        chapters: courseChapters,
      }),
    })
      .then((res) => res.json())
      .then((updatedCourse) => {
        console.log('Course', updatedCourse);
        toast.success('Course Updated Successfully');
        navigate(`/courseContent/${courseId}`);
      })
      .catch((error) => {
        console.error('Error updating course:', error);
      });
  }, [course, courseChapters, courseId, navigate]);

  const handleSubmit = useCallback(() => {
    updateCourse();
  }, [updateCourse]);

  return (
    <div className="course-form">
      <h1>{course.courseName}</h1>
      {courseChapters.map((chapter, chapterIndex) => (
        <div className="chapter" key={chapterIndex}>
          <div className="chapter-header">
            <label>Chapter Name:</label>
            <input
              type="text"
              value={chapter.chapterName}
              onChange={(e) => handleChapterNameChange(chapterIndex, e.target.value)}
            />
          </div>
          <div className="lessons">
            {chapter.lessons.map((lesson, lessonIndex) => (
              <div className="lesson" key={lessonIndex}>
                <label>Lesson Name:</label>
                <input
                  type="text"
                  value={lesson.lessonName}
                  onChange={(e) => handleLessonNameChange(chapterIndex, lessonIndex, e.target.value)}
                />
                <label>Video URL:</label>
                <input
                  type="text"
                  value={lesson.videoUrl}
                  onChange={(e) => handleVideoUrlChange(chapterIndex, lessonIndex, e.target.value)}
                />
              </div>
            ))}
            <button className="upload-btn" onClick={() => addLesson(chapterIndex)}>
              Add Lesson
            </button>
          </div>
        </div>
      ))}
      <button className="upload-btn" onClick={addChapter}>
        Add Chapter
      </button>
      <button className="upload-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CourseUpload;
