import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, Download, Eye } from 'lucide-react';
import { User, SkillOption, ParsedResumeData } from '../../types';
import { skillsOptions } from '../../data/skillsData';
import { parseResumeFile } from '../../utils/resumeParser';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import MultiSelect from '../ui/MultiSelect';
import FileUpload from '../ui/FileUpload';

interface ProfileFormProps {
  user: User;
  onSave: (data: Partial<User>) => void;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  skills: SkillOption[];
  experience: string;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    current: boolean;
  }>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      skills: user.skills?.map(skill => ({ value: skill, label: skill })) || [],
      experience: user.experience || '',
      workExperience: user.workExperience || [],
      education: user.education || [],
    },
  });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: 'workExperience',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const selectedSkills = watch('skills');

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setUploadLoading(true);
    setUploadError('');
    setUploadSuccess(false);

    try {
      const parsedData = await parseResumeFile(file);
      
      // Auto-fill form with parsed data
      if (parsedData.name) {
        const nameParts = parsedData.name.split(' ');
        setValue('firstName', nameParts[0] || '');
        setValue('lastName', nameParts.slice(1).join(' ') || '');
      }
      
      if (parsedData.email) setValue('email', parsedData.email);
      if (parsedData.phone) setValue('phone', parsedData.phone);
      if (parsedData.summary) setValue('bio', parsedData.summary);
      
      if (parsedData.skills && parsedData.skills.length > 0) {
        const skillOptions = parsedData.skills.map(skill => ({ value: skill, label: skill }));
        setValue('skills', skillOptions);
      }
      
      if (parsedData.workExperience && parsedData.workExperience.length > 0) {
        setValue('workExperience', parsedData.workExperience);
      }
      
      if (parsedData.education && parsedData.education.length > 0) {
        setValue('education', parsedData.education);
      }

      setUploadSuccess(true);
      alert('Resume parsed successfully! Please review and edit the auto-filled information.');
    } catch (error) {
      setUploadError('Failed to parse resume. Please try again.');
      console.error('Resume parsing error:', error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setUploadError('');
  };

  const onSubmit = async (data: ProfileFormData) => {
    const updatedUser: Partial<User> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      bio: data.bio,
      skills: data.skills.map(skill => skill.value),
      experience: data.experience,
      workExperience: data.workExperience,
      education: data.education,
    };

    if (selectedFile) {
      updatedUser.resumeFileName = selectedFile.name;
      updatedUser.resumeUrl = URL.createObjectURL(selectedFile);
    }

    onSave(updatedUser);
  };

  return (
    <div className="space-y-8">
      {/* Resume Upload Section */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Upload & Parsing</h3>
        <div className="space-y-4">
          <FileUpload
            label="Upload Resume (PDF, DOC, DOCX)"
            accept=".pdf,.doc,.docx"
            maxSize={5}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            selectedFile={selectedFile}
            loading={uploadLoading}
            success={uploadSuccess}
            error={uploadError}
          />
          
          {user.resumeFileName && !selectedFile && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded">
                  <Eye className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Current Resume</p>
                  <p className="text-xs text-gray-500">{user.resumeFileName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
                  View
                </Button>
                <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                  Download
                </Button>
              </div>
            </div>
          )}
          
          {uploadLoading && (
            <div className="text-center py-4">
              <div className="inline-flex items-center space-x-2 text-primary-600">
                <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Parsing resume...</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              error={errors.firstName?.message}
              {...register('firstName', { required: 'First name is required' })}
            />
            <Input
              label="Last Name"
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Last name is required' })}
            />
            <Input
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              label="Phone"
              type="tel"
              {...register('phone')}
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Write a brief summary of your professional background and career goals..."
              {...register('bio')}
            />
          </div>
        </Card>

        {/* Skills */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills & Expertise</h3>
          <div className="space-y-4">
            <MultiSelect
              label="Technical Skills"
              value={selectedSkills}
              onChange={(skills) => setValue('skills', skills)}
              options={skillsOptions}
              placeholder="Search and select your skills..."
              isCreatable={true}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                {...register('experience')}
              >
                <option value="">Select experience level</option>
                <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                <option value="Senior Level (5+ years)">Senior Level (5+ years)</option>
                <option value="Lead/Principal (8+ years)">Lead/Principal (8+ years)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Work Experience */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => appendWork({
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              })}
            >
              Add Experience
            </Button>
          </div>
          
          <div className="space-y-6">
            {workFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => removeWork(index)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    {...register(`workExperience.${index}.company`, { required: 'Company is required' })}
                  />
                  <Input
                    label="Position"
                    {...register(`workExperience.${index}.position`, { required: 'Position is required' })}
                  />
                  <Input
                    label="Start Date"
                    type="month"
                    {...register(`workExperience.${index}.startDate`)}
                  />
                  <Input
                    label="End Date"
                    type="month"
                    disabled={watch(`workExperience.${index}.current`)}
                    {...register(`workExperience.${index}.endDate`)}
                  />
                </div>
                
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      {...register(`workExperience.${index}.current`)}
                    />
                    <span className="ml-2 text-sm text-gray-700">I currently work here</span>
                  </label>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe your responsibilities and achievements..."
                    {...register(`workExperience.${index}.description`)}
                  />
                </div>
              </motion.div>
            ))}
            
            {workFields.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No work experience added yet.</p>
                <p className="text-sm">Click "Add Experience" to get started.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Education */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Education</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => appendEducation({
                institution: '',
                degree: '',
                fieldOfStudy: '',
                startYear: '',
                endYear: '',
                current: false,
              })}
            >
              Add Education
            </Button>
          </div>
          
          <div className="space-y-6">
            {educationFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => removeEducation(index)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Institution"
                    {...register(`education.${index}.institution`, { required: 'Institution is required' })}
                  />
                  <Input
                    label="Degree"
                    {...register(`education.${index}.degree`, { required: 'Degree is required' })}
                  />
                  <Input
                    label="Field of Study"
                    {...register(`education.${index}.fieldOfStudy`)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Start Year"
                      type="number"
                      min="1950"
                      max="2030"
                      {...register(`education.${index}.startYear`)}
                    />
                    <Input
                      label="End Year"
                      type="number"
                      min="1950"
                      max="2030"
                      disabled={watch(`education.${index}.current`)}
                      {...register(`education.${index}.endYear`)}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      {...register(`education.${index}.current`)}
                    />
                    <span className="ml-2 text-sm text-gray-700">Currently studying here</span>
                  </label>
                </div>
              </motion.div>
            ))}
            
            {educationFields.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No education added yet.</p>
                <p className="text-sm">Click "Add Education" to get started.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" loading={isSubmitting} size="lg">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;