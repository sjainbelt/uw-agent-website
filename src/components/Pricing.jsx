import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pricing.css';



const formatAmount = (value) => {
    if (value == null || Number.isNaN(value)) return null;
    const rounded = Math.round(value * 100) / 100;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
};

const currencySymbol = (currency) => {
    if (!currency) return '$';
    return currency.toLowerCase() === 'usd' ? '$' : `${currency.toUpperCase()} `;
};

const formatCurrencyText = (amount, currency) => {
    if (amount == null || Number.isNaN(amount)) return '$0';
    const code = (currency || 'USD').toUpperCase();
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: code, maximumFractionDigits: 2 }).format(amount);
    } catch {
        return `${currencySymbol(currency)}${formatAmount(amount)}`;
    }
};

const Pricing = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode'); // 'upgrade' or null
    const intent = searchParams.get('intent'); // short-lived checkout intent (preferred)
    const token = searchParams.get('token'); // device JWT for authenticated checkout
    const apiBaseParam = searchParams.get('api_base'); // URL from desktop app (ops.belt.ai or ops.beltdev.com)
    const planCode = (searchParams.get('plan_code') || 'pro').trim().toLowerCase();

    // The gateway URL that handles checkout-redirect for the appropriate environment
    let checkoutApiBase = import.meta.env.VITE_CHECKOUT_API_BASE || 'https://ops.belt.ai';
    if (apiBaseParam) {
        // Drop any trailing slash just in case
        checkoutApiBase = apiBaseParam.replace(/\/$/, '');
    }

    const [catalogByInterval, setCatalogByInterval] = useState({ month: null, year: null });
    const [apiStatus, setApiStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const loadPricing = async () => {
            try {
                const url = `${checkoutApiBase}/api/apps/underwrite/pricing?plan_code=${encodeURIComponent(planCode)}`;
                const res = await fetch(url);
                if (!res.ok) {
                    if (!cancelled) {
                        setApiStatus('error');
                        setApiError(`HTTP Error: ${res.status}`);
                    }
                    return;
                }
                const body = await res.json();
                const prices = Array.isArray(body?.prices) ? body.prices : [];

                const byInterval = { month: null, year: null };
                for (const p of prices) {
                    // Accept any valid price (Stripe or custom fallback)
                    if ((p?.interval === 'month' || p?.interval === 'year') && p?.price_id) {
                        byInterval[p.interval] = p;
                    }
                }

                if (!cancelled) {
                    if (byInterval.month || byInterval.year) {
                        setCatalogByInterval(byInterval);
                        setApiStatus('success');
                    } else {
                        // Empty prices should fall back to standard empty state
                        setApiStatus('error');
                        setApiError('No valid intervals found in API response');
                    }
                }
            } catch (err) {
                // Keep static fallback pricing when API is unavailable.
                console.warn('Failed to fetch pricing catalog', err);
                if (!cancelled) {
                    setApiStatus('error');
                    setApiError(err.message || 'fetch failed');
                }
            }
        };

        loadPricing();
        return () => {
            cancelled = true;
        };
    }, [checkoutApiBase, planCode]);

    const isUpgradeMode = mode === 'upgrade' && (intent || token);

    // Build the checkout redirect URL for a given interval
    const getCheckoutUrl = (interval) => {
        const authParam = intent
            ? `intent=${encodeURIComponent(intent)}`
            : `token=${encodeURIComponent(token)}`;
        return `${checkoutApiBase}/api/apps/underwrite/agent/subscription/checkout-redirect?interval=${interval}&plan_code=${encodeURIComponent(planCode)}&${authParam}`;
    };

    // Trial sign-up URL (default mode)
    const trialUrl = 'https://app.belt.ai/tenant-user/signup?app=underwrite';

    const monthlyPrice = catalogByInterval.month;
    const yearlyPrice = catalogByInterval.year;

    const monthlyUnit = monthlyPrice?.unit_amount ? monthlyPrice.unit_amount / 100 : 10;
    const monthlyDisplay = formatAmount(monthlyUnit);
    const monthlyCurrency = monthlyPrice?.currency || 'usd';

    const yearlyAnnual = yearlyPrice?.unit_amount ? yearlyPrice.unit_amount / 100 : 100;
    const yearlyPerMonth = yearlyAnnual / 12;
    const yearlyDisplay = formatAmount(yearlyPerMonth);
    const yearlyCurrency = yearlyPrice?.currency || 'usd';
    const yearlyDesc = `Billed ${formatCurrencyText(yearlyAnnual, yearlyCurrency)} annually.`;

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
                            : 'Enterprise-grade business continuity for your document management, with no hidden fees.'}
                    </p>
                </div>

                <div className="pricing-cards">
                    {apiStatus === 'error' && (
                        <div className="card-panel empty-state" style={{ width: '100%', textAlign: 'center', padding: '4rem 2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pricing Unavailable</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Pricing details for this application are currently being configured. Please check back later.</p>
                            <p style={{ color: 'red', marginTop: '1rem', fontSize: '1rem', opacity: 0.8 }}>Debug info: {apiError}</p>
                        </div>
                    )}

                    {apiStatus === 'success' && catalogByInterval.month && (
                        <div className="card-panel pricing-card hover-lift delay-100">
                            <h3 className="pricing-tier">Monthly</h3>
                            <div className="pricing-price">
                                <span className="currency">{currencySymbol(monthlyCurrency)}</span>
                                <span className="amount">{monthlyDisplay}</span>
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
                                <li><Check size={18} className="feature-check" /> iManage, NetDocuments, Box & SharePoint</li>
                                <li><Check size={18} className="feature-check" /> Automatic continuous document sync</li>
                                <li><Check size={18} className="feature-check" /> Instant outage access and downloads</li>
                                <li><Check size={18} className="feature-check" /> Support for Mac & Windows</li>
                            </ul>
                        </div>
                    )}

                    {apiStatus === 'success' && catalogByInterval.year && (
                        <div className="card-panel pricing-card popular hover-lift delay-200">
                            <div className="popular-badge">Most Popular</div>
                            <h3 className="pricing-tier">Yearly</h3>
                            <div className="pricing-price">
                                <span className="currency">{currencySymbol(yearlyCurrency)}</span>
                                <span className="amount">{yearlyDisplay}</span>
                                <span className="period">/ user / month</span>
                            </div>
                            <p className="pricing-desc">{yearlyDesc}</p>
                            <a
                                href={isUpgradeMode ? getCheckoutUrl('year') : trialUrl}
                                className="btn btn-primary btn-full"
                                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                            >
                                {isUpgradeMode ? 'Subscribe Yearly' : 'Start 14-day free trial'}
                            </a>
                            <ul className="pricing-features">
                                <li><Check size={18} className="feature-check" /> All Monthly features</li>
                                <li><Check size={18} className="feature-check" /> Priority support</li>
                                <li><Check size={18} className="feature-check" /> Centralized admin controls</li>
                                <li><Check size={18} className="feature-check" /> Custom continuity policy configuration</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
