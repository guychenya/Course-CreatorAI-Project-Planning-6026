import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CreateCoursePage from './pages/CreateCoursePage';
import CourseOutlinePage from './pages/CourseOutlinePage';
import { CourseProvider } from './context/CourseContext';

function App() {
  return (
    <CourseProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create" element={<CreateCoursePage />} />
              <Route path="/outline/:id" element={<CourseOutlinePage />} />
            </Routes>
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;