import './App.css';
import Navbar from './Navbar';  // Import Navbar component
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Import required components for routing
import React, { useState } from 'react';
import GolfDeals from './json-handler/handle_data';  // Import the GolfDeals component

function App() {
  const [category, setCategory] = useState(''); // State to track the category entered by the user

  // Handle the category input change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update the category state with user input
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="centered-container">
              {/* Textbox above the button */}
              <input
                type="text"
                className="search-box"
                placeholder="Enter golf equipment category..."
                value={category}
                onChange={handleCategoryChange} // Track input changes
              />
              {/* Button to navigate to Golf Deals */}
              <Link to={`/deals/${category}`} // Dynamically pass the category to the deals page
                >
                <button className="button-deals">Go to Golf Deals</button>
              </Link>
            </div>
          }
        />
        {/* Golf Deals Route */}
        <Route path="/deals/:category" element={<GolfDeals />} />
      </Routes>
    </Router>
  );
}

export default App;
