import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import GolfDeals from './json-handler/handle_data';  // Import the GolfDeals component

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Link to="/deals">
                <button className="button-deals">Go to Golf Deals</button>
              </Link>
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
