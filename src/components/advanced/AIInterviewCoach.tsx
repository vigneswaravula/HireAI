import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MessageSquare, 
  Video, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Star,
  Award,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  FileText,
  Download,
  Briefcase,
  User,
  Target,
  ChevronRight,
  ChevronDown,
  Sparkles,
  X,
  ChevronLeft,
  RefreshCw,
  Save,
  Code,
  Building,
  Search,
  Plus,
  TrendingUp
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AIInterviewCoachProps {
  jobTitle?: string;
  jobDescription?: string;
  userRole: 'candidate' | 'employer';
}

interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'experience' | 'company' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  tips?: string;
  sampleAnswer?: string;
  isCustom?: boolean;
}

interface PracticeSession {
  id: string;
  date: string;
  duration: number;
  questions: string[];
  recording?: string;
  feedback?: {
    strengths: string[];
    improvements: string[];
    score: number;
  };
}

const AIInterviewCoach: React.FC<AIInterviewCoachProps> = ({ 
  jobTitle = 'Frontend Developer', 
  jobDescription = '',
  userRole
}) => {
  const [activeTab, setActiveTab] = useState('questions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showQuestionDetails, setShowQuestionDetails] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPracticeQuestion, setCurrentPracticeQuestion] = useState<InterviewQuestion | null>(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{
    strengths: string[];
    improvements: string[];
    score: number;
    tips: string[];
  } | null>(null);
  const [savedSessions, setSavedSessions] = useState<PracticeSession[]>([
    {
      id: '1',
      date: '2024-01-15',
      duration: 25,
      questions: ['1', '3', '5'],
      feedback: {
        strengths: ['Clear communication', 'Strong technical knowledge'],
        improvements: ['Provide more specific examples'],
        score: 85
      }
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample interview questions
  const interviewQuestions: InterviewQuestion[] = [
    {
      id: '1',
      question: 'Tell me about yourself and your experience with React.',
      category: 'experience',
      difficulty: 'easy',
      tips: 'Focus on relevant experience and skills. Keep it concise (1-2 minutes) and highlight achievements.',
      sampleAnswer: 'I\'m a frontend developer with 4 years of experience specializing in React. I\'ve built complex applications including an e-commerce platform that improved conversion rates by 25%. I\'m passionate about creating intuitive user interfaces and optimizing performance.'
    },
    {
      id: '2',
      question: 'Explain the virtual DOM and its benefits.',
      category: 'technical',
      difficulty: 'medium',
      tips: 'Demonstrate your technical understanding clearly. Use simple analogies if appropriate.',
      sampleAnswer: 'The virtual DOM is a lightweight copy of the actual DOM that React maintains in memory. When state changes, React first updates this virtual representation, compares it with the previous version (diffing), and then efficiently updates only the necessary parts of the real DOM. This approach significantly improves performance by minimizing expensive DOM operations.'
    },
    {
      id: '3',
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      category: 'behavioral',
      difficulty: 'medium',
      tips: 'Use the STAR method: Situation, Task, Action, Result. Focus on your specific contributions.',
      sampleAnswer: 'I led a project to rebuild our legacy application with a tight 3-month deadline. The main challenge was maintaining functionality while modernizing the codebase. I created a detailed migration plan, implemented incremental changes with comprehensive testing, and held daily stand-ups to address issues quickly. We delivered on time with zero critical bugs, and the new system reduced load times by 40%.'
    },
    {
      id: '4',
      question: 'How do you handle state management in large React applications?',
      category: 'technical',
      difficulty: 'hard',
      tips: 'Compare different approaches and explain your reasoning for choosing specific solutions.',
      sampleAnswer: 'For large applications, I evaluate state management needs based on complexity. For simpler apps, React Context with hooks works well. For more complex state with many components, I prefer Redux for its predictable state container and debugging tools. Recently, I\'ve also used Redux Toolkit to reduce boilerplate. For server state, I implement React Query to handle caching, background updates, and optimistic UI updates.'
    },
    {
      id: '5',
      question: 'What interests you about working at our company?',
      category: 'company',
      difficulty: 'easy',
      tips: 'Research the company beforehand. Mention specific aspects of their products, culture, or mission.',
      sampleAnswer: 'I\'m impressed by your company\'s innovative approach to solving [specific problem]. Your recent project [name] particularly caught my attention because it aligns with my interest in [relevant technology/field]. I also appreciate your commitment to [company value], which resonates with my own professional values. I believe my experience with [relevant skill] would allow me to contribute meaningfully to your team.'
    },
    {
      id: '6',
      question: 'How would you handle a situation where a team member isn\'t pulling their weight?',
      category: 'situational',
      difficulty: 'medium',
      tips: 'Show empathy and a constructive approach to problem-solving. Avoid being judgmental.',
      sampleAnswer: 'I would first have a private, non-confrontational conversation to understand if they\'re facing challenges I\'m unaware of. If it\'s a skill gap, I\'d offer to help or suggest resources. For motivation issues, I\'d try to reconnect them with the project\'s purpose. If these approaches don\'t work, I\'d involve a manager while focusing on the impact to the project rather than criticizing the person.'
    },
    {
      id: '7',
      question: 'Explain the difference between controlled and uncontrolled components in React.',
      category: 'technical',
      difficulty: 'medium',
      tips: 'Provide clear definitions and examples of when to use each approach.',
      sampleAnswer: 'Controlled components are form elements whose values are controlled by React state. When the user inputs data, an event handler updates the state, making React the "single source of truth." This gives more control but requires more code. Uncontrolled components store their own state internally using refs to access values directly from the DOM. They\'re simpler but offer less control. I typically use controlled components for forms that need validation or conditional rendering.'
    },
    {
      id: '8',
      question: 'Where do you see yourself in 5 years?',
      category: 'behavioral',
      difficulty: 'easy',
      tips: 'Balance ambition with realism. Connect your goals to the position and company.',
      sampleAnswer: 'In five years, I aim to have grown into a senior or lead developer role where I can architect solutions and mentor junior developers. I\'m particularly interested in deepening my expertise in [relevant technology] and developing leadership skills. I\'m excited about the growth opportunities at your company, especially in the [specific department/area] where I could contribute to projects like [mention something specific about their roadmap if known].'
    },
  ];

  const filteredQuestions = interviewQuestions.filter(question => {
    const matchesSearch = searchTerm === '' || 
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const addCustomQuestion = () => {
    if (!customQuestion.trim()) return;

    const newQuestion: InterviewQuestion = {
      id: Date.now().toString(),
      question: customQuestion,
      category: 'technical',
      difficulty: 'medium',
      isCustom: true,
    };

    // In a real app, you would add this to your state or database
    alert(`Custom question added: ${customQuestion}`);
    setCustomQuestion('');
  };

  const startPractice = (question: InterviewQuestion) => {
    setCurrentPracticeQuestion(question);
    setPracticeMode(true);
    setPracticeAnswer('');
    setShowFeedback(false);
    setAiFeedback(null);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const submitAnswer = () => {
    if (!practiceAnswer.trim()) return;
    
    setFeedbackLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setAiFeedback({
        strengths: [
          'Clear explanation of technical concepts',
          'Good use of specific examples from past experience',
          'Structured response with logical flow'
        ],
        improvements: [
          'Could be more concise in some areas',
          'Consider quantifying achievements with metrics',
          'Opportunity to highlight teamwork more'
        ],
        score: 85,
        tips: [
          'Practice with a timer to keep responses under 2 minutes',
          'Use the STAR method for behavioral questions',
          'Prepare 2-3 specific examples for common questions'
        ]
      });
      
      setFeedbackLoading(false);
      setShowFeedback(true);
    }, 2000);
  };

  const saveSession = () => {
    if (!currentPracticeQuestion) return;
    
    const newSession: PracticeSession = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      duration: 15, // Mock duration
      questions: [currentPracticeQuestion.id],
      feedback: aiFeedback ? {
        strengths: aiFeedback.strengths,
        improvements: aiFeedback.improvements,
        score: aiFeedback.score
      } : undefined
    };
    
    setSavedSessions(prev => [newSession, ...prev]);
    alert('Practice session saved successfully!');
  };

  const generateQuestions = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      alert('10 new questions generated based on the job description!');
      setIsGenerating(false);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Code className="w-4 h-4" />;
      case 'behavioral': return <User className="w-4 h-4" />;
      case 'experience': return <Briefcase className="w-4 h-4" />;
      case 'company': return <Building className="w-4 h-4" />;
      case 'situational': return <Target className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-primary-100 text-primary-700';
      case 'behavioral': return 'bg-secondary-100 text-secondary-700';
      case 'experience': return 'bg-accent-100 text-accent-700';
      case 'company': return 'bg-warning-100 text-warning-700';
      case 'situational': return 'bg-success-100 text-success-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success-100 text-success-700';
      case 'medium': return 'bg-warning-100 text-warning-700';
      case 'hard': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (practiceMode && currentPracticeQuestion) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setPracticeMode(false)}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Back to Questions
          </Button>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentPracticeQuestion.category)}`}>
              {currentPracticeQuestion.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentPracticeQuestion.difficulty)}`}>
              {currentPracticeQuestion.difficulty}
            </span>
          </div>
        </div>

        <Card>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentPracticeQuestion.question}
              </h3>
              {currentPracticeQuestion.tips && !showFeedback && (
                <div className="flex items-start space-x-2 mt-4 text-sm text-primary-700 bg-primary-50 p-3 rounded-lg">
                  <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{currentPracticeQuestion.tips}</p>
                </div>
              )}
            </div>

            {!showFeedback ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Type your answer here..."
                    value={practiceAnswer}
                    onChange={(e) => setPracticeAnswer(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={isRecording ? 'error' : 'outline'}
                      onClick={toggleRecording}
                      icon={isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    >
                      {isRecording ? 'Stop Recording' : 'Record Answer'}
                    </Button>
                    
                    {isRecording && (
                      <div className="flex items-center space-x-2 text-error-600">
                        <span className="animate-pulse">●</span>
                        <span className="text-sm">Recording...</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={submitAnswer}
                    disabled={!practiceAnswer.trim() && !isRecording}
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {feedbackLoading ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                      <Brain className="w-8 h-8 text-primary-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Your Answer</h3>
                    <p className="text-gray-600">Our AI is evaluating your response...</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Your Answer</h4>
                      <p className="text-gray-700">{practiceAnswer}</p>
                    </div>

                    {aiFeedback && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">AI Feedback</h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-600">Score:</div>
                            <div className={`px-2 py-1 rounded-full text-sm font-medium ${
                              aiFeedback.score >= 80 ? 'bg-success-100 text-success-700' :
                              aiFeedback.score >= 60 ? 'bg-warning-100 text-warning-700' :
                              'bg-error-100 text-error-700'
                            }`}>
                              {aiFeedback.score}/100
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-success-50 border border-success-100 rounded-lg">
                            <h5 className="font-medium text-success-700 flex items-center mb-2">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Strengths
                            </h5>
                            <ul className="space-y-1 text-sm text-success-800">
                              {aiFeedback.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-success-500">•</span>
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 bg-warning-50 border border-warning-100 rounded-lg">
                            <h5 className="font-medium text-warning-700 flex items-center mb-2">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Areas for Improvement
                            </h5>
                            <ul className="space-y-1 text-sm text-warning-800">
                              {aiFeedback.improvements.map((improvement, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-warning-500">•</span>
                                  <span>{improvement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="p-3 bg-primary-50 border border-primary-100 rounded-lg">
                          <h5 className="font-medium text-primary-700 flex items-center mb-2">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Tips for Next Time
                          </h5>
                          <ul className="space-y-1 text-sm text-primary-800">
                            {aiFeedback.tips.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-primary-500">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {currentPracticeQuestion.sampleAnswer && (
                          <div className="p-3 bg-secondary-50 border border-secondary-100 rounded-lg">
                            <h5 className="font-medium text-secondary-700 flex items-center mb-2">
                              <Star className="w-4 h-4 mr-2" />
                              Sample Strong Answer
                            </h5>
                            <p className="text-sm text-secondary-800">
                              {currentPracticeQuestion.sampleAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPracticeMode(false);
                          setShowFeedback(false);
                        }}
                        icon={<ChevronLeft className="w-4 h-4" />}
                      >
                        Back to Questions
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowFeedback(false);
                          setPracticeAnswer('');
                        }}
                        icon={<RefreshCw className="w-4 h-4" />}
                      >
                        Try Again
                      </Button>
                      <Button
                        onClick={saveSession}
                        icon={<Save className="w-4 h-4" />}
                      >
                        Save Session
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>
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
            <h2 className="text-2xl font-bold text-gray-900">AI Interview Coach</h2>
            <p className="text-gray-600">
              {userRole === 'candidate' 
                ? 'Practice interviews and get AI feedback to improve your skills'
                : 'Generate interview questions and evaluate candidate responses'
              }
            </p>
          </div>
        </div>
        {jobTitle && (
          <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium">
            {jobTitle}
          </div>
        )}
      </div>

      {showTips && (
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Interview Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Research the company and position thoroughly before the interview</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                  <span>Prepare specific examples from your experience to demonstrate your skills</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5" />
                  <span>Practice your answers out loud to improve delivery and confidence</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => setShowTips(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </Card>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'questions'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Questions</span>
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'practice'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Practice Sessions</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'analytics'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search questions..."
                  icon={<Search className="w-4 h-4" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Categories</option>
                  <option value="technical">Technical</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="experience">Experience</option>
                  <option value="company">Company</option>
                  <option value="situational">Situational</option>
                </select>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <Button
                  variant="outline"
                  onClick={generateQuestions}
                  loading={isGenerating}
                  icon={<Zap className="w-4 h-4" />}
                >
                  Generate More
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setShowQuestionDetails(showQuestionDetails === question.id ? null : question.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
                            {question.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          {question.isCustom && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              Custom
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900">{question.question}</h3>
                      </div>
                      <div className="flex items-center ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            startPractice(question);
                          }}
                        >
                          Practice
                        </Button>
                        {showQuestionDetails === question.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                        )}
                      </div>
                    </div>
                  </div>

                  {showQuestionDetails === question.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      {question.tips && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
                          <p className="text-sm text-gray-700">{question.tips}</p>
                        </div>
                      )}
                      
                      {question.sampleAnswer && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Sample Answer</h4>
                          <p className="text-sm text-gray-700">{question.sampleAnswer}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex space-x-3">
                        <Button
                          size="sm"
                          onClick={() => startPractice(question)}
                          icon={<Video className="w-4 h-4" />}
                        >
                          Practice Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Save className="w-4 h-4" />}
                        >
                          Save Question
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Add Custom Question</h3>
            <div className="flex space-x-3">
              <Input
                placeholder="Enter your custom interview question..."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={addCustomQuestion}
                disabled={!customQuestion.trim()}
                icon={<Plus className="w-4 h-4" />}
              >
                Add
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Practice Sessions Tab */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-6">Practice History</h3>
            
            {savedSessions.length > 0 ? (
              <div className="space-y-4">
                {savedSessions.map((session) => (
                  <div key={session.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Session on {new Date(session.date).toLocaleDateString()}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.duration} minutes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{session.questions.length} questions</span>
                          </div>
                          {session.feedback && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{session.feedback.score}/100</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" icon={<FileText className="w-4 h-4" />}>
                          View Details
                        </Button>
                        {session.recording && (
                          <Button variant="outline" size="sm" icon={<Play className="w-4 h-4" />}>
                            Play Recording
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {session.feedback && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm">
                        <div className="bg-success-50 p-2 rounded">
                          <h5 className="font-medium text-success-700 mb-1">Strengths</h5>
                          <ul className="list-disc list-inside text-success-800 space-y-1">
                            {session.feedback.strengths.map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-warning-50 p-2 rounded">
                          <h5 className="font-medium text-warning-700 mb-1">Areas to Improve</h5>
                          <ul className="list-disc list-inside text-warning-800 space-y-1">
                            {session.feedback.improvements.map((improvement, i) => (
                              <li key={i}>{improvement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Practice Sessions Yet</h3>
                <p className="text-gray-600 mb-6">
                  Practice answering interview questions to see your history here
                </p>
                <Button
                  onClick={() => setActiveTab('questions')}
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  Browse Questions
                </Button>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Schedule Mock Interview</h3>
            <p className="text-gray-600 mb-4">
              Book a full mock interview with AI feedback and detailed analysis
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <h4 className="font-medium text-gray-900 mb-2">Basic</h4>
                <p className="text-sm text-gray-600 mb-4">30-minute session with standard questions</p>
                <Button variant="outline" fullWidth>Schedule</Button>
              </div>
              <div className="p-4 border-2 border-primary-500 rounded-lg text-center relative">
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                  POPULAR
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Professional</h4>
                <p className="text-sm text-gray-600 mb-4">45-minute session with job-specific questions</p>
                <Button fullWidth>Schedule</Button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <h4 className="font-medium text-gray-900 mb-2">Advanced</h4>
                <p className="text-sm text-gray-600 mb-4">60-minute session with technical assessment</p>
                <Button variant="outline" fullWidth>Schedule</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">85</div>
                <div className="text-sm text-gray-600">Average Score</div>
                <div className="text-xs text-success-600 mt-1">+5 from last month</div>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full mb-3">
                  <Clock className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                <div className="text-sm text-gray-600">Practice Sessions</div>
                <div className="text-xs text-success-600 mt-1">+3 from last month</div>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mb-3">
                  <MessageSquare className="w-6 h-6 text-accent-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">48</div>
                <div className="text-sm text-gray-600">Questions Practiced</div>
                <div className="text-xs text-success-600 mt-1">+15 from last month</div>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Performance by Question Type</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Technical</span>
                  <span className="text-sm font-medium text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Behavioral</span>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Experience</span>
                  <span className="text-sm font-medium text-gray-900">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Situational</span>
                  <span className="text-sm font-medium text-gray-900">73%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Improvement Areas</h3>
            <div className="space-y-3">
              <div className="p-3 bg-warning-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-warning-600" />
                  <h4 className="font-medium text-warning-700">Specific Examples</h4>
                </div>
                <p className="text-sm text-warning-700">
                  Your answers could benefit from more specific, quantifiable examples of your achievements.
                </p>
              </div>
              
              <div className="p-3 bg-warning-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-warning-600" />
                  <h4 className="font-medium text-warning-700">Technical Depth</h4>
                </div>
                <p className="text-sm text-warning-700">
                  Consider providing more in-depth explanations of technical concepts to demonstrate expertise.
                </p>
              </div>
              
              <div className="p-3 bg-success-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <h4 className="font-medium text-success-700">Communication</h4>
                </div>
                <p className="text-sm text-success-700">
                  Your communication style is clear and concise, which is a significant strength.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Audio element for playback (hidden) */}
      <audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
    </div>
  );
};

export default AIInterviewCoach;