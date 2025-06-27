import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [
    {
      id: '1',
      email: 'john.doe@email.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'candidate',
      phone: '+1 (555) 123-4567',
      bio: 'Experienced frontend developer with 6+ years of experience building modern web applications.',
      skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'GraphQL'],
      experience: 'Senior Level (5+ years)',
      workExperience: [
        {
          id: '1',
          company: 'TechCorp Inc.',
          position: 'Senior Frontend Developer',
          startDate: '2021-01',
          endDate: '',
          current: true,
          description: 'Lead frontend development for multiple React applications, mentored junior developers.',
        },
      ],
      education: [
        {
          id: '1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startYear: '2015',
          endYear: '2019',
          current: false,
        },
      ],
      resumeFileName: 'john_doe_resume.pdf',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      email: 'sarah.wilson@company.com',
      firstName: 'Sarah',
      lastName: 'Wilson',
      role: 'employer',
      company: 'TechCorp Inc.',
      phone: '+1 (555) 987-6543',
      bio: 'HR Director at TechCorp with 10+ years of experience in talent acquisition.',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '3',
      email: 'mike.johnson@email.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'candidate',
      phone: '+1 (555) 456-7890',
      bio: 'Full-stack developer passionate about creating scalable web applications.',
      skills: ['JavaScript', 'Python', 'React', 'Django', 'PostgreSQL'],
      experience: 'Mid Level (3-5 years)',
      createdAt: '2024-01-02T00:00:00Z',
    },
  ],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<{ id: string; updates: Partial<User> }>) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload.updates };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, setUsers } = userSlice.actions;
export default userSlice.reducer;