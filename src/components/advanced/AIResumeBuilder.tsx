import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  Upload, 
  Download, 
  Edit, 
  Copy, 
  Check, 
  Zap, 
  Eye, 
  EyeOff, 
  Trash2, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Save, 
  Image, 
  Layout, 
  Palette, 
  Sliders, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User as UserType } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AIResumeBuilderProps {
  user: UserType;
  onSave: (data: Partial<UserType>) => void;
}

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface ResumeSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list' | 'experience' | 'education' | 'skills';
  items?: any[];
}

const AIResumeBuilder: React.FC<AIResumeBuilderProps> = ({ user, onSave }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([
    {
      id: 'summary',
      title: 'Professional Summary',
      content: user.bio || 'Experienced professional with a strong background in...',
      type: 'text',
    },
    {
      id: 'experience',
      title: 'Work Experience',
      content: '',
      type: 'experience',
      items: user.workExperience || [],
    },
    {
      id: 'education',
      title: 'Education',
      content: '',
      type: 'education',
      items: user.education || [],
    },
    {
      id: 'skills',
      title: 'Skills',
      content: '',
      type: 'skills',
      items: user.skills || [],
    },
  ]);
  const [resumeColor, setResumeColor] = useState('#3b82f6');
  const [resumeFont, setResumeFont] = useState('Inter');
  const [showAITips, setShowAITips] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState<{section: string, content: string} | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const resumeRef = useRef<HTMLDivElement>(null);

  const templates: ResumeTemplate[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional design with a sidebar',
      preview: 'modern-preview.jpg',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional format with a timeless appeal',
      preview: 'classic-preview.jpg',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design to help you stand out',
      preview: 'creative-preview.jpg',
    },
  ];

  const generateAIContent = (sectionId: string) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let generatedContent = '';
      
      switch (sectionId) {
        case 'summary':
          generatedContent = `Experienced ${user.skills?.[0] || 'software'} professional with ${user.experience || '5+ years'} of expertise in developing scalable applications. Passionate about creating efficient solutions and collaborating with cross-functional teams to deliver high-quality products. Proven track record of improving performance and user experience through innovative approaches and attention to detail.`;
          break;
        case 'experience':
          // This would be handled differently since it's a complex section
          alert('AI suggestions for work experience would be shown here');
          setIsGenerating(false);
          return;
        case 'education':
          // This would be handled differently since it's a complex section
          alert('AI suggestions for education would be shown here');
          setIsGenerating(false);
          return;
        case 'skills':
          // This would be handled differently since it's a complex section
          alert('AI suggestions for skills would be shown here');
          setIsGenerating(false);
          return;
        default:
          generatedContent = 'AI-generated content would appear here.';
      }
      
      setAiSuggestion({
        section: sectionId,
        content: generatedContent,
      });
      
      setIsGenerating(false);
    }, 2000);
  };

  const applySuggestion = () => {
    if (!aiSuggestion) return;
    
    setResumeSections(prev => 
      prev.map(section => 
        section.id === aiSuggestion.section 
          ? { ...section, content: aiSuggestion.content }
          : section
      )
    );
    
    setAiSuggestion(null);
  };

  const startEditing = (sectionId: string) => {
    const section = resumeSections.find(s => s.id === sectionId);
    if (section) {
      setEditingSection(sectionId);
      setEditContent(section.content);
    }
  };

  const saveEditing = () => {
    if (!editingSection) return;
    
    setResumeSections(prev => 
      prev.map(section => 
        section.id === editingSection 
          ? { ...section, content: editContent }
          : section
      )
    );
    
    setEditingSection(null);
    setEditContent('');
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditContent('');
  };

  const downloadResume = () => {
    if (!resumeRef.current) return;
    
    // In a real app, this would use html2canvas and jsPDF to generate a PDF
    alert('Downloading resume as PDF...');
  };

  const saveResume = () => {
    // In a real app, this would save the resume to the user's profile
    onSave({
      resumeFileName: `${user.firstName}_${user.lastName}_Resume.pdf`,
      bio: resumeSections.find(s => s.id === 'summary')?.content || user.bio,
    });
    
    alert('Resume saved successfully!');
  };

  const renderResumePreview = () => {
    switch (selectedTemplate) {
      case 'modern':
        return (
          <div 
            ref={resumeRef}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ fontFamily: resumeFont }}
          >
            <div className="grid grid-cols-3 min-h-[1056px]">
              {/* Sidebar */}
              <div className="col-span-1 p-6" style={{ backgroundColor: resumeColor }}>
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                  <h1 className="text-xl font-bold text-white">{user.firstName} {user.lastName}</h1>
                  <p className="text-white opacity-90">{user.experience || 'Software Developer'}</p>
                </div>
                
                <div className="space-y-4 text-white">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white border-opacity-20 pb-1">Contact</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white border-opacity-20 pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill, index) => (
                        <span key={index} className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="col-span-2 p-6">
                <div className="space-y-6">
                  {resumeSections.map(section => {
                    if (section.id === 'skills' || section.id === 'contact') return null;
                    
                    return (
                      <div key={section.id}>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b" style={{ borderColor: resumeColor }}>
                          {section.title}
                        </h2>
                        
                        {section.type === 'text' && (
                          <p className="text-gray-700">{section.content}</p>
                        )}
                        
                        {section.type === 'experience' && section.items && (
                          <div className="space-y-4">
                            {user.workExperience?.map((exp, index) => (
                              <div key={index}>
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                    <p className="text-gray-700">{exp.company}</p>
                                  </div>
                                  <p className="text-gray-600 text-sm">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                  </p>
                                </div>
                                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.type === 'education' && section.items && (
                          <div className="space-y-4">
                            {user.education?.map((edu, index) => (
                              <div key={index}>
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>
                                  </div>
                                  <p className="text-gray-600 text-sm">
                                    {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'classic':
        return (
          <div 
            ref={resumeRef}
            className="bg-white shadow-lg p-8 font-serif"
            style={{ fontFamily: resumeFont }}
          >
            <div className="text-center mb-6 pb-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-600">{user.experience || 'Software Developer'}</p>
              <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-600">
                <span>{user.email}</span>
                {user.phone && <span>• {user.phone}</span>}
              </div>
            </div>
            
            <div className="space-y-6">
              {resumeSections.map(section => (
                <div key={section.id}>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    {section.title}
                  </h2>
                  
                  {section.type === 'text' && (
                    <p className="text-gray-700">{section.content}</p>
                  )}
                  
                  {section.type === 'experience' && section.items && (
                    <div className="space-y-4">
                      {user.workExperience?.map((exp, index) => (
                        <div key={index}>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                              <p className="text-gray-700">{exp.company}</p>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </p>
                          </div>
                          <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.type === 'education' && section.items && (
                    <div className="space-y-4">
                      {user.education?.map((edu, index) => (
                        <div key={index}>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                              <p className="text-gray-700">{edu.institution}</p>
                              <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.type === 'skills' && (
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'creative':
        return (
          <div 
            ref={resumeRef}
            className="bg-white shadow-lg overflow-hidden"
            style={{ fontFamily: resumeFont }}
          >
            <div className="p-8" style={{ backgroundColor: resumeColor }}>
              <h1 className="text-3xl font-bold text-white mb-2">{user.firstName} {user.lastName}</h1>
              <p className="text-white text-opacity-90">{user.experience || 'Software Developer'}</p>
            </div>
            
            <div className="p-8 space-y-6">
              {resumeSections.map(section => (
                <div key={section.id}>
                  <h2 className="text-lg font-bold mb-3 inline-block pb-1 border-b-2" style={{ color: resumeColor, borderColor: resumeColor }}>
                    {section.title}
                  </h2>
                  
                  {section.type === 'text' && (
                    <p className="text-gray-700">{section.content}</p>
                  )}
                  
                  {section.type === 'experience' && section.items && (
                    <div className="space-y-4">
                      {user.workExperience?.map((exp, index) => (
                        <div key={index} className="pl-4 border-l-2" style={{ borderColor: resumeColor }}>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                              <p className="text-gray-700">{exp.company}</p>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </p>
                          </div>
                          <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.type === 'education' && section.items && (
                    <div className="space-y-4">
                      {user.education?.map((edu, index) => (
                        <div key={index} className="pl-4 border-l-2" style={{ borderColor: resumeColor }}>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                              <p className="text-gray-700">{edu.institution}</p>
                              <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.type === 'skills' && (
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 rounded-full text-white text-sm"
                          style={{ backgroundColor: resumeColor }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Template not found</div>;
    }
  };

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsPreview(false)} icon={<Edit className="w-4 h-4" />}>
              Edit
            </Button>
            <Button onClick={downloadResume} icon={<Download className="w-4 h-4" />}>
              Download PDF
            </Button>
            <Button onClick={saveResume} icon={<Save className="w-4 h-4" />}>
              Save Resume
            </Button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {renderResumePreview()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Resume Builder</h2>
            <p className="text-gray-600">Create a professional resume in minutes</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setIsPreview(true)} icon={<Eye className="w-4 h-4" />}>
            Preview
          </Button>
          <Button onClick={saveResume} icon={<Save className="w-4 h-4" />}>
            Save
          </Button>
        </div>
      </div>

      {showAITips && (
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Resume Writing Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Use action verbs and quantify achievements with specific metrics</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Tailor your resume to each job by highlighting relevant skills</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Keep your resume concise and focused on your most impressive achievements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5" />
                  <span>Avoid generic phrases and focus on specific accomplishments</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900">Resume Builder</h3>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'content'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Content</span>
              </button>
              
              <button
                onClick={() => setActiveTab('template')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'template'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Layout className="w-4 h-4" />
                <span>Template</span>
              </button>
              
              <button
                onClick={() => setActiveTab('design')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'design'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Design</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                fullWidth
                onClick={() => setIsPreview(true)}
                icon={<Eye className="w-4 h-4" />}
              >
                Preview Resume
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            {activeTab === 'content' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Content</h3>
                
                {resumeSections.map(section => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">{section.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => generateAIContent(section.id)}
                          loading={isGenerating}
                          icon={<Zap className="w-4 h-4" />}
                        >
                          AI Generate
                        </Button>
                        {section.type === 'text' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditing(section.id)}
                            icon={<Edit className="w-4 h-4" />}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {section.type === 'text' && (
                      <>
                        {editingSection === section.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              rows={5}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={saveEditing}>Save</Button>
                              <Button size="sm" variant="outline" onClick={cancelEditing}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700">{section.content}</p>
                        )}
                      </>
                    )}
                    
                    {section.type === 'experience' && (
                      <div className="space-y-4">
                        {user.workExperience?.map((exp, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">{exp.position}</h5>
                                <p className="text-gray-600">{exp.company}</p>
                              </div>
                              <p className="text-sm text-gray-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert('This would open the experience editor')}
                          icon={<Plus className="w-4 h-4" />}
                        >
                          Add Experience
                        </Button>
                      </div>
                    )}
                    
                    {section.type === 'education' && (
                      <div className="space-y-4">
                        {user.education?.map((edu, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                              </div>
                              <p className="text-sm text-gray-500">
                                {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                              </p>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert('This would open the education editor')}
                          icon={<Plus className="w-4 h-4" />}
                        >
                          Add Education
                        </Button>
                      </div>
                    )}
                    
                    {section.type === 'skills' && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {user.skills?.map((skill, index) => (
                            <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center space-x-1">
                              <span>{skill}</span>
                              <button className="text-gray-400 hover:text-gray-600">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert('This would open the skills editor')}
                          icon={<Plus className="w-4 h-4" />}
                        >
                          Add Skill
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                
                {aiSuggestion && (
                  <Card className="bg-primary-50 border border-primary-200">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Brain className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">AI Suggestion for {resumeSections.find(s => s.id === aiSuggestion.section)?.title}</h4>
                        <p className="text-gray-700 mb-4">{aiSuggestion.content}</p>
                        <div className="flex space-x-3">
                          <Button size="sm" onClick={applySuggestion}>Apply Suggestion</Button>
                          <Button size="sm" variant="outline" onClick={() => setAiSuggestion(null)}>Dismiss</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'template' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="aspect-[3/4] bg-gray-100 rounded mb-3 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Options</h3>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Color Scheme</h4>
                  <div className="flex space-x-3">
                    {['#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b', '#6b7280'].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full transition-all ${
                          resumeColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setResumeColor(color)}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Font</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Inter', 'Georgia', 'Arial', 'Roboto', 'Merriweather', 'Montserrat'].map((font) => (
                      <button
                        key={font}
                        className={`px-4 py-2 border rounded-lg text-center transition-all ${
                          resumeFont === font
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                        style={{ fontFamily: font }}
                        onClick={() => setResumeFont(font)}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Privacy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Show Contact Information</p>
                        <p className="text-sm text-gray-600">Display email and phone on your resume</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Include References</p>
                        <p className="text-sm text-gray-600">Add references section to your resume</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Export Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="pdf"
                        name="format"
                        value="pdf"
                        defaultChecked
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="pdf" className="text-gray-700">PDF Format</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="docx"
                        name="format"
                        value="docx"
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="docx" className="text-gray-700">Word Document (DOCX)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="txt"
                        name="format"
                        value="txt"
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="txt" className="text-gray-700">Plain Text (TXT)</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;