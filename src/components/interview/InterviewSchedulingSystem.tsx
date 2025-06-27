import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  User, 
  Check, 
  X, 
  Plus,
  Edit,
  Trash2,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface InterviewSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  location?: string;
  available: boolean;
}

interface InterviewRequest {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  slots: InterviewSlot[];
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'rescheduled';
  createdAt: string;
}

interface InterviewSchedulingSystemProps {
  userRole: 'employer' | 'candidate';
  userId: string;
}

interface ScheduleForm {
  candidateId: string;
  jobTitle: string;
  message: string;
  slots: {
    date: string;
    time: string;
    duration: number;
    type: 'video' | 'phone' | 'in-person';
    location?: string;
  }[];
}

const InterviewSchedulingSystem: React.FC<InterviewSchedulingSystemProps> = ({ userRole, userId }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'requests' | 'upcoming'>('upcoming');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<InterviewRequest | null>(null);
  const [availabilityPreferences, setAvailabilityPreferences] = useState({
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    preferredTimes: ['morning', 'afternoon'],
    timeZone: 'PST',
  });

  const { register, handleSubmit, watch, setValue, reset } = useForm<ScheduleForm>();

  // Mock data
  const [interviewRequests, setInterviewRequests] = useState<InterviewRequest[]>([
    {
      id: '1',
      candidateId: 'candidate1',
      candidateName: 'John Smith',
      candidateEmail: 'john.smith@email.com',
      jobTitle: 'Senior Frontend Developer',
      slots: [
        {
          id: 'slot1',
          date: '2024-01-25',
          time: '10:00',
          duration: 60,
          type: 'video',
          available: true,
        },
        {
          id: 'slot2',
          date: '2024-01-25',
          time: '14:00',
          duration: 60,
          type: 'video',
          available: true,
        },
        {
          id: 'slot3',
          date: '2024-01-26',
          time: '11:00',
          duration: 60,
          type: 'video',
          available: true,
        },
      ],
      message: 'Looking forward to discussing the role and learning more about your experience.',
      status: 'pending',
      createdAt: '2024-01-20T10:00:00Z',
    },
  ]);

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: '1',
      candidateName: 'Alice Johnson',
      jobTitle: 'UX Designer',
      date: '2024-01-24',
      time: '15:00',
      type: 'video',
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: '2',
      candidateName: 'Mike Wilson',
      jobTitle: 'Backend Developer',
      date: '2024-01-25',
      time: '10:30',
      type: 'in-person',
      location: '123 Tech Street, San Francisco',
      status: 'confirmed',
    },
  ]);

  const onSubmit = (data: ScheduleForm) => {
    const newRequest: InterviewRequest = {
      id: Date.now().toString(),
      candidateId: data.candidateId,
      candidateName: 'Selected Candidate', // In real app, fetch from candidate ID
      candidateEmail: 'candidate@email.com',
      jobTitle: data.jobTitle,
      slots: data.slots.map((slot, index) => ({
        id: `slot-${Date.now()}-${index}`,
        ...slot,
        available: true,
      })),
      message: data.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setInterviewRequests(prev => [...prev, newRequest]);
    setShowScheduleForm(false);
    reset();
  };

  const handleSlotResponse = (requestId: string, slotId: string, action: 'accept' | 'reject') => {
    if (action === 'accept') {
      // Move to upcoming interviews
      const request = interviewRequests.find(r => r.id === requestId);
      const slot = request?.slots.find(s => s.id === slotId);
      
      if (request && slot) {
        const newInterview = {
          id: Date.now().toString(),
          candidateName: request.candidateName,
          jobTitle: request.jobTitle,
          date: slot.date,
          time: slot.time,
          type: slot.type,
          location: slot.location,
          status: 'confirmed' as const,
          meetingLink: slot.type === 'video' ? 'https://meet.google.com/generated-link' : undefined,
        };
        
        setUpcomingInterviews(prev => [...prev, newInterview]);
        setInterviewRequests(prev => prev.filter(r => r.id !== requestId));
      }
    } else {
      // Remove the request
      setInterviewRequests(prev => prev.filter(r => r.id !== requestId));
    }
  };

  const addTimeSlot = () => {
    const currentSlots = watch('slots') || [];
    setValue('slots', [
      ...currentSlots,
      {
        date: '',
        time: '',
        duration: 60,
        type: 'video',
      }
    ]);
  };

  const removeTimeSlot = (index: number) => {
    const currentSlots = watch('slots') || [];
    setValue('slots', currentSlots.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'upcoming', label: 'Upcoming Interviews', icon: Calendar },
          { id: 'requests', label: userRole === 'employer' ? 'Sent Requests' : 'Interview Requests', icon: Clock },
          ...(userRole === 'employer' ? [{ id: 'schedule', label: 'Schedule Interview', icon: Plus }] : []),
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Upcoming Interviews */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
            {userRole === 'candidate' && (
              <Button
                variant="outline"
                size="sm"
                icon={<Edit className="w-4 h-4" />}
                onClick={() => {/* Open availability preferences */}}
              >
                Set Availability
              </Button>
            )}
          </div>

          {upcomingInterviews.length > 0 ? (
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <Card key={interview.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{interview.jobTitle}</h4>
                        <p className="text-gray-600">{interview.candidateName}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(interview.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{interview.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {interview.type === 'video' ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            <span className="capitalize">{interview.type}</span>
                          </div>
                        </div>
                        {interview.location && (
                          <p className="text-sm text-gray-600 mt-1">{interview.location}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
                        {interview.status}
                      </span>
                      {interview.meetingLink && (
                        <Button size="sm" onClick={() => window.open(interview.meetingLink, '_blank')}>
                          Join Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming interviews</h3>
              <p className="text-gray-600">
                {userRole === 'employer' 
                  ? 'Schedule interviews with candidates to see them here'
                  : 'Interview invitations will appear here'
                }
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Interview Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {userRole === 'employer' ? 'Sent Interview Requests' : 'Interview Requests'}
          </h3>

          {interviewRequests.length > 0 ? (
            <div className="space-y-4">
              {interviewRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{request.jobTitle}</h4>
                        <p className="text-gray-600">{request.candidateName}</p>
                        <p className="text-sm text-gray-500">
                          Sent {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'pending' ? 'bg-warning-100 text-warning-700' :
                        request.status === 'accepted' ? 'bg-success-100 text-success-700' :
                        'bg-error-100 text-error-700'
                      }`}>
                        {request.status}
                      </span>
                    </div>

                    {request.message && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{request.message}</p>
                      </div>
                    )}

                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Available Time Slots</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {request.slots.map((slot) => (
                          <div
                            key={slot.id}
                            className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium text-gray-900">
                                {new Date(slot.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-gray-600">
                                {slot.type === 'video' ? (
                                  <Video className="w-3 h-3" />
                                ) : (
                                  <MapPin className="w-3 h-3" />
                                )}
                                <span>{slot.type}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                              {slot.time} ({slot.duration} min)
                            </div>
                            {userRole === 'candidate' && request.status === 'pending' && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSlotResponse(request.id, slot.id, 'accept')}
                                  icon={<Check className="w-3 h-3" />}
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSlotResponse(request.id, slot.id, 'reject')}
                                  icon={<X className="w-3 h-3" />}
                                >
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interview requests</h3>
              <p className="text-gray-600">
                {userRole === 'employer' 
                  ? 'Interview requests you send will appear here'
                  : 'Interview invitations from employers will appear here'
                }
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Schedule Interview (Employer Only) */}
      {activeTab === 'schedule' && userRole === 'employer' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Schedule New Interview</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Candidate ID"
                placeholder="Enter candidate ID"
                {...register('candidateId', { required: true })}
              />
              <Input
                label="Job Title"
                placeholder="Enter job title"
                {...register('jobTitle', { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Candidate
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add a personal message..."
                {...register('message')}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Available Time Slots
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTimeSlot}
                  icon={<Plus className="w-4 h-4" />}
                >
                  Add Slot
                </Button>
              </div>

              <div className="space-y-4">
                {(watch('slots') || []).map((_, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-medium text-gray-900">Time Slot {index + 1}</h5>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimeSlot(index)}
                        icon={<Trash2 className="w-4 h-4" />}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Input
                        label="Date"
                        type="date"
                        {...register(`slots.${index}.date`, { required: true })}
                      />
                      <Input
                        label="Time"
                        type="time"
                        {...register(`slots.${index}.time`, { required: true })}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (minutes)
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          {...register(`slots.${index}.duration`, { required: true })}
                        >
                          <option value={30}>30 minutes</option>
                          <option value={45}>45 minutes</option>
                          <option value={60}>60 minutes</option>
                          <option value={90}>90 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          {...register(`slots.${index}.type`, { required: true })}
                        >
                          <option value="video">Video Call</option>
                          <option value="phone">Phone Call</option>
                          <option value="in-person">In-Person</option>
                        </select>
                      </div>
                    </div>

                    {watch(`slots.${index}.type`) === 'in-person' && (
                      <div className="mt-4">
                        <Input
                          label="Location"
                          placeholder="Enter meeting location"
                          {...register(`slots.${index}.location`)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" icon={<Send className="w-4 h-4" />}>
                Send Interview Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowScheduleForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Availability Preferences (Candidate) */}
      {userRole === 'candidate' && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Availability Preferences</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Days
              </label>
              <div className="flex flex-wrap gap-2">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={availabilityPreferences.preferredDays.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAvailabilityPreferences(prev => ({
                            ...prev,
                            preferredDays: [...prev.preferredDays, day]
                          }));
                        } else {
                          setAvailabilityPreferences(prev => ({
                            ...prev,
                            preferredDays: prev.preferredDays.filter(d => d !== day)
                          }));
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Times
              </label>
              <div className="flex space-x-4">
                {['morning', 'afternoon', 'evening'].map((time) => (
                  <label key={time} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={availabilityPreferences.preferredTimes.includes(time)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAvailabilityPreferences(prev => ({
                            ...prev,
                            preferredTimes: [...prev.preferredTimes, time]
                          }));
                        } else {
                          setAvailabilityPreferences(prev => ({
                            ...prev,
                            preferredTimes: prev.preferredTimes.filter(t => t !== time)
                          }));
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button size="sm" icon={<CheckCircle className="w-4 h-4" />}>
              Save Preferences
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default InterviewSchedulingSystem;