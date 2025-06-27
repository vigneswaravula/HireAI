import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, FileText, Edit, Send, CheckCircle, Brain } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { submitApplication } from '../../store/slices/applicationSlice';
import { Job } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface OneClickApplyProps {
  job: Job;
  onClose: () => void;
  onSuccess: () => void;
}

const OneClickApply: React.FC<OneClickApplyProps> = ({ job, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [customCoverLetter, setCustomCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.users);

  const fullUserData = users.find(u => u.id === user?.id) || user;

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const coverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${job.title} position at ${job.company}. With my background in ${fullUserData?.skills?.slice(0, 3).join(', ')} and ${fullUserData?.experience || 'relevant experience'}, I am confident that I would be a valuable addition to your team.

In my current role, I have successfully worked with technologies that align perfectly with your requirements, including ${job.skills.slice(0, 3).join(', ')}. My experience has taught me the importance of ${job.skills.includes('React') ? 'building scalable user interfaces' : job.skills.includes('Python') ? 'developing robust backend systems' : 'delivering high-quality solutions'} and collaborating effectively with cross-functional teams.

What particularly excites me about this opportunity at ${job.company} is the chance to ${job.remote ? 'work in a flexible environment while' : ''} contribute to innovative projects and grow my skills in ${job.skills[job.skills.length - 1]}. I am eager to bring my passion for technology and problem-solving to help drive your team's success.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to ${job.company}'s continued growth. Thank you for considering my application.

Best regards,
${fullUserData?.firstName} ${fullUserData?.lastName}`;

    setGeneratedCoverLetter(coverLetter);
    setCustomCoverLetter(coverLetter);
    setIsGenerating(false);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    dispatch(submitApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      candidateId: user.id,
      candidateName: `${user.firstName} ${user.lastName}`,
      candidateEmail: user.email,
    }));

    setIsSubmitting(false);
    setStep(3);
  };

  const profileCompleteness = () => {
    let score = 0;
    if (fullUserData?.skills?.length) score += 25;
    if (fullUserData?.workExperience?.length) score += 25;
    if (fullUserData?.education?.length) score += 25;
    if (fullUserData?.resumeFileName) score += 25;
    return score;
  };

  const completeness = profileCompleteness();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">One-Click Apply</h2>
                <p className="text-gray-600">{job.title} at {job.company}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Profile Completeness */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Profile Readiness</h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    completeness >= 75 ? 'bg-success-100 text-success-700' :
                    completeness >= 50 ? 'bg-warning-100 text-warning-700' :
                    'bg-error-100 text-error-700'
                  }`}>
                    {completeness}% Complete
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      completeness >= 75 ? 'bg-success-500' :
                      completeness >= 50 ? 'bg-warning-500' :
                      'bg-error-500'
                    }`}
                    style={{ width: `${completeness}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`w-4 h-4 ${fullUserData?.skills?.length ? 'text-success-500' : 'text-gray-300'}`} />
                    <span>Skills Added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`w-4 h-4 ${fullUserData?.workExperience?.length ? 'text-success-500' : 'text-gray-300'}`} />
                    <span>Work Experience</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`w-4 h-4 ${fullUserData?.education?.length ? 'text-success-500' : 'text-gray-300'}`} />
                    <span>Education</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`w-4 h-4 ${fullUserData?.resumeFileName ? 'text-success-500' : 'text-gray-300'}`} />
                    <span>Resume Uploaded</span>
                  </div>
                </div>
              </Card>

              {/* Job Match Analysis */}
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Job Match Analysis</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Skills Match</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }} />
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Experience Level</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary-600 h-2 rounded-full" style={{ width: '92%' }} />
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Match</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-accent-600 h-2 rounded-full" style={{ width: '88%' }} />
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Application Preview */}
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Application Preview</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resume:</span>
                    <span className="text-gray-900">{fullUserData?.resumeFileName || 'Not uploaded'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skills:</span>
                    <span className="text-gray-900">{fullUserData?.skills?.slice(0, 3).join(', ') || 'None added'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="text-gray-900">{fullUserData?.experience || 'Not specified'}</span>
                  </div>
                </div>
              </Card>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={onClose} fullWidth>
                  Cancel
                </Button>
                <Button 
                  onClick={generateCoverLetter} 
                  loading={isGenerating}
                  icon={<Brain className="w-4 h-4" />}
                  fullWidth
                >
                  Generate AI Cover Letter
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-gray-900">AI-Generated Cover Letter</h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <textarea
                  value={customCoverLetter}
                  onChange={(e) => setCustomCoverLetter(e.target.value)}
                  rows={12}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your cover letter will appear here..."
                />
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Edit className="w-4 h-4" />
                <span>You can edit the generated cover letter above before submitting</span>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                  fullWidth
                >
                  Submit Application
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-success-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-6">
                Your application for {job.title} at {job.company} has been successfully submitted.
                You'll receive updates on your application status via email.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="text-sm text-gray-600">
                  <p><strong>Next Steps:</strong></p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Employer will review your application</li>
                    <li>You'll be notified of any status changes</li>
                    <li>Check your dashboard for updates</li>
                  </ul>
                </div>
              </div>
              <Button onClick={() => { onSuccess(); onClose(); }}>
                Done
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OneClickApply;