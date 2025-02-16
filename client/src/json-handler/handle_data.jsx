//TODO: embed the correct urls for each golf website

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Add CSS to hide scrollbar only for the right section
const hideScrollbarStyles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hideScrollbarStyles;
document.head.appendChild(styleSheet);

// List of golf brands
const brands = [
  "Ping",
  "TaylorMade",
  "Titleist",
  "Callaway",
  "Cleveland",
  "Cobra",
  "XXIO",
  "Odyssey",
  "Mizuno",
  "Bettinardi",
  "Top Flite",
  "L.A.B.",
  "Wilson",
  "Tour Edge",
  "Snake Eyes",
  "Warrior",
  "Harry Taylor",
  "Alien"
];

// Format the golf deals based on the new data structure
function formatGolfDeals(data) {
  console.log("Raw data:", data); // Debugging
  return data.map(product => ({
    title: product.productTitle,  // Extract the product title
    price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")).toFixed(2), // Convert price to a number and format to 2 decimal places
    brand: product.brandName,     // Include the formatted brand name
    website: product.website,     // Optionally, include the website
  }));
}

function GolfDeals() {
  const { category } = useParams();  // Get the category from the URL
  const [allDeals, setAllDeals] = useState([]);
  const [formattedDeals, setFormattedDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        let url = `http://localhost:3031/${category}`;
        console.log(`Fetching data from URL: ${url}`);
        const response = await fetch(url);
        console.log(`Response status: ${response.status}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched raw data:", data); // Debugging
          const deals = formatGolfDeals(data);

          console.log("Formatted deals:", deals); // Debugging

          setAllDeals(deals);
          setFormattedDeals(deals); // Display all deals
        } else {
          setError('No data found for this category.');
          console.log('No data found for this category.');
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
        console.log('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  // Function to handle form submission or changes if needed
  const handleFilterChange = () => {
    console.log('Filters:', { selectedBrand, minPrice, maxPrice });

    let filteredDeals = [...allDeals];

    // Apply filters
    if (selectedBrand) {
      filteredDeals = filteredDeals.filter(deal => deal.brand === selectedBrand);
    }
    if (minPrice) {
      filteredDeals = filteredDeals.filter(deal => deal.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredDeals = filteredDeals.filter(deal => deal.price <= parseFloat(maxPrice));
    }

    console.log("Filtered deals:", filteredDeals); // Debugging

    setFormattedDeals(filteredDeals);
  };

  return (
    <div 
      style={{
        padding: 0,
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        height: '100vh', 
        overflow: 'hidden', 
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div 
        style={{
          display: 'flex',
          height: '100%',
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Center dividing line */}
        <div 
          style={{
            position: 'absolute',
            left: '25%',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'black',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
          }}
        />

        {/* Left section for filter form */}
        <div 
          style={{
            width: '35%',
            padding: '20px',
            paddingRight: '100px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          <div style={{
            width: '90%',
            maxWidth: '300px',
            marginLeft: '0px',
          }}>
            <h2 style={{ textAlign: 'center' }}>Filter Deals</h2>

            <div style={{ marginTop: '50px', marginBottom: '60px', width: '100%' }}>
              <label htmlFor="brand">Brand:</label>
              <select 
                id="brand" 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)} 
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid black',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select a brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '70px', width: '100%' }}>
              <label htmlFor="priceRange">Price Range:</label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <input 
                  id="minPrice" 
                  type="number" 
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{
                    width: '45%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid black',
                    boxSizing: 'border-box'
                  }}
                />
                <input 
                  id="maxPrice" 
                  type="number" 
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{
                    width: '45%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid black',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <button 
              onClick={handleFilterChange} 
              style={{
                padding: '10px 20px',
                backgroundColor: '#82a417',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                width: '100%',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Right section for golf deals */}
        <div 
          className="hide-scrollbar"
          style={{
            width: '130%',
            height: '100%',
            padding: '20px',
            paddingLeft: '100px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <div style={{
            width: '100%',
            marginLeft: '70px',
          }}>
            <h1 style={{ textAlign: 'center' }}>{category} deals:</h1>

            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <ul style={{ 
              listStyleType: 'none', 
              padding: 0,
              margin: 0,
              width: '100%',
            }}>
              {formattedDeals.length > 0 ? (
                formattedDeals.map((deal, index) => (
                  <li 
                    key={index}
                    style={{
                      border: '1px solid black',
                      borderRadius: '8px',
                      marginBottom: '40px',
                      padding: '15px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                      backgroundColor: '#f5f5f5',
                      boxSizing: 'border-box',
                    }}
                  >
                    <h2 style={{ wordBreak: 'break-word' }}>{deal.title}</h2>
                    <p><strong>Price: </strong>${deal.price}</p> {/* Add $ sign before price */}
                    {deal.brand && <p><strong>Brand: </strong>{deal.brand}</p>}
                    {deal.website && (
                      <p style={{ wordBreak: 'break-word' }}>
                        <strong>Website: </strong>
                        <a 
                          href={deal.website.startsWith('http') ? deal.website : 'http://' + deal.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#007bff' }}
                        >
                          {deal.website}
                        </a>
                      </p>
                    )}
                  </li>
                ))
              ) : (
                !loading && <p style={{ textAlign: 'center' }}>No deals available for this category.</p>
              )}
            </ul>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a href="/" style={{ textDecoration: 'none', color: '#007bff' }}>Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GolfDeals;