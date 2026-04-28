import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to RARI CHURCH</h1>
      <p>Manage members, events, donations, and attendance with one simple church management system.</p>
      <div className="home-actions">
        <Link to="/signup" className="primary-button">Create Account</Link>
        <Link to="/login" className="secondary-button">Login</Link>
      </div>
    </div>
  );
};

export default Home;
