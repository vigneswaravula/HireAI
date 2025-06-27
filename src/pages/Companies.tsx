import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  ExternalLink, 
  Building, 
  TrendingUp,
  Award,
  Globe,
  Filter,
  ChevronDown,
  Heart,
  Eye,
  Briefcase
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  rating: number;
  reviewCount: number;
  openJobs: number;
  founded: string;
  specialties: string[];
  benefits: string[];
  culture: string[];
  featured: boolean;
  verified: boolean;
  followers: number;
  employees: string[];
}

const Companies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock companies data
  const companies: Company[] = [
    {
      id: '1',
      name: 'TechCorp',
      description: 'Leading technology company building the future of AI and machine learning solutions.',
      industry: 'Technology',
      size: '1000-5000',
      location: 'San Francisco, CA',
      website: 'https://techcorp.com',
      rating: 4.8,
      reviewCount: 1247,
      openJobs: 23,
      founded: '2015',
      specialties: ['Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'Data Analytics'],
      benefits: ['Health Insurance', 'Remote Work', '401k Match', 'Stock Options', 'Unlimited PTO'],
      culture: ['Innovation', 'Collaboration', 'Work-Life Balance', 'Diversity & Inclusion'],
      featured: true,
      verified: true,
      followers: 15420,
      employees: ['John Smith', 'Sarah Wilson', 'Mike Johnson'],
    },
    {
      id: '2',
      name: 'DataFlow Inc',
      description: 'Data analytics platform helping businesses make informed decisions with real-time insights.',
      industry: 'Data & Analytics',
      size: '500-1000',
      location: 'New York, NY',
      website: 'https://dataflow.com',
      rating: 4.6,
      reviewCount: 892,
      openJobs: 15,
      founded: '2018',
      specialties: ['Data Science', 'Business Intelligence', 'Analytics', 'Visualization'],
      benefits: ['Health Insurance', 'Flexible Hours', '401k', 'Learning Budget', 'Gym Membership'],
      culture: ['Data-Driven', 'Fast-Paced', 'Learning Culture', 'Team Collaboration'],
      featured: true,
      verified: true,
      followers: 8930,
      employees: ['Alice Brown', 'David Lee'],
    },
    {
      id: '3',
      name: 'StartupXYZ',
      description: 'Fast-growing fintech startup revolutionizing digital payments and financial services.',
      industry: 'Fintech',
      size: '50-200',
      location: 'Austin, TX',
      website: 'https://startupxyz.com',
      rating: 4.4,
      reviewCount: 234,
      openJobs: 8,
      founded: '2020',
      specialties: ['Fintech', 'Payments', 'Blockchain', 'Mobile Apps'],
      benefits: ['Equity', 'Health Insurance', 'Remote Work', 'Learning Budget'],
      culture: ['Startup Energy', 'Innovation', 'Agile', 'Growth Mindset'],
      featured: false,
      verified: true,
      followers: 3420,
      employees: ['Emma Davis'],
    },
    {
      id: '4',
      name: 'DesignStudio',
      description: 'Creative design agency specializing in brand identity and digital experiences.',
      industry: 'Design & Creative',
      size: '10-50',
      location: 'Los Angeles, CA',
      website: 'https://designstudio.com',
      rating: 4.7,
      reviewCount: 156,
      openJobs: 5,
      founded: '2017',
      specialties: ['UI/UX Design', 'Brand Identity', 'Digital Marketing', 'Creative Strategy'],
      benefits: ['Creative Freedom', 'Flexible Hours', 'Health Insurance', 'Design Tools'],
      culture: ['Creativity', 'Collaboration', 'Client Focus', 'Innovation'],
      featured: false,
      verified: true,
      followers: 2180,
      employees: ['Lisa Chen'],
    },
    {
      id: '5',
      name: 'CloudTech',
      description: 'Cloud infrastructure company providing scalable solutions for modern businesses.',
      industry: 'Cloud Computing',
      size: '200-500',
      location: 'Seattle, WA',
      website: 'https://cloudtech.com',
      rating: 4.5,
      reviewCount: 445,
      openJobs: 12,
      founded: '2016',
      specialties: ['Cloud Infrastructure', 'DevOps', 'Kubernetes', 'Microservices'],
      benefits: ['Stock Options', 'Health Insurance', 'Remote Work', '401k', 'Conference Budget'],
      culture: ['Technical Excellence', 'Continuous Learning', 'Open Source', 'Innovation'],
      featured: false,
      verified: true,
      followers: 6750,
      employees: ['Robert Kim'],
    },
    {
      id: '6',
      name: 'WebSolutions',
      description: 'Full-service web development agency creating custom solutions for businesses.',
      industry: 'Web Development',
      size: '50-200',
      location: 'Chicago, IL',
      website: 'https://websolutions.com',
      rating: 4.3,
      reviewCount: 298,
      openJobs: 7,
      founded: '2014',
      specialties: ['Web Development', 'E-commerce', 'CMS', 'Mobile Apps'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Professional Development', 'Team Events'],
      culture: ['Client Success', 'Quality Code', 'Team Work', 'Continuous Improvement'],
      featured: false,
      verified: false,
      followers: 1890,
      employees: ['Jennifer White'],
    },
  ];

  const industries = [
    'Technology',
    'Data & Analytics',
    'Fintech',
    'Design & Creative',
    'Cloud Computing',
    'Web Development',
    'Healthcare',
    'E-commerce',
    'Education',
    'Marketing',
  ];

  const companySizes = [
    '1-10',
    '10-50',
    '50-200',
    '200-500',
    '500-1000',
    '1000-5000',
    '5000+',
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchTerm === '' || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    const matchesSize = sizeFilter === 'all' || company.size === sizeFilter;
    const matchesLocation = locationFilter === '' ||
      company.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
  });

  const featuredCompanies = filteredCompanies.filter(company => company.featured);
  const regularCompanies = filteredCompanies.filter(company => !company.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Discover Amazing{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Companies
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Explore top companies, learn about their culture, and find your perfect workplace match
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search companies, industries, or technologies..."
                    icon={<Search className="w-5 h-5" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>
                <Button
                  size="lg"
                  onClick={() => setShowFilters(!showFilters)}
                  icon={<Filter className="w-5 h-5" />}
                  variant="outline"
                  className="md:w-auto"
                >
                  Filters
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{companies.length}+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600">
                {companies.reduce((sum, company) => sum + company.openJobs, 0)}+
              </div>
              <div className="text-sm text-gray-600">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600">{industries.length}+</div>
              <div className="text-sm text-gray-600">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning-600">
                {companies.filter(c => c.verified).length}
              </div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Sizes</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size} employees</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  placeholder="City, State"
                  icon={<MapPin className="w-4 h-4" />}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setIndustryFilter('all');
                    setSizeFilter('all');
                    setLocationFilter('');
                  }}
                  fullWidth
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Companies */}
        {featuredCompanies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Companies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card hover className="h-full bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {company.logo ? (
                          <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                        ) : (
                          <Building className="w-8 h-8 text-primary-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                          {company.verified && (
                            <Award className="w-5 h-5 text-primary-600" title="Verified Company" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{company.industry} • {company.size} employees</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{company.rating}</span>
                            <span>({company.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{company.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{company.description}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-1">
                          {company.specialties.slice(0, 3).map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-white text-primary-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                          {company.specialties.length > 3 && (
                            <span className="text-xs text-gray-600">
                              +{company.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-primary-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{company.openJobs} open jobs</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{company.followers.toLocaleString()} followers</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" icon={<Heart className="w-4 h-4" />}>
                          Follow
                        </Button>
                        <Button size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                          View Jobs
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Companies */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {featuredCompanies.length > 0 ? 'All Companies' : 'Companies'}
            </h2>
            <p className="text-gray-600">
              {filteredCompanies.length} companies found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                      ) : (
                        <Building className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{company.name}</h3>
                        {company.verified && (
                          <Award className="w-4 h-4 text-primary-600" title="Verified Company" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{company.industry}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{company.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{company.rating}</span>
                        <span className="text-gray-500">({company.reviewCount})</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{company.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {company.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                      {company.specialties.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{company.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{company.openJobs}</span> open jobs
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                        View
                      </Button>
                      <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                        Jobs
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all companies
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setIndustryFilter('all');
                setSizeFilter('all');
                setLocationFilter('');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredCompanies.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Companies
            </Button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join These Amazing Companies?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Create your profile and let AI match you with the perfect company culture and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=candidate">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50"
              >
                Find Your Dream Job
              </Button>
            </Link>
            <Link to="/register?role=employer">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Post Your Company
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;