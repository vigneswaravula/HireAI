import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Zap, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Star,
  CheckCircle,
  Briefcase,
  Target,
  Building,
  Shield
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import JobCard from '../components/jobs/JobCard';
import { Job } from '../types';

const Home: React.FC = () => {
  // Mock featured jobs data
  const featuredJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 120000, max: 180000, currency: '$' },
      description: 'Join our team to build cutting-edge web applications...',
      requirements: ['React', 'TypeScript', '5+ years experience'],
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      experience: '5+ years',
      postedAt: '2024-01-15',
      deadline: '2024-02-15',
      employerId: 'emp1',
      applicants: 42,
      remote: true,
    },
    {
      id: '2',
      title: 'AI/ML Engineer',
      company: 'DataFlow Inc',
      location: 'Remote',
      type: 'full-time',
      salary: { min: 140000, max: 200000, currency: '$' },
      description: 'Work on cutting-edge AI projects...',
      requirements: ['Python', 'TensorFlow', 'PhD preferred'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'ML'],
      experience: '3+ years',
      postedAt: '2024-01-14',
      deadline: '2024-02-14',
      employerId: 'emp2',
      applicants: 28,
      remote: true,
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'full-time',
      salary: { min: 110000, max: 160000, currency: '$' },
      description: 'Lead product strategy and development...',
      requirements: ['Product Management', 'MBA preferred', '4+ years'],
      skills: ['Strategy', 'Analytics', 'Leadership', 'Agile'],
      experience: '4+ years',
      postedAt: '2024-01-13',
      deadline: '2024-02-13',
      employerId: 'emp3',
      applicants: 35,
      remote: false,
    },
  ];

  const stats = [
    { label: 'Active Jobs', value: '12,000+', icon: Briefcase },
    { label: 'Companies', value: '2,500+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: Target },
    { label: 'AI Matches', value: '50,000+', icon: Zap },
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI analyzes your resume and matches you with the perfect job opportunities.',
    },
    {
      icon: Search,
      title: 'Smart Job Search',
      description: 'Find jobs that match your skills, experience, and career goals with intelligent filtering.',
    },
    {
      icon: Users,
      title: 'Top Companies',
      description: 'Connect with leading companies across industries looking for talented professionals.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Access tools and resources to accelerate your career development and professional growth.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Dream Job with{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Let artificial intelligence analyze your skills and match you with perfect job opportunities. 
              The future of job hunting is here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link to="/register?role=candidate">
                <Button size="lg" icon={<Search className="w-5 h-5" />}>
                  Find Jobs
                </Button>
              </Link>
              <Link to="/register?role=employer">
                <Button variant="secondary" size="lg" icon={<Building className="w-5 h-5" />}>
                  Post Jobs
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="lg" icon={<Shield className="w-5 h-5" />}>
                  Admin Panel
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-2">
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Choose HireAI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Experience the future of job searching with our AI-powered platform
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              >
                Featured Jobs
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600"
              >
                Discover top opportunities from leading companies
              </motion.p>
            </div>
            <Link to="/jobs">
              <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                View All Jobs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <JobCard job={job} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their dream jobs through our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register?role=candidate">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;