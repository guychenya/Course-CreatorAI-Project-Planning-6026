import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CourseContext = createContext();

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  // Load courses from localStorage on mount
  useEffect(() => {
    const savedCourses = localStorage.getItem('courseCreatorAI_courses');
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (error) {
        console.error('Error loading courses from localStorage:', error);
      }
    }
  }, []);

  // Save courses to localStorage whenever courses change
  useEffect(() => {
    localStorage.setItem('courseCreatorAI_courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setCourses(prev => [newCourse, ...prev]);
    return newCourse.id;
  };

  const updateCourse = (courseId, updates) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, ...updates, updatedAt: new Date().toISOString() }
        : course
    ));
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const getCourse = (courseId) => {
    return courses.find(course => course.id === courseId);
  };

  const value = {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourse
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};