import './App.css';
import Navbar from './Navbar';  // Import Navbar component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import required components for routing
import React, { useState } from 'react';
import GolfDeals from './json-handler/handle_data';
import About from './about';  // Import the GolfDeals component
import Footer from './footer';  // Import Navbar component
import Home from './Home';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals/:category" element={<GolfDeals />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
