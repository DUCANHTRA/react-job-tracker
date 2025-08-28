// src/components/Header.jsx
import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

export default function Header() {
  // Get jobs and import jobs
  const { jobs, importJobs } = useJobs();
  // File reference 
  const fileRef = useRef();
  // Location
  const loc = useLocation();

  // Handle export
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-applications.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle import      
  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error('File must contain an array of jobs');
      if (!window.confirm('This will replace your current saved jobs. Continue?')) return;
      importJobs(parsed);
      alert('Import succeeded');
    } catch (err) {
      alert('Import failed: ' + err.message);
    } finally {
      e.target.value = '';
    }
  };

  // Return the header
  return (
    <header className="glass-effect sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <div>
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  JobTracker
                </Link>
                <p className="text-sm text-gray-600 font-medium">Track your career journey</p>
              </div>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  loc.pathname === '/' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                  <span>Dashboard</span>
                </div>
              </Link>
              
              <Link 
                to="/add" 
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Job</span>
                </div>
              </Link>
            </nav>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleExport} 
                className="btn-secondary flex items-center space-x-2"
                title="Export all jobs to JSON"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export</span>
              </button>

              <button
                onClick={() => fileRef.current.click()}
                className="btn-secondary flex items-center space-x-2"
                title="Import jobs from JSON file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Import</span>
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleImport}
              />
            </div>

            {/* Job Count Badge */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">{jobs.length} jobs</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
