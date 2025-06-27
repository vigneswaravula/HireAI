import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Clock, Users, ExternalLink, Brain } from 'lucide-react';
import { Job } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const PublicJobBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock jobs data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 120000, max: 180000, currency: '$' },
      description: 'Join our team to build cutting-edge web applications using React, TypeScript, and modern development practices.',
      requirements: ['React', 'TypeScript', '5+ years experience'],
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      experience: '5+ years',
      postedAt: '2024-01-15',
      deadline: '2024-02-15',
      employerId: 'emp1',
      applicants: 42,
      remote: true,
      views: 1250,
    },
    {
      id: '2',
      title: 'AI/ML Engineer',
      company: 'DataFlow Inc',
      location: 'Remote',
      type: 'full-time',
      salary: { min: 140000, max: 200000, currency: '$' },
      description: 'Work on cutting-edge AI projects and machine learning models.',
      requirements: ['Python', 'TensorFlow', 'PhD preferred'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'ML'],
      experience: '3+ years',
      postedAt: '2024-01-14',
      deadline: '2024-02-14',
      employerId: 'emp2',
      applicants: 28,
      remote: true,
      views: 980,
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'full-time',
      salary: { min: 110000, max: 160000, currency: '$' },
      description: 'Lead product strategy and development for our core platform.',
      requirements: ['Product Management', 'MBA preferred', '4+ years'],
      skills: ['Strategy', 'Analytics', 'Leadership', 'Agile'],
      experience: '4+ years',
      postedAt: '2024-01-13',
      deadline: '2024-02-13',
      employerId: 'emp3',
      applicants: 35,
      remote: false,
      views: 756,
    },
    {
      id: '4',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Los Angeles, CA',
      type: 'full-time',
      salary: { min: 95000, max: 140000, currency: '$' },
      description: 'Create beautiful and functional user experiences for our products.',
      requirements: ['Figma', 'User Research', '3+ years experience'],
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
      experience: '3+ years',
      postedAt: '2024-01-12',
      deadline: '2024-02-12',
      employerId: 'emp4',
      applicants: 51,
      remote: true,
      views: 623,
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === '' ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HireAI</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Discover Amazing Job Opportunities
            </h1>
            <p className="text-gray-600 mb-6">
              Browse {jobs.length} open positions from top companies
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search jobs, companies, skills..."
                  icon={<Search className="w-4 h-4" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Input
                  placeholder="Location"
                  icon={<MapPin className="w-4 h-4" />}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Want to apply?</p>
            <Link to="/register">
              <Button size="sm">Sign Up Free</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {job.logo ? (
                        <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                      ) : (
                        <div className="w-8 h-8 bg-primary-600 rounded text-white text-sm font-bold flex items-center justify-center">
                          {job.company.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600 font-medium mb-2">{job.company}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                          {job.remote && (
                            <span className="bg-accent-100 text-accent-700 px-2 py-0.5 rounded text-xs font-medium ml-2">
                              Remote
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="capitalize">{job.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Posted {formatDate(job.postedAt)}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="text-gray-500 text-xs font-medium">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">
                            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{job.applicants} applicants</span>
                          </div>
                          {job.views && (
                            <div className="flex items-center space-x-1">
                              <ExternalLink className="w-4 h-4" />
                              <span>{job.views} views</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Link to="/register">
                      <Button size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                        Apply Now
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Save Job
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all available positions
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setLocationFilter('');
              setTypeFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Find Your Dream Job?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of professionals who have found their perfect career match through our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register?role=candidate">
                  <Button size="lg">
                    Create Job Seeker Account
                  </Button>
                </Link>
                <Link to="/register?role=employer">
                  <Button variant="outline" size="lg">
                    Post Jobs as Employer
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicJobBoard;