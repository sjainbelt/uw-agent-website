import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Downloads from './components/Downloads';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutCancel from './components/CheckoutCancel';
import usePageTracking from './hooks/usePageTracking';
import './App.css';

// Initialize GA4 with Measurement ID
ReactGA.initialize("G-357LL62V2B");

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
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container footer-content">
            <p className="copyright">© {new Date().getFullYear()} Belt Software Inc. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
