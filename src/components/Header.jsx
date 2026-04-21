import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ openContactModal }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          UnderWrite
        </Link>
        <nav className="nav-links">
          <Link to="/#features" className="nav-link">Features</Link>
          <Link to="/integrations" className="nav-link">Integrations</Link>
          <Link to="/how-it-works" className="nav-link">How it Works</Link>
          <Link to="/security" className="nav-link">Security</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
        </nav>
        <div className="header-actions">
          <button onClick={() => openContactModal("Contact Sales")} className="login-btn nav-btn-reset">
            Contact Sales
          </button>
          <Link to="/download" className="btn signature-gradient get-started-btn">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
