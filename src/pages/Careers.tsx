import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  Zap, 
  Award, 
  TrendingUp,
  Coffee,
  Gamepad2,
  Plane,
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  experience: string;
  description: string;
  requirements: string[];
  posted: string;
}

const Careers: React.FC = () => {
  const openings: JobOpening[] = [
    {
      id: '1',
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'full-time',
      experience: '5+ years',
      description: 'Lead the development of our AI matching algorithms and machine learning models.',
      requirements: ['Python', 'TensorFlow', 'Machine Learning', 'NLP', 'Distributed Systems'],
      posted: '2024-01-15',
    },
    {
      id: '2',
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'full-time',
      experience: '3+ years',
      description: 'Design intuitive user experiences that help people find their dream jobs.',
      requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'UX/UI'],
      posted: '2024-01-14',
    },
    {
      id: '3',
      title: 'Frontend Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'full-time',
      experience: '3+ years',
      description: 'Build beautiful, responsive interfaces using React and modern web technologies.',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Testing'],
      posted: '2024-01-13',
    },
    {
      id: '4',
      title: 'Data Scientist',
      department: 'Data',
      location: 'Austin, TX',
      type: 'full-time',
      experience: '4+ years',
      description: 'Analyze user behavior and job market trends to improve our matching algorithms.',
      requirements: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization'],
      posted: '2024-01-12',
    },
    {
      id: '5',
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Los Angeles, CA',
      type: 'full-time',
      experience: '4+ years',
      description: 'Drive growth and brand awareness through innovative marketing campaigns.',
      requirements: ['Digital Marketing', 'Analytics', 'Content Strategy', 'SEO', 'Social Media'],
      posted: '2024-01-11',
    },
    {
      id: '6',
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Chicago, IL',
      type: 'full-time',
      experience: '2+ years',
      description: 'Help our enterprise customers succeed and grow with our platform.',
      requirements: ['Customer Success', 'Communication', 'SaaS', 'Project Management', 'Analytics'],
      posted: '2024-01-10',
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness programs',
    },
    {
      icon: Plane,
      title: 'Unlimited PTO',
      description: 'Take the time you need to recharge and spend time with loved ones',
    },
    {
      icon: TrendingUp,
      title: 'Equity & Growth',
      description: 'Stock options and clear career progression paths for all employees',
    },
    {
      icon: Coffee,
      title: 'Remote-First',
      description: 'Work from anywhere with flexible hours and home office stipend',
    },
    {
      icon: Award,
      title: 'Learning Budget',
      description: '$2,000 annual budget for courses, conferences, and skill development',
    },
    {
      icon: Gamepad2,
      title: 'Work-Life Balance',
      description: 'Flexible schedules, mental health support, and team building events',
    },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We push boundaries and embrace new technologies to solve complex problems.',
    },
    {
      title: 'People-Centric',
      description: 'Every decision we make prioritizes the impact on our users and team members.',
    },
    {
      title: 'Transparency',
      description: 'We believe in open communication, honest feedback, and shared knowledge.',
    },
    {
      title: 'Continuous Learning',
      description: 'We invest in growth, encourage experimentation, and learn from failures.',
    },
  ];

  const departments = [...new Set(openings.map(job => job.department))];

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
              Join Our{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Mission
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Help us revolutionize how people find meaningful work. Join a team of passionate 
              innovators building the future of AI-powered career matching.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600">6</div>
                <div className="text-sm text-gray-600">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">100%</div>
                <div className="text-sm text-gray-600">Remote Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning-600">$2K</div>
                <div className="text-sm text-gray-600">Learning Budget</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              The principles that guide our work and shape our culture
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Why You'll Love Working Here
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We believe in taking care of our team so they can do their best work
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Open Positions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Find your next opportunity and help us build the future of work
            </motion.p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" size="sm">All Departments</Button>
            {departments.map((dept) => (
              <Button key={dept} variant="ghost" size="sm">
                {dept}
              </Button>
            ))}
          </div>

          <div className="space-y-6">
            {openings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span className="capitalize">{job.type.replace('-', ' ')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{job.experience}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.slice(0, 4).map((req, reqIndex) => (
                              <span
                                key={reqIndex}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                              >
                                {req}
                              </span>
                            ))}
                            {job.requirements.length > 4 && (
                              <span className="text-gray-500 text-xs font-medium">
                                +{job.requirements.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:ml-8 flex flex-col items-end space-y-3">
                      <div className="text-sm text-gray-500">
                        Posted {new Date(job.posted).toLocaleDateString()}
                      </div>
                      <Button icon={<ArrowRight className="w-4 h-4" />}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Hiring Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We've designed a fair, transparent process that respects your time
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Application',
                description: 'Submit your application through our platform',
                icon: Briefcase,
              },
              {
                step: '2',
                title: 'Initial Review',
                description: 'Our team reviews your background and experience',
                icon: Users,
              },
              {
                step: '3',
                title: 'Interview',
                description: 'Video interview with the hiring manager and team',
                icon: Shield,
              },
              {
                step: '4',
                title: 'Decision',
                description: 'We make a decision within 5 business days',
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
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
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our mission to transform how people find meaningful work. 
              We're looking for passionate individuals who want to shape the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50"
              >
                View All Positions
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;