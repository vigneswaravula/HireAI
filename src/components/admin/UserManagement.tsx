import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  X, 
  Shield,
  User,
  Mail,
  Lock,
  Building,
  Clock,
  Download,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText,
  RefreshCw,
  UserPlus,
  UserCheck,
  UserX,
  History
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface UserFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user' | 'candidate' | 'employer';
  department: string;
  status: 'active' | 'inactive' | 'suspended';
  password: string;
  confirmPassword: string;
}

interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
  performedBy: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState<string | null>(null);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    department: '',
    status: 'active',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const { users } = useSelector((state: RootState) => state.users);
  
  // Mock departments data
  const departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Customer Support',
    'Human Resources',
    'Finance',
    'Operations',
    'Legal'
  ];

  // Mock audit log data
  const auditLog: AuditLogEntry[] = [
    {
      id: '1',
      userId: '1',
      action: 'User Created',
      timestamp: '2024-01-15T10:30:00Z',
      details: 'New user account created',
      performedBy: 'Admin User'
    },
    {
      id: '2',
      userId: '1',
      action: 'Role Changed',
      timestamp: '2024-01-16T14:45:00Z',
      details: 'Role changed from user to admin',
      performedBy: 'Admin User'
    },
    {
      id: '3',
      userId: '2',
      action: 'Status Changed',
      timestamp: '2024-01-17T09:15:00Z',
      details: 'Status changed from active to suspended',
      performedBy: 'Admin User'
    },
    {
      id: '4',
      userId: '3',
      action: 'User Created',
      timestamp: '2024-01-18T11:20:00Z',
      details: 'New user account created',
      performedBy: 'Admin User'
    },
    {
      id: '5',
      userId: '2',
      action: 'Status Changed',
      timestamp: '2024-01-19T16:30:00Z',
      details: 'Status changed from suspended to active',
      performedBy: 'Admin User'
    }
  ];

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || (user.isVerified ? 'active' : 'inactive') === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  // Pagination
  const itemsPerPage = 25;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout for debounce (300ms)
    const timeout = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
    
    setSearchTimeout(timeout);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkAction = (action: 'activate' | 'suspend' | 'delete') => {
    if (selectedUsers.length === 0) return;
    
    // In a real app, this would call an API
    alert(`${action} action on ${selectedUsers.length} users`);
    setSelectedUsers([]);
  };

  const openUserForm = (user?: typeof users[0]) => {
    if (user) {
      setFormData({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department || '',
        status: user.isVerified ? 'active' : 'inactive',
        password: '',
        confirmPassword: ''
      });
      setIsEditing(true);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'user',
        department: '',
        status: 'active',
        password: '',
        confirmPassword: ''
      });
      setIsEditing(false);
    }
    setFormErrors({});
    setShowUserForm(true);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2 || formData.firstName.length > 50) {
      errors.firstName = 'First name must be between 2 and 50 characters';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2 || formData.lastName.length > 50) {
      errors.lastName = 'Last name must be between 2 and 50 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email format';
      }
      
      // Domain verification (simplified example)
      const domain = formData.email.split('@')[1];
      if (domain && !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'].includes(domain)) {
        errors.email = 'Email domain not recognized';
      }
    }
    
    // Password validation (only for new users or password changes)
    if (!isEditing || (formData.password && formData.password.trim() !== '')) {
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else {
        const hasUppercase = /[A-Z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
        
        if (!hasUppercase || !hasNumber || !hasSpecial) {
          errors.password = 'Password must include uppercase, number, and special character';
        }
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    // Department validation
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitForm = () => {
    if (!validateForm()) return;
    
    // In a real app, this would call an API to create/update the user
    if (isEditing) {
      alert(`User updated: ${formData.firstName} ${formData.lastName}`);
    } else {
      alert(`User created: ${formData.firstName} ${formData.lastName}`);
    }
    
    setShowUserForm(false);
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'manager': return 'bg-purple-100 text-purple-700';
      case 'employer': return 'bg-blue-100 text-blue-700';
      case 'candidate': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'suspended': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <Button 
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => openUserForm()}
        >
          Add User
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search users by name or email..."
              icon={<Search className="w-4 h-4" />}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employer">Employer</option>
              <option value="candidate">Candidate</option>
              <option value="user">User</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{selectedUsers.length}</span> users selected
            </div>
            <div className="flex space-x-3">
              <Button 
                size="sm" 
                variant="outline" 
                icon={<UserCheck className="w-4 h-4" />}
                onClick={() => handleBulkAction('activate')}
              >
                Activate
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                icon={<UserX className="w-4 h-4" />}
                onClick={() => handleBulkAction('suspend')}
              >
                Suspend
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
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.department || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.isVerified ? 'active' : 'inactive')}`}>
                      {user.isVerified ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => setShowUserDetails(user.id)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => openUserForm(user)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or create a new user
            </p>
            <Button 
              icon={<UserPlus className="w-4 h-4" />}
              onClick={() => openUserForm()}
            >
              Add User
            </Button>
          </div>
        )}
      </Card>

      {/* User Form Modal */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit User' : 'Create New User'}
                </h2>
                <button
                  onClick={() => setShowUserForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      error={formErrors.firstName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      error={formErrors.lastName}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    icon={<Mail className="w-4 h-4" />}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={formErrors.email}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employer">Employer</option>
                      <option value="candidate">Candidate</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <Input
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        list="departments"
                        error={formErrors.department}
                      />
                      <datalist id="departments">
                        {departments.map(dept => (
                          <option key={dept} value={dept} />
                        ))}
                      </datalist>
                    </div>
                  </div>
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password {isEditing && <span className="text-gray-500 text-xs">(Leave blank to keep current)</span>}
                    </label>
                    <Input
                      type="password"
                      icon={<Lock className="w-4 h-4" />}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={formErrors.password}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      icon={<Lock className="w-4 h-4" />}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      error={formErrors.confirmPassword}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowUserForm(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitForm}
                    fullWidth
                  >
                    {isEditing ? 'Update User' : 'Create User'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                <button
                  onClick={() => setShowUserDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {(() => {
                const user = users.find(u => u.id === showUserDetails);
                if (!user) return <div>User not found</div>;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.isVerified ? 'active' : 'inactive')}`}>
                              {user.isVerified ? 'active' : 'inactive'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">User Information</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Department</span>
                              <span className="font-medium text-gray-900">{user.department || '-'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Created</span>
                              <span className="font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Last Active</span>
                              <span className="font-medium text-gray-900">{user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Phone</span>
                              <span className="font-medium text-gray-900">{user.phone || '-'}</span>
                            </div>
                          </div>
                        </div>

                        {user.role === 'candidate' && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Candidate Information</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Experience</span>
                                <span className="font-medium text-gray-900">{user.experience || '-'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Applications</span>
                                <span className="font-medium text-gray-900">12</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Resume</span>
                                <span className="font-medium text-primary-600 cursor-pointer">{user.resumeFileName || 'Not uploaded'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {user.role === 'employer' && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Employer Information</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Company</span>
                                <span className="font-medium text-gray-900">{user.company || '-'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Job Postings</span>
                                <span className="font-medium text-gray-900">8</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subscription</span>
                                <span className="font-medium text-success-600">Premium</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Audit Log</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={<History className="w-4 h-4" />}
                            onClick={() => setShowAuditLog(!showAuditLog)}
                          >
                            {showAuditLog ? 'Hide Log' : 'View Log'}
                          </Button>
                        </div>
                        
                        {showAuditLog && (
                          <div className="space-y-3 mt-3">
                            {auditLog
                              .filter(log => log.userId === user.id)
                              .map((log) => (
                                <div key={log.id} className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-gray-900">{log.action}</span>
                                    <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{log.details}</p>
                                  <p className="text-xs text-gray-500 mt-1">By: {log.performedBy}</p>
                                </div>
                              ))}
                            
                            {auditLog.filter(log => log.userId === user.id).length === 0 && (
                              <p className="text-sm text-gray-500 italic">No audit records found</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      <Card className="p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                        <div className="space-y-3">
                          <Button 
                            fullWidth 
                            icon={<Edit className="w-4 h-4" />}
                            onClick={() => {
                              setShowUserDetails(null);
                              openUserForm(user);
                            }}
                          >
                            Edit User
                          </Button>
                          <Button 
                            variant="outline" 
                            fullWidth 
                            icon={<Mail className="w-4 h-4" />}
                          >
                            Send Email
                          </Button>
                          <Button 
                            variant="outline" 
                            fullWidth 
                            icon={<RefreshCw className="w-4 h-4" />}
                          >
                            Reset Password
                          </Button>
                          {user.isVerified ? (
                            <Button 
                              variant="outline" 
                              fullWidth 
                              icon={<UserX className="w-4 h-4" />}
                              className="text-warning-600 border-warning-300 hover:bg-warning-50"
                            >
                              Suspend User
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              fullWidth 
                              icon={<UserCheck className="w-4 h-4" />}
                              className="text-success-600 border-success-300 hover:bg-success-50"
                            >
                              Activate User
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            fullWidth 
                            icon={<Trash2 className="w-4 h-4" />}
                            className="text-error-600 border-error-300 hover:bg-error-50"
                          >
                            Delete User
                          </Button>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Security</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Two-Factor Auth</span>
                            <span className="font-medium text-error-600">Disabled</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Last Password Change</span>
                            <span className="font-medium text-gray-900">Never</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Failed Login Attempts</span>
                            <span className="font-medium text-gray-900">0</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Account Lock</span>
                            <span className="font-medium text-success-600">Unlocked</span>
                          </div>
                        </div>
                      </Card>
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

export default UserManagement;