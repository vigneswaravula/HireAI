import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor, Users, MessageSquare, Settings, SwordIcon as Record, StopCircle, Camera, Volume2, VolumeX, Maximize, Minimize, Clock, FileText, Star, CheckCircle, AlertCircle, Calendar, User, Briefcase } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface VideoInterviewPlatformProps {
  interviewId: string;
  participantRole: 'interviewer' | 'candidate';
  interviewData: {
    jobTitle: string;
    company: string;
    candidateName: string;
    interviewerName: string;
    scheduledTime: string;
    duration: number;
  };
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

interface InterviewNote {
  id: string;
  timestamp: string;
  content: string;
  rating?: number;
  category: 'technical' | 'communication' | 'experience' | 'general';
}

const VideoInterviewPlatform: React.FC<VideoInterviewPlatformProps> = ({
  interviewId,
  participantRole,
  interviewData
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notes, setNotes] = useState<InterviewNote[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [noteCategory, setNoteCategory] = useState<InterviewNote['category']>('general');
  const [noteRating, setNoteRating] = useState<number>(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Mock interview questions for the interviewer
  const interviewQuestions = [
    "Tell me about your experience with React and TypeScript.",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "How do you approach testing in your development process?",
    "What's your experience with state management libraries?",
    "How do you stay updated with the latest technologies?",
    "Describe your ideal work environment.",
    "How do you handle tight deadlines and changing requirements?",
    "What questions do you have about our company or the role?"
  ];

  useEffect(() => {
    // Simulate video stream with a placeholder
    if (videoRef.current) {
      videoRef.current.poster = "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startInterview = () => {
    setInterviewStarted(true);
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  };

  const endInterview = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setInterviewEnded(true);
    setShowFeedback(true);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: participantRole === 'interviewer' ? interviewData.interviewerName : interviewData.candidateName,
      message: chatMessage,
      timestamp: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
  };

  const addNote = () => {
    if (!currentNote.trim()) return;

    const newNote: InterviewNote = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      content: currentNote,
      category: noteCategory,
      rating: noteRating > 0 ? noteRating : undefined,
    };

    setNotes(prev => [...prev, newNote]);
    setCurrentNote('');
    setNoteRating(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-primary-100 text-primary-700';
      case 'communication': return 'bg-secondary-100 text-secondary-700';
      case 'experience': return 'bg-accent-100 text-accent-700';
      case 'general': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const submitFeedback = () => {
    alert(`Feedback submitted! Rating: ${feedbackRating}/5`);
    setShowFeedback(false);
  };

  if (interviewEnded && !showFeedback) {
    return (
      <Card className="max-w-4xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 text-success-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Completed</h2>
        <p className="text-gray-600 mb-6">
          Thank you for participating in the interview for {interviewData.jobTitle} at {interviewData.company}.
        </p>
        <div className="max-w-md mx-auto">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Duration:</strong> {formatTime(elapsedTime)}</p>
              <p><strong>Notes Taken:</strong> {notes.length}</p>
              <p><strong>Next Steps:</strong> You will receive feedback within 2-3 business days</p>
            </div>
          </div>
          <div className="flex space-x-4 justify-center">
            <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>
              Schedule Follow-up
            </Button>
            <Button icon={<FileText className="w-4 h-4" />}>
              View Summary
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (showFeedback) {
    return (
      <Card className="max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Interview Feedback</h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">How would you rate this interview experience?</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFeedbackRating(rating)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    feedbackRating >= rating ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Star className={`w-6 h-6 ${feedbackRating >= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Share your thoughts about the interview process..."
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFeedback(false)}
              fullWidth
            >
              Skip
            </Button>
            <Button
              onClick={submitFeedback}
              fullWidth
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (!interviewStarted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Preparation</h2>
          <p className="text-gray-600 mb-6">
            Get ready for your interview for {interviewData.jobTitle} at {interviewData.company}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-5 h-5 text-primary-600" />
                <h3 className="font-medium text-gray-900">
                  {participantRole === 'interviewer' ? 'Candidate' : 'Interviewer'}
                </h3>
              </div>
              <p className="text-gray-700">
                {participantRole === 'interviewer' ? interviewData.candidateName : interviewData.interviewerName}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Briefcase className="w-5 h-5 text-secondary-600" />
                <h3 className="font-medium text-gray-900">Position</h3>
              </div>
              <p className="text-gray-700">{interviewData.jobTitle}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-5 h-5 text-accent-600" />
                <h3 className="font-medium text-gray-900">Scheduled Time</h3>
              </div>
              <p className="text-gray-700">{new Date(interviewData.scheduledTime).toLocaleString()}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-warning-600" />
                <h3 className="font-medium text-gray-900">Duration</h3>
              </div>
              <p className="text-gray-700">{interviewData.duration} minutes</p>
            </div>
          </div>

          <div className="space-y-4 max-w-md mx-auto mb-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success-600" />
              <span className="text-gray-700">Your camera and microphone are working properly</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success-600" />
              <span className="text-gray-700">Internet connection is stable</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-warning-600" />
              <span className="text-gray-700">Find a quiet place with good lighting</span>
            </div>
          </div>

          {participantRole === 'interviewer' && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 max-w-md mx-auto mb-8">
              <h3 className="font-medium text-primary-900 mb-2">Suggested Questions</h3>
              <ul className="space-y-2 text-sm text-primary-800">
                {interviewQuestions.slice(0, 4).map((question, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-primary-700 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {participantRole === 'candidate' && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 max-w-md mx-auto mb-8">
              <h3 className="font-medium text-primary-900 mb-2">Interview Tips</h3>
              <ul className="space-y-2 text-sm text-primary-800">
                <li className="flex items-start space-x-2">
                  <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-primary-700 mt-0.5">
                    1
                  </span>
                  <span>Prepare specific examples of your past work experiences</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-primary-700 mt-0.5">
                    2
                  </span>
                  <span>Research the company and position thoroughly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-primary-700 mt-0.5">
                    3
                  </span>
                  <span>Prepare questions to ask the interviewer</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-primary-700 mt-0.5">
                    4
                  </span>
                  <span>Be concise and specific in your answers</span>
                </li>
              </ul>
            </div>
          )}

          <Button size="lg" onClick={startInterview} icon={<Video className="w-5 h-5" />}>
            Start Interview
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={`bg-gray-900 text-white rounded-xl overflow-hidden ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="p-4 flex items-center justify-between bg-gray-800">
        <div className="flex items-center space-x-3">
          <Video className="w-5 h-5 text-primary-400" />
          <div>
            <h3 className="font-medium">{interviewData.jobTitle} Interview</h3>
            <p className="text-sm text-gray-400">{interviewData.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 px-3 py-1 rounded-full flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{formatTime(elapsedTime)}</span>
          </div>
          {isRecording && (
            <div className="bg-error-900 px-3 py-1 rounded-full flex items-center space-x-2">
              <Record className="w-4 h-4 text-error-400" />
              <span className="text-sm text-error-400">REC</span>
            </div>
          )}
          <button
            onClick={toggleFullScreen}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isFullScreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
        {/* Main Video Area */}
        <div className="lg:col-span-2 bg-black relative">
          <video
            ref={videoRef}
            className={`w-full h-full object-cover ${!isVideoOn ? 'hidden' : ''}`}
            autoPlay
            muted
            playsInline
          />
          
          {!isVideoOn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-500" />
              </div>
            </div>
          )}

          {/* Self View */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-gray-800 bg-opacity-80 rounded-full px-4 py-2">
            <button
              onClick={toggleAudio}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-error-600 hover:bg-error-700'
              }`}
            >
              {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleVideo}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-error-600 hover:bg-error-700'
              }`}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleScreenShare}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isScreenSharing ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>
            
            {participantRole === 'interviewer' && (
              <button
                onClick={toggleRecording}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isRecording ? 'bg-error-600 hover:bg-error-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isRecording ? <StopCircle className="w-5 h-5" /> : <Record className="w-5 h-5" />}
              </button>
            )}
            
            <button
              onClick={endInterview}
              className="w-10 h-10 bg-error-600 hover:bg-error-700 rounded-full flex items-center justify-center"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-gray-800 border-l border-gray-700">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => { setShowChat(true); setShowNotes(false); }}
              className={`flex-1 py-3 text-sm font-medium ${
                showChat ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </div>
            </button>
            
            {participantRole === 'interviewer' && (
              <button
                onClick={() => { setShowNotes(true); setShowChat(false); }}
                className={`flex-1 py-3 text-sm font-medium ${
                  showNotes ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Notes</span>
                </div>
              </button>
            )}
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`py-3 px-4 text-sm font-medium ${
                showSettings ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {showChat && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{message.sender}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{message.message}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button onClick={sendChatMessage} variant="primary">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showNotes && participantRole === 'interviewer' && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(note.category)}`}>
                        {note.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{note.content}</p>
                    {note.rating && (
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < note.rating! ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-700 space-y-3">
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Add interview notes..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                
                <div className="flex items-center space-x-3">
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value as InterviewNote['category'])}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="technical">Technical</option>
                    <option value="communication">Communication</option>
                    <option value="experience">Experience</option>
                    <option value="general">General</option>
                  </select>
                  
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setNoteRating(rating)}
                        className="text-gray-400 hover:text-yellow-400"
                      >
                        <Star className={`w-5 h-5 ${noteRating >= rating ? 'text-yellow-400 fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button onClick={addNote} fullWidth>
                  Add Note
                </Button>
              </div>
            </div>
          )}

          {showSettings && (
            <div className="p-4 space-y-4">
              <h3 className="font-medium text-lg mb-4">Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Video Source</h4>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>FaceTime HD Camera</option>
                    <option>External Webcam</option>
                  </select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Audio Source</h4>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>Built-in Microphone</option>
                    <option>Headset Microphone</option>
                  </select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Speaker</h4>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>Built-in Speakers</option>
                    <option>Headphones</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Background Blur</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Noise Suppression</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" fullWidth>
                    Test Audio & Video
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoInterviewPlatform;