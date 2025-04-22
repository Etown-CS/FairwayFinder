import './Navbar.css';
import logo from '/navlogo.png';
import favicon from '/favicon.png';
import { Link } from 'react-router-dom'; // ← Import React Router's Link

function Navbar() {
  return (
    <nav className="navbar">
      <link rel="shortcut icon" href={favicon} />
      <Link to="/" className="navbar-logo">
        <img id="navlogo" src={logo} alt="Logo" />
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Search</Link></li>
        <li><Link to="/sell">Sell</Link></li>
        <li><Link to="/about">How It Works</Link></li>
        <li><Link to="/more">More</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
