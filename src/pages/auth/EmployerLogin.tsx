import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, Building, Brain } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../../store/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface EmployerLoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const EmployerLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployerLoginForm>();

  const onSubmit = async (data: EmployerLoginForm) => {
    dispatch(loginStart());
    
    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email: data.email,
        firstName: 'Sarah',
        lastName: 'Wilson',
        role: 'employer' as const,
        company: 'TechCorp Inc.',
        createdAt: new Date().toISOString(),
      };
      
      dispatch(loginSuccess({ 
        user: mockUser, 
        token: 'mock-jwt-token-employer' 
      }));
      
      navigate('/dashboard/employer');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-secondary-600 to-primary-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HireAI</span>
          </Link>
          
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
              <Building className="w-8 h-8 text-secondary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Employer Portal
            </h1>
            <p className="text-gray-600">
              Sign in to manage your job postings and find top talent
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Company Email"
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
                  className="w-4 h-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500"
                  {...register('remember')}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-secondary-600 hover:text-secondary-500"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isSubmitting}
              variant="secondary"
            >
              Sign In to Employer Portal
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p><strong>Demo Account:</strong></p>
              <p>Email: employer@company.com</p>
              <p>Password: password123</p>
            </div>
            <p className="text-sm text-gray-600">
              Don't have an employer account?{' '}
              <Link
                to="/register?role=employer"
                className="font-medium text-secondary-600 hover:text-secondary-500"
              >
                Create one now
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Looking for jobs?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Job Seeker Login
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-secondary-600 hover:text-secondary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-secondary-600 hover:text-secondary-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployerLogin;