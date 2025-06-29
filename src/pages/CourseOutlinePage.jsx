import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCourse } from '../context/CourseContext';

const { FiBookOpen, FiUsers, FiTarget, FiCopy, FiDownload, FiChevronDown, FiChevronRight, FiArrowLeft, FiEdit3 } = FiIcons;

function CourseOutlinePage() {
  const { id } = useParams();
  const { courses } = useCourse();
  const [expandedModules, setExpandedModules] = useState({});
  
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="mr-2 w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }));
  };

  const expandAll = () => {
    const allExpanded = {};
    course.modules?.forEach((_, index) => {
      allExpanded[index] = true;
    });
    setExpandedModules(allExpanded);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  const copyToClipboard = () => {
    const outlineText = generateOutlineText();
    navigator.clipboard.writeText(outlineText).then(() => {
      toast.success('Course outline copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy to clipboard');
    });
  };

  const downloadOutline = () => {
    const outlineText = generateOutlineText();
    const blob = new Blob([outlineText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_outline.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Course outline downloaded!');
  };

  const generateOutlineText = () => {
    let text = `${course.title}\n`;
    text += `${'='.repeat(course.title.length)}\n\n`;
    
    text += `Target Audience: ${course.targetAudience}\n\n`;
    
    text += `Learning Objectives:\n`;
    course.learningObjectives?.forEach((objective, index) => {
      text += `${index + 1}. ${objective}\n`;
    });
    text += '\n';
    
    text += `Course Structure:\n`;
    text += `================\n\n`;
    
    course.modules?.forEach((module, moduleIndex) => {
      text += `Module ${moduleIndex + 1}: ${module.title}\n`;
      text += `${'-'.repeat(module.title.length + 10)}\n`;
      if (module.description) {
        text += `${module.description}\n\n`;
      }
      
      module.lessons?.forEach((lesson, lessonIndex) => {
        text += `  Lesson ${moduleIndex + 1}.${lessonIndex + 1}: ${lesson.title}\n`;
        if (lesson.description) {
          text += `    ${lesson.description}\n`;
        }
        if (lesson.keyConcepts && lesson.keyConcepts.length > 0) {
          text += `    Key Concepts:\n`;
          lesson.keyConcepts.forEach(concept => {
            text += `      • ${concept}\n`;
          });
        }
        if (lesson.activities && lesson.activities.length > 0) {
          text += `    Activities:\n`;
          lesson.activities.forEach(activity => {
            text += `      • ${activity}\n`;
          });
        }
        text += '\n';
      });
      text += '\n';
    });
    
    return text;
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <SafeIcon icon={FiArrowLeft} className="mr-2 w-5 h-5" />
              Back to Dashboard
            </Link>
            <div className="flex space-x-3">
              <button
                onClick={expandAll}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Collapse All
              </button>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiCopy} className="mr-2 w-4 h-4" />
                Copy
              </button>
              <button
                onClick={downloadOutline}
                className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
              >
                <SafeIcon icon={FiDownload} className="mr-2 w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Course Overview</h3>
              
              {/* Target Audience */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <SafeIcon icon={FiUsers} className="w-4 h-4 text-primary-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Target Audience</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {course.targetAudience}
                </p>
              </div>

              {/* Learning Objectives */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiTarget} className="w-4 h-4 text-primary-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Learning Objectives</span>
                </div>
                <ul className="space-y-2">
                  {course.learningObjectives?.map((objective, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {course.modules?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">
                    {course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0}
                  </div>
                  <div className="text-xs text-gray-500">Lessons</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="space-y-6">
              {course.modules?.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(moduleIndex)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold mr-4">
                        {moduleIndex + 1}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {module.title}
                        </h3>
                        {module.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {module.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <SafeIcon 
                      icon={expandedModules[moduleIndex] ? FiChevronDown : FiChevronRight} 
                      className="w-5 h-5 text-gray-400" 
                    />
                  </button>

                  {/* Module Content */}
                  {expandedModules[moduleIndex] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6 space-y-4">
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Lesson {moduleIndex + 1}.{lessonIndex + 1}: {lesson.title}
                            </h4>
                            
                            {lesson.description && (
                              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                                {lesson.description}
                              </p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Key Concepts */}
                              {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-medium text-gray-700 mb-2">Key Concepts:</h5>
                                  <ul className="space-y-1">
                                    {lesson.keyConcepts.map((concept, conceptIndex) => (
                                      <li key={conceptIndex} className="flex items-start text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                        <span>{concept}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Activities */}
                              {lesson.activities && lesson.activities.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-medium text-gray-700 mb-2">Activities:</h5>
                                  <ul className="space-y-1">
                                    {lesson.activities.map((activity, activityIndex) => (
                                      <li key={activityIndex} className="flex items-start text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CourseOutlinePage;