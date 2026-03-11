import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <Link to="/" className="logo">
          <img src="/logo-light.svg" alt="UW-Agent Logo" className="logo-icon" style={{ height: '60px', width: 'auto' }} />
        </Link>
        <nav className="nav-links">
          <Link to="/pricing" className="nav-link hover-lift">Pricing</Link>
          <a href="https://app.belt.ai/tenant-user/login?app=uw-agent" className="nav-link hover-lift">
            Sign In
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
