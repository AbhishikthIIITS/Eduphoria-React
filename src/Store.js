
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import courseReducer from './Slices/CourseSlice';
import userReducer from './Slices/UserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    courseSlice:courseReducer,
    user:userReducer,
    
  },
});

export default store;
