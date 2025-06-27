import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Tag,
  TrendingUp,
  Brain,
  Users,
  Briefcase,
  Target,
  Lightbulb
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI in Recruitment: Trends to Watch in 2024',
      excerpt: 'Explore the latest developments in AI-powered recruitment and how they\'re reshaping the hiring landscape.',
      content: 'Full article content...',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'CEO & Co-Founder',
      },
      publishedAt: '2024-01-15',
      readTime: 8,
      category: 'AI & Technology',
      tags: ['AI', 'Recruitment', 'Future of Work', 'Technology'],
      featured: true,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      title: 'How to Build a Standout Resume in the AI Era',
      excerpt: 'Learn how to optimize your resume for AI-powered applicant tracking systems and human recruiters.',
      content: 'Full article content...',
      author: {
        name: 'Emily Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Head of Product',
      },
      publishedAt: '2024-01-12',
      readTime: 6,
      category: 'Career Advice',
      tags: ['Resume', 'Career Tips', 'Job Search', 'AI'],
      featured: false,
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      title: 'The Psychology of Job Matching: Why Culture Fit Matters',
      excerpt: 'Understanding the importance of cultural alignment in creating successful long-term employment relationships.',
      content: 'Full article content...',
      author: {
        name: 'Dr. Michael Rodriguez',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'CTO & Co-Founder',
      },
      publishedAt: '2024-01-10',
      readTime: 10,
      category: 'Workplace Culture',
      tags: ['Culture', 'Psychology', 'Hiring', 'Employee Retention'],
      featured: true,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      title: 'Remote Work Revolution: Adapting Hiring for Distributed Teams',
      excerpt: 'Best practices for hiring and onboarding remote employees in the post-pandemic world.',
      content: 'Full article content...',
      author: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Head of AI',
      },
      publishedAt: '2024-01-08',
      readTime: 7,
      category: 'Remote Work',
      tags: ['Remote Work', 'Hiring', 'Distributed Teams', 'Future of Work'],
      featured: false,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '5',
      title: 'Skill-Based Hiring: Moving Beyond Traditional Qualifications',
      excerpt: 'Why companies are shifting focus from degrees to demonstrable skills and how to adapt.',
      content: 'Full article content...',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'CEO & Co-Founder',
      },
      publishedAt: '2024-01-05',
      readTime: 9,
      category: 'Hiring Trends',
      tags: ['Skills', 'Hiring', 'Education', 'Talent Acquisition'],
      featured: false,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '6',
      title: 'Diversity and Inclusion in AI-Powered Recruitment',
      excerpt: 'Ensuring fairness and reducing bias in automated hiring processes.',
      content: 'Full article content...',
      author: {
        name: 'Emily Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Head of Product',
      },
      publishedAt: '2024-01-03',
      readTime: 11,
      category: 'Diversity & Inclusion',
      tags: ['Diversity', 'Inclusion', 'AI Ethics', 'Bias', 'Fairness'],
      featured: false,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const categories = [
    'AI & Technology',
    'Career Advice',
    'Workplace Culture',
    'Remote Work',
    'Hiring Trends',
    'Diversity & Inclusion',
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI & Technology': return Brain;
      case 'Career Advice': return Target;
      case 'Workplace Culture': return Users;
      case 'Remote Work': return Briefcase;
      case 'Hiring Trends': return TrendingUp;
      case 'Diversity & Inclusion': return Users;
      default: return Lightbulb;
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
              HireAI{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Blog
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Insights, trends, and expert advice on the future of work, AI in recruitment, 
              and building successful careers in the digital age.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <Input
                placeholder="Search articles, topics, or tags..."
                icon={<Search className="w-5 h-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-lg"
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Posts
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  icon={React.createElement(getCategoryIcon(category), { className: "w-4 h-4" })}
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Articles</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card hover className="h-full overflow-hidden">
                    <div className="aspect-video bg-gray-200 mb-6">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                            <p className="text-xs text-gray-600">{post.author.role}</p>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
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
      )}

      {/* All Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {featuredPosts.length > 0 ? 'Latest Articles' : 'All Articles'}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="aspect-video bg-gray-200 mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">{post.author.name}</span>
                    </div>
                    
                    <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      Read
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all articles
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
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
              Stay in the Loop
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest insights on AI, recruitment, and the future of work delivered to your inbox.
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
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Put these insights into action and discover your perfect career match with HireAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register?role=candidate">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/jobs">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;