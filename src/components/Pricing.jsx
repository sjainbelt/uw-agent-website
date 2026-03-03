import { Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import './Pricing.css';

// The gateway URL that handles checkout-redirect for the appropriate environment
const CHECKOUT_API_BASE = import.meta.env.VITE_CHECKOUT_API_BASE || 'https://ops.beltdev.com';

const Pricing = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode'); // 'upgrade' or null
    const token = searchParams.get('token'); // device JWT for authenticated checkout
    const apiBaseParam = searchParams.get('api_base'); // URL from desktop app (ops.belt.ai or ops.beltdev.com)

    // The gateway URL that handles checkout-redirect for the appropriate environment
    let CHECKOUT_API_BASE = import.meta.env.VITE_CHECKOUT_API_BASE || 'https://ops.beltdev.com';

    if (apiBaseParam) {
        // Drop any trailing slash just in case
        CHECKOUT_API_BASE = apiBaseParam.replace(/\/$/, '');
    }

    const isUpgradeMode = mode === 'upgrade' && token;

    // Build the checkout redirect URL for a given interval
    const getCheckoutUrl = (interval) => {
        return `${CHECKOUT_API_BASE}/api/apps/uw-agent/agent/subscription/checkout-redirect?interval=${interval}&token=${encodeURIComponent(token)}`;
    };

    // Trial sign-up URL (default mode)
    const trialUrl = 'https://ops.beltdev.com/tenant-user/login';

    return (
        <section className="pricing-page">
            <div className="container animate-fade-in">
                <div className="pricing-header">
                    <h1 className="section-title">
                        {isUpgradeMode ? 'Choose your plan' : 'Simple, transparent pricing'}
                    </h1>
                    <p className="section-subtitle">
                        {isUpgradeMode
                            ? 'Select a plan below to complete your upgrade and unlock full access.'
                            : 'Everything you need to regain control of your inbox, with no hidden fees.'}
                    </p>
                </div>

                <div className="pricing-cards">
                    <div className="card-panel pricing-card hover-lift delay-100">
                        <h3 className="pricing-tier">Monthly</h3>
                        <div className="pricing-price">
                            <span className="currency">$</span>
                            <span className="amount">12</span>
                            <span className="period">/ user / month</span>
                        </div>
                        <p className="pricing-desc">Billed monthly. Cancel anytime.</p>
                        <a
                            href={isUpgradeMode ? getCheckoutUrl('month') : trialUrl}
                            className="btn btn-secondary btn-full"
                            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                        >
                            {isUpgradeMode ? 'Subscribe Monthly' : 'Start 14-day free trial'}
                        </a>
                        <ul className="pricing-features">
                            <li><Check size={18} className="feature-check" /> Full Triage capabilities</li>
                            <li><Check size={18} className="feature-check" /> Personal CRM tools</li>
                            <li><Check size={18} className="feature-check" /> Advanced semantic search</li>
                            <li><Check size={18} className="feature-check" /> Support for Mac & Windows</li>
                        </ul>
                    </div>

                    <div className="card-panel pricing-card popular hover-lift delay-200">
                        <div className="popular-badge">Most Popular</div>
                        <h3 className="pricing-tier">Yearly</h3>
                        <div className="pricing-price">
                            <span className="currency">$</span>
                            <span className="amount">10</span>
                            <span className="period">/ user / month</span>
                        </div>
                        <p className="pricing-desc">Billed $120 annually. Save 16%.</p>
                        <a
                            href={isUpgradeMode ? getCheckoutUrl('year') : trialUrl}
                            className="btn btn-primary btn-full"
                            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                        >
                            {isUpgradeMode ? 'Subscribe Yearly' : 'Start 14-day free trial'}
                        </a>
                        <ul className="pricing-features">
                            <li><Check size={18} className="feature-check" /> All Monthly features</li>
                            <li><Check size={18} className="feature-check" /> Priority email support</li>
                            <li><Check size={18} className="feature-check" /> Early access to new features</li>
                            <li><Check size={18} className="feature-check" /> Custom LLM configurations</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
