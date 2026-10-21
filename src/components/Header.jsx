import { Link } from 'react-router-dom';
import { PRODUCT_AVAILABLE } from '../config/features';
import InterestLink from './InterestLink';
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
          {PRODUCT_AVAILABLE && <Link to="/pricing" className="nav-link">Pricing</Link>}
        </nav>
        <div className="header-actions">
          <button onClick={() => openContactModal("Contact Sales")} className="login-btn nav-btn-reset">
            Contact Sales
          </button>
          {PRODUCT_AVAILABLE ? (
            <Link to="/download" className="btn signature-gradient get-started-btn">
              Get Started
            </Link>
          ) : (
            <InterestLink source="header" className="btn signature-gradient get-started-btn" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
