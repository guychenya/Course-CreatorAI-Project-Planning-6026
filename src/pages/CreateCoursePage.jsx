import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCourse } from '../context/CourseContext';
import { generateCourseOutline } from '../services/aiService';

const { FiBookOpen, FiUsers, FiTarget, FiPlus, FiMinus, FiZap, FiLoader } = FiIcons;

function CreateCoursePage() {
  const navigate = useNavigate();
  const { addCourse } = useCourse();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    targetAudience: '',
    learningObjectives: ['']
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...formData.learningObjectives];
    newObjectives[index] = value;
    setFormData(prev => ({
      ...prev,
      learningObjectives: newObjectives
    }));
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const removeObjective = (index) => {
    if (formData.learningObjectives.length > 1) {
      const newObjectives = formData.learningObjectives.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        learningObjectives: newObjectives
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a course title');
      return;
    }
    
    if (!formData.targetAudience.trim()) {
      toast.error('Please describe your target audience');
      return;
    }
    
    const validObjectives = formData.learningObjectives.filter(obj => obj.trim());
    if (validObjectives.length === 0) {
      toast.error('Please add at least one learning objective');
      return;
    }

    setIsGenerating(true);
    
    try {
      const courseData = {
        ...formData,
        learningObjectives: validObjectives
      };
      
      const generatedCourse = await generateCourseOutline(courseData);
      const courseId = addCourse(generatedCourse);
      
      toast.success('Course outline generated successfully!');
      navigate(`/outline/${courseId}`);
    } catch (error) {
      console.error('Error generating course:', error);
      toast.error('Failed to generate course outline. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiZap} className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create Your Course Outline
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your course and we'll generate a comprehensive, structured outline with modules, lessons, and activities.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Course Title */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <SafeIcon icon={FiBookOpen} className="w-5 h-5 mr-3 text-primary-600" />
                Course Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Complete Web Development Bootcamp, Advanced Digital Marketing, Python for Data Science"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter a clear, descriptive title for your course
              </p>
            </div>

            {/* Target Audience */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <SafeIcon icon={FiUsers} className="w-5 h-5 mr-3 text-primary-600" />
                Target Audience
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="e.g., Beginner developers with basic HTML/CSS knowledge, Marketing professionals looking to expand digital skills, Data analysts transitioning to Python"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-500 mt-2">
                Describe who this course is designed for, including their current skill level and background
              </p>
            </div>

            {/* Learning Objectives */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <SafeIcon icon={FiTarget} className="w-5 h-5 mr-3 text-primary-600" />
                Learning Objectives
              </label>
              <div className="space-y-3">
                {formData.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        placeholder={`Learning objective ${index + 1}...`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        disabled={isGenerating}
                      />
                    </div>
                    {formData.learningObjectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeObjective(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        disabled={isGenerating}
                      >
                        <SafeIcon icon={FiMinus} className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={addObjective}
                className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                disabled={isGenerating}
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                Add Another Objective
              </button>
              
              <p className="text-sm text-gray-500 mt-2">
                What specific skills or knowledge will students gain? Be clear and measurable.
              </p>
            </div>

            {/* Generate Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                {isGenerating ? (
                  <>
                    <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                    <span>Generating Course Outline...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiZap} className="w-5 h-5" />
                    <span>Generate Course Outline</span>
                  </>
                )}
              </button>
              
              {isGenerating && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  This usually takes 30-60 seconds. Please don't close this page.
                </p>
              )}
            </div>
          </form>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for Better Results</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Be specific about your target audience's current skill level and background</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Write learning objectives that are measurable and actionable</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Include the desired outcome or transformation for your students</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>The more detailed your input, the more tailored your course outline will be</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateCoursePage;