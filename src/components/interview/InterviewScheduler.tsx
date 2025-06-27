import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MessageSquare, CheckCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface InterviewSchedulerProps {
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  onSchedule: (interviewData: any) => void;
  onClose: () => void;
}

interface InterviewForm {
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  location?: string;
  notes?: string;
}

const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  applicationId,
  candidateName,
  candidateEmail,
  jobTitle,
  onSchedule,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [suggestedSlots, setSuggestedSlots] = useState([
    { date: '2024-01-20', time: '10:00', available: true },
    { date: '2024-01-20', time: '14:00', available: true },
    { date: '2024-01-21', time: '11:00', available: false },
    { date: '2024-01-21', time: '15:00', available: true },
    { date: '2024-01-22', time: '09:00', available: true },
    { date: '2024-01-22', time: '16:00', available: true },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InterviewForm>({
    defaultValues: {
      duration: 60,
      type: 'video',
    },
  });

  const selectedType = watch('type');

  const onSubmit = async (data: InterviewForm) => {
    const interviewData = {
      applicationId,
      candidateName,
      candidateEmail,
      jobTitle,
      ...data,
      scheduledAt: new Date().toISOString(),
      status: 'scheduled',
      meetingLink: data.type === 'video' ? `https://meet.google.com/abc-defg-hij` : undefined,
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    onSchedule(interviewData);
    setStep(3);
  };

  const selectTimeSlot = (date: string, time: string) => {
    setValue('date', date);
    setValue('time', time);
    setStep(2);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Schedule Interview</h2>
              <p className="text-gray-600">
                {candidateName} • {jobTitle}
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= stepNum
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-colors ${
                      step > stepNum ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI-Suggested Time Slots
              </h3>
              <p className="text-gray-600 mb-6">
                Based on your calendar and optimal interview times
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedSlots.map((slot, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: slot.available ? 1.02 : 1 }}
                    whileTap={{ scale: slot.available ? 0.98 : 1 }}
                    onClick={() => slot.available && selectTimeSlot(slot.date, slot.time)}
                    disabled={!slot.available}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      slot.available
                        ? 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer'
                        : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {new Date(slot.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-sm text-gray-600">{slot.time}</div>
                      </div>
                    </div>
                    {!slot.available && (
                      <div className="text-xs text-error-600 mt-2">Unavailable</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Selected Time</h3>
                <div className="flex items-center space-x-2 text-primary-700">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {watch('date') && new Date(watch('date')).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })} at {watch('time')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    {...register('duration', { required: true })}
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    {...register('type', { required: true })}
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>
              </div>

              {selectedType === 'in-person' && (
                <Input
                  label="Location"
                  placeholder="Office address or meeting location"
                  {...register('location', { required: selectedType === 'in-person' })}
                  error={errors.location?.message}
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Any specific topics to cover or preparation instructions..."
                  {...register('notes')}
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  Schedule Interview
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-success-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Interview Scheduled!
              </h3>
              <p className="text-gray-600 mb-6">
                Calendar invites have been sent to both parties. The candidate will receive
                an email with interview details and preparation materials.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Date:</strong> {watch('date') && new Date(watch('date')).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {watch('time')}</p>
                  <p><strong>Duration:</strong> {watch('duration')} minutes</p>
                  <p><strong>Type:</strong> {selectedType}</p>
                  {selectedType === 'video' && (
                    <p><strong>Meeting Link:</strong> https://meet.google.com/abc-defg-hij</p>
                  )}
                </div>
              </div>
              <Button onClick={handleCloseModal}>
                Done
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewScheduler;