import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeSavedJob } from '../../store/slices/jobSlice';
import JobCard from './JobCard';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SavedJobs: React.FC = () => {
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state: RootState) => state.jobs);

  const handleRemoveSavedJob = (jobId: string) => {
    dispatch(removeSavedJob(jobId));
  };

  if (savedJobs.length === 0) {
    return (
      <Card className="text-center py-12">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Jobs</h3>
        <p className="text-gray-600 mb-6">
          Start saving jobs you're interested in to view them here
        </p>
        <Button>Browse Jobs</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Saved Jobs</h2>
        <span className="text-gray-600">{savedJobs.length} saved</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative"
          >
            <JobCard job={job} />
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => handleRemoveSavedJob(job.id)}
              className="absolute top-4 right-4 text-error-600 hover:text-error-700"
            >
              Remove
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;