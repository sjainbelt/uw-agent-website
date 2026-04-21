import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DemoSection from './components/DemoSection';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Downloads from './components/Downloads';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutCancel from './components/CheckoutCancel';
import HowItWorks from './components/HowItWorks';
import Security from './components/Security';
import Integrations from './components/Integrations';
import usePageTracking from './hooks/usePageTracking';
import { initPostHog } from './analytics/posthog';
import CookieConsent from './components/CookieConsent';
import ContactModal from './components/ContactModal';
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
    <DemoSection />
    <Features />
  </>
);

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Get in Touch");

  const openContactModal = (title) => {
    if (title) setModalTitle(title);
    setIsContactModalOpen(true);
  };

  return (
    <Router>
      <PageTracker />
      <div className="app-wrapper">
        <Header openContactModal={openContactModal} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/download" element={<Downloads />} />
            <Route path="/how-it-works" element={<HowItWorks openContactModal={openContactModal} />} />
            <Route path="/security" element={<Security openContactModal={openContactModal} />} />
            <Route path="/integrations" element={<Integrations openContactModal={openContactModal} />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          </Routes>
        </main>

        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
          title={modalTitle}
        />

        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">UnderWrite</div>
              <div className="footer-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/security">Security</Link>
                <a href="https://belt.ai/contact">Contact</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="copyright">© {new Date().getFullYear()} Belt Software Inc. All rights reserved.</p>
              <div className="footer-meta">
                <div className="belt-products">
                  <span className="belt-label">Belt</span>
                  <span className="belt-divider">|</span>
                  <a href="https://noodle.belt.ai">Noodle</a>
                  <a href="https://underwrite.belt.ai">UnderWrite</a>
                  <a href="https://ensefa.belt.ai">Ensefa</a>
                </div>
                <span className="meta-divider">|</span>
                <div className="soc2-badge">
                  <span className="material-symbols-outlined">verified_user</span>
                  <span>SOC 2 TYPE II</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
