import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Downloads from './components/Downloads';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutCancel from './components/CheckoutCancel';
import usePageTracking from './hooks/usePageTracking';
import { initPostHog } from './analytics/posthog';
import CookieConsent from './components/CookieConsent';
import './App.css';

// Initialize GA4 (kept for Google Ads / Search Console integration)
ReactGA.initialize("G-357LL62V2B");

// Initialize PostHog product analytics
initPostHog();

const PageTracker = () => {
  usePageTracking();
  return null;
};

const Home = () => (
  <>
    <Hero />
    <Features />
  </>
);

function App() {
  return (
    <Router>
      <PageTracker />
      <div className="app-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/download" element={<Downloads />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container footer-content">
            <p className="copyright">© {new Date().getFullYear()} Belt Software Inc. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <a href="https://belt.ai/contact">Contact</a>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
