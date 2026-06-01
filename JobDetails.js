import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobsData from '../data/jobs.json';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const job = jobsData.find(job => job.id === parseInt(id));

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="job-not-found">
          <h2>Job not found</h2>
          <button onClick={() => navigate('/jobs')} className="back-button">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  return (
    <div className="job-details-container">
      <div className="job-details-content">
        <button onClick={handleBackToJobs} className="back-button">
          ← Back to Jobs
        </button>

        <div className="job-header">
          <h1 className="job-title">{job.title}</h1>
          <div className="job-meta">
            <span className="company">{job.company}</span>
            <div className="job-badges">
              <span className={`badge ${job.location.toLowerCase()}`}>
                {job.location}
              </span>
              <span className={`badge ${job.type.toLowerCase().replace('-', '')}`}>
                {job.type}
              </span>
            </div>
          </div>
          <div className="salary">{job.salary}</div>
        </div>

        <div className="job-description">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="apply-section">
          {showSuccess ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Success!</h3>
              <p>Your application has been submitted successfully!</p>
            </div>
          ) : (
            <button onClick={handleApply} className="apply-button">
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;