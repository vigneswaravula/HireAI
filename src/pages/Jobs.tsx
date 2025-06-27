import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import Button from '../components/ui/Button';
import { Job } from '../types';

const Jobs: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock jobs data - in real app, this would come from Redux store
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 120000, max: 180000, currency: '$' },
      description: 'Join our team to build cutting-edge web applications...',
      requirements: ['React', 'TypeScript', '5+ years experience'],
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      experience: '5+ years',
      postedAt: '2024-01-15',
      deadline: '2024-02-15',
      employerId: 'emp1',
      applicants: 42,
      remote: true,
    },
    {
      id: '2',
      title: 'AI/ML Engineer',
      company: 'DataFlow Inc',
      location: 'Remote',
      type: 'full-time',
      salary: { min: 140000, max: 200000, currency: '$' },
      description: 'Work on cutting-edge AI projects...',
      requirements: ['Python', 'TensorFlow', 'PhD preferred'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'ML'],
      experience: '3+ years',
      postedAt: '2024-01-14',
      deadline: '2024-02-14',
      employerId: 'emp2',
      applicants: 28,
      remote: true,
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'full-time',
      salary: { min: 110000, max: 160000, currency: '$' },
      description: 'Lead product strategy and development...',
      requirements: ['Product Management', 'MBA preferred', '4+ years'],
      skills: ['Strategy', 'Analytics', 'Leadership', 'Agile'],
      experience: '4+ years',
      postedAt: '2024-01-13',
      deadline: '2024-02-13',
      employerId: 'emp3',
      applicants: 35,
      remote: false,
    },
    {
      id: '4',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Los Angeles, CA',
      type: 'full-time',
      salary: { min: 95000, max: 140000, currency: '$' },
      description: 'Create beautiful and functional user experiences...',
      requirements: ['Figma', 'User Research', '3+ years experience'],
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
      experience: '3+ years',
      postedAt: '2024-01-12',
      deadline: '2024-02-12',
      employerId: 'emp4',
      applicants: 51,
      remote: true,
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Austin, TX',
      type: 'full-time',
      salary: { min: 115000, max: 165000, currency: '$' },
      description: 'Build and maintain scalable infrastructure...',
      requirements: ['AWS', 'Docker', 'Kubernetes', '4+ years'],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      experience: '4+ years',
      postedAt: '2024-01-11',
      deadline: '2024-02-11',
      employerId: 'emp5',
      applicants: 33,
      remote: false,
    },
    {
      id: '6',
      title: 'Full Stack Developer',
      company: 'WebSolutions',
      location: 'Chicago, IL',
      type: 'full-time',
      salary: { min: 100000, max: 150000, currency: '$' },
      description: 'Develop end-to-end web applications...',
      requirements: ['React', 'Node.js', 'MongoDB', '3+ years'],
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      experience: '3+ years',
      postedAt: '2024-01-10',
      deadline: '2024-02-10',
      employerId: 'emp6',
      applicants: 67,
      remote: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Discover Your Next Opportunity
              </h1>
              <p className="text-gray-600">
                {jobs.length.toLocaleString()} jobs available • AI-powered matching
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                icon={<Filter className="w-4 h-4" />}
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <JobFilters />
          </div>

          {/* Jobs Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'space-y-4'
              }
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;