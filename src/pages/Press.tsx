import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ExternalLink, 
  Download, 
  Mail, 
  Phone,
  Award,
  TrendingUp,
  Users,
  Globe,
  FileText,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface PressRelease {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: 'funding' | 'product' | 'partnership' | 'award' | 'milestone';
  link: string;
}

interface MediaMention {
  id: string;
  outlet: string;
  title: string;
  date: string;
  type: 'article' | 'interview' | 'podcast' | 'video';
  link: string;
  logo?: string;
}

const Press: React.FC = () => {
  const pressReleases: PressRelease[] = [
    {
      id: '1',
      title: 'HireAI Raises $25M Series A to Revolutionize AI-Powered Job Matching',
      date: '2024-01-15',
      excerpt: 'Leading venture capital firms invest in our mission to transform how people find meaningful work through artificial intelligence.',
      category: 'funding',
      link: '#',
    },
    {
      id: '2',
      title: 'HireAI Launches Advanced Resume Verification System',
      date: '2024-01-10',
      excerpt: 'New AI-powered verification technology helps employers build trust and reduces hiring fraud by 90%.',
      category: 'product',
      link: '#',
    },
    {
      id: '3',
      title: 'HireAI Partners with Top Universities for Campus Recruitment',
      date: '2024-01-05',
      excerpt: 'Strategic partnerships with 50+ universities to help students transition from education to meaningful careers.',
      category: 'partnership',
      link: '#',
    },
    {
      id: '4',
      title: 'HireAI Named "Best AI Innovation" at TechCrunch Disrupt 2023',
      date: '2023-12-20',
      excerpt: 'Recognition for our groundbreaking approach to solving unemployment and skills gaps through AI technology.',
      category: 'award',
      link: '#',
    },
    {
      id: '5',
      title: 'HireAI Reaches 1 Million Successful Job Matches',
      date: '2023-12-15',
      excerpt: 'Platform milestone demonstrates the power of AI in creating meaningful connections between talent and opportunity.',
      category: 'milestone',
      link: '#',
    },
  ];

  const mediaMentions: MediaMention[] = [
    {
      id: '1',
      outlet: 'TechCrunch',
      title: 'How HireAI is Using AI to Solve the Skills Gap Crisis',
      date: '2024-01-12',
      type: 'article',
      link: '#',
    },
    {
      id: '2',
      outlet: 'Forbes',
      title: 'The Future of Recruitment: AI-Powered Job Matching',
      date: '2024-01-08',
      type: 'article',
      link: '#',
    },
    {
      id: '3',
      outlet: 'The Wall Street Journal',
      title: 'Startup Spotlight: HireAI CEO on Transforming Careers',
      date: '2024-01-05',
      type: 'interview',
      link: '#',
    },
    {
      id: '4',
      outlet: 'Wired',
      title: 'AI in HR: How Machine Learning is Changing Hiring',
      date: '2023-12-28',
      type: 'article',
      link: '#',
    },
    {
      id: '5',
      outlet: 'Harvard Business Review',
      title: 'The Ethics of AI in Recruitment and Hiring',
      date: '2023-12-20',
      type: 'article',
      link: '#',
    },
    {
      id: '6',
      outlet: 'Y Combinator Podcast',
      title: 'Building the Future of Work with AI',
      date: '2023-12-15',
      type: 'podcast',
      link: '#',
    },
  ];

  const stats = [
    { label: 'Press Mentions', value: '150+', icon: FileText },
    { label: 'Media Outlets', value: '50+', icon: Globe },
    { label: 'Awards Won', value: '12', icon: Award },
    { label: 'Industry Reports', value: '25+', icon: TrendingUp },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'funding': return TrendingUp;
      case 'product': return Award;
      case 'partnership': return Users;
      case 'award': return Award;
      case 'milestone': return TrendingUp;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'funding': return 'bg-success-100 text-success-700';
      case 'product': return 'bg-primary-100 text-primary-700';
      case 'partnership': return 'bg-secondary-100 text-secondary-700';
      case 'award': return 'bg-warning-100 text-warning-700';
      case 'milestone': return 'bg-accent-100 text-accent-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'interview': return Users;
      case 'podcast': return Users;
      case 'video': return Video;
      default: return FileText;
    }
  };

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
              Press &{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Media
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Stay updated with the latest news, announcements, and media coverage about HireAI's 
              mission to transform the future of work through artificial intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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

      {/* Press Contact */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Media Inquiries</h3>
                <p className="text-gray-600 mb-6">
                  For press inquiries, interview requests, or media kit access, please contact our press team.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-900">press@hireai.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-900">+1 (555) 123-PRESS</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Media Kit</h3>
                <p className="text-gray-600 mb-6">
                  Download our media kit containing logos, product screenshots, executive bios, and company information.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                    Download Media Kit
                  </Button>
                  <Button variant="ghost" icon={<ImageIcon className="w-4 h-4" />}>
                    High-Res Images
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Latest Press Releases
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Official announcements and company updates
            </motion.p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        {React.createElement(getCategoryIcon(release.category), {
                          className: "w-6 h-6 text-primary-600"
                        })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {release.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(release.date).toLocaleDateString()}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(release.category)}`}>
                              {release.category.charAt(0).toUpperCase() + release.category.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-700">{release.excerpt}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Media Coverage
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              See what industry leaders and media outlets are saying about HireAI
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaMentions.map((mention, index) => (
              <motion.div
                key={mention.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {React.createElement(getTypeIcon(mention.type), {
                        className: "w-5 h-5 text-gray-600"
                      })}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-600 text-sm mb-1">
                        {mention.outlet}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(mention.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2">
                    {mention.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 capitalize">
                      {mention.type}
                    </span>
                    <Button variant="ghost" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                      Read
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our press updates and be the first to know about our latest announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button size="lg">
                Subscribe
              </Button>
            </div>
          </motion.div>
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
              Want to Feature HireAI?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always happy to share our story and insights about the future of AI in recruitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50"
                icon={<Mail className="w-5 h-5" />}
              >
                Contact Press Team
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                icon={<Download className="w-5 h-5" />}
              >
                Download Media Kit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Press;