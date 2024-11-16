import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Format the golf deals based on the new data structure
function formatGolfDeals(data) {
  return data.map(product => ({
    title: product.product_title,  // Extract the product title
    price: product.price,          // Extract the price
    brand: product.brand_name,     // Optionally, include the brand name
    website: product.website       // Optionally, include the website
  }));
}

function GolfDeals() {
  const { category } = useParams();  // Get the category from the URL
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
  }, [category]);  // Fetch data when the category changes

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{category} deals:</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {formattedDeals.length > 0 ? (
          formattedDeals.map((deal, index) => (
            <li 
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '10px',
                padding: '15px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2>{deal.title}</h2>
              <p><strong>Price: </strong>{deal.price}</p>
              {deal.brand && <p><strong>Brand: </strong>{deal.brand}</p>}
              {deal.website && (
                <p><strong>Website: </strong>
                  {/* Ensure that the website URL starts with http:// or https:// */}
                  <a href={deal.website.startsWith('http') ? deal.website : 'http://' + deal.website} 
                     target="_blank" 
                     rel="noopener noreferrer">
                    {deal.website}
                  </a>
                </p>
              )}
            </li>
          ))
        ) : (
          !loading && <p>No deals available for this category.</p>
        )}
      </ul>

      <a href="/" style={{ textDecoration: 'none', color: '#007bff' }}>Back to Home</a> 
    </div>
  );
}

export default GolfDeals;
