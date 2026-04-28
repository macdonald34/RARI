import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Events from './pages/Events';
import Donations from './pages/Donations';
import Attendance from './pages/Attendance';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="site-header">
          <div className="brand">ChurchConnect</div>
          <div className="header-actions">
            <Link to="/signup" className="header-button">Signup</Link>
            <Link to="/login" className="header-button header-button-primary">Login</Link>
          </div>
        </header>

        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;