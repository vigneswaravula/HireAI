import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';

const Terms: React.FC = () => {
  const lastUpdated = 'January 15, 2024';

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
              Terms of{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Service
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              These terms govern your use of HireAI's platform and services. Please read them carefully.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="mb-8">
              <div className="flex items-start space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-warning-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Agreement to Terms</h3>
                  <p className="text-gray-600">
                    By accessing and using HireAI's services, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </div>
            </Card>

            <div className="prose prose-lg max-w-none space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-primary-600" />
                  1. Acceptance of Terms
                </h2>
                
                <p className="text-gray-700 mb-4">
                  These Terms of Service ("Terms") govern your use of HireAI's website, mobile application, 
                  and related services (collectively, the "Service") operated by HireAI Inc. ("us", "we", or "our").
                </p>
                
                <p className="text-gray-700">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                  with any part of these terms, then you may not access the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
                
                <p className="text-gray-700 mb-4">
                  HireAI is an AI-powered job matching platform that connects job seekers with employers. 
                  Our services include:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Job search and application tools</li>
                  <li>AI-powered job matching and recommendations</li>
                  <li>Resume building and optimization tools</li>
                  <li>Skill assessments and verification</li>
                  <li>Communication tools between job seekers and employers</li>
                  <li>Analytics and career insights</li>
                </ul>
                
                <p className="text-gray-700">
                  We reserve the right to modify, suspend, or discontinue any part of our Service 
                  at any time with or without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Accounts</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
                    <p className="text-gray-700 mb-4">
                      To use certain features of our Service, you must create an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain and update your information to keep it accurate</li>
                      <li>Keep your password secure and confidential</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Types</h3>
                    <p className="text-gray-700 mb-4">We offer different types of accounts:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Job Seeker Accounts:</strong> For individuals seeking employment opportunities</li>
                      <li><strong>Employer Accounts:</strong> For companies and organizations posting job opportunities</li>
                      <li><strong>Premium Accounts:</strong> Enhanced features for both job seekers and employers</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. User Conduct</h2>
                
                <p className="text-gray-700 mb-4">You agree not to use the Service to:</p>
                
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Post false, misleading, or fraudulent information</li>
                  <li>Impersonate another person or entity</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated tools to access or scrape our content</li>
                  <li>Post spam, advertisements, or unsolicited communications</li>
                  <li>Share inappropriate, offensive, or illegal content</li>
                </ul>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Violation Consequences</h4>
                      <p className="text-red-800 text-sm">
                        Violation of these terms may result in account suspension, termination, 
                        or legal action as appropriate.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Content and Intellectual Property</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
                    <p className="text-gray-700 mb-4">
                      You retain ownership of content you submit to our Service, including resumes, 
                      profiles, and communications. By submitting content, you grant us a license to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Use, display, and distribute your content on our platform</li>
                      <li>Analyze your content to improve our AI matching algorithms</li>
                      <li>Share relevant content with potential employers (with your consent)</li>
                      <li>Create anonymized, aggregated data for research and improvement</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
                    <p className="text-gray-700">
                      All content on our Service, including text, graphics, logos, software, and AI algorithms, 
                      is owned by HireAI or our licensors and is protected by intellectual property laws. 
                      You may not copy, modify, or distribute our content without permission.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Privacy and Data Protection</h2>
                
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
                  and protect your personal information. By using our Service, you agree to our 
                  Privacy Policy.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Data Security</h4>
                      <p className="text-blue-800 text-sm">
                        We implement industry-standard security measures to protect your data, 
                        but cannot guarantee absolute security.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Payment Terms</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Services</h3>
                    <p className="text-gray-700">
                      Basic job seeker services are provided free of charge. We reserve the right 
                      to modify or discontinue free services at any time.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Services</h3>
                    <p className="text-gray-700 mb-4">
                      Premium features require payment. By purchasing premium services, you agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Pay all fees as described at the time of purchase</li>
                      <li>Provide accurate billing information</li>
                      <li>Accept automatic renewal unless cancelled</li>
                      <li>Understand that fees are non-refundable except as required by law</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Disclaimers and Limitations</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
                    <p className="text-gray-700">
                      We strive to maintain high availability but cannot guarantee uninterrupted service. 
                      We are not liable for any downtime or service interruptions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Job Matching</h3>
                    <p className="text-gray-700">
                      Our AI matching algorithms are designed to help connect job seekers with relevant 
                      opportunities, but we cannot guarantee job placement or hiring outcomes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Content</h3>
                    <p className="text-gray-700">
                      We are not responsible for content posted by users or third parties. 
                      Job seekers and employers are responsible for their own interactions and agreements.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Termination</h2>
                
                <p className="text-gray-700 mb-4">
                  Either party may terminate this agreement at any time:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>You may delete your account at any time through your account settings</li>
                  <li>We may suspend or terminate accounts that violate these terms</li>
                  <li>We may discontinue the Service with reasonable notice</li>
                  <li>Upon termination, your right to use the Service ceases immediately</li>
                </ul>
                
                <p className="text-gray-700">
                  Termination does not affect any rights or obligations that arose before termination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Governing Law</h2>
                
                <p className="text-gray-700">
                  These Terms are governed by the laws of the State of California, United States, 
                  without regard to conflict of law principles. Any disputes will be resolved in 
                  the courts of San Francisco County, California.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Changes to Terms</h2>
                
                <p className="text-gray-700 mb-4">
                  We may update these Terms from time to time. We will notify you of material changes by:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Posting the updated Terms on our website</li>
                  <li>Sending email notifications to registered users</li>
                  <li>Displaying prominent notices on our platform</li>
                </ul>
                
                <p className="text-gray-700">
                  Your continued use of the Service after changes become effective constitutes 
                  acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Contact Information</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> legal@hireai.com</p>
                    <p><strong>Address:</strong> HireAI Inc., 123 Innovation Drive, Suite 100, San Francisco, CA 94105</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;