import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, MessageSquare, User, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Message, User as UserType } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface MessageCenterProps {
  currentUserId: string;
}

const MessageCenter: React.FC<MessageCenterProps> = ({ currentUserId }) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { users } = useSelector((state: RootState) => state.users);
  
  // Mock messages data - in real app, this would come from Redux store
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      receiverId: currentUserId,
      content: 'Hi! I saw your application for the Frontend Developer position. I\'d like to schedule an interview.',
      timestamp: '2024-01-16T10:30:00Z',
      read: false,
      applicationId: '1',
    },
    {
      id: '2',
      senderId: currentUserId,
      receiverId: '2',
      content: 'Thank you for reaching out! I\'m very interested in the position. When would be a good time for the interview?',
      timestamp: '2024-01-16T11:15:00Z',
      read: true,
      applicationId: '1',
    },
    {
      id: '3',
      senderId: '2',
      receiverId: currentUserId,
      content: 'How about tomorrow at 2 PM? We can do it via video call.',
      timestamp: '2024-01-16T11:45:00Z',
      read: false,
      applicationId: '1',
    },
  ]);

  // Get unique conversations
  const conversations = messages.reduce((acc, message) => {
    const otherUserId = message.senderId === currentUserId ? message.receiverId : message.senderId;
    if (!acc.find(conv => conv.userId === otherUserId)) {
      const lastMessage = messages
        .filter(m => m.senderId === otherUserId || m.receiverId === otherUserId)
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
             (m.senderId === currentUserId && m.receiverId === selectedConversation)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];

  const selectedUser = selectedConversation ? users.find(u => u.id === selectedConversation) : null;

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: selectedConversation,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Messages</h3>
            <Input
              placeholder="Search conversations..."
              icon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
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
                            {conv.unreadCount > 0 && (
                              <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {conv.lastMessage.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(conv.lastMessage.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageSquare className="w-12 h-12 mb-2" />
                <p>No conversations found</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          {selectedConversation && selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{selectedUser.role}</p>
                  </div>
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
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === currentUserId
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="flex items-center justify-end mt-1">
                        <Clock className="w-3 h-3 mr-1 opacity-70" />
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Button onClick={sendMessage} icon={<Send className="w-4 h-4" />}>
                    Send
                  </Button>
                </div>
              </div>
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

export default MessageCenter;