import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Settings,
  BarChart3,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Mail,
  Phone,
  Calendar,
  Award,
  Target,
  Zap,
  Brain,
  Database,
  Activity,
  FileText,
  MessageSquare,
  Star,
  Bookmark,
  Archive,
  RefreshCw,
  Lock,
  Unlock,
  Ban,
  CheckSquare,
  XSquare,
  AlertCircle,
  Info,
  Cpu,
  Server,
  HardDrive,
  Wifi,
  Monitor,
  Key,
  LogOut
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import AdminJobManagement from './AdminJobManagement';
import AdminApplicationsManagement from './AdminApplicationsManagement';
import UserManagement from './UserManagement';
import JobControlSystem from './JobControlSystem';
import AIEngineControlCenter from './AIEngineControlCenter';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { users } = useSelector((state: RootState) => state.users);
  const { applications } = useSelector((state: RootState) => state.applications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock admin data
  const systemStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.lastActive && new Date(u.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    totalJobs: 1247,
    totalApplications: applications.length,
    successfulMatches: 892,
    revenue: 125000,
    conversionRate: 12.5,
    avgMatchScore: 84.2,
  };

  const recentActivity = [
    { id: '1', type: 'user_signup', user: 'John Smith', action: 'Signed up as job seeker', timestamp: '2 minutes ago' },
    { id: '2', type: 'job_posted', user: 'TechCorp', action: 'Posted Senior Developer position', timestamp: '5 minutes ago' },
    { id: '3', type: 'application', user: 'Sarah Johnson', action: 'Applied to UX Designer role', timestamp: '8 minutes ago' },
    { id: '4', type: 'match', user: 'AI Engine', action: 'Generated 15 new job matches', timestamp: '12 minutes ago' },
  ];

  const systemHealth = {
    apiStatus: 'healthy',
    databaseStatus: 'healthy',
    aiEngineStatus: 'healthy',
    emailServiceStatus: 'degraded',
    uptime: '99.9%',
    responseTime: '145ms',
    errorRate: '0.02%',
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'jobs', label: 'Job Management', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'job-control', label: 'Job Control System', icon: Target },
    { id: 'ai-engine', label: 'AI Engine', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'system', label: 'System Health', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup': return UserCheck;
      case 'job_posted': return Briefcase;
      case 'application': return FileText;
      case 'match': return Target;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-success-600 bg-success-100';
      case 'degraded': return 'text-warning-600 bg-warning-100';
      case 'down': return 'text-error-600 bg-error-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage users, monitor system health, and analyze platform performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                Export Data
              </Button>
              <Button variant="outline" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                icon={<LogOut className="w-4 h-4" />}
                onClick={handleLogout}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Logout
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
                <Card hover>
                  <div className="flex items-center">
                    <div className="bg-primary-100 p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
                      <p className="text-gray-600 text-sm">Total Users</p>
                      <p className="text-xs text-success-600">+12% this month</p>
                    </div>
                  </div>
                </Card>

                <Card hover>
                  <div className="flex items-center">
                    <div className="bg-secondary-100 p-3 rounded-lg mr-4">
                      <Briefcase className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{systemStats.totalJobs}</p>
                      <p className="text-gray-600 text-sm">Active Jobs</p>
                      <p className="text-xs text-success-600">+8% this week</p>
                    </div>
                  </div>
                </Card>

                <Card hover>
                  <div className="flex items-center">
                    <div className="bg-accent-100 p-3 rounded-lg mr-4">
                      <Target className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{systemStats.successfulMatches}</p>
                      <p className="text-gray-600 text-sm">Successful Matches</p>
                      <p className="text-xs text-success-600">+15% this month</p>
                    </div>
                  </div>
                </Card>

                <Card hover>
                  <div className="flex items-center">
                    <div className="bg-success-100 p-3 rounded-lg mr-4">
                      <DollarSign className="w-6 h-6 text-success-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${systemStats.revenue.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">Monthly Revenue</p>
                      <p className="text-xs text-success-600">+22% this month</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activity & System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                            <p className="text-sm text-gray-600">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Service</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.apiStatus)}`}>
                        {systemHealth.apiStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Database</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.databaseStatus)}`}>
                        {systemHealth.databaseStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AI Engine</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.aiEngineStatus)}`}>
                        {systemHealth.aiEngineStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email Service</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.emailServiceStatus)}`}>
                        {systemHealth.emailServiceStatus}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{systemHealth.uptime}</p>
                          <p className="text-xs text-gray-600">Uptime</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">{systemHealth.responseTime}</p>
                          <p className="text-xs text-gray-600">Response Time</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">{systemHealth.errorRate}</p>
                          <p className="text-xs text-gray-600">Error Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <UserManagement />
          )}

          {activeTab === 'jobs' && (
            <AdminJobManagement />
          )}

          {activeTab === 'applications' && (
            <AdminApplicationsManagement />
          )}

          {activeTab === 'job-control' && (
            <JobControlSystem />
          )}

          {activeTab === 'ai-engine' && (
            <AIEngineControlCenter />
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">{systemStats.conversionRate}%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                    <div className="text-xs text-success-600 mt-1">+2.3% from last month</div>
                  </div>
                </Card>
                
                <Card>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-600 mb-2">{systemStats.avgMatchScore}</div>
                    <div className="text-sm text-gray-600">Avg Match Score</div>
                    <div className="text-xs text-success-600 mt-1">+1.2% from last month</div>
                  </div>
                </Card>
                
                <Card>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-600 mb-2">{systemStats.activeUsers}</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                    <div className="text-xs text-success-600 mt-1">+8.7% from last week</div>
                  </div>
                </Card>
              </div>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">User Growth</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>New Signups (This Week)</span>
                        <span className="font-medium">247</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Job Seekers</span>
                        <span className="font-medium">189</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Employers</span>
                        <span className="font-medium">58</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Engagement Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Active Users</span>
                        <span className="font-medium">3,247</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg Session Duration</span>
                        <span className="font-medium">12m 34s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Page Views per Session</span>
                        <span className="font-medium">8.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h4 className="font-medium text-gray-900 mb-3">Revenue Breakdown</h4>
                  <div className="h-64 flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-gray-300" />
                    <p className="text-gray-500 ml-4">Chart visualization would appear here</p>
                  </div>
                </Card>

                <Card>
                  <h4 className="font-medium text-gray-900 mb-3">User Demographics</h4>
                  <div className="h-64 flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-gray-300" />
                    <p className="text-gray-500 ml-4">Chart visualization would appear here</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <Server className="w-8 h-8 text-primary-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Server Status</h3>
                      <p className="text-sm text-success-600">Operational</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <HardDrive className="w-8 h-8 text-secondary-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Storage</h3>
                      <p className="text-sm text-gray-600">2.1TB / 5TB</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-secondary-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <Wifi className="w-8 h-8 text-accent-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Network</h3>
                      <p className="text-sm text-success-600">Stable</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bandwidth</span>
                      <span>1.2 Gbps</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Latency</span>
                      <span>12ms</span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <Monitor className="w-8 h-8 text-warning-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Monitoring</h3>
                      <p className="text-sm text-gray-600">24/7 Active</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Alerts</span>
                      <span>2 Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span>99.9%</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-warning-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-warning-900">Email Service Degraded</p>
                      <p className="text-sm text-warning-700">Email delivery is experiencing delays. Investigating...</p>
                      <p className="text-xs text-warning-600 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Scheduled Maintenance</p>
                      <p className="text-sm text-blue-700">Database maintenance scheduled for Sunday 2:00 AM UTC</p>
                      <p className="text-xs text-blue-600 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                        <p className="text-sm text-gray-600">Temporarily disable user access</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Debug Mode</h4>
                        <p className="text-sm text-gray-600">Enable detailed logging</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Auto Backup</h4>
                        <p className="text-sm text-gray-600">Daily database backups</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Require 2FA for admin users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Session Timeout</h4>
                        <p className="text-sm text-gray-600">Inactive session expiry</p>
                      </div>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option value="15">15 minutes</option>
                        <option value="30" selected>30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">API Rate Limiting</h4>
                        <p className="text-sm text-gray-600">Requests per minute</p>
                      </div>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option value="500">500</option>
                        <option value="1000" selected>1,000</option>
                        <option value="2000">2,000</option>
                        <option value="5000">5,000</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">User Registration</h4>
                      <p className="text-sm text-gray-600">Allow new users to register</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">AI Matching</h4>
                      <p className="text-sm text-gray-600">Enable AI-powered job matching</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Send system notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                      <p className="text-sm text-gray-600">Put the platform in maintenance mode</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <Button variant="outline" icon={<Lock className="w-4 h-4" />}>
                    Configure 2FA
                  </Button>
                  <Button variant="outline" icon={<Shield className="w-4 h-4" />}>
                    Security Audit
                  </Button>
                  <Button variant="outline" icon={<Key className="w-4 h-4" />}>
                    API Keys
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    Reset System
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;