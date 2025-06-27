import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BookOpen, Award, ArrowRight, Brain, Lightbulb } from 'lucide-react';
import { User } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CareerPathInsightsProps {
  user: User;
}

interface CareerPath {
  role: string;
  description: string;
  requiredSkills: string[];
  timeToAchieve: string;
  salaryRange: string;
  growthPotential: number;
  matchScore: number;
}

interface SkillGap {
  skill: string;
  importance: 'high' | 'medium' | 'low';
  timeToLearn: string;
  resources: string[];
}

const CareerPathInsights: React.FC<CareerPathInsightsProps> = ({ user }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  useEffect(() => {
    // Simulate AI analysis
    const analyzeCareerPaths = async () => {
      setIsAnalyzing(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate career paths based on user's current skills
      const userSkills = user.skills || [];
      const hasReactSkills = userSkills.some(skill => 
        ['React', 'JavaScript', 'TypeScript', 'Frontend'].includes(skill)
      );
      const hasBackendSkills = userSkills.some(skill => 
        ['Node.js', 'Python', 'Java', 'Backend', 'API'].includes(skill)
      );
      const hasDesignSkills = userSkills.some(skill => 
        ['Figma', 'Design', 'UX', 'UI', 'Sketch'].includes(skill)
      );

      const paths: CareerPath[] = [];
      
      if (hasReactSkills) {
        paths.push({
          role: 'Senior Frontend Architect',
          description: 'Lead frontend architecture decisions and mentor development teams',
          requiredSkills: ['React', 'TypeScript', 'System Design', 'Leadership', 'GraphQL'],
          timeToAchieve: '2-3 years',
          salaryRange: '$140k - $200k',
          growthPotential: 85,
          matchScore: 92,
        });
        
        paths.push({
          role: 'Full Stack Tech Lead',
          description: 'Bridge frontend and backend development while leading technical initiatives',
          requiredSkills: ['React', 'Node.js', 'System Design', 'Team Leadership', 'DevOps'],
          timeToAchieve: '1-2 years',
          salaryRange: '$130k - $180k',
          growthPotential: 90,
          matchScore: 88,
        });
      }

      if (hasBackendSkills || hasReactSkills) {
        paths.push({
          role: 'Product Manager',
          description: 'Drive product strategy and work closely with engineering teams',
          requiredSkills: ['Product Strategy', 'Analytics', 'Communication', 'Agile', 'User Research'],
          timeToAchieve: '1-2 years',
          salaryRange: '$120k - $170k',
          growthPotential: 95,
          matchScore: 75,
        });
      }

      if (hasDesignSkills) {
        paths.push({
          role: 'Design System Lead',
          description: 'Create and maintain design systems across product teams',
          requiredSkills: ['Design Systems', 'Figma', 'Component Libraries', 'Documentation', 'Leadership'],
          timeToAchieve: '1-2 years',
          salaryRange: '$110k - $160k',
          growthPotential: 80,
          matchScore: 85,
        });
      }

      // Always include these general paths
      paths.push({
        role: 'Engineering Manager',
        description: 'Lead and grow engineering teams while maintaining technical excellence',
        requiredSkills: ['Leadership', 'Team Management', 'Technical Strategy', 'Communication', 'Mentoring'],
        timeToAchieve: '2-4 years',
        salaryRange: '$150k - $220k',
        growthPotential: 95,
        matchScore: 70,
      });

      // Generate skill gaps
      const gaps: SkillGap[] = [
        {
          skill: 'System Design',
          importance: 'high',
          timeToLearn: '3-6 months',
          resources: ['System Design Interview Course', 'High Scalability Blog', 'AWS Architecture Center'],
        },
        {
          skill: 'Leadership & Communication',
          importance: 'high',
          timeToLearn: '6-12 months',
          resources: ['Leadership Training', 'Public Speaking Course', 'Management Books'],
        },
        {
          skill: 'Cloud Architecture (AWS/Azure)',
          importance: 'medium',
          timeToLearn: '2-4 months',
          resources: ['AWS Certified Solutions Architect', 'Cloud Guru', 'Hands-on Projects'],
        },
        {
          skill: 'Data Analytics',
          importance: 'medium',
          timeToLearn: '2-3 months',
          resources: ['Google Analytics', 'SQL Courses', 'Data Visualization Tools'],
        },
      ];

      setCareerPaths(paths.sort((a, b) => b.matchScore - a.matchScore));
      setSkillGaps(gaps);
      setIsAnalyzing(false);
    };

    analyzeCareerPaths();
  }, [user]);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'text-error-600 bg-error-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'low': return 'text-success-600 bg-success-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isAnalyzing) {
    return (
      <Card>
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Brain className="w-6 h-6 text-primary-600" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analyzing Your Career Path
          </h3>
          <p className="text-gray-600">
            AI is analyzing your skills and experience to suggest optimal career trajectories...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Career Paths */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Career Path Recommendations</h3>
            <p className="text-sm text-gray-600">Based on your skills and market trends</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPath?.role === path.role
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPath(path)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{path.role}</h4>
                  <p className="text-sm text-gray-600 mt-1">{path.timeToAchieve}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    path.matchScore >= 85 ? 'bg-success-100 text-success-700' :
                    path.matchScore >= 70 ? 'bg-warning-100 text-warning-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {path.matchScore}% Match
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">{path.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Salary Range:</span>
                  <span className="font-medium text-gray-900">{path.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Growth Potential:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${path.growthPotential}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{path.growthPotential}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-1">
                  {path.requiredSkills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {path.requiredSkills.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{path.requiredSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Selected Path Details */}
      {selectedPath && (
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Path to {selectedPath.role}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Required Skills</h4>
              <div className="space-y-2">
                {selectedPath.requiredSkills.map((skill, index) => {
                  const hasSkill = user.skills?.includes(skill);
                  return (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">{skill}</span>
                      {hasSkill ? (
                        <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded">
                          ✓ Have
                        </span>
                      ) : (
                        <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded">
                          Need
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Next Steps</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Skill Development</p>
                    <p className="text-xs text-gray-600">Focus on missing skills identified above</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Build Portfolio</p>
                    <p className="text-xs text-gray-600">Create projects showcasing new skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary-600">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Network & Apply</p>
                    <p className="text-xs text-gray-600">Connect with professionals in target role</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Skill Gaps */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-6 h-6 text-secondary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Skill Development Recommendations</h3>
        </div>

        <div className="space-y-4">
          {skillGaps.map((gap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{gap.skill}</h4>
                  <p className="text-sm text-gray-600">Time to learn: {gap.timeToLearn}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImportanceColor(gap.importance)}`}>
                  {gap.importance} priority
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-2">Recommended Resources:</p>
                <div className="flex flex-wrap gap-2">
                  {gap.resources.map((resource, resourceIndex) => (
                    <span
                      key={resourceIndex}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CareerPathInsights;