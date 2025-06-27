import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import jobSlice from './slices/jobSlice';
import applicationSlice from './slices/applicationSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    jobs: jobSlice,
    applications: applicationSlice,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;