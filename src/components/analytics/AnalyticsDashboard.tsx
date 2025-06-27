import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Users, Briefcase, Target, Calendar, Award } from 'lucide-react';
import Card from '../ui/Card';
import { Analytics } from '../../types';

interface AnalyticsDashboardProps {
  analytics: Analytics;
  userRole: 'candidate' | 'employer';
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analytics, userRole }) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const statusData = Object.entries(analytics.applicationsByStatus).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
  }));

  const skillsData = analytics.topSkills.slice(0, 8);

  const monthlyData = analytics.applicationsByMonth;

  const candidateStats = [
    {
      label: 'Total Applications',
      value: analytics.totalApplications.toString(),
      icon: Briefcase,
      color: 'text-primary-600',
      bg: 'bg-primary-100',
    },
    {
      label: 'Average Match Score',
      value: `${analytics.averageMatchScore}%`,
      icon: Target,
      color: 'text-secondary-600',
      bg: 'bg-secondary-100',
    },
    {
      label: 'Response Rate',
      value: `${analytics.responseRate}%`,
      icon: TrendingUp,
      color: 'text-accent-600',
      bg: 'bg-accent-100',
    },
    {
      label: 'This Month',
      value: monthlyData[monthlyData.length - 1]?.count.toString() || '0',
      icon: Calendar,
      color: 'text-warning-600',
      bg: 'bg-warning-100',
    },
  ];

  const employerStats = [
    {
      label: 'Total Applicants',
      value: analytics.totalApplications.toString(),
      icon: Users,
      color: 'text-primary-600',
      bg: 'bg-primary-100',
    },
    {
      label: 'Avg. Quality Score',
      value: `${analytics.averageMatchScore}%`,
      icon: Award,
      color: 'text-secondary-600',
      bg: 'bg-secondary-100',
    },
    {
      label: 'Hire Rate',
      value: `${Math.round((analytics.applicationsByStatus.accepted / analytics.totalApplications) * 100)}%`,
      icon: Target,
      color: 'text-success-600',
      bg: 'bg-success-100',
    },
    {
      label: 'Active Jobs',
      value: '12',
      icon: Briefcase,
      color: 'text-warning-600',
      bg: 'bg-warning-100',
    },
  ];

  const stats = userRole === 'candidate' ? candidateStats : employerStats;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card hover>
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
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status Distribution */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {userRole === 'candidate' ? 'Application Status' : 'Applicant Status Distribution'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {userRole === 'candidate' ? 'Application Trend' : 'Monthly Applications'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Skills */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {userRole === 'candidate' ? 'Your Top Skills' : 'Most Demanded Skills'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="skill" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance Insights */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Match Quality</p>
                <p className="text-sm text-gray-600">
                  {userRole === 'candidate' 
                    ? 'Your profile matches well with available jobs'
                    : 'High-quality candidates are applying'
                  }
                </p>
              </div>
              <div className="text-2xl font-bold text-primary-600">
                {analytics.averageMatchScore}%
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Success Rate</p>
                <p className="text-sm text-gray-600">
                  {userRole === 'candidate'
                    ? 'Applications leading to interviews'
                    : 'Applications leading to hires'
                  }
                </p>
              </div>
              <div className="text-2xl font-bold text-success-600">
                {analytics.responseRate}%
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Activity Level</p>
                <p className="text-sm text-gray-600">
                  {userRole === 'candidate'
                    ? 'Applications this month'
                    : 'New applications received'
                  }
                </p>
              </div>
              <div className="text-2xl font-bold text-warning-600">
                {monthlyData[monthlyData.length - 1]?.count || 0}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;