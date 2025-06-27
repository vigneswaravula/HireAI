import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, X, Award, Brain } from 'lucide-react';
import { SkillAssessment as SkillAssessmentType, AssessmentQuestion } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface SkillAssessmentProps {
  skill: string;
  onComplete: (assessment: SkillAssessmentType) => void;
}

const SkillAssessment: React.FC<SkillAssessmentProps> = ({ skill, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock questions - in real app, these would come from an API
  const questions: AssessmentQuestion[] = [
    {
      id: '1',
      question: 'What is the virtual DOM in React?',
      options: [
        'A copy of the real DOM kept in memory',
        'A JavaScript library for DOM manipulation',
        'A browser API for virtual reality',
        'A CSS framework for styling'
      ],
      correctAnswer: 0,
      explanation: 'The virtual DOM is a programming concept where a "virtual" representation of the UI is kept in memory and synced with the "real" DOM.'
    },
    {
      id: '2',
      question: 'Which hook is used for side effects in React?',
      options: [
        'useState',
        'useEffect',
        'useContext',
        'useReducer'
      ],
      correctAnswer: 1,
      explanation: 'useEffect is the hook used for performing side effects in functional components.'
    },
    {
      id: '3',
      question: 'What is JSX?',
      options: [
        'A JavaScript framework',
        'A syntax extension for JavaScript',
        'A CSS preprocessor',
        'A database query language'
      ],
      correctAnswer: 1,
      explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
    },
    {
      id: '4',
      question: 'How do you pass data from parent to child component?',
      options: [
        'Using state',
        'Using props',
        'Using context',
        'Using refs'
      ],
      correctAnswer: 1,
      explanation: 'Props are used to pass data from parent components to child components in React.'
    },
    {
      id: '5',
      question: 'What is the purpose of keys in React lists?',
      options: [
        'To style list items',
        'To help React identify which items have changed',
        'To sort the list',
        'To filter the list'
      ],
      correctAnswer: 1,
      explanation: 'Keys help React identify which items have changed, are added, or are removed, improving performance.'
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleComplete();
    }
  }, [timeLeft, isCompleted]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / questions.length) * 100;
    
    const assessment: SkillAssessmentType = {
      id: Date.now().toString(),
      skill,
      score: Math.round(score),
      maxScore: 100,
      completedAt: new Date().toISOString(),
      questions: questions.map((q, index) => ({
        ...q,
        userAnswer: answers[index]
      }))
    };

    setTimeout(() => {
      setShowResults(true);
      onComplete(assessment);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! You have strong knowledge in this skill.';
    if (score >= 60) return 'Good job! You have a solid understanding with room for improvement.';
    return 'Keep learning! Consider reviewing the fundamentals of this skill.';
  };

  if (showResults) {
    const score = Math.round((answers.filter((answer, index) => answer === questions[index].correctAnswer).length / questions.length) * 100);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Award className="w-10 h-10 text-primary-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
          <p className="text-gray-600">Here are your results for {skill}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className="text-gray-600 mb-4">{getScoreMessage(score)}</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full ${score >= 80 ? 'bg-success-500' : score >= 60 ? 'bg-warning-500' : 'bg-error-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Question Review</h3>
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-success-100' : 'bg-error-100'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-success-600" />
                    ) : (
                      <X className="w-4 h-4 text-error-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                    <div className="space-y-1">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${
                            optionIndex === question.correctAnswer
                              ? 'bg-success-100 text-success-800'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'bg-error-100 text-error-800'
                              : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-2 text-success-600">✓ Correct</span>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <span className="ml-2 text-error-600">✗ Your answer</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="mt-3 p-3 bg-blue-50 rounded text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  if (isCompleted) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Brain className="w-10 h-10 text-primary-600 animate-pulse" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Results...</h2>
        <p className="text-gray-600">Please wait while we calculate your score</p>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{skill} Assessment</h2>
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="font-mono">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <motion.div
          className="bg-primary-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <div className="text-sm text-gray-500">
          {answers.filter(a => a !== undefined).length} of {questions.length} answered
        </div>
        
        <Button
          onClick={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            } else {
              handleComplete();
            }
          }}
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </Card>
  );
};

export default SkillAssessment;