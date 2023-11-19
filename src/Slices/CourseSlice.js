import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const { courseId, updatedCourse } = action.payload;
      const index = state.courses.findIndex(course => course.id === courseId);

      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...updatedCourse };
      }
    },
    updateEnrolledStudents: (state, action) => {
      const { courseId, userId } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);

      if (courseIndex !== -1 && !state.courses[courseIndex].enrolledStudents.includes(userId)) {
        state.courses[courseIndex].enrolledStudents.push(userId);
      }
    },
    updateChapter: (state, action) => {
      const { courseId, chapterId, updatedChapter } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);
      const chapterIndex = state.courses[courseIndex]?.chapters.findIndex(chapter => chapter.id === chapterId);

      if (courseIndex !== -1 && chapterIndex !== -1) {
        state.courses[courseIndex].chapters[chapterIndex] = {
          ...state.courses[courseIndex].chapters[chapterIndex],
          ...updatedChapter,
        };
      }
    },
    updateLesson: (state, action) => {
      const { courseId, chapterId, lessonId, updatedLesson } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);
      const chapterIndex = state.courses[courseIndex]?.chapters.findIndex(chapter => chapter.id === chapterId);
      const lessonIndex = state.courses[courseIndex]?.chapters[chapterIndex]?.lessons.findIndex(lesson => lesson.id === lessonId);

      if (courseIndex !== -1 && chapterIndex !== -1 && lessonIndex !== -1) {
        state.courses[courseIndex].chapters[chapterIndex].lessons[lessonIndex] = {
          ...state.courses[courseIndex].chapters[chapterIndex].lessons[lessonIndex],
          ...updatedLesson,
        };
      }
    },
  },
});

export const {
  addCourse,
  updateCourse,
  updateEnrolledStudents,
  updateChapter,
  updateLesson,
} = courseSlice.actions;

export const selectAllCourses = state => state.course.courses;

export default courseSlice.reducer;
