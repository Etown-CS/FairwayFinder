import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Fuse from 'fuse.js';

const categories = [
  'drivers', 'wedges', 'irons', 'hybrids',
  'fairway-woods', 'putters', 'balls', 'gloves'
];

const fuse = new Fuse(categories, {
  includeScore: true,
  threshold: 0.4,
});

function Home() {
  const [category, setCategory] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(value);
    const matched = results.map(result => result.item);
    setSuggestions(matched);
  };

  const handleSuggestionClick = (suggestion) => {
    setCategory(suggestion);
    setSuggestions([]);
  };

  return (


    <div className="centered-container">
      <Helmet>
            <title>FairwayFinder</title>
        </Helmet>
      <h1>Welcome to FairwayFinder!</h1><br />
      
      <div style={{ position: 'relative', width: 'fit-content' }}>
        <input
          type="text"
          className="search-box"
          placeholder="Enter golf equipment category..."
          value={category}
          onChange={handleCategoryChange}
        />

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {category.trim() && categories.includes(category.toLowerCase()) ? (
        <Link to={`/deals/${category}`}>
          <button className="button-deals">Go to Golf Deals</button>
        </Link>
      ) : (
        <button
          className="button-deals"
          disabled
          style={{
            opacity: 0.5,
            cursor: 'not-allowed',
          }}
        >
          Go to Golf Deals
        </button>
      )}
    </div>
  );
}

export default Home;
