import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Search, 
  MessageSquare, 
  User, 
  Clock, 
  Paperclip,
  Download,
  Eye,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Phone,
  Video,
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Message, User as UserType } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface EnhancedMessageCenterProps {
  currentUserId: string;
}

interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  category: 'interview' | 'application' | 'general';
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

const EnhancedMessageCenter: React.FC<EnhancedMessageCenterProps> = ({ currentUserId }) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { users } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Mock messages with welcome messages and attachments
  const [messages, setMessages] = useState<(Message & { attachments?: Attachment[] })[]>([
    // Welcome message for new users
    {
      id: 'welcome-1',
      senderId: 'system',
      receiverId: currentUserId,
      content: `Welcome to HireAI! 🎉\n\nWe're excited to have you join our platform. Here are some tips to get started:\n\n• Complete your profile for better job matches\n• Upload your resume for quick applications\n• Set up job alerts for your preferred roles\n\nIf you have any questions, feel free to reach out to our support team. Good luck with your job search!`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: false,
    },
    {
      id: '1',
      senderId: '2',
      receiverId: currentUserId,
      content: 'Hi! I saw your application for the Frontend Developer position. I\'d like to schedule an interview. Are you available next week?',
      timestamp: '2024-01-16T10:30:00Z',
      read: false,
      attachments: [
        {
          id: 'att1',
          name: 'Job_Description.pdf',
          size: '245 KB',
          type: 'pdf',
          url: '#'
        }
      ]
    },
    {
      id: '2',
      senderId: currentUserId,
      receiverId: '2',
      content: 'Thank you for reaching out! I\'m very interested in the position. I\'m available Monday through Wednesday next week. What time works best for you?',
      timestamp: '2024-01-16T11:15:00Z',
      read: true,
    },
    {
      id: '3',
      senderId: '2',
      receiverId: currentUserId,
      content: 'Perfect! How about Tuesday at 2 PM? We can do it via video call. I\'ll send you the meeting link.',
      timestamp: '2024-01-16T11:45:00Z',
      read: false,
    },
  ]);

  const messageTemplates: MessageTemplate[] = [
    {
      id: '1',
      title: 'Interview Invitation',
      content: 'Hi [Candidate Name],\n\nThank you for your application for the [Position] role. We were impressed with your background and would like to invite you for an interview.\n\nWould you be available for a [Duration] interview on [Date] at [Time]? We can conduct this via [Video Call/Phone/In-person].\n\nPlease let me know your availability.\n\nBest regards,\n[Your Name]',
      category: 'interview'
    },
    {
      id: '2',
      title: 'Application Acknowledgment',
      content: 'Dear [Candidate Name],\n\nThank you for your interest in the [Position] role at [Company]. We have received your application and our team is currently reviewing it.\n\nWe will be in touch within [Timeframe] to update you on the next steps.\n\nBest regards,\n[Your Name]',
      category: 'application'
    },
    {
      id: '3',
      title: 'Follow-up Message',
      content: 'Hi [Candidate Name],\n\nI wanted to follow up on our previous conversation regarding the [Position] role. Do you have any questions about the position or our company?\n\nI\'m here to help with any information you might need.\n\nBest regards,\n[Your Name]',
      category: 'general'
    },
    {
      id: '4',
      title: 'Interview Confirmation',
      content: 'Hi [Interviewer Name],\n\nThank you for the interview invitation for the [Position] role. I confirm my availability for [Date] at [Time].\n\nI look forward to discussing how I can contribute to your team.\n\nBest regards,\n[Your Name]',
      category: 'interview'
    }
  ];

  // Get unique conversations
  const conversations = messages.reduce((acc, message) => {
    if (message.senderId === 'system') return acc; // Skip system messages in conversation list
    
    const otherUserId = message.senderId === currentUserId ? message.receiverId : message.senderId;
    if (!acc.find(conv => conv.userId === otherUserId)) {
      const lastMessage = messages
        .filter(m => (m.senderId === otherUserId || m.receiverId === otherUserId) && m.senderId !== 'system')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      
      const unreadCount = messages.filter(
        m => m.senderId === otherUserId && m.receiverId === currentUserId && !m.read
      ).length;

      acc.push({
        userId: otherUserId,
        lastMessage,
        unreadCount,
      });
    }
    return acc;
  }, [] as Array<{ userId: string; lastMessage: Message; unreadCount: number }>);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => {
    const user = users.find(u => u.id === conv.userId);
    if (!user) return false;
    
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get messages for selected conversation
  const conversationMessages = selectedConversation
    ? messages.filter(
        m => (m.senderId === selectedConversation && m.receiverId === currentUserId) ||
             (m.senderId === currentUserId && m.receiverId === selectedConversation) ||
             (m.senderId === 'system' && m.receiverId === currentUserId)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : messages.filter(m => m.senderId === 'system').sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const selectedUser = selectedConversation ? users.find(u => u.id === selectedConversation) : null;

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message & { attachments?: Attachment[] } = {
      id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: selectedConversation || 'system',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setAttachments([]);
  };

  const useTemplate = (template: MessageTemplate) => {
    setNewMessage(template.content);
    setShowTemplates(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        type: file.type.split('/')[1] || 'file',
        url: URL.createObjectURL(file)
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(m => m.id === messageId ? { ...m, read: true } : m)
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
      {/* Conversations List */}
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
              <Button variant="ghost" size="sm" icon={<MoreVertical className="w-4 h-4" />} />
            </div>
            <Input
              placeholder="Search conversations..."
              icon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* System/Welcome Messages */}
            <div 
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation === null ? 'bg-primary-50 border-l-4 border-primary-500' : ''
              }`}
              onClick={() => setSelectedConversation(null)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">HireAI Support</p>
                    <span className="text-xs text-gray-500">Welcome</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    Welcome to HireAI! Get started with your job search...
                  </p>
                </div>
              </div>
            </div>

            {filteredConversations.length > 0 ? (
              <div className="space-y-1 p-2">
                {filteredConversations.map((conv) => {
                  const user = users.find(u => u.id === conv.userId);
                  if (!user) return null;

                  return (
                    <motion.div
                      key={conv.userId}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conv.userId ? 'bg-primary-50 border border-primary-200' : ''
                      }`}
                      onClick={() => {
                        setSelectedConversation(conv.userId);
                        // Mark messages as read
                        messages
                          .filter(m => m.senderId === conv.userId && !m.read)
                          .forEach(m => markAsRead(m.id));
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">
                              {user.firstName} {user.lastName}
                            </p>
                            <div className="flex items-center space-x-2">
                              {conv.unreadCount > 0 && (
                                <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                                  {conv.unreadCount}
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {formatTime(conv.lastMessage.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {conv.lastMessage.content}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {user.role === 'employer' ? 'Employer' : 'Candidate'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <MessageSquare className="w-12 h-12 mb-2" />
                <p className="text-center">No conversations found</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          {selectedConversation || selectedConversation === null ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      {selectedUser ? (
                        <User className="w-5 h-5 text-primary-600" />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : 'HireAI Support'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedUser ? selectedUser.role : 'Always here to help'}
                      </p>
                    </div>
                  </div>
                  {selectedUser && (
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" icon={<Phone className="w-4 h-4" />} />
                      <Button variant="ghost" size="sm" icon={<Video className="w-4 h-4" />} />
                      <Button variant="ghost" size="sm" icon={<Calendar className="w-4 h-4" />} />
                    </div>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.senderId === currentUserId ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.senderId === currentUserId
                            ? 'bg-primary-600 text-white'
                            : message.senderId === 'system'
                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 border border-blue-200'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-sm flex-1">{attachment.name}</span>
                                <span className="text-xs opacity-75">{attachment.size}</span>
                                <Button variant="ghost" size="sm" icon={<Download className="w-3 h-3" />} />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-end mt-1">
                          <Clock className="w-3 h-3 mr-1 opacity-70" />
                          <span className="text-xs opacity-70">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              {selectedUser && (
                <div className="p-4 border-t">
                  {/* Attachments Preview */}
                  {attachments.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                          <Paperclip className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">{attachment.name}</span>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                        placeholder="Type your message..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" icon={<Paperclip className="w-4 h-4" />} />
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(!showTemplates)}
                        icon={<MessageSquare className="w-4 h-4" />}
                      />
                      <Button onClick={sendMessage} icon={<Send className="w-4 h-4" />} />
                    </div>
                  </div>

                  {/* Message Templates */}
                  {showTemplates && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Message Templates</h5>
                      <div className="space-y-2">
                        {messageTemplates
                          .filter(template => 
                            user?.role === 'employer' ? 
                            ['interview', 'application', 'general'].includes(template.category) :
                            ['interview', 'general'].includes(template.category)
                          )
                          .map((template) => (
                          <button
                            key={template.id}
                            onClick={() => useTemplate(template)}
                            className="w-full text-left p-2 text-sm bg-white rounded border hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{template.title}</div>
                            <div className="text-gray-600 truncate">{template.content.substring(0, 60)}...</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare className="w-16 h-16 mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p>Choose a conversation from the list to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EnhancedMessageCenter;