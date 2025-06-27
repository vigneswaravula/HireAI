import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, Brain } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../../store/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    dispatch(loginStart());
    
    // Simulate API call
    setTimeout(() => {
      // Determine role based on email for demo
      let role: 'candidate' | 'employer' | 'admin' = 'candidate';
      
      if (data.email.includes('admin') || data.email === 'admin@hireai.com') {
        role = 'admin';
      } else if (data.email.includes('employer') || data.email.includes('company') || data.email.includes('hr')) {
        role = 'employer';
      }
      
      const mockUser = {
        id: '1',
        email: data.email,
        firstName: role === 'admin' ? 'Admin' : role === 'employer' ? 'Sarah' : 'John',
        lastName: role === 'admin' ? 'User' : role === 'employer' ? 'Wilson' : 'Doe',
        role: role,
        createdAt: new Date().toISOString(),
      };
      
      dispatch(loginSuccess({ 
        user: mockUser, 
        token: 'mock-jwt-token' 
      }));
      
      // Navigate based on role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate(`/dashboard/${role}`);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HireAI</span>
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
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
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  {...register('remember')}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isSubmitting}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Demo accounts for testing:
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Job Seeker:</strong> candidate@example.com</p>
              <p><strong>Employer:</strong> employer@company.com</p>
              <p><strong>Admin:</strong> admin@hireai.com</p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Create one now
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;