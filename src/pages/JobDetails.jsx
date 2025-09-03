// src/pages/JobDetails.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import formatDate from '../utils/formaDate';

export default function JobDetails() {

  // Get id and jobs
  const { id } = useParams();
  const { jobs, updateJob, deleteJob } = useJobs();
  const job = jobs.find(j => j.id === id);
  const navigate = useNavigate();

  // State for editing and deleting
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [form, setForm] = useState(job ? {
    company: job.company,
    title: job.title,
    status: job.status,
    appliedDate: job.appliedDate || new Date().toISOString().slice(0,10),
    notes: job.notes || ''
  } : null);

  // Status config
  const statusConfig = {
    Applied: {
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50',
      textColor: 'text-yellow-800',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    Interviewing: {
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      textColor: 'text-blue-800',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    Offer: {
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
      textColor: 'text-green-800',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    Rejected: {
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-gradient-to-r from-red-50 to-pink-50',
      textColor: 'text-red-800',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  // If job is not found
  if (!job) {
    return (
      <div className="animate-fade-in-up">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 sm:p-12 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Job Not Found</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">The job application you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Status
  const status = statusConfig[job.status] || statusConfig.Applied;

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      updateJob(id, form);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    }
  };

  // Handle delete      
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job application? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      deleteJob(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
      setIsDeleting(false);
    }
  };

  // Return the job details
  return (
    <div className="animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/" className="btn-secondary flex items-center space-x-2 text-sm sm:text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>

        {!isEditing ? (
          /* View Mode */
          <div className="space-y-6">
            {/* Job Header Card */}
            <div className="card p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 space-y-4 lg:space-y-0">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">{job.company}</h1>
                    <p className="text-lg sm:text-xl text-gray-600 font-medium break-words">{job.title}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Applied: {formatDate(job.appliedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-left lg:text-right">
                  <div className={`status-badge ${status.bgColor} ${status.textColor} border border-opacity-20 px-3 sm:px-4 py-2 inline-block`}>
                    <div className="flex items-center space-x-2">
                      {status.icon}
                      <span className="font-semibold text-sm">{job.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="btn-secondary flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
                
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Notes Card */}
            <div className="card p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Notes & Comments</span>
              </h3>
              
              {job.notes ? (
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{job.notes}</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm sm:text-base">No notes added yet</p>
                  <p className="text-xs sm:text-sm">Click edit to add notes about this application</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="card p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Edit Job Application</h2>
              <p className="text-gray-600 text-sm sm:text-base">Update the details of your job application</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Company and Title Row */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input 
                    name="company" 
                    value={form.company} 
                    onChange={onChange} 
                    className="input-field"
                    placeholder="e.g., Google, Microsoft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input 
                    name="title" 
                    value={form.title} 
                    onChange={onChange} 
                    className="input-field"
                    placeholder="e.g., Senior React Developer"
                  />
                </div>
              </div>

              {/* Status and Date Row */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Status
                  </label>
                  <select 
                    name="status" 
                    value={form.status} 
                    onChange={onChange} 
                    className="input-field"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Date
                  </label>
                  <input 
                    name="appliedDate" 
                    type="date" 
                    value={form.appliedDate} 
                    onChange={onChange} 
                    className="input-field"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes & Comments
                </label>
                <textarea 
                  name="notes" 
                  value={form.notes} 
                  onChange={onChange} 
                  rows="4" 
                  className="input-field resize-none"
                  placeholder="Add any notes about the application, interview details, or follow-up actions..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
                <button 
                  type="button" 
                  onClick={() => { 
                    setIsEditing(false); 
                    setForm({
                      company: job.company,
                      title: job.title,
                      status: job.status,
                      appliedDate: job.appliedDate || new Date().toISOString().slice(0,10),
                      notes: job.notes || ''
                    }); 
                  }} 
                  className="btn-secondary w-full sm:w-auto text-center"
                >
                  Cancel
                </button>
                
                <button type="submit" className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
