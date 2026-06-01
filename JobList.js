import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jobsData from '../data/jobs.json';
import JobCard from './JobCard';
import './JobList.css';

const JobList = () => {
  const [jobs, setJobs] = useState(jobsData);
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    
    if (searchTerm) {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [location.search, jobs]);

  const handleFilter = (filterType) => {
    setActiveFilter(filterType);
    
    if (filterType === 'All') {
      setFilteredJobs(jobs);
    } else if (filterType === 'Remote') {
      setFilteredJobs(jobs.filter(job => job.location === 'Remote'));
    } else if (filterType === 'Full-Time') {
      setFilteredJobs(jobs.filter(job => job.type === 'Full-Time'));
    }
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <button onClick={handleBackHome} className="back-button">
          ← Back to Home
        </button>
        <h1>Available Jobs</h1>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => handleFilter('All')}
          >
            All Jobs
          </button>
          <button
            className={`filter-btn ${activeFilter === 'Remote' ? 'active' : ''}`}
            onClick={() => handleFilter('Remote')}
          >
            Remote
          </button>
          <button
            className={`filter-btn ${activeFilter === 'Full-Time' ? 'active' : ''}`}
            onClick={() => handleFilter('Full-Time')}
          >
            Full-Time
          </button>
        </div>
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => handleJobClick(job.id)}
            />
          ))
        ) : (
          <div className="no-jobs">
            <p>No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;