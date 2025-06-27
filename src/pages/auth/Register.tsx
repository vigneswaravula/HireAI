import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, User, Brain, Building } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../../store/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'candidate' | 'employer';
  terms: boolean;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    defaultValues: {
      role: (searchParams.get('role') as 'candidate' | 'employer') || 'candidate',
    },
  });

  const selectedRole = watch('role');
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    dispatch(loginStart());
    
    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        createdAt: new Date().toISOString(),
      };
      
      dispatch(loginSuccess({ 
        user: mockUser, 
        token: 'mock-jwt-token' 
      }));
      
      navigate(`/dashboard/${data.role}`);
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
            Create Your Account
          </h1>
          <p className="text-gray-600 mb-6">
            Join thousands of professionals using AI to find their perfect match
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setValue('role', 'candidate')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedRole === 'candidate'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Job Seeker</div>
                <div className="text-xs text-gray-500">Find opportunities</div>
              </button>
              
              <button
                type="button"
                onClick={() => setValue('role', 'employer')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedRole === 'employer'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Employer</div>
                <div className="text-xs text-gray-500">Post jobs</div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                icon={<User className="w-4 h-4" />}
                error={errors.firstName?.message}
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                })}
              />

              <Input
                label="Last Name"
                icon={<User className="w-4 h-4" />}
                error={errors.lastName?.message}
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                })}
              />
            </div>

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
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: 'Password must contain uppercase, lowercase, number and special character',
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

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                icon={<Lock className="w-4 h-4" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                {...register('terms', {
                  required: 'You must agree to the terms and conditions',
                })}
              />
              <div className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </div>
            </div>
            {errors.terms && (
              <p className="text-sm text-error-600">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isSubmitting}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;