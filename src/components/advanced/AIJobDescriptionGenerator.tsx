import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Brain, 
  Zap, 
  Edit, 
  Copy, 
  Download, 
  Check, 
  X, 
  Lightbulb, 
  Target, 
  Users, 
  DollarSign,
  MapPin,
  Clock,
  Star,
  Award,
  Layers,
  Sliders,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AIJobDescriptionGeneratorProps {
  onGenerate: (jobDescription: string) => void;
}

interface FormData {
  jobTitle: string;
  company: string;
  location: string;
  remote: boolean;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  department: string;
  keyResponsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  companyDescription: string;
  tone: 'professional' | 'casual' | 'enthusiastic' | 'formal';
  length: 'concise' | 'standard' | 'detailed';
}

const AIJobDescriptionGenerator: React.FC<AIJobDescriptionGeneratorProps> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    company: '',
    location: '',
    remote: false,
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: '',
    keyResponsibilities: [''],
    requiredSkills: [''],
    preferredSkills: [''],
    salaryRange: {
      min: 0,
      max: 0,
      currency: 'USD',
    },
    benefits: [''],
    companyDescription: '',
    tone: 'professional',
    length: 'standard',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState<{
    type: string;
    suggestions: string[];
  } | null>(null);
  const [showAITips, setShowAITips] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    updateCompletionPercentage();
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof FormData],
        [field]: value,
      },
    }));
    updateCompletionPercentage();
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field as keyof FormData] as string[])];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray,
      };
    });
    updateCompletionPercentage();
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof FormData] as string[]), ''],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const newArray = [...(prev[field as keyof FormData] as string[])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const updateCompletionPercentage = () => {
    let filledFields = 0;
    let totalFields = 0;

    // Basic fields
    const basicFields = ['jobTitle', 'company', 'location', 'department'];
    totalFields += basicFields.length;
    filledFields += basicFields.filter(field => formData[field as keyof FormData] !== '').length;

    // Array fields
    const arrayFields = ['keyResponsibilities', 'requiredSkills', 'preferredSkills', 'benefits'];
    arrayFields.forEach(field => {
      const array = formData[field as keyof FormData] as string[];
      totalFields += 1; // Count the field itself
      if (array.some(item => item !== '')) {
        filledFields += 1;
      }
    });

    // Salary range
    totalFields += 1;
    if (formData.salaryRange.min > 0 && formData.salaryRange.max > 0) {
      filledFields += 1;
    }

    // Company description
    totalFields += 1;
    if (formData.companyDescription !== '') {
      filledFields += 1;
    }

    const percentage = Math.round((filledFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  };

  const generateAISuggestions = (type: string) => {
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      let suggestions: string[] = [];

      switch (type) {
        case 'responsibilities':
          suggestions = [
            "Design and implement new features and functionality using React and TypeScript",
            "Collaborate with backend developers to integrate RESTful APIs and optimize data flow",
            "Write clean, maintainable, and efficient code following best practices and coding standards",
            "Participate in code reviews and provide constructive feedback to other developers",
            "Troubleshoot and debug issues in existing applications",
            "Optimize applications for maximum speed and scalability",
            "Stay up-to-date with emerging trends and technologies in frontend development"
          ];
          break;
        case 'requiredSkills':
          suggestions = [
            "Proficient in JavaScript, TypeScript, and modern ES6+ features",
            "3+ years of experience with React and its ecosystem (Redux, React Router, etc.)",
            "Strong understanding of responsive design and cross-browser compatibility",
            "Experience with RESTful APIs and GraphQL",
            "Familiarity with version control systems (Git) and CI/CD pipelines",
            "Excellent problem-solving skills and attention to detail",
            "Strong communication and collaboration abilities"
          ];
          break;
        case 'preferredSkills':
          suggestions = [
            "Experience with Next.js or similar React frameworks",
            "Knowledge of testing frameworks (Jest, React Testing Library)",
            "Understanding of server-side rendering and static site generation",
            "Experience with CSS preprocessors (SASS, LESS) and CSS-in-JS libraries",
            "Familiarity with containerization technologies (Docker, Kubernetes)",
            "Experience with cloud platforms (AWS, Azure, GCP)",
            "Contributions to open-source projects"
          ];
          break;
        case 'benefits':
          suggestions = [
            "Competitive salary and equity package",
            "Comprehensive health, dental, and vision insurance",
            "Flexible work hours and remote work options",
            "Generous paid time off and parental leave",
            "401(k) matching program",
            "Professional development budget for conferences and courses",
            "Modern equipment and home office stipend",
            "Regular team events and activities"
          ];
          break;
        case 'companyDescription':
          suggestions = [
            `${formData.company} is a leading technology company revolutionizing the way businesses operate in the digital age. Our innovative platform combines cutting-edge AI with intuitive design to solve complex problems for our global client base. Founded in 2018, we've grown rapidly while maintaining our commitment to excellence and our collaborative culture.`,
            `At ${formData.company}, we're passionate about creating technology that makes a difference. Our team of talented professionals works together to build solutions that transform industries and improve lives. We value creativity, integrity, and continuous learning in our mission to push the boundaries of what's possible.`,
            `${formData.company} is an award-winning tech startup dedicated to developing next-generation software solutions. With offices in major tech hubs and a diverse team of experts, we combine technical excellence with user-centered design to create products that delight our customers and drive business growth.`
          ];
          break;
      }

      setAiSuggestions({
        type,
        suggestions,
      });
      setIsGenerating(false);
    }, 1500);
  };

  const applySuggestion = (suggestion: string, type: string, index?: number) => {
    if (type === 'companyDescription') {
      handleInputChange('companyDescription', suggestion);
    } else if (index !== undefined) {
      handleArrayInputChange(type, index, suggestion);
    } else if (type === 'responsibilities' || type === 'requiredSkills' || type === 'preferredSkills' || type === 'benefits') {
      // Replace the first empty item or add to the end
      const array = formData[type as keyof FormData] as string[];
      const emptyIndex = array.findIndex(item => item === '');
      
      if (emptyIndex !== -1) {
        handleArrayInputChange(type, emptyIndex, suggestion);
      } else {
        setFormData(prev => ({
          ...prev,
          [type]: [...array, suggestion],
        }));
      }
    }
    
    // Clear suggestions after applying one
    setAiSuggestions(null);
  };

  const generateJobDescription = () => {
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const description = `
# ${formData.jobTitle}

## About ${formData.company}
${formData.companyDescription}

## Position Overview
We are seeking a talented ${formData.jobTitle} to join our ${formData.department} team${formData.remote ? ' in a remote capacity' : ` in ${formData.location}`}. This is a ${formData.jobType} position ideal for a ${
        formData.experienceLevel === 'entry' ? 'motivated individual starting their career' :
        formData.experienceLevel === 'mid' ? 'professional with established experience' :
        formData.experienceLevel === 'senior' ? 'seasoned professional with extensive expertise' :
        formData.experienceLevel === 'lead' ? 'leader who can guide teams and initiatives' :
        'strategic executive with proven leadership capabilities'
      }.

## Key Responsibilities
${formData.keyResponsibilities.filter(r => r).map(responsibility => `- ${responsibility}`).join('\n')}

## Required Skills & Qualifications
${formData.requiredSkills.filter(s => s).map(skill => `- ${skill}`).join('\n')}

## Preferred Skills & Qualifications
${formData.preferredSkills.filter(s => s).map(skill => `- ${skill}`).join('\n')}

## Compensation & Benefits
We offer a competitive salary range of ${formData.salaryRange.currency} ${formData.salaryRange.min.toLocaleString()} - ${formData.salaryRange.max.toLocaleString()} per year, along with the following benefits:

${formData.benefits.filter(b => b).map(benefit => `- ${benefit}`).join('\n')}

## How to Apply
Please submit your resume and a brief cover letter explaining why you're interested in this position and how your experience aligns with our requirements. We look forward to hearing from you!

${formData.company} is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
      `;

      setGeneratedDescription(description);
      setIsGenerating(false);
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDescription], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${formData.jobTitle.replace(/\s+/g, '_')}_Job_Description.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: Briefcase },
    { id: 'details', label: 'Job Details', icon: Layers },
    { id: 'skills', label: 'Skills & Requirements', icon: Target },
    { id: 'compensation', label: 'Compensation', icon: DollarSign },
    { id: 'company', label: 'Company Info', icon: Users },
    { id: 'formatting', label: 'Formatting', icon: Sliders },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Job Description Generator</h2>
            <p className="text-gray-600">Create compelling job descriptions in minutes</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${completionPercentage >= 70 ? 'bg-success-500' : completionPercentage >= 40 ? 'bg-warning-500' : 'bg-error-500'}`}></div>
            <span className="text-sm font-medium">{completionPercentage}% Complete</span>
          </div>
        </div>
      </div>

      {showAITips && (
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">AI Writing Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Be specific about required skills and experience to attract qualified candidates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Highlight your company culture and values to attract candidates who align with your mission</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Include salary range to increase application rates by up to 30%</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5" />
                  <span>Avoid gender-coded language that might discourage diverse candidates</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => setShowAITips(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                      activeSection === section.id
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            {activeSection === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Job Title"
                    placeholder="e.g., Senior Frontend Developer"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    required
                  />
                  <Input
                    label="Company Name"
                    placeholder="e.g., TechCorp Inc."
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                  />
                  <Input
                    label="Location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                  <Input
                    label="Department"
                    placeholder="e.g., Engineering, Design, Marketing"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remote"
                    checked={formData.remote}
                    onChange={(e) => handleInputChange('remote', e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="remote" className="text-sm text-gray-700">
                    This is a remote position
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type
                    </label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => handleInputChange('jobType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior Level (5+ years)</option>
                      <option value="lead">Lead/Principal (8+ years)</option>
                      <option value="executive">Executive (10+ years)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Job Details */}
            {activeSection === 'details' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Key Responsibilities
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generateAISuggestions('responsibilities')}
                      icon={<Zap className="w-4 h-4" />}
                    >
                      Generate with AI
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.keyResponsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Responsibility #${index + 1}`}
                          value={responsibility}
                          onChange={(e) => handleArrayInputChange('keyResponsibilities', index, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem('keyResponsibilities', index)}
                          icon={<Trash2 className="w-4 h-4" />}
                          disabled={formData.keyResponsibilities.length <= 1}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('keyResponsibilities')}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add Responsibility
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Skills & Requirements */}
            {activeSection === 'skills' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Required Skills & Qualifications
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generateAISuggestions('requiredSkills')}
                      icon={<Zap className="w-4 h-4" />}
                    >
                      Generate with AI
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.requiredSkills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Required Skill #${index + 1}`}
                          value={skill}
                          onChange={(e) => handleArrayInputChange('requiredSkills', index, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem('requiredSkills', index)}
                          icon={<Trash2 className="w-4 h-4" />}
                          disabled={formData.requiredSkills.length <= 1}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('requiredSkills')}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add Required Skill
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Skills & Qualifications (Optional)
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generateAISuggestions('preferredSkills')}
                      icon={<Zap className="w-4 h-4" />}
                    >
                      Generate with AI
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.preferredSkills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Preferred Skill #${index + 1}`}
                          value={skill}
                          onChange={(e) => handleArrayInputChange('preferredSkills', index, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem('preferredSkills', index)}
                          icon={<Trash2 className="w-4 h-4" />}
                          disabled={formData.preferredSkills.length <= 1}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('preferredSkills')}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add Preferred Skill
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Compensation */}
            {activeSection === 'compensation' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Currency</label>
                      <select
                        value={formData.salaryRange.currency}
                        onChange={(e) => handleNestedInputChange('salaryRange', 'currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                        <option value="AUD">AUD (A$)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                      <Input
                        type="number"
                        placeholder="e.g., 50000"
                        value={formData.salaryRange.min || ''}
                        onChange={(e) => handleNestedInputChange('salaryRange', 'min', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                      <Input
                        type="number"
                        placeholder="e.g., 80000"
                        value={formData.salaryRange.max || ''}
                        onChange={(e) => handleNestedInputChange('salaryRange', 'max', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Benefits & Perks
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generateAISuggestions('benefits')}
                      icon={<Zap className="w-4 h-4" />}
                    >
                      Generate with AI
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Benefit #${index + 1}`}
                          value={benefit}
                          onChange={(e) => handleArrayInputChange('benefits', index, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem('benefits', index)}
                          icon={<Trash2 className="w-4 h-4" />}
                          disabled={formData.benefits.length <= 1}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('benefits')}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add Benefit
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Company Info */}
            {activeSection === 'company' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Company Description
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generateAISuggestions('companyDescription')}
                      icon={<Zap className="w-4 h-4" />}
                    >
                      Generate with AI
                    </Button>
                  </div>
                  <textarea
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe your company, culture, mission, and values..."
                    value={formData.companyDescription}
                    onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Formatting */}
            {activeSection === 'formatting' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'professional', label: 'Professional', icon: Briefcase },
                      { value: 'casual', label: 'Casual', icon: Users },
                      { value: 'enthusiastic', label: 'Enthusiastic', icon: Sparkles },
                      { value: 'formal', label: 'Formal', icon: Award },
                    ].map((tone) => (
                      <button
                        key={tone.value}
                        type="button"
                        onClick={() => handleInputChange('tone', tone.value)}
                        className={`p-3 border-2 rounded-lg text-center transition-colors ${
                          formData.tone === tone.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <tone.icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">{tone.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'concise', label: 'Concise', description: '~250 words' },
                      { value: 'standard', label: 'Standard', description: '~500 words' },
                      { value: 'detailed', label: 'Detailed', description: '~750 words' },
                    ].map((length) => (
                      <button
                        key={length.value}
                        type="button"
                        onClick={() => handleInputChange('length', length.value)}
                        className={`p-3 border-2 rounded-lg text-center transition-colors ${
                          formData.length === length.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <span className="text-sm font-medium">{length.label}</span>
                        <p className="text-xs text-gray-500 mt-1">{length.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  icon={showAdvancedOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                >
                  {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </Button>
                <Button
                  onClick={generateJobDescription}
                  loading={isGenerating}
                  icon={<Brain className="w-4 h-4" />}
                  disabled={!formData.jobTitle || !formData.company}
                >
                  Generate Job Description
                </Button>
              </div>

              {showAdvancedOptions && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Advanced Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Include Diversity Statement
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Include Application Instructions
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Optimization
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Format
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="markdown">Markdown</option>
                        <option value="html">HTML</option>
                        <option value="plain">Plain Text</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* AI Suggestions & Preview */}
        <div className="lg:col-span-1">
          {aiSuggestions && (
            <Card className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">AI Suggestions</h3>
              </div>
              <div className="space-y-3">
                {aiSuggestions.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-primary-50 border border-primary-100 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">{suggestion}</p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => applySuggestion(suggestion, aiSuggestions.type)}
                        icon={<Check className="w-3 h-3" />}
                      >
                        Use This
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => {
                          const newSuggestions = [...aiSuggestions.suggestions];
                          newSuggestions.splice(index, 1);
                          if (newSuggestions.length === 0) {
                            setAiSuggestions(null);
                          } else {
                            setAiSuggestions({
                              ...aiSuggestions,
                              suggestions: newSuggestions,
                            });
                          }
                        }}
                        icon={<X className="w-3 h-3" />}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {generatedDescription ? (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Generated Job Description</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyToClipboard}
                    icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={downloadAsText}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg max-h-[600px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{generatedDescription}</pre>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => {
                    onGenerate(generatedDescription);
                    alert('Job description saved and ready to post!');
                  }}
                  fullWidth
                >
                  Use This Description
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Job Description Preview</h3>
                <p className="text-gray-600 mb-6">
                  Fill in the form and click "Generate Job Description" to see the AI-generated result here
                </p>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Pre-fill with sample data
                      setFormData({
                        jobTitle: 'Senior Frontend Developer',
                        company: 'TechCorp Inc.',
                        location: 'San Francisco, CA',
                        remote: true,
                        jobType: 'full-time',
                        experienceLevel: 'senior',
                        department: 'Engineering',
                        keyResponsibilities: [
                          'Design and implement new features using React and TypeScript',
                          'Collaborate with backend developers to integrate APIs',
                          'Mentor junior developers and conduct code reviews',
                          'Optimize application performance and user experience'
                        ],
                        requiredSkills: [
                          'Proficient in JavaScript, TypeScript, and React',
                          '5+ years of frontend development experience',
                          'Experience with state management (Redux, Context API)',
                          'Strong understanding of web performance optimization'
                        ],
                        preferredSkills: [
                          'Experience with Next.js or similar frameworks',
                          'Knowledge of GraphQL and Apollo Client',
                          'Experience with testing frameworks (Jest, Cypress)'
                        ],
                        salaryRange: {
                          min: 120000,
                          max: 180000,
                          currency: 'USD',
                        },
                        benefits: [
                          'Competitive salary and equity package',
                          'Comprehensive health, dental, and vision insurance',
                          'Flexible work hours and remote work options',
                          'Professional development budget'
                        ],
                        companyDescription: 'TechCorp Inc. is a leading technology company building innovative solutions for enterprise clients. Our mission is to transform how businesses operate through cutting-edge software.',
                        tone: 'professional',
                        length: 'standard',
                      });
                      updateCompletionPercentage();
                    }}
                  >
                    Use Sample Data
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIJobDescriptionGenerator;