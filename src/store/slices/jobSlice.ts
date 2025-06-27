import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobState, Job } from '../../types';

const initialState: JobState = {
  jobs: [],
  featuredJobs: [],
  recommendedJobs: [],
  savedJobs: [],
  filters: {
    location: '',
    type: '',
    remote: false,
    salary: [0, 200000],
    skills: [],
  },
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action: PayloadAction<Job[]>) => {
      state.isLoading = false;
      state.jobs = action.payload;
      state.featuredJobs = action.payload.slice(0, 6);
    },
    fetchJobsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setRecommendedJobs: (state, action: PayloadAction<Job[]>) => {
      state.recommendedJobs = action.payload;
    },
    addSavedJob: (state, action: PayloadAction<Job>) => {
      const exists = state.savedJobs.find(job => job.id === action.payload.id);
      if (!exists) {
        state.savedJobs.push(action.payload);
      }
    },
    removeSavedJob: (state, action: PayloadAction<string>) => {
      state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload);
    },
    updateFilters: (state, action: PayloadAction<Partial<JobState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  setRecommendedJobs,
  addSavedJob,
  removeSavedJob,
  updateFilters,
  clearFilters,
} = jobSlice.actions;
export default jobSlice.reducer;