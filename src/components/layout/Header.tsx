import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Brain, Menu, X, User, LogOut, Settings, Building, Shield, Bell } from 'lucide-react';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import Button from '../ui/Button';
import NotificationCenter from '../notifications/NotificationCenter';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileMenuOpen(false);
  };

  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/companies', label: 'Companies' },
    { path: '/about', label: 'About' },
  ];

  // Mock notification count
  const unreadNotifications = 3;

  return (
    <header className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg"
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900">HireAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${
                  location.pathname === link.path
                    ? 'text-primary-600'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Notification Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                </div>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    <div className={`w-8 h-8 ${
                      user.role === 'employer' ? 'bg-secondary-100' : 
                      user.role === 'admin' ? 'bg-red-100' : 'bg-primary-100'
                    } rounded-full flex items-center justify-center`}>
                      {user.role === 'employer' ? (
                        <Building className={`w-4 h-4 text-secondary-600`} />
                      ) : user.role === 'admin' ? (
                        <Shield className={`w-4 h-4 text-red-600`} />
                      ) : (
                        <User className={`w-4 h-4 text-primary-600`} />
                      )}
                    </div>
                    <span>{user.firstName}</span>
                    {user.role === 'employer' && (
                      <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded">
                        Employer
                      </span>
                    )}
                    {user.role === 'admin' && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    >
                      {user.role === 'admin' ? (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4 inline mr-2" />
                          Admin Panel
                        </Link>
                      ) : (
                        <Link
                          to={`/dashboard/${user.role}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 inline mr-2" />
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Job Seeker
                    </Button>
                  </Link>
                  <Link to="/employer-login">
                    <Button variant="outline" size="sm" icon={<Building className="w-4 h-4" />}>
                      Employer
                    </Button>
                  </Link>
                </div>
                <Link to="/register">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${
                    location.pathname === link.path
                      ? 'text-primary-600'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  {/* Mobile Notifications */}
                  <button
                    onClick={() => {
                      setShowNotifications(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 mb-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                    {unreadNotifications > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>

                  {user.role === 'admin' ? (
                    <Link
                      to="/admin"
                      className="block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link
                      to={`/dashboard/${user.role}`}
                      className="block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" fullWidth>
                      Job Seeker Login
                    </Button>
                  </Link>
                  <Link to="/employer-login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" fullWidth icon={<Building className="w-4 h-4" />}>
                      Employer Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" fullWidth>
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </header>
  );
};

export default Header;