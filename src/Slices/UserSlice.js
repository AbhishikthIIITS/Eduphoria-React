import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status:'idle',
  error:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAllUsersStart: (state) => {
      state.status = 'loading';
    },
    getAllUsersSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    },
    getAllUsersFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      const { userId, updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === userId);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
    },
    updateEnrolledCourses: (state, action) => {
      const { userId, courseId } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === userId);

      if (userIndex !== -1 && !state.users[userIndex].enrolledCourses.includes(courseId)) {
        state.users[userIndex].enrolledCourses.push(courseId);
      }
    },
  },
});

export const { updateUser, updateEnrolledCourses,getAllUsersFailure,getAllUsersStart,getAllUsersSuccess } = userSlice.actions;

export const selectAllUsers = state => state.user.users;

export default userSlice.reducer;
