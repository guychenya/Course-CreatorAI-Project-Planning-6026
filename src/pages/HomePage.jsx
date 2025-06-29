import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiZap, FiTarget, FiBookOpen, FiUsers, FiTrendingUp, FiCheck } = FiIcons;

function HomePage() {
  const features = [
    {
      icon: FiZap,
      title: 'AI-Powered Generation',
      description: 'Generate comprehensive course outlines in minutes, not hours'
    },
    {
      icon: FiTarget,
      title: 'Learning Objectives Focus',
      description: 'Structure content around clear, measurable learning outcomes'
    },
    {
      icon: FiBookOpen,
      title: 'Detailed Lesson Plans',
      description: 'Get specific activities, concepts, and teaching strategies'
    },
    {
      icon: FiUsers,
      title: 'Audience-Tailored',
      description: 'Content adapted to your specific target audience'
    }
  ];

  const benefits = [
    'Reduce course planning time by 75%',
    'Eliminate blank page syndrome',
    'Ensure logical content progression',
    'Generate engaging activity ideas',
    'Export ready-to-use outlines',
    'Professional instructional design'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your Expertise Into
                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Structured Courses
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Course CreatorAI helps educators and content creators generate comprehensive, 
                AI-powered course outlines that engage students and achieve learning objectives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Start Creating
                <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                View Examples
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">75%</div>
                <div className="text-gray-600">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">10min</div>
                <div className="text-gray-600">Average Generation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-600">Customizable</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful AI-Driven Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create professional course outlines that engage students and drive results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Course CreatorAI?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of educators who have transformed their course creation process with AI-powered assistance.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-green-100 rounded-full p-1">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Course Generation</h3>
                  <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Planning Time</span>
                    <span className="font-semibold text-green-600">-75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Content Quality</span>
                    <span className="font-semibold text-green-600">+90%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Student Engagement</span>
                    <span className="font-semibold text-green-600">+65%</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-1">10 minutes</div>
                    <div className="text-sm text-gray-500">Average generation time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Course Creation?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join the AI revolution in education. Create your first course outline in minutes, not hours.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              Get Started Free
              <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;