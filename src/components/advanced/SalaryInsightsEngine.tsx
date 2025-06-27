import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Briefcase, 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Brain, 
  Zap, 
  Target, 
  Award, 
  Building, 
  Globe, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle, 
  X
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SalaryInsightsEngineProps {
  userRole: 'candidate' | 'employer';
}

interface SalaryData {
  role: string;
  location: string;
  experience: string;
  median: number;
  range: [number, number];
  byExperience: {
    entry: number;
    mid: number;
    senior: number;
    lead: number;
  };
  byLocation: {
    [key: string]: number;
  };
  byCompanySize: {
    small: number;
    medium: number;
    large: number;
    enterprise: number;
  };
  trend: {
    [key: string]: number;
  };
  skills: {
    [key: string]: number;
  };
  benefits: {
    [key: string]: number;
  };
}

const SalaryInsightsEngine: React.FC<SalaryInsightsEngineProps> = ({ userRole }) => {
  const [searchRole, setSearchRole] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchExperience, setSearchExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [showTips, setShowTips] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchSalaryData = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData: SalaryData = {
        role: searchRole || 'Frontend Developer',
        location: searchLocation || 'San Francisco, CA',
        experience: searchExperience || 'Mid-Level (3-5 years)',
        median: 120000,
        range: [95000, 145000],
        byExperience: {
          entry: 85000,
          mid: 120000,
          senior: 150000,
          lead: 180000,
        },
        byLocation: {
          'San Francisco, CA': 140000,
          'New York, NY': 135000,
          'Seattle, WA': 130000,
          'Austin, TX': 115000,
          'Remote': 125000,
        },
        byCompanySize: {
          small: 105000,
          medium: 120000,
          large: 135000,
          enterprise: 145000,
        },
        trend: {
          '2020': 105000,
          '2021': 110000,
          '2022': 115000,
          '2023': 120000,
          '2024': 128000,
        },
        skills: {
          'React': 10000,
          'TypeScript': 8000,
          'Node.js': 7000,
          'GraphQL': 9000,
          'AWS': 12000,
        },
        benefits: {
          'Remote Work': 65,
          'Health Insurance': 95,
          'Unlimited PTO': 45,
          '401(k) Match': 75,
          'Stock Options': 55,
        },
      };
      
      setSalaryData(mockData);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Load initial data
    fetchSalaryData();
  }, []);

  const formatSalary = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const getCompensationAdvice = () => {
    if (userRole === 'candidate') {
      return [
        'Highlight specialized skills that command premium compensation',
        'Consider remote positions for companies based in high-paying markets',
        'Negotiate for equity in early-stage startups to maximize long-term value',
        'Request performance-based bonuses to increase total compensation',
      ];
    } else {
      return [
        'Offer competitive base salary with performance-based bonuses',
        'Highlight unique benefits and company culture to attract talent',
        'Consider location-based salary adjustments for remote workers',
        'Implement transparent salary bands to build trust with candidates',
      ];
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'skills', label: 'Skills Impact', icon: Award },
    { id: 'locations', label: 'Location Analysis', icon: MapPin },
    { id: 'benefits', label: 'Benefits Analysis', icon: Building },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-primary-600 animate-pulse" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Salary Data</h3>
          <p className="text-gray-600">Gathering market insights for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Salary Insights Engine</h2>
            <p className="text-gray-600">
              {userRole === 'candidate' 
                ? 'Discover your market value and compensation trends'
                : 'Analyze competitive compensation data for hiring'
              }
            </p>
          </div>
        </div>
      </div>

      {showTips && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Salary Negotiation Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {userRole === 'candidate' ? (
                  <>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                      <span>Research industry standards before discussing compensation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                      <span>Consider the total compensation package, not just base salary</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                      <span>Highlight specialized skills that command premium compensation</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                      <span>Offer competitive packages based on current market data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                      <span>Consider location-based adjustments for remote workers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-600 mt-0.5" />
                      <span>Highlight unique benefits to attract top talent</span>
                    </li>
                  </>
                )}
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning-600 mt-0.5" />
                  <span>Salary data varies by industry, company size, and location</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => setShowTips(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          <div className="flex-1">
            <Input
              label="Job Title"
              placeholder="e.g., Frontend Developer"
              icon={<Briefcase className="w-4 h-4" />}
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              label="Location"
              placeholder="e.g., San Francisco, CA"
              icon={<MapPin className="w-4 h-4" />}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={searchExperience}
              onChange={(e) => setSearchExperience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Experience Levels</option>
              <option value="Entry-Level">Entry-Level (0-2 years)</option>
              <option value="Mid-Level">Mid-Level (3-5 years)</option>
              <option value="Senior">Senior (5-8 years)</option>
              <option value="Lead">Lead/Principal (8+ years)</option>
            </select>
          </div>
          <div>
            <Button 
              onClick={fetchSalaryData} 
              icon={<Search className="w-4 h-4" />}
            >
              Analyze
            </Button>
          </div>
        </div>

        {salaryData && (
          <>
            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{formatSalary(salaryData.median)}</div>
                      <div className="text-sm text-gray-600">Median Annual Salary</div>
                      <div className="text-xs text-success-600 mt-1">+7% from last year</div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {formatSalary(salaryData.range[0])} - {formatSalary(salaryData.range[1])}
                      </div>
                      <div className="text-sm text-gray-600">Typical Salary Range</div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {formatSalary(salaryData.trend['2024'] - salaryData.trend['2023'])}
                      </div>
                      <div className="text-sm text-gray-600">Year-Over-Year Growth</div>
                      <div className="text-xs text-success-600 mt-1">
                        {Math.round(((salaryData.trend['2024'] - salaryData.trend['2023']) / salaryData.trend['2023']) * 100)}% increase
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Salary by Experience Level</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Entry Level (0-2 years)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byExperience.entry)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(salaryData.byExperience.entry / salaryData.byExperience.lead) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Mid Level (3-5 years)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byExperience.mid)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(salaryData.byExperience.mid / salaryData.byExperience.lead) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Senior Level (5-8 years)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byExperience.senior)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(salaryData.byExperience.senior / salaryData.byExperience.lead) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Lead/Principal (8+ years)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byExperience.lead)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Salary by Company Size</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Small (1-50 employees)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byCompanySize.small)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(salaryData.byCompanySize.small / salaryData.byCompanySize.enterprise) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Medium (51-500 employees)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byCompanySize.medium)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(salaryData.byCompanySize.medium / salaryData.byCompanySize.enterprise) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Large (501-5000 employees)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byCompanySize.large)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(salaryData.byCompanySize.large / salaryData.byCompanySize.enterprise) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Enterprise (5000+ employees)</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salaryData.byCompanySize.enterprise)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">Compensation Advice</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Zap className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Negotiation Strategies</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {getCompensationAdvice().map((advice, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{advice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Brain className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">AI Insights</h4>
                          <p className="text-sm text-gray-700">
                            {userRole === 'candidate' 
                              ? `Based on your profile, you could potentially earn ${formatSalary(salaryData.median + 15000)} by focusing on high-demand skills like GraphQL and AWS. Consider roles at mid-sized companies, which currently offer the best balance of compensation and benefits.`
                              : `To attract top talent in this role, consider offering above-median compensation (${formatSalary(salaryData.median + 10000)}) or emphasizing your benefits package. Remote work options can help you compete with larger companies.`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Market Trends Tab */}
            {activeTab === 'trends' && (
              <div className="space-y-6">
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">Salary Trends (5 Year History)</h3>
                  <div className="h-64 flex items-center justify-center">
                    <LineChart className="w-16 h-16 text-gray-300" />
                    <p className="text-gray-500 ml-4">Chart visualization would appear here</p>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {Object.entries(salaryData.trend).map(([year, salary], index) => (
                      <div key={year} className="text-center">
                        <div className="text-sm font-medium text-gray-900">{year}</div>
                        <div className="text-sm text-gray-600">{formatSalary(salary)}</div>
                        {index > 0 && (
                          <div className="text-xs text-success-600">
                            +{Math.round(((salary - Object.values(salaryData.trend)[index-1]) / Object.values(salaryData.trend)[index-1]) * 100)}%
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Industry Comparison</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Technology</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(130000)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Finance</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(125000)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Healthcare</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(115000)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">E-commerce</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(118000)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Education</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(95000)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '73%' }} />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Projected Growth (Next 3 Years)</h3>
                    <div className="h-48 flex items-center justify-center mb-4">
                      <LineChart className="w-16 h-16 text-gray-300" />
                      <p className="text-gray-500 ml-4">Chart visualization would appear here</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Growth Projection</h4>
                          <p className="text-sm text-gray-700">
                            {userRole === 'candidate'
                              ? `Salaries for ${salaryData.role} are projected to increase by 12-15% over the next 3 years, outpacing inflation.`
                              : `Expect to increase compensation budgets by 12-15% over the next 3 years to remain competitive for ${salaryData.role} roles.`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Skills Impact Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">Skills Premium Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    How specific skills affect compensation for {salaryData.role} roles
                  </p>
                  <div className="space-y-4">
                    {Object.entries(salaryData.skills).map(([skill, premium]) => (
                      <div key={skill}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{skill}</span>
                          <span className="text-sm font-medium text-success-600">+{formatSalary(premium)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-success-500 h-2 rounded-full" 
                            style={{ width: `${(premium / 15000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Emerging Skills</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">AI/Machine Learning</h4>
                          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">High Demand</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Knowledge of AI frameworks can increase salary by 15-20%
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">Cloud Architecture</h4>
                          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">High Demand</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          AWS/Azure/GCP expertise commands 12-18% premium
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">Cybersecurity</h4>
                          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">High Demand</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Security expertise can increase compensation by 10-15%
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Skill Development ROI</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Highest ROI Skills</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            These skills offer the best return on investment for time spent learning:
                          </p>
                          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                            <li>Cloud Architecture (AWS/Azure) - 18% premium</li>
                            <li>AI/ML Integration - 15% premium</li>
                            <li>GraphQL - 12% premium</li>
                            <li>DevOps/CI/CD - 10% premium</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">Certification Value Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Certification</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Salary Impact</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Time Investment</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Cost</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-900">AWS Solutions Architect</td>
                          <td className="py-3 px-4 text-success-600">+$15,000</td>
                          <td className="py-3 px-4 text-gray-600">3-6 months</td>
                          <td className="py-3 px-4 text-gray-600">$300-$1,000</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                              High
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-900">Google Cloud Professional</td>
                          <td className="py-3 px-4 text-success-600">+$14,000</td>
                          <td className="py-3 px-4 text-gray-600">2-4 months</td>
                          <td className="py-3 px-4 text-gray-600">$200-$800</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                              High
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-900">Certified Scrum Master</td>
                          <td className="py-3 px-4 text-success-600">+$8,000</td>
                          <td className="py-3 px-4 text-gray-600">1-2 months</td>
                          <td className="py-3 px-4 text-gray-600">$1,000-$2,000</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-700">
                              Medium
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-900">Microsoft Azure Fundamentals</td>
                          <td className="py-3 px-4 text-success-600">+$5,000</td>
                          <td className="py-3 px-4 text-gray-600">1 month</td>
                          <td className="py-3 px-4 text-gray-600">$100-$200</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                              High
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* Location Analysis Tab */}
            {activeTab === 'locations' && (
              <div className="space-y-6">
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">Salary by Location</h3>
                  <div className="space-y-4">
                    {Object.entries(salaryData.byLocation).map(([location, salary]) => (
                      <div key={location}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{location}</span>
                          <span className="text-sm font-medium text-gray-900">{formatSalary(salary)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(salary / Math.max(...Object.values(salaryData.byLocation))) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Cost of Living Adjustment</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">San Francisco, CA</h4>
                          <span className="text-xs font-medium bg-error-100 text-error-700 px-2 py-1 rounded-full">
                            192% of National Average
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Adjusted salary: {formatSalary(salaryData.median)} → {formatSalary(salaryData.median / 1.92)}
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">Austin, TX</h4>
                          <span className="text-xs font-medium bg-success-100 text-success-700 px-2 py-1 rounded-full">
                            103% of National Average
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Adjusted salary: {formatSalary(salaryData.median)} → {formatSalary(salaryData.median / 1.03)}
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">Remote (National Average)</h4>
                          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            100% of National Average
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Adjusted salary: {formatSalary(salaryData.median)} → {formatSalary(salaryData.median)}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Remote Work Impact</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Remote Work Trends</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            {userRole === 'candidate'
                              ? 'Remote positions for this role typically pay 5-10% less than on-site positions in major tech hubs, but offer significant cost-of-living advantages.'
                              : 'Companies offering remote work can typically offer 5-10% lower salaries while remaining competitive due to the flexibility advantage.'
                            }
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-blue-700">
                            <TrendingUp className="w-4 h-4" />
                            <span>Remote job postings for this role increased by 45% in the last year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Benefits Analysis Tab */}
            {activeTab === 'benefits' && (
              <div className="space-y-6">
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">Benefits Prevalence</h3>
                  <p className="text-gray-600 mb-4">
                    Percentage of companies offering these benefits for {salaryData.role} roles
                  </p>
                  <div className="space-y-4">
                    {Object.entries(salaryData.benefits).map(([benefit, percentage]) => (
                      <div key={benefit}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{benefit}</span>
                          <span className="text-sm font-medium text-gray-900">{formatPercentage(percentage)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Benefits Valuation</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Health Insurance</h4>
                        <p className="text-sm text-gray-600">
                          Estimated value: {formatSalary(12000)} - {formatSalary(20000)}/year
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">401(k) Match</h4>
                        <p className="text-sm text-gray-600">
                          Estimated value: {formatSalary(5000)} - {formatSalary(10000)}/year
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Remote Work</h4>
                        <p className="text-sm text-gray-600">
                          Estimated value: {formatSalary(7000)} - {formatSalary(15000)}/year
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (Based on commute savings and productivity gains)
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Equity/Stock Options</h4>
                        <p className="text-sm text-gray-600">
                          Estimated value: {formatSalary(10000)} - {formatSalary(50000)}/year
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (Highly variable based on company stage and growth)
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Total Compensation Analysis</h3>
                    <div className="h-48 flex items-center justify-center mb-4">
                      <PieChart className="w-16 h-16 text-gray-300" />
                      <p className="text-gray-500 ml-4">Chart visualization would appear here</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Total Compensation Insight</h4>
                          <p className="text-sm text-gray-700">
                            {userRole === 'candidate'
                              ? 'For this role, benefits typically add 20-30% value beyond base salary. Consider the full package when evaluating offers.'
                              : 'Companies offering comprehensive benefits packages can often secure top talent with slightly lower base salaries, resulting in 10-15% overall cost savings.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
              <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                Download Report
              </Button>
              {userRole === 'employer' && (
                <Button icon={<Zap className="w-4 h-4" />}>
                  Generate Compensation Plan
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default SalaryInsightsEngine;