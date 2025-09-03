// src/components/JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

// Job card component
export default function JobCard({ job }) {

  // Status config
  const statusConfig = {
    Applied: {
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50',
      textColor: 'text-yellow-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    Interviewing: {
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      textColor: 'text-blue-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    Offer: {
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
      textColor: 'text-green-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    Rejected: {
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-gradient-to-r from-red-50 to-pink-50',
      textColor: 'text-red-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  // Status
  const status = statusConfig[job.status] || statusConfig.Applied;

  return (
    <Link to={`/jobs/${job.id}`} className="group">
      <div className="card p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
        
        {/* Header with Company and Status */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                  {job.company}
                </h3>
                <p className="text-sm text-gray-600 font-medium truncate">{job.title}</p>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`status-badge ${status.bgColor} ${status.textColor} border border-opacity-20 self-start sm:self-auto`}>
            <div className="flex items-center space-x-1">
              {status.icon}
              <span className="font-semibold text-xs sm:text-sm">{job.status}</span>
            </div>
          </div>
        </div>

        {/* Date and Notes */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Applied: {formatDate(job.appliedDate)}</span>
          </div>
          
          {job.notes && (
            <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-200">
              <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 leading-relaxed">
                {job.notes}
              </p>
            </div>
          )}
        </div>

        {/* Hover Indicator */}
        <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-blue-600 font-medium">
            <span>View Details</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
