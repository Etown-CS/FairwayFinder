import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import driverImage from '../assets/drivers.png';
import wedgeImage from '../assets/wedges.png';
import ironImage from '../assets/irons.png';
import hybridImage from '../assets/hybrids.png';
import fairwaywoodImage from '../assets/fairwaywoods.png';
import putterImage from '../assets/putters.png';
import ballImage from '../assets/balls.png';
import gloveImage from '../assets/gloves.png';
import statsImage from '../assets/statistics.png';

const categoryImages = {
  drivers: driverImage,
  wedges: wedgeImage,
  irons: ironImage,
  hybrids: hybridImage,
  "fairway-woods": fairwaywoodImage, // Wrapped in quotes
  putters: putterImage,
  balls: ballImage,
  gloves: gloveImage,
};

// Add CSS to hide scrollbar only for the right section
const hideScrollbarStyles = `
  /* Styling for the list items on hover */
  .deal-item {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .deal-item:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  /* Improved typography and spacing for the filter section */
  .filter-section {
    font-family: 'Roboto', sans-serif;
  }

  .filter-section label {
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .filter-section select, .filter-section input, .filter-section button {
    font-size: 1em;
    font-family: 'Roboto', sans-serif;
  }

  .filter-section select, .filter-section input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .filter-section button {
    background-color: #82a417;
    color: white;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    padding: 12px;
    font-size: 1.1em;
  }

  .filter-section button:hover {
    background-color: #6f8f14;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hideScrollbarStyles;
document.head.appendChild(styleSheet);

// List of golf brands
const brands = [
  "Ping", "TaylorMade", "Titleist", "Callaway", "Cleveland", "Cobra", "XXIO", "Odyssey",
  "Mizuno", "Bettinardi", "Top Flite", "L.A.B.", "Wilson", "Tour Edge", "Snake Eyes", "Warrior", "Harry Taylor", "Alien"
];

const websites = [
  "tgw.com", "rockbottomgolf.com", "globalgolf.com", "pgatoursuperstore.com", "golfdiscount.com", "carlsgolfland.com", "dickssportinggoods.com"
]

// Format the golf deals based on the new data structure
function formatGolfDeals(data) {
  console.log("Raw data:", data); // Debugging
  return data.map(product => {
    const price = product.price ? product.price.replace(/[^0-9.-]+/g, "") : "0";  // Ensure price is a valid string
    return {
      title: product.productTitle,  // Extract the product title
      price: parseFloat(price).toFixed(2), // Convert price to a number and format to 2 decimal places
      brand: product.brandName,     // Include the formatted brand name
      website: product.website,     // Optionally, include the website
    };
  });
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
  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [sortOption, setSortOption] = useState('');  // New state for sort option

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        let url = `http://35.194.77.139:3031/${category}`;
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

    if (selectedWebsite) {
      filteredDeals = filteredDeals.filter(deal => deal.website.includes(selectedWebsite));
    }

    console.log("Filtered deals:", filteredDeals); // Debugging

    // Sort the filtered deals based on the selected sort option
    if (sortOption === 'lowest') {
      filteredDeals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === 'highest') {
      filteredDeals.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    console.log("Sorted deals:", filteredDeals); // Debugging

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
          }} className="filter-section">
            <h2 style={{ textAlign: 'center' }}>Filter Deals</h2>

            <div style={{ marginTop: '50px', marginBottom: '30px', width: '100%' }}>
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

            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="website">Website:</label>
                <select id="website" value={selectedWebsite} onChange={(e) => setSelectedWebsite(e.target.value)} style={{ width: '100%', padding: '8px' }}>
                  <option value="">Select a website</option>
                  {websites.map(site => <option key={site} value={site}>{site}</option>)}
                </select>
            </div>

            <div style={{ marginBottom: '30px', width: '100%' }}>
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

            {/* Sort by price dropdown */}
            <div style={{ marginBottom: '50px', width: '100%' }}>
              <label htmlFor="sortOption">Sort by Price:</label>
              <select
                id="sortOption"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid black',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select sorting</option>
                <option value="lowest">Lowest to Highest</option>
                <option value="highest">Highest to Lowest</option>
              </select>
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
  formattedDeals.map((deal, index) => {
    let domain = ''; // Default to empty string
    try {
      if (deal.website) {
        const url = new URL(deal.website);
        domain = url.hostname.replace('www.', ''); // Extract domain safely
      }
    } catch (error) {
      console.error("Invalid website URL:", deal.website, error);
    }

    return (
<li
  key={index}
  className="deal-item"
  style={{
    position: 'relative', // Ensures absolute positioning works inside
    display: 'flex',
    alignItems: 'center',
    border: '1px solid black',
    borderRadius: '8px',
    marginBottom: '40px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '100%',
    backgroundColor: '#f5f5f5',
    boxSizing: 'border-box',
    gap: '20px',
  }}
>
  {/* Stats Image Positioned at the Top Left */}
  <div
    style={{
      position: 'absolute',
      top: '15px',
      right: '15px'
    }}
  >
    <img
      src={statsImage}
      alt="Statistics"
      style={{
        width: '60px',
        height: '60px',
        cursor: 'pointer',
      }}
    />
  </div>

  {/* Left Section: Category Image */}
  {categoryImages[category] && (
    <img
      src={categoryImages[category]}
      alt={category}
      style={{
        width: '185px',
        height: '200x',
        borderRadius: '8px',
        objectFit: 'cover',
      }}
    />
  )}

  {/* Middle Section: Text Content */}
  <div
    style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      paddingRight: '160px' // Adjust padding if needed
    }}
  >
    <h2 style={{ wordBreak: 'break-word' }}>{deal.title}</h2>
    <p><strong>Price: </strong>${deal.price}</p>
    {deal.brand && <p><strong>Brand: </strong>{deal.brand}</p>}
    {deal.website && domain ? (
      <p>
        <strong>Visit Website: </strong>
        <a
          href={deal.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
        >
          See {domain} {category} deals
        </a>
      </p>
    ) : (
      <p style={{ color: 'gray' }}>No website available</p>
    )}
  </div>
</li>

    );
  })
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


