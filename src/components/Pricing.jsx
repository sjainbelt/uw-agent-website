import { Check, Download } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useLatestRelease, osLabel } from '../hooks/useLatestRelease';
import { useSearchParams, Link } from 'react-router-dom';
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
    const { os, downloadUrl, isLoading } = useLatestRelease();
    const label = osLabel(os);

    const handleDownload = () => {
        if (downloadUrl) {
            window.location.href = downloadUrl;
        }
    };

    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode'); // 'upgrade' or null
    const intent = searchParams.get('intent'); // short-lived checkout intent (preferred)
    const token = searchParams.get('token'); // device JWT for authenticated checkout
    const apiBaseParam = searchParams.get('api_base'); // URL from desktop app (ops.belt.ai or ops.beltdev.com)
    // planCode parameter restricts the backend query to just one plan, but it now defaults empty so we fetch all
    const planCode = searchParams.get('plan_code') ? searchParams.get('plan_code').trim().toLowerCase() : '';

    let checkoutApiBase = import.meta.env.VITE_CHECKOUT_API_BASE || 'https://ops.belt.ai';
    if (apiBaseParam) {
        checkoutApiBase = apiBaseParam.replace(/\/$/, '');
    }

    const [apiPrices, setApiPrices] = useState([]);
    const [apiStatus, setApiStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [billingInterval, setBillingInterval] = useState('year'); // default toggle

    useEffect(() => {
        let cancelled = false;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const loadPricing = async () => {
            try {
                const urlObj = new URL(`${checkoutApiBase}/api/apps/underwrite/agent/pricing`);
                if (planCode) {
                    urlObj.searchParams.set('plan_code', planCode);
                }
                const res = await fetch(urlObj.toString(), { signal: controller.signal });
                if (!res.ok) {
                    if (!cancelled) setApiStatus('error');
                    return;
                }
                const body = await res.json();
                const fetchedPrices = Array.isArray(body?.prices) ? body.prices : [];

                if (!cancelled) {
                    // Underwrite handler can return any valid price array
                    setApiPrices(fetchedPrices);
                    // It's a success if we get an array back (even empty if no pricing is configured)
                    setApiStatus('success'); 
                }
            } catch (err) {
                console.warn('Failed to fetch pricing catalog', err);
                if (!cancelled) setApiStatus('error');
            }
        };

        loadPricing();
        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [checkoutApiBase, planCode]);

    const isUpgradeMode = mode === 'upgrade' && (intent || token);

    // Group prices by plan_code
    const plans = useMemo(() => {
        const grouped = {};
        for (const p of apiPrices) {
            if (!grouped[p.plan_code]) {
                grouped[p.plan_code] = {
                    planCode: p.plan_code,
                    name: p.name || (p.plan_code.charAt(0).toUpperCase() + p.plan_code.slice(1)),
                    description: p.description || 'Enterprise-grade business continuity for your document management, with no hidden fees.',
                    options: []
                };
            }
            grouped[p.plan_code].options.push(p);
        }
        
        // Convert to array and sort.
        const arr = Object.values(grouped);
        const orderWeight = (code) => {
            if (code === 'free' || code === 'basic') return 0;
            if (code === 'starter') return 1;
            if (code === 'pro' || code === 'standard') return 2;
            if (code === 'premium' || code === 'advanced') return 3;
            if (code === 'enterprise') return 4;
            return 99;
        };
        arr.sort((a, b) => orderWeight(a.planCode) - orderWeight(b.planCode));
        return arr;
    }, [apiPrices]);

    // Fallback plans arrays if API fails or hasn't loaded
    const fallbackPlans = [
        {
            planCode: 'pro',
            name: 'Pro',
            description: 'Enterprise-grade business continuity for your document management, with no hidden fees.',
            options: [
                {
                    interval: 'month',
                    currency: 'usd',
                    unit_amount: 1000, // $10.00 fallback
                    features: ['iManage, NetDocuments, Box & SharePoint', 'Automatic continuous document sync', 'Instant outage access and downloads', 'Support for Mac & Windows']
                },
                {
                    interval: 'year',
                    currency: 'usd',
                    unit_amount: 10000, // $100.00 fallback
                    features: ['All Monthly features', 'Priority support', 'Centralized admin controls', 'Custom continuity policy configuration']
                }
            ]
        }
    ];

    const displayPlans = apiStatus === 'success' && plans.length > 0 ? plans : fallbackPlans;

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
                    
                    {/* Interval Toggle */}
                    <div className="pricing-toggle-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
                        <div className="pricing-toggle" style={{ display: 'flex', background: 'var(--bg-card-panel)', borderRadius: '30px', padding: '4px', border: '1px solid var(--border-color)'}}>
                            <button 
                                className={`toggle-btn ${billingInterval === 'month' ? 'active' : ''}`}
                                onClick={() => setBillingInterval('month')}
                                style={{
                                    padding: '8px 24px', 
                                    borderRadius: '24px', 
                                    border: 'none', 
                                    background: billingInterval === 'month' ? 'var(--primary-color)' : 'transparent',
                                    color: billingInterval === 'month' ? 'white' : 'var(--text-secondary)',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Monthly
                            </button>
                            <button 
                                className={`toggle-btn ${billingInterval === 'year' ? 'active' : ''}`}
                                onClick={() => setBillingInterval('year')}
                                style={{
                                    padding: '8px 24px', 
                                    borderRadius: '24px', 
                                    border: 'none', 
                                    background: billingInterval === 'year' ? 'var(--primary-color)' : 'transparent',
                                    color: billingInterval === 'year' ? 'white' : 'var(--text-secondary)',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                Yearly <span style={{fontSize: '0.75rem', background: billingInterval === 'year' ? 'rgba(255,255,255,0.2)' : 'var(--primary-color)', color: 'white', padding: '2px 8px', borderRadius: '12px'}}>Save ~16%</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pricing-cards">
                    {displayPlans.map((plan, idx) => {
                        // Find price for the selected interval, or fallback to whatever they map
                        let activeOption = plan.options.find(o => o.interval === billingInterval);
                        if (!activeOption && plan.options.length > 0) {
                            activeOption = plan.options[0]; // fallback if the plan doesn't have the selected interval
                        }
                        
                        if (!activeOption) return null;

                        const isYearly = activeOption.interval === 'year';
                        const currency = activeOption.currency || 'usd';
                        
                        let monthlyEquivalentAmount = null;
                        let annualAmountString = '';

                        if (isYearly && activeOption.unit_amount) {
                            const annualVal = activeOption.unit_amount / 100;
                            monthlyEquivalentAmount = formatAmount(annualVal / 12);
                            annualAmountString = `Billed ${formatCurrencyText(annualVal, currency)} annually.`;
                        } else if (!isYearly && activeOption.unit_amount) {
                            monthlyEquivalentAmount = formatAmount(activeOption.unit_amount / 100);
                        }

                        // Determine features either from Stripe marketing features or hardcoded fallback
                        let featuresList = activeOption.features || [];
                        if (featuresList.length === 0) {
                            if (isYearly) {
                                featuresList = ['All Monthly features', 'Priority support', 'Centralized admin controls', 'Custom continuity policy configuration'];
                            } else {
                                featuresList = ['iManage, NetDocuments, Box & SharePoint', 'Automatic continuous document sync', 'Instant outage access and downloads', 'Support for Mac & Windows'];
                            }
                        }

                        const isPopular = plan.planCode === 'pro' && isYearly;

                        return (
                            <div key={`${plan.planCode}-${idx}`} className={`card-panel pricing-card hover-lift delay-${(idx+1)*100} ${isPopular ? 'popular' : ''}`}>
                                {isPopular && <div className="popular-badge">Most Popular</div>}
                                <h3 className="pricing-tier">{plan.name}</h3>
                                <p className="pricing-desc" style={{minHeight: '40px', fontSize: '0.9rem', marginBottom: '1.5rem'}}>{plan.description}</p>
                                
                                <div className="pricing-price">
                                    <span className="currency">{currencySymbol(currency)}</span>
                                    <span className="amount">{monthlyEquivalentAmount || '0'}</span>
                                    <span className="period">/ user / month</span>
                                </div>
                                
                                <p className="pricing-desc" style={{minHeight: '24px'}}>
                                    {isYearly ? annualAmountString : 'Billed monthly. Cancel anytime.'}
                                </p>
                                
                                {downloadUrl ? (
                                    <button
                                        className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'} btn-full`}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onClick={handleDownload}
                                        disabled={isLoading}
                                    >
                                        <Download size={18} className="mr-2" style={{ marginRight: '8px' }} />
                                        Download for {label}
                                    </button>
                                ) : (
                                    <Link
                                        to="/download"
                                        className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'} btn-full`}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                                    >
                                        <Download size={18} className="mr-2" style={{ marginRight: '8px' }} />
                                        Download
                                    </Link>
                                )}
                                
                                <ul className="pricing-features">
                                    {featuresList.map((f, fIdx) => (
                                        <li key={fIdx}><Check size={18} className="feature-check" /> {f}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
