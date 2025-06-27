import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  X, 
  AlertTriangle,
  Download,
  MoreVertical,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Star,
  Building
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  postedAt: string;
  deadline: string;
  status: 'active' | 'draft' | 'expired' | 'paused';
  applicants: number;
  views: number;
  featured: boolean;
  department: string;
}

const AdminJobManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  // Mock jobs data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 120000, max: 180000, currency: '$' },
      postedAt: '2024-01-15',
      deadline: '2024-02-15',
      status: 'active',
      applicants: 42,
      views: 1250,
      featured: true,
      department: 'Engineering',
    },
    {
      id: '2',
      title: 'AI/ML Engineer',
      company: 'DataFlow Inc',
      location: 'Remote',
      type: 'full-time',
      salary: { min: 140000, max: 200000, currency: '$' },
      postedAt: '2024-01-14',
      deadline: '2024-02-14',
      status: 'active',
      applicants: 28,
      views: 980,
      featured: true,
      department: 'Data Science',
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'full-time',
      salary: { min: 110000, max: 160000, currency: '$' },
      postedAt: '2024-01-13',
      deadline: '2024-02-13',
      status: 'active',
      applicants: 35,
      views: 756,
      featured: false,
      department: 'Product',
    },
    {
      id: '4',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Los Angeles, CA',
      type: 'full-time',
      salary: { min: 95000, max: 140000, currency: '$' },
      postedAt: '2024-01-12',
      deadline: '2024-02-12',
      status: 'draft',
      applicants: 0,
      views: 0,
      featured: false,
      department: 'Design',
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Austin, TX',
      type: 'full-time',
      salary: { min: 115000, max: 165000, currency: '$' },
      postedAt: '2024-01-11',
      deadline: '2024-02-11',
      status: 'expired',
      applicants: 33,
      views: 623,
      featured: false,
      department: 'Engineering',
    },
    {
      id: '6',
      title: 'Full Stack Developer',
      company: 'WebSolutions',
      location: 'Chicago, IL',
      type: 'full-time',
      salary: { min: 100000, max: 150000, currency: '$' },
      postedAt: '2024-01-10',
      deadline: '2024-02-10',
      status: 'paused',
      applicants: 67,
      views: 1120,
      featured: false,
      department: 'Engineering',
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-600 bg-success-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'expired': return 'text-error-600 bg-error-100';
      case 'paused': return 'text-warning-600 bg-warning-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
  };

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Job Management</h3>
        <Button icon={<Plus className="w-4 h-4" />}>
          Create New Job
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search jobs by title or company..."
              icon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
              <option value="paused">Paused</option>
            </select>
            <Button variant="outline" size="sm" icon={<Filter className="w-4 h-4" />}>
              More Filters
            </Button>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Job Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Posted Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Applicants</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-600">{job.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{job.company}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium">{job.applicants}</td>
                  <td className="py-3 px-4 text-gray-600">{job.views}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => viewJobDetails(job)}
                      >
                        View
                      </Button>
                      <Button variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4" />}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or create a new job
            </p>
            <Button icon={<Plus className="w-4 h-4" />}>
              Create New Job
            </Button>
          </div>
        )}
      </Card>

      {/* Job Details Modal */}
      {showJobDetails && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
                <button
                  onClick={() => setShowJobDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {selectedJob.title}
                      </h3>
                      <p className="text-gray-600">{selectedJob.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedJob.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="capitalize">{selectedJob.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{formatSalary(selectedJob.salary.min, selectedJob.salary.max, selectedJob.salary.currency)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>5+ years of experience in frontend development</li>
                        <li>Strong proficiency in React, TypeScript, and modern JavaScript</li>
                        <li>Experience with state management libraries (Redux, MobX)</li>
                        <li>Understanding of responsive design and cross-browser compatibility</li>
                        <li>Excellent problem-solving skills and attention to detail</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Develop and maintain frontend applications using React</li>
                        <li>Collaborate with backend developers to integrate APIs</li>
                        <li>Implement responsive designs and ensure cross-browser compatibility</li>
                        <li>Optimize applications for maximum speed and scalability</li>
                        <li>Participate in code reviews and provide constructive feedback</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Job Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedJob.status)}`}>
                          {selectedJob.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Posted Date</span>
                        <span className="font-medium">{new Date(selectedJob.postedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Deadline</span>
                        <span className="font-medium">{new Date(selectedJob.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Featured</span>
                        <span className="font-medium">{selectedJob.featured ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Views</span>
                        <span className="font-medium">{selectedJob.views}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Applicants</span>
                        <span className="font-medium">{selectedJob.applicants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-medium">
                          {selectedJob.views ? ((selectedJob.applicants / selectedJob.views) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quality Score</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium ml-1">4.8/5</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-3">
                    <Button fullWidth icon={<Edit className="w-4 h-4" />}>
                      Edit Job
                    </Button>
                    <Button fullWidth variant="outline" icon={<Users className="w-4 h-4" />}>
                      View Applicants
                    </Button>
                    {selectedJob.status === 'active' ? (
                      <Button fullWidth variant="outline" icon={<Pause className="w-4 h-4" />}>
                        Pause Listing
                      </Button>
                    ) : (
                      <Button fullWidth variant="outline" icon={<Play className="w-4 h-4" />}>
                        Activate Listing
                      </Button>
                    )}
                    <Button fullWidth variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" icon={<Trash2 className="w-4 h-4" />}>
                      Delete Job
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminJobManagement;