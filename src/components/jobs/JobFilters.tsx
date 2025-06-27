import React from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Briefcase, DollarSign, Search } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateFilters, clearFilters } from '../../store/slices/jobSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';

const JobFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.jobs);

  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ];

  const locations = [
    'New York, NY',
    'San Francisco, CA',
    'Los Angeles, CA',
    'Chicago, IL',
    'Austin, TX',
    'Seattle, WA',
    'Boston, MA',
    'Remote',
  ];

  const handleLocationChange = (location: string) => {
    dispatch(updateFilters({ location }));
  };

  const handleTypeChange = (type: string) => {
    dispatch(updateFilters({ type }));
  };

  const handleRemoteToggle = () => {
    dispatch(updateFilters({ remote: !filters.remote }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-soft border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Input
            placeholder="Search jobs, companies, skills..."
            icon={<Search className="w-4 h-4" />}
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location
          </label>
          <div className="space-y-2">
            {locations.map((location) => (
              <label key={location} className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value={location}
                  checked={filters.location === location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Briefcase className="w-4 h-4 inline mr-1" />
            Job Type
          </label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type.value} className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={filters.type === type.value}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Remote Work */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.remote}
              onChange={handleRemoteToggle}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Remote Work Only</span>
          </label>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Salary Range
          </label>
          <div className="px-3">
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={filters.salary[1]}
              onChange={(e) =>
                dispatch(updateFilters({ 
                  salary: [filters.salary[0], parseInt(e.target.value)] 
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>${filters.salary[0].toLocaleString()}</span>
              <span>${filters.salary[1].toLocaleString()}+</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobFilters;