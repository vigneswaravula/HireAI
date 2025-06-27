import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, Shield, Brain } from 'lucide-react';
import { loginStart, loginSuccess } from '../../store/slices/authSlice';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AdminLoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginForm>();

  const onSubmit = async (data: AdminLoginForm) => {
    setError('');
    dispatch(loginStart());
    
    // Simulate API call
    try {
      // For demo purposes, only allow specific admin credentials
      if (data.email === 'admin@hireai.com' && data.password === 'admin123') {
        const mockUser = {
          id: 'admin1',
          email: data.email,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin' as const,
          createdAt: new Date().toISOString(),
        };
        
        setTimeout(() => {
          dispatch(loginSuccess({ 
            user: mockUser, 
            token: 'mock-jwt-token-admin' 
          }));
          
          navigate('/admin');
        }, 1000);
      } else {
        setTimeout(() => {
          setError('Invalid admin credentials');
        }, 1000);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HireAI Admin</span>
          </div>
          
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              Secure access to the admin dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  {...register('remember')}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isSubmitting}
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
            >
              Sign In to Admin Panel
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p><strong>Demo Admin Account:</strong></p>
              <p>Email: admin@hireai.com</p>
              <p>Password: admin123</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Return to{' '}
              <a
                href="/"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Main Site
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;