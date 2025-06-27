import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, 
  FileText, 
  Briefcase, 
  Heart, 
  Upload,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  X,
  Award,
  Brain,
  BarChart3,
  Shield,
  Gamepad2,
  Zap,
  Target,
  Settings,
  Search,
  Filter,
  Bell,
  Bookmark,
  History,
  Globe,
  Lock,
  Share2,
  Archive,
  Star,
  MapPin,
  DollarSign,
  Building,
  Video
} from 'lucide-react';
import { RootState } from '../../store';
import { updateUser } from '../../store/slices/userSlice';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import JobCard from '../../components/jobs/JobCard';
import ProfileForm from '../../components/profile/ProfileForm';
import AIMatchingEngine from '../../components/ai/AIMatchingEngine';
import AnalyticsDashboard from '../../components/analytics/AnalyticsDashboard';
import ResumeBuilder from '../../components/resume/ResumeBuilder';
import EnhancedMessageCenter from '../../components/messaging/EnhancedMessageCenter';
import SkillAssessment from '../../components/assessments/SkillAssessment';
import SavedJobs from '../../components/jobs/SavedJobs';
import InterviewScheduler from '../../components/interview/InterviewScheduler';
import CareerPathInsights from '../../components/career/CareerPathInsights';
import OneClickApply from '../../components/apply/OneClickApply';
import ResumeVerification from '../../components/verification/ResumeVerification';
import GamificationSystem from '../../components/gamification/GamificationSystem';
import NotificationCenter from '../../components/notifications/NotificationCenter';
import AIRecruitmentAssistant from '../../components/ai/AIRecruitmentAssistant';
import VideoInterviewPlatform from '../../components/advanced/VideoInterviewPlatform';
import AIResumeBuilder from '../../components/advanced/AIResumeBuilder';
import AIInterviewCoach from '../../components/advanced/AIInterviewCoach';
import SalaryInsightsEngine from '../../components/advanced/SalaryInsightsEngine';
import { Job, Analytics, AIRecommendation, SkillAssessment as SkillAssessmentType } from '../../types';

const CandidateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false);
  const [showOneClickApply, setShowOneClickApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVideoInterview, setShowVideoInterview] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: '1', 
      userId: 'candidate1',
      type: 'job_match' as const,
      title: 'New Job Match Found!', 
      message: '3 new jobs match your profile perfectly. Check them out now.', 
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      actionUrl: '/dashboard/candidate?tab=recommended'
    },
    { 
      id: '2', 
      userId: 'candidate1',
      type: 'message' as const,
      title: 'New Message from TechCorp', 
      message: 'Sarah Wilson sent you a message about the Senior Developer position.', 
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      actionUrl: '/dashboard/candidate?tab=messages'
    },
    { 
      id: '3', 
      userId: 'candidate1',
      type: 'status_update' as const,
      title: 'Application Status Updated', 
      message: 'Your application for Frontend Developer at StartupXYZ has been reviewed.', 
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      actionUrl: '/dashboard/candidate?tab=applications'
    },
    { 
      id: '4', 
      userId: 'candidate1',
      type: 'application' as const,
      title: 'Interview Invitation', 
      message: 'You have been invited for an interview at DataFlow Inc. Please confirm your availability.', 
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      actionUrl: '/dashboard/candidate?tab=interviews'
    },
  ]);
  
  const dispatch = useDispatch();
  const { applications } = useSelector((state: RootState) => state.applications);
  const { user } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.users);
  const { savedJobs } = useSelector((state: RootState) => state.jobs);

  // Get full user data from users slice
  const fullUserData = users.find(u => u.id === user?.id) || user;

  // Filter applications for current user
  const userApplications = applications.filter(app => app.candidateId === user?.id);

  // Mock analytics data
  const analytics: Analytics = {
    totalApplications: userApplications.length,
    applicationsByStatus: userApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    applicationsByMonth: [
      { month: 'Jan', count: 5 },
      { month: 'Feb', count: 8 },
      { month: 'Mar', count: 12 },
      { month: 'Apr', count: 15 },
      { month: 'May', count: 18 },
      { month: 'Jun', count: 22 },
    ],
    topSkills: fullUserData?.skills?.map(skill => ({ skill, count: Math.floor(Math.random() * 20) + 5 })) || [],
    averageMatchScore: 78,
    responseRate: 65,
  };

  // Mock data
  const stats = [
    { label: 'Applications Sent', value: userApplications.length.toString(), icon: FileText, color: 'text-primary-600', bg: 'bg-primary-100' },
    { label: 'Interview Scheduled', value: userApplications.filter(app => app.status === 'interview').length.toString(), icon: Calendar, color: 'text-secondary-600', bg: 'bg-secondary-100' },
    { label: 'Profile Views', value: '128', icon: Eye, color: 'text-accent-600', bg: 'bg-accent-100' },
    { label: 'Saved Jobs', value: savedJobs.length.toString(), icon: Heart, color: 'text-error-600', bg: 'bg-error-100' },
  ];

  const recommendedJobs: Job[] = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechFlow',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 130000, max: 190000, currency: '$' },
      description: 'Join our team to build cutting-edge web applications...',
      requirements: ['React', 'TypeScript', '5+ years experience'],
      skills: ['React', 'TypeScript', 'GraphQL', 'Next.js'],
      experience: '5+ years',
      postedAt: '2024-01-15',
      deadline: '2024-02-15',
      employerId: 'emp1',
      applicants: 32,
      remote: true,
      matchScore: 92,
    },
    {
      id: '2',
      title: 'Frontend Architect',
      company: 'DesignLab',
      location: 'Remote',
      type: 'full-time',
      salary: { min: 150000, max: 220000, currency: '$' },
      description: 'Lead frontend architecture decisions...',
      requirements: ['React', 'Architecture', '7+ years experience'],
      skills: ['React', 'Vue', 'Architecture', 'Leadership'],
      experience: '7+ years',
      postedAt: '2024-01-14',
      deadline: '2024-02-14',
      employerId: 'emp2',
      applicants: 18,
      remote: true,
      matchScore: 87,
    },
  ];

  const jobSearchHistory = [
    { id: '1', query: 'React Developer', location: 'San Francisco', date: '2024-01-15', results: 45 },
    { id: '2', query: 'Frontend Engineer', location: 'Remote', date: '2024-01-14', results: 32 },
    { id: '3', query: 'Full Stack Developer', location: 'New York', date: '2024-01-13', results: 28 },
  ];

  const documents = [
    { id: '1', name: 'Resume_2024.pdf', type: 'Resume', size: '2.4 MB', uploaded: '2024-01-15', status: 'verified' },
    { id: '2', name: 'Cover_Letter_Template.docx', type: 'Cover Letter', size: '1.2 MB', uploaded: '2024-01-14', status: 'pending' },
    { id: '3', name: 'Portfolio_Screenshots.zip', type: 'Portfolio', size: '15.8 MB', uploaded: '2024-01-13', status: 'verified' },
  ];

  const interviews = [
    { id: '1', company: 'TechCorp', position: 'Senior Developer', date: '2024-01-20', time: '10:00 AM', type: 'Video', status: 'scheduled' },
    { id: '2', company: 'StartupXYZ', position: 'Frontend Lead', date: '2024-01-22', time: '2:00 PM', type: 'In-person', status: 'confirmed' },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleProfileSave = (updatedData: Partial<typeof fullUserData>) => {
    if (user?.id) {
      dispatch(updateUser({ id: user.id, updates: updatedData }));
      alert('Profile updated successfully!');
    }
  };

  const handleAIRecommendations = (recommendations: AIRecommendation[]) => {
    setAiRecommendations(recommendations);
  };

  const handleSkillAssessmentComplete = (assessment: SkillAssessmentType) => {
    // Update user's skill assessments
    const updatedAssessments = [...(fullUserData?.skillAssessments || []), assessment];
    dispatch(updateUser({ 
      id: user!.id, 
      updates: { skillAssessments: updatedAssessments } 
    }));
    setShowSkillAssessment(false);
    alert(`Assessment completed! You scored ${assessment.score}% in ${assessment.skill}`);
  };

  const handleOneClickApply = (job: Job) => {
    setSelectedJob(job);
    setShowOneClickApply(true);
  };

  const handleVerificationComplete = (trustScore: number) => {
    dispatch(updateUser({ 
      id: user!.id, 
      updates: { trustScore } 
    }));
  };

  const handleMessageNavigation = () => {
    setActiveTab('messages');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      case 'interview':
        return <MessageSquare className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-warning-600 bg-warning-100';
      case 'reviewed':
        return 'text-primary-600 bg-primary-100';
      case 'interview':
        return 'text-secondary-600 bg-secondary-100';
      case 'accepted':
        return 'text-success-600 bg-success-100';
      case 'rejected':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Your application is being reviewed';
      case 'reviewed':
        return 'Application reviewed by employer';
      case 'interview':
        return 'Interview scheduled - check your email';
      case 'accepted':
        return 'Congratulations! Your application was accepted';
      case 'rejected':
        return 'Application was not selected this time';
      default:
        return 'Application status unknown';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'recommended', label: 'AI Recommendations', icon: Brain },
    { id: 'saved', label: 'Saved Jobs', icon: Heart },
    { id: 'search-history', label: 'Search History', icon: History },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: Archive },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'assessments', label: 'Skill Tests', icon: Award },
    { id: 'career-path', label: 'Career Insights', icon: Target },
    { id: 'verification', label: 'Trust Score', icon: Shield },
    { id: 'gamification', label: 'Achievements', icon: Gamepad2 },
    { id: 'resume', label: 'Resume Builder', icon: Upload },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
    { id: 'interview-coach', label: 'Interview Coach', icon: Video },
    { id: 'salary-insights', label: 'Salary Insights', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!fullUserData) {
    return <div>Loading...</div>;
  }

  if (showSkillAssessment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowSkillAssessment(false)}
            >
              ← Back to Dashboard
            </Button>
          </div>
          <SkillAssessment
            skill={selectedSkill}
            onComplete={handleSkillAssessmentComplete}
          />
        </div>
      </div>
    );
  }

  if (showVideoInterview) {
    return (
      <div className="min-h-screen bg-gray-900 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Button
              variant="outline"
              onClick={() => setShowVideoInterview(false)}
              className="text-white border-gray-700 hover:bg-gray-800"
            >
              ← Exit Interview
            </Button>
          </div>
          <VideoInterviewPlatform
            interviewId="123"
            participantRole="candidate"
            interviewData={{
              jobTitle: "Senior Frontend Developer",
              company: "TechCorp",
              candidateName: "John Doe",
              interviewerName: "Sarah Wilson",
              scheduledTime: "2024-01-20T10:00:00",
              duration: 45
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {fullUserData.firstName}!
              </h1>
              <p className="text-gray-600">
                Track your job applications and discover new opportunities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Bell className="w-4 h-4" />}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  Notifications
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </div>
              <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                Export Data
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <>
              {/* AI Matching Engine */}
              <AIMatchingEngine
                user={fullUserData}
                jobs={recommendedJobs}
                onRecommendations={handleAIRecommendations}
              />

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} hover>
                    <div className="flex items-center">
                      <div className={`${stat.bg} p-3 rounded-lg mr-4`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Applications
                  </h3>
                  <div className="space-y-4">
                    {userApplications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                          <p className="text-sm text-gray-600">{app.company}</p>
                          <p className="text-xs text-gray-500">Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-600 mt-1">{getStatusMessage(app.status)}</p>
                        </div>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </div>
                      </div>
                    ))}
                    {userApplications.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No applications yet</p>
                        <p className="text-sm">Start applying to jobs to see them here</p>
                      </div>
                    )}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Profile Completion
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Basic Information</span>
                      <span className="text-sm font-medium text-success-600">Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Skills & Experience</span>
                      <span className="text-sm font-medium text-success-600">
                        {fullUserData.skills?.length ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Work Experience</span>
                      <span className="text-sm font-medium text-success-600">
                        {fullUserData.workExperience?.length ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Resume Upload</span>
                      <span className="text-sm font-medium text-success-600">
                        {fullUserData.resumeFileName ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        size="sm" 
                        fullWidth 
                        onClick={() => setActiveTab('profile')}
                      >
                        Complete Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
                <div className="flex items-center space-x-4">
                  <Input
                    placeholder="Search applications..."
                    icon={<Search className="w-4 h-4" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interview">Interview</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                    Export
                  </Button>
                </div>
              </div>

              <Card>
                {userApplications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Job Title</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Match Score</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Applied Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userApplications.map((app) => (
                          <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium text-gray-900">{app.jobTitle}</div>
                                <div className="text-sm text-gray-600">{getStatusMessage(app.status)}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-900">{app.company}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary-600 h-2 rounded-full" 
                                    style={{ width: `${app.matchScore || 75}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {app.matchScore || 75}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                {getStatusIcon(app.status)}
                                <span className="capitalize">{app.status}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {new Date(app.appliedAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  icon={<Eye className="w-4 h-4" />}
                                  onClick={() => alert(`Viewing application for ${app.jobTitle}`)}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  icon={<MessageSquare className="w-4 h-4" />}
                                  onClick={handleMessageNavigation}
                                >
                                  Message
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                    <p className="text-gray-600 mb-6">Start applying to jobs to track your applications here</p>
                    <Button onClick={() => setActiveTab('recommended')}>
                      Browse Recommended Jobs
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === 'recommended' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI-Recommended Jobs for You
                </h3>
                <p className="text-gray-600">
                  Based on your skills, experience, and preferences
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="relative">
                    <JobCard job={job} featured />
                    {job.matchScore && (
                      <div className="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {job.matchScore}% Match
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Button
                        size="sm"
                        onClick={() => handleOneClickApply(job)}
                        icon={<Zap className="w-4 h-4" />}
                        className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                      >
                        Quick Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && <SavedJobs />}

          {activeTab === 'search-history' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Search History</h3>
                <Button variant="outline" size="sm" icon={<X className="w-4 h-4" />}>
                  Clear History
                </Button>
              </div>
              
              <div className="space-y-4">
                {jobSearchHistory.map((search) => (
                  <div key={search.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">"{search.query}"</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{search.location}</span>
                          <span>•</span>
                          <span>{search.results} results</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{search.date}</span>
                      <Button variant="ghost" size="sm" icon={<Search className="w-4 h-4" />}>
                        Search Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'interviews' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" icon={<Calendar className="w-4 h-4" />}>
                    Calendar View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    icon={<Video className="w-4 h-4" />}
                    onClick={() => setShowVideoInterview(true)}
                  >
                    Join Practice Interview
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {interviews.map((interview) => (
                  <div key={interview.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-secondary-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{interview.position}</h4>
                          <p className="text-gray-600">{interview.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{interview.time}</span>
                            </div>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              {interview.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => setShowVideoInterview(true)}
                        >
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'documents' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Document Repository</h3>
                <Button icon={<Upload className="w-4 h-4" />}>
                  Upload Document
                </Button>
              </div>
              
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploaded}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'verified' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                      }`}>
                        {doc.status}
                      </span>
                      <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                        Download
                      </Button>
                      <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard analytics={analytics} userRole="candidate" />
          )}

          {activeTab === 'assessments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Skill Assessments</h3>
                  <p className="text-gray-600">Take skill tests to showcase your expertise</p>
                </div>
              </div>

              {/* Available Assessments */}
              <Card>
                <h4 className="text-md font-semibold text-gray-900 mb-4">Available Tests</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'SQL'].map((skill) => (
                    <div key={skill} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900">{skill}</h5>
                        <Award className="w-5 h-5 text-primary-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Test your knowledge in {skill} with 10 questions
                      </p>
                      <Button
                        size="sm"
                        fullWidth
                        onClick={() => {
                          setSelectedSkill(skill);
                          setShowSkillAssessment(true);
                        }}
                      >
                        Start Test
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Completed Assessments */}
              {fullUserData.skillAssessments && fullUserData.skillAssessments.length > 0 && (
                <Card>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Completed Assessments</h4>
                  <div className="space-y-3">
                    {fullUserData.skillAssessments.map((assessment) => (
                      <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Award className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{assessment.skill}</h5>
                            <p className="text-sm text-gray-600">
                              Completed {new Date(assessment.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            assessment.score >= 80 ? 'text-success-600' :
                            assessment.score >= 60 ? 'text-warning-600' : 'text-error-600'
                          }`}>
                            {assessment.score}%
                          </div>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'career-path' && (
            <CareerPathInsights user={fullUserData} />
          )}

          {activeTab === 'verification' && (
            <ResumeVerification 
              user={fullUserData} 
              onVerificationComplete={handleVerificationComplete}
            />
          )}

          {activeTab === 'gamification' && (
            <GamificationSystem 
              user={fullUserData} 
              applications={userApplications}
            />
          )}

          {activeTab === 'resume' && (
            <AIResumeBuilder user={fullUserData} onSave={handleProfileSave} />
          )}

          {activeTab === 'messages' && (
            <EnhancedMessageCenter currentUserId={user!.id} />
          )}

          {activeTab === 'ai-assistant' && (
            <AIRecruitmentAssistant userRole="candidate" />
          )}

          {activeTab === 'interview-coach' && (
            <AIInterviewCoach userRole="candidate" jobTitle="Frontend Developer" />
          )}

          {activeTab === 'salary-insights' && (
            <SalaryInsightsEngine userRole="candidate" />
          )}

          {activeTab === 'profile' && (
            <ProfileForm user={fullUserData} onSave={handleProfileSave} />
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Visibility</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Public Profile</h4>
                      <p className="text-sm text-gray-600">Allow employers to find your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Salary Expectations</h4>
                      <p className="text-sm text-gray-600">Display your salary range to employers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Job Alerts</h4>
                      <p className="text-sm text-gray-600">Get notified about new job matches</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data & Privacy</h3>
                <div className="space-y-4">
                  <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                    Export My Data
                  </Button>
                  <Button variant="outline" icon={<Lock className="w-4 h-4" />}>
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* Modals */}
      {showInterviewScheduler && (
        <InterviewScheduler
          applicationId="1"
          candidateName="John Doe"
          candidateEmail="john@example.com"
          jobTitle="Senior Developer"
          onSchedule={(data) => {
            console.log('Interview scheduled:', data);
            setShowInterviewScheduler(false);
          }}
          onClose={() => setShowInterviewScheduler(false)}
        />
      )}

      {showOneClickApply && selectedJob && (
        <OneClickApply
          job={selectedJob}
          onClose={() => setShowOneClickApply(false)}
          onSuccess={() => {
            alert('Application submitted successfully!');
            setShowOneClickApply(false);
          }}
        />
      )}
    </div>
  );
};

export default CandidateDashboard;