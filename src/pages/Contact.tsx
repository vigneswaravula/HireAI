import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Building,
  Users,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface ContactForm {
  name: string;
  email: string;
  company?: string;
  subject: string;
  category: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', data);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a message and we\'ll respond within 24 hours',
      contact: 'hello@hireai.com',
      action: 'Send Email',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      contact: 'Available 24/7',
      action: 'Start Chat',
    },
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive, Suite 100',
      zipCode: 'San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      email: 'sf@hireai.com',
    },
    {
      city: 'New York',
      address: '456 Tech Avenue, Floor 15',
      zipCode: 'New York, NY 10001',
      phone: '+1 (555) 987-6543',
      email: 'ny@hireai.com',
    },
    {
      city: 'Austin',
      address: '789 Startup Boulevard, Building C',
      zipCode: 'Austin, TX 78701',
      phone: '+1 (555) 456-7890',
      email: 'austin@hireai.com',
    },
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: HelpCircle },
    { value: 'support', label: 'Technical Support', icon: MessageSquare },
    { value: 'sales', label: 'Sales & Partnerships', icon: Briefcase },
    { value: 'careers', label: 'Careers', icon: Users },
    { value: 'press', label: 'Press & Media', icon: Mail },
    { value: 'feedback', label: 'Product Feedback', icon: CheckCircle },
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
              Get in{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Have questions about HireAI? Want to partner with us? Or just want to say hello? 
              We'd love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {contactMethods.map((method, index) => (
                <Card key={index} hover className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                    <method.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="text-primary-600 font-medium text-sm mb-4">{method.contact}</p>
                  <Button variant="outline" size="sm">{method.action}</Button>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-success-600" />
                      <p className="text-success-800 font-medium">Message sent successfully!</p>
                    </div>
                    <p className="text-success-700 text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      error={errors.name?.message}
                      {...register('name', { required: 'Name is required' })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      error={errors.email?.message}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                  </div>

                  <Input
                    label="Company (Optional)"
                    placeholder="Your company name"
                    {...register('company')}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      {...register('category', { required: 'Please select a category' })}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-error-600 mt-1">{errors.category.message}</p>
                    )}
                  </div>

                  <Input
                    label="Subject"
                    placeholder="What's this about?"
                    error={errors.subject?.message}
                    {...register('subject', { required: 'Subject is required' })}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Tell us more about your inquiry..."
                      {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && (
                      <p className="text-sm text-error-600 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    fullWidth
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                      <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM PST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                      <p className="text-gray-600 mb-2">Available 24/7 for instant support</p>
                      <Button variant="outline" size="sm">Start Chat</Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Enterprise Sales</h3>
                      <p className="text-gray-600 mb-2">For large organizations and custom solutions</p>
                      <p className="text-accent-600 font-medium">enterprise@hireai.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Need Quick Answers?</h3>
                    <p className="text-gray-600 text-sm">Check our FAQ section for instant answers to common questions.</p>
                  </div>
                  <Button variant="outline" size="sm">View FAQ</Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Offices
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Visit us at one of our locations around the world
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card hover>
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{office.city}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900">{office.address}</p>
                        <p className="text-gray-600">{office.zipCode}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-900">{office.phone}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-900">{office.email}</p>
                    </div>
                  </div>
                </Card>
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
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies and job seekers who trust HireAI to make better career connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;