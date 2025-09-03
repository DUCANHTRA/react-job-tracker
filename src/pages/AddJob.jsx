// src/pages/AddJob.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

export default function AddJob() {
  
  // Get add job and navigate   
  const { addJob } = useJobs();
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    company: '',
    title: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().slice(0,10),
    notes: ''
  });

  // Errors state
  const [errors, setErrors] = useState({});

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // On change
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form  
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!form.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!form.appliedDate) {
      newErrors.appliedDate = 'Application date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // On submit
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const id = addJob(form);
      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Return the add job
  return (
    <div className="animate-fade-in-up">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Add New Job Application</h1>
          <p className="text-gray-600 text-sm sm:text-base">Track your job application details and progress</p>
        </div>

        {/* Form */}
        <div className="card p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Company and Title Row */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name *
                </label>
                <input 
                  name="company" 
                  value={form.company} 
                  onChange={onChange} 
                  className={`input-field ${errors.company ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="e.g., Google, Microsoft"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title *
                </label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={onChange} 
                  className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="e.g., Senior React Developer"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
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
                  Application Date *
                </label>
                <input 
                  name="appliedDate" 
                  type="date" 
                  value={form.appliedDate} 
                  onChange={onChange} 
                  className={`input-field ${errors.appliedDate ? 'border-red-300 focus:ring-red-500' : ''}`}
                />
                {errors.appliedDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.appliedDate}</p>
                )}
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
              <p className="mt-1 text-sm text-gray-500">
                Optional: Add any additional information about this application
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
              <Link to="/" className="btn-secondary w-full sm:w-auto text-center">
                Cancel
              </Link>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-6 sm:mt-8 card p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Pro Tips</h3>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                <li>• Update the status as your application progresses</li>
                <li>• Add detailed notes about interviews and follow-ups</li>
                <li>• Use the dashboard to track your application pipeline</li>
                <li>• Export your data regularly for backup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
