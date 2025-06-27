import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Application } from '../../types';

interface ApplicationState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [
    {
      id: '1',
      jobId: '1',
      candidateId: '1',
      candidateName: 'John Smith',
      candidateEmail: 'john.smith@email.com',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      status: 'pending',
      appliedAt: '2024-01-16T10:30:00Z',
      resume: 'john_smith_resume.pdf',
      coverLetter: 'I am excited to apply for this position and believe my 6 years of experience in React development makes me a perfect fit...',
      experience: '6 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      rating: 4.5,
    },
    {
      id: '2',
      jobId: '1',
      candidateId: '2',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      status: 'reviewed',
      appliedAt: '2024-01-15T14:20:00Z',
      resume: 'sarah_johnson_resume.pdf',
      coverLetter: 'With 5 years of experience in frontend development, I have worked extensively with React, Vue, and modern JavaScript frameworks...',
      experience: '5 years',
      skills: ['React', 'Vue', 'JavaScript'],
      rating: 4.2,
    },
  ],
  isLoading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    submitApplication: (state, action: PayloadAction<{
      jobId: string;
      jobTitle: string;
      company: string;
      candidateId: string;
      candidateName: string;
      candidateEmail: string;
    }>) => {
      const newApplication: Application = {
        id: Date.now().toString(),
        jobId: action.payload.jobId,
        candidateId: action.payload.candidateId,
        candidateName: action.payload.candidateName,
        candidateEmail: action.payload.candidateEmail,
        jobTitle: action.payload.jobTitle,
        company: action.payload.company,
        status: 'pending',
        appliedAt: new Date().toISOString(),
        resume: 'resume.pdf',
        coverLetter: 'I am very interested in this position and believe I would be a great fit for your team.',
        experience: '5+ years',
        skills: ['React', 'TypeScript', 'JavaScript'],
        rating: 4.0,
      };
      state.applications.push(newApplication);
    },
    updateApplicationStatus: (state, action: PayloadAction<{
      applicationId: string;
      status: Application['status'];
    }>) => {
      const application = state.applications.find(app => app.id === action.payload.applicationId);
      if (application) {
        application.status = action.payload.status;
      }
    },
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
  },
});

export const { submitApplication, updateApplicationStatus, setApplications } = applicationSlice.actions;
export default applicationSlice.reducer;