import './App.css';
import Navbar from './Navbar';  
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';  
import React, { useState, useEffect } from 'react';
import GolfDeals from './json-handler/handle_data';  
import golfCourse from './assets/golfcourse.png';

function Home() {
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when leaving home
    };
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setError('');
  };

  const handleGoToDeals = () => {
    if (!category.trim()) {
      setError('Please enter a golf equipment category.');
      return;
    }
    navigate(`/deals/${category.toLowerCase()}`);
  };

  return (
    <div className="home-container">
      <div className="centered-container">
        <input
          type="text"
          className="search-box"
          placeholder="Enter golf equipment category..."
          value={category}
          onChange={handleCategoryChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="button-deals" onClick={handleGoToDeals}>
          Go to Golf Deals
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals/:category" element={<div className="deals-container"><GolfDeals /></div>} />

      </Routes>
    </Router>
  );
}

export default App;
