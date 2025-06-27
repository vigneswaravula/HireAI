import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Job, User, AIRecommendation } from '../../types';
import Card from '../ui/Card';

interface AIMatchingEngineProps {
  user: User;
  jobs: Job[];
  onRecommendations: (recommendations: AIRecommendation[]) => void;
}

const AIMatchingEngine: React.FC<AIMatchingEngineProps> = ({ user, jobs, onRecommendations }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const calculateMatchScore = (job: Job, candidate: User): AIRecommendation => {
    let totalScore = 0;
    let skillsMatch = 0;
    let experienceMatch = 0;
    let locationMatch = 0;
    const reasons: string[] = [];

    // Skills matching (40% weight)
    if (candidate.skills && job.skills) {
      const candidateSkills = candidate.skills.map(s => s.toLowerCase());
      const jobSkills = job.skills.map(s => s.toLowerCase());
      const matchingSkills = candidateSkills.filter(skill => 
        jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
      );
      
      skillsMatch = (matchingSkills.length / jobSkills.length) * 100;
      totalScore += skillsMatch * 0.4;
      
      if (skillsMatch > 70) {
        reasons.push(`Strong skills match (${Math.round(skillsMatch)}%)`);
      } else if (skillsMatch > 40) {
        reasons.push(`Good skills alignment (${Math.round(skillsMatch)}%)`);
      }
    }

    // Experience matching (30% weight)
    if (candidate.experience && job.experience) {
      const candidateYears = extractYearsFromExperience(candidate.experience);
      const requiredYears = extractYearsFromExperience(job.experience);
      
      if (candidateYears >= requiredYears) {
        experienceMatch = Math.min(100, (candidateYears / requiredYears) * 100);
        totalScore += experienceMatch * 0.3;
        reasons.push(`Experience requirement met (${candidateYears}+ years)`);
      } else {
        experienceMatch = (candidateYears / requiredYears) * 100;
        totalScore += experienceMatch * 0.3;
      }
    }

    // Location matching (20% weight)
    if (job.remote) {
      locationMatch = 100;
      totalScore += 20;
      reasons.push('Remote work available');
    } else if (candidate.preferences?.preferredLocation) {
      const locationSimilarity = job.location.toLowerCase().includes(
        candidate.preferences.preferredLocation.toLowerCase()
      ) ? 100 : 0;
      locationMatch = locationSimilarity;
      totalScore += locationSimilarity * 0.2;
      
      if (locationSimilarity > 0) {
        reasons.push('Location preference match');
      }
    }

    // Salary matching (10% weight)
    if (candidate.preferences?.salaryRange) {
      const [minSalary, maxSalary] = candidate.preferences.salaryRange;
      if (job.salary.min >= minSalary && job.salary.max <= maxSalary) {
        totalScore += 10;
        reasons.push('Salary range matches preferences');
      }
    }

    return {
      jobId: job.id,
      matchScore: Math.round(Math.min(100, totalScore)),
      reasons,
      skillsMatch: Math.round(skillsMatch),
      experienceMatch: Math.round(experienceMatch),
      locationMatch: Math.round(locationMatch),
    };
  };

  const extractYearsFromExperience = (experience: string): number => {
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const runAIMatching = async () => {
    if (hasCompleted) return; // Don't run if already completed
    
    setIsAnalyzing(true);
    setMatchingProgress(0);

    // Simulate AI processing with progress updates
    const recommendations: AIRecommendation[] = [];
    
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const recommendation = calculateMatchScore(job, user);
      
      if (recommendation.matchScore > 30) { // Only include decent matches
        recommendations.push(recommendation);
      }
      
      const progress = ((i + 1) / jobs.length) * 100;
      setMatchingProgress(progress);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Sort by match score
    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    
    // Complete the analysis
    setIsAnalyzing(false);
    setHasCompleted(true);
    onRecommendations(recommendations.slice(0, 10)); // Top 10 matches
  };

  useEffect(() => {
    if (user && jobs.length > 0 && !hasCompleted) {
      // Add a small delay before starting
      const timer = setTimeout(() => {
        runAIMatching();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user, jobs, hasCompleted]);

  // Don't show the component if analysis is complete
  if (hasCompleted && !isAnalyzing) {
    return null;
  }

  return (
    <Card className="mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Job Matching</h3>
          <p className="text-sm text-gray-600">
            {isAnalyzing ? 'Analyzing job compatibility...' : 'Analysis complete'}
          </p>
        </div>
      </div>

      {isAnalyzing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Processing {jobs.length} job listings</span>
            <span className="font-medium text-primary-600">{Math.round(matchingProgress)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${matchingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Target className="w-5 h-5 text-primary-600 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Skills Analysis</div>
            </div>
            <div className="p-3 bg-secondary-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-secondary-600 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Experience Match</div>
            </div>
            <div className="p-3 bg-accent-50 rounded-lg">
              <Zap className="w-5 h-5 text-accent-600 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Compatibility Score</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AIMatchingEngine;