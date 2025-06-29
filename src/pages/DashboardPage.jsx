import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCourse } from '../context/CourseContext';

const { FiPlus, FiBookOpen, FiClock, FiUsers, FiEdit3, FiTrash2, FiEye } = FiIcons;

function DashboardPage() {
  const { courses, deleteCourse } = useCourse();

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
              <p className="text-gray-600">Manage and view your AI-generated course outlines</p>
            </div>
            <Link
              to="/create"
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <SafeIcon icon={FiPlus} className="mr-2 w-5 h-5" />
              Create New Course
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center">
              <div className="bg-primary-100 p-3 rounded-lg">
                <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{courses.length}</h3>
                <p className="text-gray-600">Total Courses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.reduce((total, course) => total + (course.modules?.length || 0), 0)}
                </h3>
                <p className="text-gray-600">Total Modules</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.reduce((total, course) => {
                    return total + (course.modules?.reduce((moduleTotal, module) => {
                      return moduleTotal + (module.lessons?.length || 0);
                    }, 0) || 0);
                  }, 0)}
                </h3>
                <p className="text-gray-600">Total Lessons</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Get started by creating your first AI-powered course outline. It only takes a few minutes!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <SafeIcon icon={FiPlus} className="mr-2 w-5 h-5" />
              Create Your First Course
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {course.targetAudience}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{course.modules?.length || 0} modules</span>
                    <span>
                      {course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0} lessons
                    </span>
                  </div>

                  {/* Learning Objectives Preview */}
                  {course.learningObjectives && course.learningObjectives.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Learning Objectives:</p>
                      <div className="text-xs text-gray-600">
                        {course.learningObjectives.slice(0, 2).map((objective, idx) => (
                          <div key={idx} className="flex items-center mb-1">
                            <div className="w-1 h-1 bg-primary-400 rounded-full mr-2"></div>
                            <span className="truncate">{objective}</span>
                          </div>
                        ))}
                        {course.learningObjectives.length > 2 && (
                          <div className="text-gray-400">+{course.learningObjectives.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Link
                        to={`/outline/${course.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4 mr-1" />
                        View
                      </Link>
                    </div>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;