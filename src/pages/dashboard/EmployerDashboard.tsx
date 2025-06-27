import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Bell,
  Settings,
  Building,
  Target,
  CheckCircle,
  Clock,
  X,
  Star,
  MapPin,
  DollarSign,
  Send,
  FileText,
  BarChart3,
  UserCheck,
  Mail,
  Phone,
  Video,
  Archive,
  Globe,
  Award,
  Zap,
  Heart,
  Bookmark,
  Share2,
  Brain
} from 'lucide-react';
import { RootState } from '../../store';
import { updateApplicationStatus } from '../../store/slices/applicationSlice';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CandidateDatabase from '../../components/candidates/CandidateDatabase';
import AnalyticsDashboard from '../../components/analytics/AnalyticsDashboard';
import EnhancedMessageCenter from '../../components/messaging/EnhancedMessageCenter';
import InterviewSchedulingSystem from '../../components/interview/InterviewSchedulingSystem';
import NotificationCenter from '../../components/notifications/NotificationCenter';
import AIRecruitmentAssistant from '../../components/ai/AIRecruitmentAssistant';
import AIJobDescriptionGenerator from '../../components/advanced/AIJobDescriptionGenerator';
import VideoInterviewPlatform from '../../components/advanced/VideoInterviewPlatform';
import SalaryInsightsEngine from '../../components/advanced/SalaryInsightsEngine';
import { Application, Analytics, User as UserType } from '../../types';

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showVideoInterview, setShowVideoInterview] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: '1', 
      userId: 'employer1',
      type: 'application' as const,
      title: 'New Application Received', 
      message: 'John Smith applied for Senior Frontend Developer position', 
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      actionUrl: '/dashboard/employer?tab=applications'
    },
    { 
      id: '2', 
      userId: 'employer1',
      type: 'message' as const,
      title: 'New Message', 
      message: 'Sarah Johnson sent you a message about the UX Designer role', 
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      actionUrl: '/dashboard/employer?tab=messages'
    },
    { 
      id: '3', 
      userId: 'employer1',
      type: 'status_update' as const,
      title: 'Interview Reminder', 
      message: 'You have an interview scheduled with Mike Johnson tomorrow at 2:00 PM', 
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      actionUrl: '/dashboard/employer?tab=interviews'
    },
  ]);
  
  const dispatch = useDispatch();
  const { applications } = useSelector((state: RootState) => state.applications);
  const { user } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.users);

  // Mock data for employer dashboard
  const stats = [
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-primary-600', bg: 'bg-primary-100' },
    { label: 'Total Applications', value: applications.length.toString(), icon: Users, color: 'text-secondary-600', bg: 'bg-secondary-100' },
    { label: 'Interviews Scheduled', value: '8', icon: Calendar, color: 'text-accent-600', bg: 'bg-accent-100' },
    { label: 'Hired This Month', value: '3', icon: UserCheck, color: 'text-success-600', bg: 'bg-success-100' },
  ];

  const recentJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      applicants: 42,
      status: 'active',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
    },
    {
      id: '2',
      title: 'UX Designer',
      department: 'Design',
      applicants: 28,
      status: 'active',
      postedDate: '2024-01-14',
      deadline: '2024-02-14',
    },
    {
      id: '3',
      title: 'Product Manager',
      department: 'Product',
      applicants: 35,
      status: 'draft',
      postedDate: '2024-01-13',
      deadline: '2024-02-13',
    },
  ];

  const upcomingInterviews = [
    {
      id: '1',
      candidateName: 'John Smith',
      position: 'Senior Frontend Developer',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Video Call',
      status: 'confirmed',
    },
    {
      id: '2',
      candidateName: 'Sarah Johnson',
      position: 'UX Designer',
      date: '2024-01-21',
      time: '2:00 PM',
      type: 'In-Person',
      status: 'pending',
    },
  ];

  // Mock analytics data
  const analytics: Analytics = {
    totalApplications: applications.length,
    applicationsByStatus: applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    applicationsByMonth: [
      { month: 'Jan', count: 15 },
      { month: 'Feb', count: 22 },
      { month: 'Mar', count: 18 },
      { month: 'Apr', count: 25 },
      { month: 'May', count: 30 },
      { month: 'Jun', count: 28 },
    ],
    topSkills: [
      { skill: 'React', count: 45 },
      { skill: 'JavaScript', count: 38 },
      { skill: 'TypeScript', count: 32 },
      { skill: 'Node.js', count: 28 },
      { skill: 'Python', count: 25 },
    ],
    averageMatchScore: 82,
    responseRate: 75,
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (applicationId: string, newStatus: Application['status']) => {
    dispatch(updateApplicationStatus({ applicationId, status: newStatus }));
  };

  const handleScheduleInterview = (application: Application) => {
    setSelectedApplication(application);
    setShowInterviewScheduler(true);
  };

  const handleMessageCandidate = (candidateId: string) => {
    setActiveTab('messages');
    // In a real app, this would open the message thread with the specific candidate
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      case 'interview':
        return <Calendar className="w-4 h-4" />;
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

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'candidates', label: 'Candidate Database', icon: Search },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
    { id: 'job-description', label: 'Job Description AI', icon: FileText },
    { id: 'video-interviews', label: 'Video Interviews', icon: Video },
    { id: 'salary-insights', label: 'Salary Insights', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!user) {
    return <div>Loading...</div>;
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
            participantRole="interviewer"
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
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600">
                Manage your job postings and find the best candidates
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
              <Button variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>
                Post New Job
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
                    Recent Job Postings
                  </h3>
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.department}</p>
                          <p className="text-xs text-gray-500">Posted on {new Date(job.postedDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{job.applicants}</div>
                          <div className="text-xs text-gray-500">applicants</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                          }`}>
                            {job.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upcoming Interviews
                  </h3>
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
                          <p className="text-sm text-gray-600">{interview.position}</p>
                          <p className="text-xs text-gray-500">{interview.date} at {interview.time}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{interview.type}</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            interview.status === 'confirmed' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                          }`}>
                            {interview.status}
                          </div>
                          <div className="mt-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowVideoInterview(true)}
                            >
                              Join
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Job Applications</h3>
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
                </div>
              </div>

              <Card>
                {filteredApplications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Candidate</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Position</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Applied Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{app.candidateName}</div>
                                  <div className="text-sm text-gray-600">{app.candidateEmail}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-900">{app.jobTitle}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{app.rating}</span>
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
                                  onClick={() => alert(`Viewing application from ${app.candidateName}`)}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  icon={<Calendar className="w-4 h-4" />}
                                  onClick={() => handleScheduleInterview(app)}
                                >
                                  Interview
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  icon={<MessageSquare className="w-4 h-4" />}
                                  onClick={() => handleMessageCandidate(app.candidateId)}
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
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                    <p className="text-gray-600 mb-6">Applications will appear here once candidates start applying</p>
                    <Button onClick={() => setActiveTab('jobs')}>
                      Manage Job Postings
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === 'candidates' && (
            <CandidateDatabase onMessageCandidate={handleMessageCandidate} />
          )}

          {activeTab === 'interviews' && (
            <InterviewSchedulingSystem userRole="employer" userId={user.id} />
          )}

          {activeTab === 'messages' && (
            <EnhancedMessageCenter currentUserId={user.id} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard analytics={analytics} userRole="employer" />
          )}

          {activeTab === 'ai-assistant' && (
            <AIRecruitmentAssistant userRole="employer" />
          )}

          {activeTab === 'job-description' && (
            <AIJobDescriptionGenerator 
              onGenerate={(description) => {
                console.log('Generated job description:', description);
              }}
            />
          )}

          {activeTab === 'video-interviews' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Video Interviews</h3>
                <Button 
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowVideoInterview(true)}
                >
                  New Interview
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Interview with John Smith</h4>
                        <p className="text-gray-600">Senior Frontend Developer</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Jan 20, 2024</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>10:00 AM</span>
                          </div>
                          <span className="bg-success-100 text-success-700 px-2 py-1 rounded text-xs">
                            Scheduled
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowVideoInterview(true)}
                      >
                        Join
                      </Button>
                      <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Interview with Sarah Johnson</h4>
                        <p className="text-gray-600">UX Designer</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Jan 15, 2024</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>2:00 PM</span>
                          </div>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
                        Review
                      </Button>
                      <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'salary-insights' && (
            <SalaryInsightsEngine userRole="employer" />
          )}

          {activeTab === 'jobs' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Job Postings</h3>
                <Button 
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => setActiveTab('job-description')}
                >
                  Create New Job
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-gray-600">{job.department}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <span>{job.applicants} applicants</span>
                          <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                          <span>Deadline {new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                        }`}>
                          {job.status}
                        </div>
                        <Button variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Company Name" defaultValue={user.company || ''} />
                  <Input label="Industry" defaultValue="Technology" />
                  <Input label="Company Size" defaultValue="100-500 employees" />
                  <Input label="Website" defaultValue="https://company.com" />
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    defaultValue="We are a leading technology company focused on innovation and growth."
                  />
                </div>
                <div className="mt-6">
                  <Button>Save Changes</Button>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">New Applications</h4>
                      <p className="text-sm text-gray-600">Get notified when candidates apply</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Interview Reminders</h4>
                      <p className="text-sm text-gray-600">Reminders for upcoming interviews</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
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

      {/* Interview Scheduler Modal */}
      {showInterviewScheduler && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Schedule Interview</h2>
                <button
                  onClick={() => setShowInterviewScheduler(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900">Candidate Information</h3>
                  <p className="text-gray-600">{selectedApplication.candidateName}</p>
                  <p className="text-gray-600">{selectedApplication.candidateEmail}</p>
                  <p className="text-gray-600">Position: {selectedApplication.jobTitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Interview Date" type="date" />
                  <Input label="Interview Time" type="time" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Any additional notes for the interview..."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => {
                      alert(`Interview scheduled with ${selectedApplication.candidateName}`);
                      setShowInterviewScheduler(false);
                    }}
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Schedule Interview
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowInterviewScheduler(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;