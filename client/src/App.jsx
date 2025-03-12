import './App.css';
import Navbar from './Navbar';  
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';  
import React, { useState } from 'react';
import GolfDeals from './json-handler/handle_data';  

function Home() {
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setError(''); // Clear error when user starts typing
  };

  // Handle button click
  const handleGoToDeals = () => {
    if (!category.trim()) { // Check if input is empty
      setError('Please enter a golf equipment category.');
      return;
    }
    navigate(`/deals/${category.toLowerCase()}`); // Navigate to the deals page
  };

  return (
    <div className="centered-container">
      <input
        type="text"
        className="search-box"
        placeholder="Enter golf equipment category..."
        value={category}
        onChange={handleCategoryChange}
      />
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <button className="button-deals" onClick={handleGoToDeals}>
        Go to Golf Deals
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals/:category" element={<GolfDeals />} />
      </Routes>
    </Router>
  );
}

export default App;
