import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${searchTerm}`);
  };

  const handleBrowseAll = () => {
    navigate('/jobs');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Find Your Dream Job Today</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for jobs (e.g., Designer, Developer)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search Jobs
          </button>
        </form>

        <button onClick={handleBrowseAll} className="browse-button">
          Browse All Jobs
        </button>
      </div>
    </div>
  );
};

export default Home;