import './Navbar.css';
import logo from '/public/react.svg';

function Navbar() {
  return (
    <nav className="navbar">
        <a href="/" className="navbar-logo">
        <img src={logo} alt="Logo" />
      </a>
      <ul className="navbar-links">
        <li><a href="search">Search</a></li>
        <li><a href="sell">Sell</a></li>
        <li><a href="about">How It Works</a></li>
        <li><a href="more">More</a></li>
      </ul>
      
    </nav>
  );
}

export default Navbar;