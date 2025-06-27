import React, { useState, useEffect } from 'react';
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
  Building,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  FileText,
  Bell,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Pause,
  Play,
  ArrowUpDown
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
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  resources: string[];
  status: 'active' | 'draft' | 'expired' | 'paused' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  updatedAt: string;
  assignedTo: string[];
  department: string;
}

interface JobFormData {
  id?: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  resources: string[];
  status: 'active' | 'draft';
  assignedTo: string[];
  department: string;
  company: string;
  location: string;
  type: string;
}

const JobControlSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('deadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
    resources: [''],
    status: 'draft',
    assignedTo: [''],
    department: '',
    company: '',
    location: '',
    type: 'full-time'
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [draggedJobId, setDraggedJobId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Mock jobs data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Website Redesign Project',
      company: 'TechCorp',
      location: 'Remote',
      type: 'project',
      description: 'Complete overhaul of company website with new design system and improved user experience.',
      priority: 'high',
      deadline: '2024-02-28',
      resources: ['Design Team', 'Frontend Developers', 'Content Writers'],
      status: 'active',
      progress: 45,
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z',
      assignedTo: ['Sarah Wilson', 'John Smith'],
      department: 'Marketing'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      company: 'DataFlow Inc',
      location: 'San Francisco, CA',
      type: 'project',
      description: 'Develop a new mobile application for iOS and Android platforms.',
      priority: 'high',
      deadline: '2024-03-15',
      resources: ['Mobile Developers', 'UX Designers', 'QA Testers'],
      status: 'active',
      progress: 30,
      createdAt: '2024-01-05T10:15:00Z',
      updatedAt: '2024-01-19T16:45:00Z',
      assignedTo: ['Mike Johnson', 'Emily Davis'],
      department: 'Product'
    },
    {
      id: '3',
      title: 'Database Migration',
      company: 'TechCorp',
      location: 'Chicago, IL',
      type: 'task',
      description: 'Migrate existing database to new cloud infrastructure with zero downtime.',
      priority: 'medium',
      deadline: '2024-02-10',
      resources: ['Database Administrators', 'DevOps Engineers'],
      status: 'paused',
      progress: 60,
      createdAt: '2024-01-08T11:30:00Z',
      updatedAt: '2024-01-18T13:20:00Z',
      assignedTo: ['Robert Kim'],
      department: 'Engineering'
    },
    {
      id: '4',
      title: 'Annual Security Audit',
      company: 'SecureTech',
      location: 'New York, NY',
      type: 'task',
      description: 'Conduct comprehensive security audit of all systems and infrastructure.',
      priority: 'high',
      deadline: '2024-02-05',
      resources: ['Security Team', 'External Consultants'],
      status: 'completed',
      progress: 100,
      createdAt: '2024-01-02T08:45:00Z',
      updatedAt: '2024-01-15T17:10:00Z',
      assignedTo: ['Lisa Chen', 'David Park'],
      department: 'IT Security'
    },
    {
      id: '5',
      title: 'Marketing Campaign Launch',
      company: 'BrandBoost',
      location: 'Los Angeles, CA',
      type: 'project',
      description: 'Launch Q1 marketing campaign across digital and traditional channels.',
      priority: 'medium',
      deadline: '2024-01-31',
      resources: ['Marketing Team', 'Design Team', 'Social Media Specialists'],
      status: 'active',
      progress: 80,
      createdAt: '2024-01-03T14:00:00Z',
      updatedAt: '2024-01-21T09:15:00Z',
      assignedTo: ['Jennifer White', 'Michael Brown'],
      department: 'Marketing'
    },
    {
      id: '6',
      title: 'Customer Support System Upgrade',
      company: 'SupportHub',
      location: 'Austin, TX',
      type: 'project',
      description: 'Upgrade the customer support ticketing system and implement new features.',
      priority: 'low',
      deadline: '2024-03-30',
      resources: ['IT Support', 'Customer Success Team'],
      status: 'draft',
      progress: 0,
      createdAt: '2024-01-15T11:20:00Z',
      updatedAt: '2024-01-15T11:20:00Z',
      assignedTo: ['Alex Johnson'],
      department: 'Customer Support'
    },
  ]);

  // Mock job history data
  const jobHistory = [
    { id: '1', jobId: '1', action: 'Status Changed', details: 'Status changed from draft to active', timestamp: '2024-01-12T10:30:00Z', user: 'Admin User' },
    { id: '2', jobId: '1', action: 'Progress Updated', details: 'Progress updated from 30% to 45%', timestamp: '2024-01-20T14:30:00Z', user: 'Sarah Wilson' },
    { id: '3', jobId: '2', action: 'Resource Added', details: 'Added QA Testers to resources', timestamp: '2024-01-15T09:45:00Z', user: 'Admin User' },
    { id: '4', jobId: '3', action: 'Status Changed', details: 'Status changed from active to paused', timestamp: '2024-01-18T13:20:00Z', user: 'Robert Kim' },
    { id: '5', jobId: '4', action: 'Completed', details: 'Job marked as completed', timestamp: '2024-01-15T17:10:00Z', user: 'Lisa Chen' },
  ];

  // Filter and sort jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'deadline':
        comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'progress':
        comparison = a.progress - b.progress;
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  useEffect(() => {
    // Set up auto-refresh if enabled
    if (refreshInterval) {
      const interval = setInterval(() => {
        // In a real app, this would fetch fresh data from the API
        setLastRefreshed(new Date());
      }, refreshInterval * 1000);
      
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedJobs(sortedJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId: string) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleBulkAction = (action: 'activate' | 'pause' | 'delete') => {
    if (selectedJobs.length === 0) return;
    
    // In a real app, this would call an API
    if (action === 'delete') {
      setJobs(jobs.filter(job => !selectedJobs.includes(job.id)));
    } else {
      setJobs(jobs.map(job => {
        if (selectedJobs.includes(job.id)) {
          return {
            ...job,
            status: action === 'activate' ? 'active' : 'paused',
            updatedAt: new Date().toISOString()
          };
        }
        return job;
      }));
    }
    
    setSelectedJobs([]);
  };

  const openJobForm = (job?: Job) => {
    if (job) {
      setFormData({
        id: job.id,
        title: job.title,
        description: job.description,
        priority: job.priority,
        deadline: job.deadline,
        resources: job.resources,
        status: job.status as 'active' | 'draft',
        assignedTo: job.assignedTo,
        department: job.department,
        company: job.company,
        location: job.location,
        type: job.type
      });
      setIsEditing(true);
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        deadline: '',
        resources: [''],
        status: 'draft',
        assignedTo: [''],
        department: '',
        company: '',
        location: '',
        type: 'full-time'
      });
      setIsEditing(false);
    }
    setFormErrors({});
    setShowJobForm(true);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Title validation
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    // Deadline validation
    if (!formData.deadline) {
      errors.deadline = 'Deadline is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      if (deadlineDate < today) {
        errors.deadline = 'Deadline cannot be in the past';
      }
    }
    
    // Resources validation
    if (formData.resources.filter(r => r.trim()).length === 0) {
      errors.resources = 'At least one resource is required';
    }
    
    // Assigned To validation
    if (formData.assignedTo.filter(a => a.trim()).length === 0) {
      errors.assignedTo = 'At least one assignee is required';
    }
    
    // Department validation
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }
    
    // Company validation
    if (!formData.company.trim()) {
      errors.company = 'Company is required';
    }
    
    // Location validation
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitForm = () => {
    if (!validateForm()) return;
    
    // In a real app, this would call an API to create/update the job
    if (isEditing && formData.id) {
      setJobs(jobs.map(job => 
        job.id === formData.id 
          ? {
              ...job,
              title: formData.title,
              description: formData.description,
              priority: formData.priority,
              deadline: formData.deadline,
              resources: formData.resources.filter(r => r.trim()),
              status: formData.status,
              assignedTo: formData.assignedTo.filter(a => a.trim()),
              department: formData.department,
              company: formData.company,
              location: formData.location,
              type: formData.type,
              updatedAt: new Date().toISOString()
            }
          : job
      ));
    } else {
      const newJob: Job = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        deadline: formData.deadline,
        resources: formData.resources.filter(r => r.trim()),
        status: formData.status,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: formData.assignedTo.filter(a => a.trim()),
        department: formData.department,
        company: formData.company,
        location: formData.location,
        type: formData.type
      };
      
      setJobs([...jobs, newJob]);
    }
    
    setShowJobForm(false);
  };

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user types
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayInputChange = (field: 'resources' | 'assignedTo', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field: 'resources' | 'assignedTo') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'resources' | 'assignedTo', index: number) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleDragStart = (jobId: string) => {
    setDraggedJobId(jobId);
  };

  const handleDragOver = (e: React.DragEvent, targetJobId: string) => {
    e.preventDefault();
    if (!draggedJobId || draggedJobId === targetJobId) return;
    
    // Add visual indicator for drop target
    const targetElement = document.getElementById(`job-${targetJobId}`);
    if (targetElement) {
      targetElement.classList.add('bg-primary-50', 'border-primary-200');
    }
  };

  const handleDragLeave = (e: React.DragEvent, targetJobId: string) => {
    e.preventDefault();
    
    // Remove visual indicator
    const targetElement = document.getElementById(`job-${targetJobId}`);
    if (targetElement) {
      targetElement.classList.remove('bg-primary-50', 'border-primary-200');
    }
  };

  const handleDrop = (e: React.DragEvent, targetJobId: string) => {
    e.preventDefault();
    if (!draggedJobId || draggedJobId === targetJobId) return;
    
    // Remove visual indicator
    const targetElement = document.getElementById(`job-${targetJobId}`);
    if (targetElement) {
      targetElement.classList.remove('bg-primary-50', 'border-primary-200');
    }
    
    // Reorder jobs
    const draggedIndex = jobs.findIndex(job => job.id === draggedJobId);
    const targetIndex = jobs.findIndex(job => job.id === targetJobId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newJobs = [...jobs];
      const [draggedJob] = newJobs.splice(draggedIndex, 1);
      newJobs.splice(targetIndex, 0, draggedJob);
      setJobs(newJobs);
    }
    
    setDraggedJobId(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-error-100 text-error-700';
      case 'medium': return 'bg-warning-100 text-warning-700';
      case 'low': return 'bg-success-100 text-success-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'expired': return 'bg-error-100 text-error-700';
      case 'paused': return 'bg-warning-100 text-warning-700';
      case 'completed': return 'bg-primary-100 text-primary-700';
      case 'failed': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-success-500';
    if (progress >= 50) return 'bg-primary-500';
    if (progress >= 25) return 'bg-warning-500';
    return 'bg-error-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isDeadlinePassed = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Job Control System</h3>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            Last updated: {lastRefreshed.toLocaleTimeString()}
          </div>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => openJobForm()}
          >
            Create Job
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search jobs by title, company, or description..."
              icon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={refreshInterval?.toString() || '0'}
              onChange={(e) => setRefreshInterval(parseInt(e.target.value) || null)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="0">Manual Refresh</option>
              <option value="30">Auto (30s)</option>
              <option value="60">Auto (1m)</option>
              <option value="300">Auto (5m)</option>
            </select>
            <Button 
              variant="outline" 
              size="sm" 
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={() => setLastRefreshed(new Date())}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedJobs.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{selectedJobs.length}</span> jobs selected
            </div>
            <div className="flex space-x-3">
              <Button 
                size="sm" 
                variant="outline" 
                icon={<Play className="w-4 h-4" />}
                onClick={() => handleBulkAction('activate')}
              >
                Activate
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                icon={<Pause className="w-4 h-4" />}
                onClick={() => handleBulkAction('pause')}
              >
                Pause
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 border-red-300 hover:bg-red-50"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={() => handleBulkAction('delete')}
              >
                Delete
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedJobs.length === sortedJobs.length && sortedJobs.length > 0}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Title</span>
                    {sortField === 'title' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                <th 
                  className="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Priority</span>
                    {sortField === 'priority' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('deadline')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Deadline</span>
                    {sortField === 'deadline' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('progress')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Progress</span>
                    {sortField === 'progress' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedJobs.map((job) => (
                <tr 
                  key={job.id} 
                  id={`job-${job.id}`}
                  className="border-b border-gray-100 hover:bg-gray-50"
                  draggable
                  onDragStart={() => handleDragStart(job.id)}
                  onDragOver={(e) => handleDragOver(e, job.id)}
                  onDragLeave={(e) => handleDragLeave(e, job.id)}
                  onDrop={(e) => handleDrop(e, job.id)}
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => handleSelectJob(job.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-600">{job.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{job.company}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      {isDeadlineSoon(job.deadline) && !isDeadlinePassed(job.deadline) && (
                        <AlertTriangle className="w-4 h-4 text-warning-500" />
                      )}
                      {isDeadlinePassed(job.deadline) && job.status !== 'completed' && (
                        <AlertTriangle className="w-4 h-4 text-error-500" />
                      )}
                      <span className={`text-sm ${
                        isDeadlinePassed(job.deadline) && job.status !== 'completed' 
                          ? 'text-error-600 font-medium' 
                          : isDeadlineSoon(job.deadline) && !isDeadlinePassed(job.deadline)
                            ? 'text-warning-600 font-medium'
                            : 'text-gray-600'
                      }`}>
                        {formatDate(job.deadline)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(job.progress)}`} 
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{job.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => setShowJobDetails(job.id)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => openJobForm(job)}
                      >
                        Edit
                      </Button>
                      <div className="relative">
                        <Button variant="ghost" size="sm" icon={<MoreVertical className="w-4 h-4" />} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or create a new job
            </p>
            <Button 
              icon={<Plus className="w-4 h-4" />}
              onClick={() => openJobForm()}
            >
              Create New Job
            </Button>
          </div>
        )}
      </Card>

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Job' : 'Create New Job'}
                </h2>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      error={formErrors.title}
                      maxLength={100}
                    />
                    {!formErrors.title && (
                      <div className="text-xs text-gray-500 mt-1 flex justify-end">
                        {formData.title.length}/100 characters
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      error={formErrors.company}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <Input
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      error={formErrors.department}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      error={formErrors.location}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="project">Project</option>
                      <option value="task">Task</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-3 py-2 border ${formErrors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline
                    </label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      error={formErrors.deadline}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Resources
                      </label>
                      {formErrors.resources && (
                        <p className="text-sm text-red-600">{formErrors.resources}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      {formData.resources.map((resource, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder={`Resource #${index + 1}`}
                            value={resource}
                            onChange={(e) => handleArrayInputChange('resources', index, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem('resources', index)}
                            icon={<Trash2 className="w-4 h-4" />}
                            disabled={formData.resources.length <= 1}
                          />
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('resources')}
                        icon={<Plus className="w-4 h-4" />}
                      >
                        Add Resource
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Assigned To
                      </label>
                      {formErrors.assignedTo && (
                        <p className="text-sm text-red-600">{formErrors.assignedTo}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      {formData.assignedTo.map((assignee, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder={`Person #${index + 1}`}
                            value={assignee}
                            onChange={(e) => handleArrayInputChange('assignedTo', index, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem('assignedTo', index)}
                            icon={<Trash2 className="w-4 h-4" />}
                            disabled={formData.assignedTo.length <= 1}
                          />
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('assignedTo')}
                        icon={<Plus className="w-4 h-4" />}
                      >
                        Add Assignee
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowJobForm(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitForm}
                    fullWidth
                  >
                    {isEditing ? 'Update Job' : 'Create Job'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Job Details Modal */}
      {showJobDetails && (
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
                  onClick={() => setShowJobDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {(() => {
                const job = jobs.find(j => j.id === showJobDetails);
                if (!job) return <div>Job not found</div>;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-8 h-8 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                              {job.priority} priority
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-700">{job.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Resources</h4>
                          <div className="space-y-2">
                            {job.resources.map((resource, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                <span className="text-gray-700">{resource}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Assigned To</h4>
                          <div className="space-y-2">
                            {job.assignedTo.map((assignee, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">{assignee}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Job History</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={<History className="w-4 h-4" />}
                            onClick={() => setShowHistory(!showHistory)}
                          >
                            {showHistory ? 'Hide History' : 'View History'}
                          </Button>
                        </div>
                        
                        {showHistory && (
                          <div className="space-y-3 mt-3">
                            {jobHistory
                              .filter(history => history.jobId === job.id)
                              .map((history) => (
                                <div key={history.id} className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-gray-900">{history.action}</span>
                                    <span className="text-xs text-gray-500">{new Date(history.timestamp).toLocaleString()}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{history.details}</p>
                                  <p className="text-xs text-gray-500 mt-1">By: {history.user}</p>
                                </div>
                              ))}
                            
                            {jobHistory.filter(history => history.jobId === job.id).length === 0 && (
                              <p className="text-sm text-gray-500 italic">No history records found</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      <Card className="p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Job Status</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Current Status</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{job.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(job.progress)}`} 
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Deadline</span>
                            <span className={`font-medium ${
                              isDeadlinePassed(job.deadline) && job.status !== 'completed' 
                                ? 'text-error-600' 
                                : isDeadlineSoon(job.deadline) && !isDeadlinePassed(job.deadline)
                                  ? 'text-warning-600'
                                  : 'text-gray-900'
                            }`}>
                              {formatDate(job.deadline)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Created</span>
                            <span className="font-medium">{formatDate(job.createdAt)}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Last Updated</span>
                            <span className="font-medium">{formatDate(job.updatedAt)}</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Update Progress</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Progress (%)
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="5"
                              value={job.progress}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0%</span>
                              <span>50%</span>
                              <span>100%</span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Status
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              defaultValue={job.status}
                            >
                              <option value="active">Active</option>
                              <option value="paused">Paused</option>
                              <option value="completed">Completed</option>
                              <option value="failed">Failed</option>
                            </select>
                          </div>
                          
                          <Button fullWidth>
                            Update Job
                          </Button>
                        </div>
                      </Card>

                      <div className="space-y-3">
                        <Button 
                          fullWidth 
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => {
                            setShowJobDetails(null);
                            openJobForm(job);
                          }}
                        >
                          Edit Job
                        </Button>
                        <Button 
                          fullWidth 
                          variant="outline" 
                          icon={<Bell className="w-4 h-4" />}
                        >
                          Send Notification
                        </Button>
                        <Button 
                          fullWidth 
                          variant="outline" 
                          icon={<FileText className="w-4 h-4" />}
                        >
                          Generate Report
                        </Button>
                        <Button 
                          fullWidth 
                          variant="outline" 
                          className="text-red-600 border-red-300 hover:bg-red-50" 
                          icon={<Trash2 className="w-4 h-4" />}
                        >
                          Delete Job
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobControlSystem;