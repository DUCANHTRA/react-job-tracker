// src/context/JobContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const JOBS_KEY = 'job-tracker-v1';
const JobContext = createContext();

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;

// Job provider   
export const JobProvider = ({ children }) => {

  // State for jobs
  const [jobs, setJobs] = useState(() => {
    try {
      const raw = localStorage.getItem(JOBS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to parse jobs from localStorage', e);
      return [];
    }
  });

  // Save jobs to localStorage
  useEffect(() => {
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  }, [jobs]);

  // Add job
  const addJob = (job) => {
    const newJob = {
      id: generateId(),
      company: job.company,
      title: job.title,
      status: job.status || 'Applied',
      appliedDate: job.appliedDate || new Date().toISOString().slice(0,10),
      notes: job.notes || '',
      createdAt: new Date().toISOString(),
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob.id;
  };

  // Update job
  const updateJob = (id, updates) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...updates } : j)));
  };

  // Delete job
  const deleteJob = (id) => setJobs(prev => prev.filter(j => j.id !== id));

  // Import jobs
  const importJobs = (arr) => {
    if (!Array.isArray(arr)) throw new Error('Import must be an array');
    const normalized = arr.map(item => ({
      id: item.id || generateId(),
      company: item.company || 'Unknown',
      title: item.title || '',
      status: item.status || 'Applied',
      appliedDate: item.appliedDate || new Date().toISOString().slice(0,10),
      notes: item.notes || '',
      createdAt: item.createdAt || new Date().toISOString(),
    }));
    setJobs(normalized);
  };

  // Return the job provider  
  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob, importJobs }}>
      {children}
    </JobContext.Provider>
  );
};

// Use jobs
export const useJobs = () => useContext(JobContext);
