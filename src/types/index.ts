export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'candidate' | 'employer' | 'admin';
  avatar?: string;
  company?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: Education[];
  workExperience?: WorkExperience[];
  resumeUrl?: string;
  resumeFileName?: string;
  createdAt: string;
  isVerified?: boolean;
  lastActive?: string;
  preferences?: UserPreferences;
  savedJobs?: string[];
  skillAssessments?: SkillAssessment[];
  trustScore?: number;
  level?: number;
  xp?: number;
  badges?: string[];
}

export interface UserPreferences {
  emailNotifications: boolean;
  jobAlerts: boolean;
  darkMode: boolean;
  preferredLocation?: string;
  salaryRange?: [number, number];
  jobTypes?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  current: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  postedAt: string;
  deadline: string;
  employerId: string;
  applicants: number;
  remote: boolean;
  logo?: string;
  department?: string;
  benefits?: string[];
  isActive?: boolean;
  views?: number;
  matchScore?: number;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  company: string;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  appliedAt: string;
  resume?: string;
  coverLetter?: string;
  experience: string;
  skills: string[];
  rating: number;
  timeline?: ApplicationTimeline[];
  matchScore?: number;
}

export interface ApplicationTimeline {
  id: string;
  status: Application['status'];
  timestamp: string;
  note?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  applicationId?: string;
}

export interface SkillAssessment {
  id: string;
  skill: string;
  score: number;
  maxScore: number;
  completedAt: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
  explanation?: string;
}

export interface Resume {
  id: string;
  candidateId: string;
  fileName: string;
  fileUrl: string;
  parsedData: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    experience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
  };
  uploadedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface JobState {
  jobs: Job[];
  featuredJobs: Job[];
  recommendedJobs: Job[];
  savedJobs: Job[];
  filters: {
    location: string;
    type: string;
    remote: boolean;
    salary: [number, number];
    skills: string[];
  };
  isLoading: boolean;
  error: string | null;
}

export interface SkillOption {
  value: string;
  label: string;
}

export interface ParsedResumeData {
  name?: string;
  email?: string;
  phone?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  summary?: string;
}

export interface AIRecommendation {
  jobId: string;
  matchScore: number;
  reasons: string[];
  skillsMatch: number;
  experienceMatch: number;
  locationMatch: number;
}

export interface Analytics {
  totalApplications: number;
  applicationsByStatus: Record<string, number>;
  applicationsByMonth: Array<{ month: string; count: number }>;
  topSkills: Array<{ skill: string; count: number }>;
  averageMatchScore: number;
  responseRate: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'message' | 'job_match' | 'status_update';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  candidateId: string;
  employerId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  location?: string;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  feedback?: string;
  scheduledAt: string;
}

export interface CareerPath {
  id: string;
  currentRole: string;
  targetRole: string;
  timeframe: string;
  requiredSkills: string[];
  missingSkills: string[];
  recommendedCourses: string[];
  salaryProjection: {
    current: number;
    target: number;
    currency: string;
  };
  confidence: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  criteria: string;
  points: number;
}

export interface Achievement {
  id: string;
  badgeId: string;
  userId: string;
  earnedAt: string;
  progress: number;
  completed: boolean;
}