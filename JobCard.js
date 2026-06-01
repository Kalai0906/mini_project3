import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onClick }) => {
  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <div className="job-badges">
          <span className={`badge ${job.location.toLowerCase()}`}>
            {job.location}
          </span>
          <span className={`badge ${job.type.toLowerCase().replace('-', '')}`}>
            {job.type}
          </span>
        </div>
      </div>
      
      <div className="job-card-body">
        <p className="company-name">{job.company}</p>
        <p className="salary">{job.salary}</p>
      </div>
      
      <div className="job-card-footer">
        <button className="view-details-btn">View Details →</button>
      </div>
    </div>
  );
};

export default JobCard;