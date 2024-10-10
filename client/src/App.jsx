import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import GolfDeals from './json-handler/handle_data';  // Import the GolfDeals component

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <div>
                <a href="https://vitejs.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
              </div>
              <Link to="/deals">
                <button className="button-deals">Go to Golf Deals</button>
              </Link>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </>
          }
        />
        {/* Golf Deals Route */}
        <Route path="/deals" element={<GolfDeals />} />
      </Routes>
    </Router>
  );
}

export default App;
