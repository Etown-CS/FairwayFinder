import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="centered-container">
      <h1>Welcome to FairwayFinder!</h1><br />
      <input
        type="text"
        className="search-box"
        placeholder="Enter golf equipment category..."
        value={category}
        onChange={handleCategoryChange}
      />
      {category.trim() ? (
        <Link to={`/deals/${category}`}>
            <button className="button-deals">Go to Golf Deals</button>
        </Link>):
        
    (<button
        className="button-deals"
        disabled
        style={{
            opacity: 0.5,
            cursor: 'not-allowed',
        }} >
            Go to Golf Deals
        </button>
        )}
    </div>
 );
}

export default Home;
