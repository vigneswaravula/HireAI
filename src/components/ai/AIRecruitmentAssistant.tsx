import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Lightbulb, Target, Users, TrendingUp, Zap, Search, Filter, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AIRecruitmentAssistantProps {
  userRole: 'employer' | 'candidate';
}

interface AIInsight {
  id: string;
  type: 'recommendation' | 'insight' | 'warning' | 'opportunity';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface AIChat {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: string;
  suggestions?: string[];
}

const AIRecruitmentAssistant: React.FC<AIRecruitmentAssistantProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('insights');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<AIChat[]>([
    {
      id: '1',
      message: 'Hello! I\'m your AI recruitment assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      suggestions: [
        'Find candidates with React skills',
        'Optimize my job posting',
        'Analyze application trends',
        'Suggest interview questions'
      ]
    }
  ]);

  const { users } = useSelector((state: RootState) => state.users);
  const { applications } = useSelector((state: RootState) => state.applications);

  const employerInsights: AIInsight[] = [
    {
      id: '1',
      type: 'recommendation',
      title: 'Optimize Job Posting for React Developer',
      description: 'Your React Developer posting has 23% lower application rate than similar roles. Consider adding remote work options and competitive salary range.',
      action: 'Update Job Posting',
      priority: 'high',
      category: 'Job Optimization'
    },
    {
      id: '2',
      type: 'insight',
      title: 'Peak Application Times',
      description: 'Candidates are most active on Tuesday-Thursday between 10 AM - 2 PM. Schedule your job posts accordingly.',
      priority: 'medium',
      category: 'Timing Strategy'
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Untapped Talent Pool',
      description: '47 qualified candidates in your area haven\'t applied yet. Consider reaching out proactively.',
      action: 'View Candidates',
      priority: 'high',
      category: 'Talent Sourcing'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Competitor Analysis',
      description: 'TechCorp is offering 15% higher salaries for similar roles. Consider adjusting your compensation package.',
      priority: 'medium',
      category: 'Market Intelligence'
    }
  ];

  const candidateInsights: AIInsight[] = [
    {
      id: '1',
      type: 'recommendation',
      title: 'Skill Gap Analysis',
      description: 'Adding TypeScript to your skillset could increase your job match rate by 34%. Consider taking an online course.',
      action: 'View Courses',
      priority: 'high',
      category: 'Skill Development'
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'High-Match Jobs Available',
      description: '12 new jobs posted this week match your profile with 85%+ compatibility. Apply soon for best chances.',
      action: 'View Jobs',
      priority: 'high',
      category: 'Job Opportunities'
    },
    {
      id: '3',
      type: 'insight',
      title: 'Application Success Rate',
      description: 'Your applications to startups have 67% higher response rate than corporate roles. Focus your efforts accordingly.',
      priority: 'medium',
      category: 'Application Strategy'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Profile Optimization',
      description: 'Adding a professional summary could increase profile views by 45%. Profiles with summaries get 3x more employer messages.',
      action: 'Update Profile',
      priority: 'medium',
      category: 'Profile Enhancement'
    }
  ];

  const insights = userRole === 'employer' ? employerInsights : candidateInsights;

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return Lightbulb;
      case 'insight': return TrendingUp;
      case 'warning': return Target;
      case 'opportunity': return Star;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'text-primary-600 bg-primary-100';
      case 'insight': return 'text-secondary-600 bg-secondary-100';
      case 'warning': return 'text-warning-600 bg-warning-100';
      case 'opportunity': return 'text-success-600 bg-success-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-error-600 bg-error-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'low': return 'text-success-600 bg-success-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage: AIChat = {
      id: Date.now().toString(),
      message: chatMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIChat = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(chatMessage, userRole),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        suggestions: generateSuggestions(userRole)
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);

    setChatMessage('');
  };

  const generateAIResponse = (message: string, role: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('candidate') || lowerMessage.includes('hire')) {
      return role === 'employer' 
        ? "I found 23 candidates that match your criteria. Based on their skills and experience, I recommend focusing on candidates with 3-5 years of React experience. Would you like me to rank them by compatibility score?"
        : "I can help you find the best job opportunities! Based on your profile, I see you're strong in React and JavaScript. There are 8 new positions that match your skills perfectly. Shall I show you the top matches?";
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('improve')) {
      return role === 'employer'
        ? "To attract better candidates, consider highlighting growth opportunities and mentorship in your job descriptions. Companies that mention career development get 40% more quality applications."
        : "Based on market trends, adding TypeScript and Next.js to your skillset would significantly boost your job prospects. These skills are in high demand and could increase your salary potential by 25%.";
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('compensation')) {
      return role === 'employer'
        ? "Market analysis shows similar roles in your area pay $95K-$140K. Your current range is competitive, but adding equity or remote work options could attract 30% more candidates."
        : "Based on your experience and location, the market rate for your skills is $85K-$120K. I notice some companies in your area are offering above-market rates. Would you like me to show you these opportunities?";
    }

    return role === 'employer'
      ? "I'm here to help you find the best candidates and optimize your hiring process. I can analyze job postings, suggest improvements, find qualified candidates, and provide market insights. What would you like to focus on?"
      : "I'm here to help accelerate your job search! I can find matching opportunities, suggest profile improvements, analyze market trends, and help you prepare for interviews. What can I help you with today?";
  };

  const generateSuggestions = (role: string): string[] => {
    return role === 'employer' 
      ? [
          'Show me top candidates for this role',
          'Analyze my job posting performance',
          'What salary should I offer?',
          'Help me write interview questions'
        ]
      : [
          'Find jobs matching my skills',
          'How can I improve my profile?',
          'What skills should I learn next?',
          'Help me prepare for interviews'
        ];
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'analytics', label: 'Smart Analytics', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Recruitment Assistant</h2>
          <p className="text-gray-600">
            {userRole === 'employer' 
              ? 'Intelligent insights to optimize your hiring process'
              : 'Personalized guidance to accelerate your job search'
            }
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* Content */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getInsightColor(insight.type)}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                            {insight.priority} priority
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {insight.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{insight.description}</p>
                      {insight.action && (
                        <Button size="sm" variant="outline">
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeTab === 'chat' && (
        <Card>
          <div className="h-96 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    chat.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{chat.message}</p>
                    {chat.suggestions && (
                      <div className="mt-3 space-y-1">
                        {chat.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setChatMessage(suggestion)}
                            className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-2 py-1 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask me anything about recruitment..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} icon={<MessageSquare className="w-4 h-4" />}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-primary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Match Accuracy</h3>
                <p className="text-2xl font-bold text-primary-600">94.2%</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {userRole === 'employer' 
                ? 'AI-recommended candidates have 94% success rate'
                : 'Your profile matches are 94% accurate'
              }
            </p>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-secondary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Success Rate</h3>
                <p className="text-2xl font-bold text-secondary-600">
                  {userRole === 'employer' ? '67%' : '73%'}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {userRole === 'employer' 
                ? 'Candidates hired through AI recommendations'
                : 'Interview rate for AI-matched applications'
              }
            </p>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-accent-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Time Saved</h3>
                <p className="text-2xl font-bold text-accent-600">
                  {userRole === 'employer' ? '12.5h' : '8.3h'}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {userRole === 'employer' 
                ? 'Average time saved per hire with AI assistance'
                : 'Time saved per week with AI job matching'
              }
            </p>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-warning-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Quality Score</h3>
                <p className="text-2xl font-bold text-warning-600">8.7/10</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {userRole === 'employer' 
                ? 'Average quality rating of AI-matched candidates'
                : 'Your profile quality score based on AI analysis'
              }
            </p>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-success-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Satisfaction</h3>
                <p className="text-2xl font-bold text-success-600">4.8/5</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {userRole === 'employer' 
                ? 'Employer satisfaction with AI recommendations'
                : 'Your satisfaction with AI job matches'
              }
            </p>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-primary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">AI Confidence</h3>
                <p className="text-2xl font-bold text-primary-600">96%</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              AI confidence level in current recommendations
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIRecruitmentAssistant;