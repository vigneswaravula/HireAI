import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Clock, MessageSquare, Briefcase, Calendar, User, CheckCircle, AlertCircle, Info, Trash2, AreaChart as MarkAsUnread } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { Notification } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'messages' | 'jobs'>('all');
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock notifications based on user role
    if (user) {
      const mockNotifications: Notification[] = user.role === 'candidate' ? [
        {
          id: '1',
          userId: user.id,
          type: 'job_match',
          title: 'New Job Match Found!',
          message: '3 new jobs match your profile perfectly. Check them out now.',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          actionUrl: '/dashboard/candidate?tab=recommended',
        },
        {
          id: '2',
          userId: user.id,
          type: 'message',
          title: 'New Message from TechCorp',
          message: 'Sarah Wilson sent you a message about the Senior Developer position.',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          actionUrl: '/dashboard/candidate?tab=messages',
        },
        {
          id: '3',
          userId: user.id,
          type: 'status_update',
          title: 'Application Status Updated',
          message: 'Your application for Frontend Developer at StartupXYZ has been reviewed.',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          actionUrl: '/dashboard/candidate?tab=applications',
        },
        {
          id: '4',
          userId: user.id,
          type: 'application',
          title: 'Interview Invitation',
          message: 'You have been invited for an interview at DataFlow Inc. Please confirm your availability.',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
          actionUrl: '/dashboard/candidate?tab=interviews',
        },
      ] : [
        {
          id: '1',
          userId: user.id,
          type: 'application',
          title: 'New Application Received',
          message: 'John Smith applied for the Senior Frontend Developer position.',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
          actionUrl: '/dashboard/employer?tab=applications',
        },
        {
          id: '2',
          userId: user.id,
          type: 'message',
          title: 'New Message from Candidate',
          message: 'Alice Brown sent you a message regarding the UX Designer role.',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
          actionUrl: '/dashboard/employer?tab=messages',
        },
        {
          id: '3',
          userId: user.id,
          type: 'status_update',
          title: 'Interview Reminder',
          message: 'You have an interview scheduled with Mike Johnson tomorrow at 2:00 PM.',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
          actionUrl: '/dashboard/employer?tab=interviews',
        },
      ];
      
      setNotifications(mockNotifications);
    }
  }, [user]);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'messages') return notification.type === 'message';
    if (filter === 'jobs') return notification.type === 'job_match' || notification.type === 'application';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      onClose();
      navigate(notification.actionUrl);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'job_match':
        return Briefcase;
      case 'application':
        return User;
      case 'status_update':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'text-blue-600 bg-blue-100';
      case 'job_match':
        return 'text-green-600 bg-green-100';
      case 'application':
        return 'text-purple-600 bg-purple-100';
      case 'status_update':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-md h-[600px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread' },
                { id: 'messages', label: 'Messages' },
                { id: 'jobs', label: 'Jobs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex-1 px-3 py-1 text-sm font-medium rounded transition-colors ${
                    filter === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="px-4 py-2 border-b border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                icon={<CheckCircle className="w-4 h-4" />}
              >
                Mark all as read
              </Button>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-1 p-2">
                {filteredNotifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const colorClasses = getNotificationColor(notification.type);
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 group ${
                        !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className="text-xs text-gray-500">
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <div className="flex items-center mt-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-xs text-blue-600 font-medium">New</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bell className="w-12 h-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-sm text-center">
                  {filter === 'unread' 
                    ? "You're all caught up!" 
                    : "We'll notify you when something happens"}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationCenter;