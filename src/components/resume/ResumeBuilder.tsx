import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Download, Eye, Edit, Save, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { User, WorkExperience, Education } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ResumeBuilderProps {
  user: User;
  onSave: (resumeData: any) => void;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  template: 'modern' | 'classic' | 'creative';
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ user, onSave }) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'creative'>('modern');
  const [isPreview, setIsPreview] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<ResumeData>({
    defaultValues: {
      personalInfo: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || '',
        location: '',
        summary: user.bio || '',
      },
      workExperience: user.workExperience || [],
      education: user.education || [],
      skills: user.skills || [],
      template: selectedTemplate,
    },
  });

  const resumeData = watch();

  const templates = [
    { id: 'modern', name: 'Modern', preview: 'Clean and professional' },
    { id: 'classic', name: 'Classic', preview: 'Traditional format' },
    { id: 'creative', name: 'Creative', preview: 'Stand out design' },
  ];

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Edit },
    { id: 'education', name: 'Education', icon: Edit },
    { id: 'skills', name: 'Skills', icon: Edit },
    { id: 'template', name: 'Template', icon: Eye },
  ];

  const generatePDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${resumeData.personalInfo.name.replace(' ', '_')}_resume.pdf`);
  };

  const ResumePreview = () => (
    <div id="resume-preview" className="bg-white p-8 shadow-lg max-w-2xl mx-auto">
      {selectedTemplate === 'modern' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b-2 border-primary-600 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">{resumeData.personalInfo.name}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
              <span>{resumeData.personalInfo.email}</span>
              <span>{resumeData.personalInfo.phone}</span>
              <span>{resumeData.personalInfo.location}</span>
            </div>
          </div>

          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
              <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.workExperience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Work Experience</h2>
              <div className="space-y-4">
                {resumeData.workExperience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-primary-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-gray-600 text-sm">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Education</h2>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-gray-600">{edu.fieldOfStudy}</p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedTemplate === 'classic' && (
        <div className="space-y-4 font-serif">
          {/* Classic template layout */}
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
            <p className="text-gray-600">
              {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.location}
            </p>
          </div>
          {/* Rest of classic template... */}
        </div>
      )}

      {selectedTemplate === 'creative' && (
        <div className="space-y-6">
          {/* Creative template with colors and modern layout */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold">{resumeData.personalInfo.name}</h1>
            <p className="mt-2">{resumeData.personalInfo.summary}</p>
          </div>
          {/* Rest of creative template... */}
        </div>
      )}
    </div>
  );

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsPreview(false)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button onClick={generatePDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
        <ResumePreview />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t">
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
      <div className="lg:col-span-2">
        <Card>
          {activeSection === 'personal' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  {...register('personalInfo.name')}
                />
                <Input
                  label="Email"
                  type="email"
                  {...register('personalInfo.email')}
                />
                <Input
                  label="Phone"
                  {...register('personalInfo.phone')}
                />
                <Input
                  label="Location"
                  {...register('personalInfo.location')}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('personalInfo.summary')}
                />
              </div>
            </div>
          )}

          {activeSection === 'template' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id as any)}
                  >
                    <div className="aspect-[3/4] bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.preview}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Add other sections (experience, education, skills) here */}
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;