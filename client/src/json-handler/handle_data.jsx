import React, { useState, useEffect } from 'react';

// Function to format and return the data
function formatGolfDeals(data) {
  const titles = data[0].titles.split('\n');
  const prices = data[0].prices.split('\n');

  const formattedDeals = titles.map((title, index) => ({
    title: title,
    price: prices[index] || 'Price not available',
  }));

  return formattedDeals;
}

function GolfDeals({ category }) {
  const [formattedDeals, setFormattedDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3031/${category}`);
        if (response.ok) {
          const data = await response.json();
          const deals = formatGolfDeals(data);
          setFormattedDeals(deals);
        } else {
          setError('No data found for this category.');
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  return (
    <div>
      <h1>{category} Deals</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {formattedDeals.map((deal, index) => (
          <li key={index}>
            <h2>{deal.title}</h2>
            <p><strong>Price: </strong>{deal.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GolfDeals;
