import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  X, 
  Star,
  Calendar,
  User,
  Building,
  Briefcase,
  Mail,
  Phone,
  AlertCircle,
  CheckSquare,
  XSquare,
  MoreVertical
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const AdminApplicationsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);

  const { applications } = useSelector((state: RootState) => state.applications);
  const { users } = useSelector((state: RootState) => state.users);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-warning-600 bg-warning-100';
      case 'reviewed': return 'text-primary-600 bg-primary-100';
      case 'interview': return 'text-secondary-600 bg-secondary-100';
      case 'accepted': return 'text-success-600 bg-success-100';
      case 'rejected': return 'text-error-600 bg-error-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const viewApplicationDetails = (applicationId: string) => {
    setSelectedApplication(applicationId);
    setShowApplicationDetails(true);
  };

  const selectedApplicationData = applications.find(app => app.id === selectedApplication);
  const candidateData = selectedApplicationData ? users.find(user => user.id === selectedApplicationData.candidateId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Application Management</h3>
        <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
          Export Data
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by candidate, job title, or company..."
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
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button variant="outline" size="sm" icon={<Filter className="w-4 h-4" />}>
              More Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Candidate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Job</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Applied Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{application.candidateName}</div>
                        <div className="text-sm text-gray-600">{application.candidateEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{application.jobTitle}</td>
                  <td className="py-3 px-4 text-gray-900">{application.company}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="capitalize">{application.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-900">{application.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => viewApplicationDetails(application.id)}
                      >
                        View
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

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </Card>

      {/* Application Details Modal */}
      {showApplicationDetails && selectedApplicationData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setShowApplicationDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {selectedApplicationData.candidateName}
                      </h3>
                      <p className="text-gray-600">{selectedApplicationData.candidateEmail}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{selectedApplicationData.jobTitle}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{selectedApplicationData.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedApplicationData.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {candidateData && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Candidate Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {candidateData.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{candidateData.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{candidateData.email}</span>
                          </div>
                          {candidateData.experience && (
                            <div className="flex items-center space-x-2">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{candidateData.experience}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {candidateData.skills && candidateData.skills.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {candidateData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Cover Letter</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-line">
                        {selectedApplicationData.coverLetter || "No cover letter provided."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Application Status History</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-success-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Application Submitted</p>
                          <p className="text-sm text-gray-600">{new Date(selectedApplicationData.appliedAt).toLocaleString()}</p>
                        </div>
                      </div>
                      {selectedApplicationData.status !== 'pending' && (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <Eye className="w-4 h-4 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Application Reviewed</p>
                            <p className="text-sm text-gray-600">Jan 17, 2024, 2:30 PM</p>
                          </div>
                        </div>
                      )}
                      {(selectedApplicationData.status === 'interview' || selectedApplicationData.status === 'accepted' || selectedApplicationData.status === 'rejected') && (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-secondary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Interview Scheduled</p>
                            <p className="text-sm text-gray-600">Jan 20, 2024, 10:00 AM</p>
                          </div>
                        </div>
                      )}
                      {(selectedApplicationData.status === 'accepted' || selectedApplicationData.status === 'rejected') && (
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 ${selectedApplicationData.status === 'accepted' ? 'bg-success-100' : 'bg-error-100'} rounded-full flex items-center justify-center`}>
                            {selectedApplicationData.status === 'accepted' ? (
                              <CheckCircle className="w-4 h-4 text-success-600" />
                            ) : (
                              <X className="w-4 h-4 text-error-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedApplicationData.status === 'accepted' ? 'Application Accepted' : 'Application Rejected'}
                            </p>
                            <p className="text-sm text-gray-600">Jan 25, 2024, 3:45 PM</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Application Status</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Current Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplicationData.status)}`}>
                          {selectedApplicationData.status}
                        </span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Update Status
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="interview">Interview</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      
                      <Button fullWidth>
                        Update Status
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Rating & Notes</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Candidate Rating
                        </label>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="text-gray-300 hover:text-yellow-400"
                            >
                              <Star className={`w-6 h-6 ${rating <= selectedApplicationData.rating ? 'text-yellow-400 fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Admin Notes
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Add private notes about this candidate..."
                        />
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-3">
                    <Button fullWidth icon={<MessageSquare className="w-4 h-4" />}>
                      Message Candidate
                    </Button>
                    <Button fullWidth variant="outline" icon={<Calendar className="w-4 h-4" />}>
                      Schedule Interview
                    </Button>
                    <Button fullWidth variant="outline" icon={<Download className="w-4 h-4" />}>
                      Download Resume
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" icon={<CheckSquare className="w-4 h-4" />} className="text-success-600 border-success-300 hover:bg-success-50">
                        Accept
                      </Button>
                      <Button variant="outline" icon={<XSquare className="w-4 h-4" />} className="text-error-600 border-error-300 hover:bg-error-50">
                        Reject
                      </Button>
                    </div>
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

export default AdminApplicationsManagement;