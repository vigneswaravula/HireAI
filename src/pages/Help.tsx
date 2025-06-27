import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronRight,
  MessageSquare,
  Mail,
  Phone,
  Book,
  Video,
  FileText,
  Users,
  Zap,
  Shield,
  Settings,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  articles: number;
}

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories: HelpCategory[] = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Learn the basics of using HireAI',
      icon: Book,
      articles: 12,
    },
    {
      id: 'job-search',
      name: 'Job Search',
      description: 'Tips for finding and applying to jobs',
      icon: Search,
      articles: 18,
    },
    {
      id: 'ai-features',
      name: 'AI Features',
      description: 'Understanding our AI-powered tools',
      icon: Zap,
      articles: 15,
    },
    {
      id: 'profile',
      name: 'Profile & Resume',
      description: 'Managing your profile and resume',
      icon: Users,
      articles: 10,
    },
    {
      id: 'employers',
      name: 'For Employers',
      description: 'Posting jobs and managing applications',
      icon: Settings,
      articles: 14,
    },
    {
      id: 'billing',
      name: 'Billing & Plans',
      description: 'Subscription and payment questions',
      icon: CreditCard,
      articles: 8,
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      description: 'Data protection and account security',
      icon: Shield,
      articles: 6,
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      description: 'Common issues and solutions',
      icon: HelpCircle,
      articles: 9,
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How does HireAI\'s job matching work?',
      answer: 'Our AI analyzes your skills, experience, preferences, and career goals to match you with relevant job opportunities. The system considers factors like skill compatibility, salary expectations, location preferences, and company culture to provide personalized recommendations.',
      category: 'ai-features',
    },
    {
      id: '2',
      question: 'Is HireAI free to use?',
      answer: 'Yes! Job seekers can use HireAI completely free, including creating profiles, applying to jobs, and using our AI matching features. We offer premium features for enhanced functionality, but the core platform is always free for candidates.',
      category: 'billing',
    },
    {
      id: '3',
      question: 'How do I improve my match score?',
      answer: 'To improve your match score: 1) Complete your profile with detailed work experience, 2) Add relevant skills and take skill assessments, 3) Upload a comprehensive resume, 4) Set accurate job preferences, and 5) Keep your profile updated with new experiences.',
      category: 'profile',
    },
    {
      id: '4',
      question: 'Can I apply to jobs without creating an account?',
      answer: 'You can browse our public job board without an account, but you\'ll need to create a free account to apply for positions. This allows us to provide personalized recommendations and track your application status.',
      category: 'getting-started',
    },
    {
      id: '5',
      question: 'How does the one-click apply feature work?',
      answer: 'One-click apply uses your complete profile information to automatically fill job applications. Our AI generates personalized cover letters based on the job description and your background, which you can review and edit before submitting.',
      category: 'job-search',
    },
    {
      id: '6',
      question: 'What information do employers see about me?',
      answer: 'Employers see your public profile information including your resume, skills, work experience, and education. Personal contact information is only shared after you apply to their job or they express interest in your profile.',
      category: 'privacy',
    },
    {
      id: '7',
      question: 'How do I post a job as an employer?',
      answer: 'Create an employer account, complete your company profile, then use our job posting tool. You can set requirements, describe the role, and our AI will help optimize your posting to attract the right candidates.',
      category: 'employers',
    },
    {
      id: '8',
      question: 'Why am I not getting interview invitations?',
      answer: 'Common reasons include: incomplete profile, skills mismatch with applied jobs, outdated resume, or applying to positions outside your experience level. Try taking skill assessments, updating your profile, and applying to jobs with higher match scores.',
      category: 'troubleshooting',
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
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
              How Can We{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Help?
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Find answers to common questions, browse our knowledge base, or get in touch with our support team.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                icon={<Search className="w-5 h-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="text-center">
              <MessageSquare className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <Button size="sm">Start Chat</Button>
            </Card>
            
            <Card hover className="text-center">
              <Mail className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <Button variant="outline" size="sm">Send Email</Button>
            </Card>
            
            <Card hover className="text-center">
              <Video className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Watch step-by-step guides</p>
              <Button variant="outline" size="sm">Watch Videos</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Browse by Category
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Find help articles organized by topic
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full cursor-pointer" onClick={() => setSelectedCategory(category.id)}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4">
                    <category.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="text-sm text-primary-600 font-medium">
                    {category.articles} articles
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Quick answers to the most common questions
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Questions
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or browse all categories
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Still Need Help?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Our support team is here to help you succeed
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <MessageSquare className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Available 24/7 for instant support</p>
              <Button>Start Chat</Button>
            </Card>

            <Card className="text-center">
              <Mail className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Response within 24 hours</p>
              <Button variant="outline">Send Email</Button>
            </Card>

            <Card className="text-center">
              <Phone className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Mon-Fri, 9AM-6PM PST</p>
              <Button variant="outline">Call Us</Button>
            </Card>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found success with HireAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50"
              >
                Create Free Account
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Help;