// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/JobCard';

export default function Dashboard() {
  // Get jobs
  const { jobs } = useJobs();

  // Calculate statistics
  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === 'Applied').length,
    interviewing: jobs.filter(job => job.status === 'Interviewing').length,
    offer: jobs.filter(job => job.status === 'Offer').length,
    rejected: jobs.filter(job => job.status === 'Rejected').length
  };

  // Return the dashboards    
  return (
    <div className="animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Job Dashboard</h1>
            <p className="text-gray-600">Track and manage your job applications</p>
          </div>

          {/* Add new job */}
          <Link to="/add" className="btn-primary flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Job</span>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="card p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-blue-600">Total Jobs</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Applied */}
          <div className="card p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-yellow-600">Applied</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-900">{stats.applied}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Interviewing */}
          <div className="card p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-blue-600">Interviewing</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-900">{stats.interviewing}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Offers */}
          <div className="card p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-green-600">Offers</p>
                <p className="text-lg sm:text-2xl font-bold text-green-900">{stats.offer}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="card p-3 sm:p-4 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-red-600">Rejected</p>
                <p className="text-lg sm:text-2xl font-bold text-red-900">{stats.rejected}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Applications</h2>
          {jobs.length > 0 && (
            <p className="text-sm text-gray-500">
              Showing {jobs.length} job application{jobs.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="card p-8 sm:p-12 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No jobs yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
              Start tracking your job applications by adding your first application. 
              Keep organized and never miss a follow-up!
            </p>
            <Link to="/add" className="btn-primary inline-flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Your First Job</span>
            </Link>
          </div>
        ) : (

          // Jobs Card section
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <div key={job.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
