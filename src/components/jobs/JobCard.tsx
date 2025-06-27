import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Bookmark, ExternalLink, CheckCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Job } from '../../types';
import { RootState } from '../../store';
import { submitApplication } from '../../store/slices/applicationSlice';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { applications } = useSelector((state: RootState) => state.applications);

  // Check if user has already applied for this job
  const hasApplied = applications.some(
    app => app.jobId === job.id && app.candidateId === user?.id
  );

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

  const handleApplyNow = () => {
    if (!user) {
      alert('Please login to apply for jobs');
      return;
    }

    if (user.role !== 'candidate') {
      alert('Only job seekers can apply for jobs');
      return;
    }

    if (hasApplied) {
      alert('You have already applied for this job');
      return;
    }

    // Submit application
    dispatch(submitApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      candidateId: user.id,
      candidateName: `${user.firstName} ${user.lastName}`,
      candidateEmail: user.email,
    }));

    alert(`Successfully applied for ${job.title} at ${job.company}!`);
  };

  return (
    <Card hover className={featured ? 'border-primary-200 bg-gradient-to-br from-primary-50 to-white' : ''}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
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
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title}</h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
        >
          <Bookmark className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
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
          <Clock className="w-4 h-4" />
          <span className="capitalize">{job.type.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span className="font-semibold text-gray-900">
          {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
        </span>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{job.applicants} applicants</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="text-gray-500 text-xs font-medium">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Posted {formatDate(job.postedAt)}
        </span>
        {hasApplied ? (
          <Button 
            size="sm" 
            variant="outline" 
            icon={<CheckCircle className="w-4 h-4" />}
            disabled
          >
            Applied
          </Button>
        ) : (
          <Button 
            size="sm" 
            icon={<ExternalLink className="w-4 h-4" />}
            onClick={handleApplyNow}
          >
            Apply Now
          </Button>
        )}
      </div>
    </Card>
  );
};

export default JobCard;