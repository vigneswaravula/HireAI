import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Target, TrendingUp, Trophy, Zap, CheckCircle } from 'lucide-react';
import { User } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface GamificationSystemProps {
  user: User;
  applications: any[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  earnedAt?: string;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({ user, applications }) => {
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(100);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    calculateUserProgress();
    initializeBadges();
    initializeAchievements();
  }, [user, applications]);

  const calculateUserProgress = () => {
    let totalXP = 0;
    
    // XP from profile completion
    if (user.skills?.length) totalXP += 50;
    if (user.workExperience?.length) totalXP += 75;
    if (user.education?.length) totalXP += 50;
    if (user.resumeFileName) totalXP += 100;
    if (user.bio) totalXP += 25;
    
    // XP from applications
    totalXP += applications.length * 20;
    
    // XP from skill assessments
    if (user.skillAssessments?.length) {
      totalXP += user.skillAssessments.length * 30;
    }

    // Calculate level
    const level = Math.floor(totalXP / 100) + 1;
    const currentLevelXP = totalXP % 100;
    const nextLevelXP = 100;

    setUserLevel(level);
    setUserXP(currentLevelXP);
    setXpToNextLevel(nextLevelXP);
  };

  const initializeBadges = () => {
    const badgeList: Badge[] = [
      {
        id: 'first-application',
        name: 'First Steps',
        description: 'Submit your first job application',
        icon: Target,
        earned: applications.length > 0,
        earnedAt: applications.length > 0 ? applications[0]?.appliedAt : undefined,
        rarity: 'common',
      },
      {
        id: 'profile-complete',
        name: 'Profile Master',
        description: 'Complete 100% of your profile',
        icon: CheckCircle,
        earned: !!(user.skills?.length && user.workExperience?.length && user.education?.length && user.resumeFileName),
        rarity: 'rare',
      },
      {
        id: 'skill-collector',
        name: 'Skill Collector',
        description: 'Add 10+ skills to your profile',
        icon: Star,
        earned: (user.skills?.length || 0) >= 10,
        progress: user.skills?.length || 0,
        maxProgress: 10,
        rarity: 'common',
      },
      {
        id: 'assessment-ace',
        name: 'Assessment Ace',
        description: 'Complete 5 skill assessments',
        icon: Award,
        earned: (user.skillAssessments?.length || 0) >= 5,
        progress: user.skillAssessments?.length || 0,
        maxProgress: 5,
        rarity: 'epic',
      },
      {
        id: 'application-streak',
        name: 'Application Streak',
        description: 'Apply to 10 jobs',
        icon: Zap,
        earned: applications.length >= 10,
        progress: applications.length,
        maxProgress: 10,
        rarity: 'rare',
      },
      {
        id: 'interview-ready',
        name: 'Interview Ready',
        description: 'Get invited to your first interview',
        icon: Trophy,
        earned: applications.some(app => app.status === 'interview'),
        rarity: 'epic',
      },
    ];

    setBadges(badgeList);
  };

  const initializeAchievements = () => {
    const achievementList: Achievement[] = [
      {
        id: 'profile-builder',
        title: 'Profile Builder',
        description: 'Complete all sections of your profile',
        points: 100,
        completed: !!(user.skills?.length && user.workExperience?.length && user.education?.length && user.resumeFileName),
        progress: [
          user.skills?.length ? 1 : 0,
          user.workExperience?.length ? 1 : 0,
          user.education?.length ? 1 : 0,
          user.resumeFileName ? 1 : 0,
        ].reduce((a, b) => a + b, 0),
        maxProgress: 4,
      },
      {
        id: 'job-hunter',
        title: 'Job Hunter',
        description: 'Apply to 25 different positions',
        points: 250,
        completed: applications.length >= 25,
        progress: applications.length,
        maxProgress: 25,
      },
      {
        id: 'skill-master',
        title: 'Skill Master',
        description: 'Score 90%+ on 3 skill assessments',
        points: 300,
        completed: (user.skillAssessments?.filter(a => a.score >= 90).length || 0) >= 3,
        progress: user.skillAssessments?.filter(a => a.score >= 90).length || 0,
        maxProgress: 3,
      },
    ];

    setAchievements(achievementList);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-700';
      case 'rare': return 'text-blue-700';
      case 'epic': return 'text-purple-700';
      case 'legendary': return 'text-yellow-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Level & XP */}
      <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Level {userLevel}</h3>
              <p className="text-sm text-gray-600">Job Seeker</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">{userXP}</div>
            <div className="text-xs text-gray-600">/ {xpToNextLevel} XP</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress to Level {userLevel + 1}</span>
            <span className="font-medium">{Math.round((userXP / xpToNextLevel) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userXP / xpToNextLevel) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 border-2 rounded-lg text-center ${
                badge.earned 
                  ? getRarityColor(badge.rarity)
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                badge.earned 
                  ? 'bg-white shadow-sm'
                  : 'bg-gray-200'
              }`}>
                <badge.icon className={`w-6 h-6 ${
                  badge.earned 
                    ? getRarityTextColor(badge.rarity)
                    : 'text-gray-400'
                }`} />
              </div>
              <h4 className={`font-medium text-sm mb-1 ${
                badge.earned ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {badge.name}
              </h4>
              <p className={`text-xs ${
                badge.earned ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {badge.description}
              </p>
              
              {badge.progress !== undefined && badge.maxProgress && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-primary-600 h-1 rounded-full" 
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {badge.progress}/{badge.maxProgress}
                  </div>
                </div>
              )}

              {badge.earned && badge.earnedAt && (
                <div className="text-xs text-gray-500 mt-1">
                  Earned {new Date(badge.earnedAt).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 border rounded-lg ${
                achievement.completed 
                  ? 'border-success-200 bg-success-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.completed 
                      ? 'bg-success-100'
                      : 'bg-gray-200'
                  }`}>
                    {achievement.completed ? (
                      <CheckCircle className="w-5 h-5 text-success-600" />
                    ) : (
                      <Target className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    achievement.completed ? 'text-success-600' : 'text-gray-500'
                  }`}>
                    +{achievement.points}
                  </div>
                  <div className="text-xs text-gray-500">XP</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      achievement.completed ? 'bg-success-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Quick Actions for XP */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Earn More XP</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Star className="w-5 h-5 text-warning-600" />
              <span className="font-medium text-gray-900">Complete Profile</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Add missing information to your profile
            </p>
            <div className="text-sm text-primary-600 font-medium">+50 XP</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Award className="w-5 h-5 text-secondary-600" />
              <span className="font-medium text-gray-900">Take Skill Assessment</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Prove your skills with assessments
            </p>
            <div className="text-sm text-primary-600 font-medium">+30 XP</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-5 h-5 text-accent-600" />
              <span className="font-medium text-gray-900">Apply to Jobs</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Submit quality job applications
            </p>
            <div className="text-sm text-primary-600 font-medium">+20 XP each</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-gray-900">Get Interview</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Land an interview invitation
            </p>
            <div className="text-sm text-primary-600 font-medium">+100 XP</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamificationSystem;