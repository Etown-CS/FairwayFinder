import React from 'react';

// TODO: Filter search results by grabbing the criteria the user submits and iterating through each JSON file for each crawled website
//       according to the user's criteria. For example, if a user filters their results by price range, iterate through each JSON file 
//       and only grab and display items in that price range.

// Sample JSON data returned from Playwright
const golfDealsData = [
  {
    "titles": "Ping G430 MAX Driver\nTaylorMade Qi10 Max Driver\nTitleist GT2 Driver\nCallaway Paradym Ai Smoke Max Driver\nTitleist GT3 Driver\nCallaway MAVRIK Driver\nTaylorMade BRNR Mini Driver Copper\nCleveland Launcher XL2 Driver\nCallaway Paradym Ai Smoke Triple Diamond Driver\nTaylorMade Qi10 Driver\nCobra LTDx Driver Black\nCobra LTDx Driver Peacoat",
    "prices": "Regular Price: $547Special Price: $397\n$599.99\nFrom $649 To $849\n$599.99\nFrom $649 To $849\nRegular Price: $499.99Special Price: $249.99\n$449.99\nRegular Price: $449.99Special Price: $349.99\n$599.99\n$599.99\nRegular Price: $499.99Special Price: $184.99\nRegular Price: $499.99Special Price: $184.99"
  }
];

// Function to format and return the data
function formatGolfDeals(data) {
  const titles = data[0].titles.split('\n');  // Split titles by newline
  const prices = data[0].prices.split('\n');  // Split prices by newline

  // Combine titles and prices into an array of objects
  const formattedDeals = titles.map((title, index) => {
    return {
      title: title,
      price: prices[index] || "Price not available"
    };
  });

  return formattedDeals;  // Return an array of title-price objects
}

// React component to display the deals
function GolfDeals() {
  // Get the formatted deals
  const formattedDeals = formatGolfDeals(golfDealsData);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Search Results</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {formattedDeals.map((deal, index) => (
          <li 
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '10px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
            <h2>{deal.title}</h2>
            <p><strong>Price: </strong>{deal.price}</p>
          </li>
        ))}
      </ul>
      <a href="/">Back to Home</a> 
    </div>
  );
}

export default GolfDeals;
