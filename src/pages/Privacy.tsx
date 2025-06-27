import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, Database, Settings, CheckCircle, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';

const Privacy: React.FC = () => {
  const lastUpdated = 'January 15, 2024';

  const principles = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We use industry-standard encryption and security measures to protect your personal information.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We clearly explain what data we collect, how we use it, and who we share it with.',
    },
    {
      icon: Users,
      title: 'User Control',
      description: 'You have full control over your data with options to view, edit, or delete your information.',
    },
    {
      icon: Lock,
      title: 'Minimal Collection',
      description: 'We only collect data that is necessary to provide and improve our services.',
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
              Privacy{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Your privacy is fundamental to everything we do. Learn how we collect, use, and protect your personal information.
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

      {/* Privacy Principles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Privacy Principles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              These principles guide how we handle your personal information
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mb-4">
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="mb-8">
                <div className="flex items-start space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-warning-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
                    <p className="text-gray-600">
                      This privacy policy explains how HireAI collects, uses, and protects your personal information. 
                      By using our services, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                      <p className="text-gray-700 mb-4">
                        We collect information you provide directly to us, including:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Name, email address, and contact information</li>
                        <li>Professional information (work experience, education, skills)</li>
                        <li>Resume and portfolio materials</li>
                        <li>Job preferences and career goals</li>
                        <li>Profile photos and other uploaded content</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
                      <p className="text-gray-700 mb-4">
                        We automatically collect certain information about your use of our services:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Device information (IP address, browser type, operating system)</li>
                        <li>Usage patterns and interactions with our platform</li>
                        <li>Search queries and job application history</li>
                        <li>Communication preferences and settings</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Information</h3>
                      <p className="text-gray-700 mb-4">
                        We may receive information from third parties, including:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Social media platforms (when you connect your accounts)</li>
                        <li>Professional networks and job boards</li>
                        <li>Background check and verification services</li>
                        <li>Analytics and advertising partners</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">We use the information we collect to:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Provide, maintain, and improve our job matching services</li>
                      <li>Match you with relevant job opportunities and candidates</li>
                      <li>Communicate with you about our services and job opportunities</li>
                      <li>Personalize your experience and recommendations</li>
                      <li>Analyze usage patterns to improve our AI algorithms</li>
                      <li>Prevent fraud and ensure platform security</li>
                      <li>Comply with legal obligations and enforce our terms</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Information Sharing</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">With Employers</h3>
                      <p className="text-gray-700">
                        When you apply for a job or express interest in a position, we share relevant 
                        profile information with the employer, including your resume, skills, and 
                        work experience. You control what information is visible to employers.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">With Service Providers</h3>
                      <p className="text-gray-700">
                        We work with trusted third-party service providers who help us operate our 
                        platform, including cloud hosting, analytics, and communication services. 
                        These providers are bound by strict confidentiality agreements.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                      <p className="text-gray-700">
                        We may disclose your information if required by law, court order, or 
                        government request, or to protect our rights, property, or safety.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Data Security</h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We implement comprehensive security measures to protect your personal information:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>End-to-end encryption for data transmission and storage</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Multi-factor authentication for account access</li>
                      <li>Secure data centers with 24/7 monitoring</li>
                      <li>Employee training on data protection best practices</li>
                      <li>Incident response procedures for security breaches</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Your Rights and Choices</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Access and Control</h3>
                      <p className="text-gray-700 mb-4">You have the right to:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Access and review your personal information</li>
                        <li>Update or correct inaccurate information</li>
                        <li>Delete your account and associated data</li>
                        <li>Export your data in a portable format</li>
                        <li>Opt out of marketing communications</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy Settings</h3>
                      <p className="text-gray-700">
                        You can control your privacy settings through your account dashboard, 
                        including who can see your profile, contact preferences, and data sharing options.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Data Retention</h2>
                  
                  <p className="text-gray-700 mb-4">
                    We retain your personal information for as long as necessary to provide our services 
                    and fulfill the purposes outlined in this policy. Specifically:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Active account data is retained while your account is active</li>
                    <li>Job application data is retained for 7 years for legal compliance</li>
                    <li>Communication records are retained for 3 years</li>
                    <li>Analytics data is anonymized after 2 years</li>
                    <li>Deleted account data is permanently removed within 30 days</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">7. International Transfers</h2>
                  
                  <p className="text-gray-700">
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place to protect your data, including 
                    Standard Contractual Clauses and adequacy decisions where applicable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Children's Privacy</h2>
                  
                  <p className="text-gray-700">
                    Our services are not intended for individuals under 16 years of age. We do not 
                    knowingly collect personal information from children under 16. If we become aware 
                    that we have collected such information, we will take steps to delete it promptly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Changes to This Policy</h2>
                  
                  <p className="text-gray-700">
                    We may update this privacy policy from time to time. We will notify you of any 
                    material changes by posting the new policy on our website and sending you an 
                    email notification. Your continued use of our services after such changes 
                    constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Contact Us</h2>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about this privacy policy or our data practices, 
                      please contact us:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> privacy@hireai.com</p>
                      <p><strong>Address:</strong> 123 Innovation Drive, Suite 100, San Francisco, CA 94105</p>
                      <p><strong>Data Protection Officer:</strong> dpo@hireai.com</p>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;