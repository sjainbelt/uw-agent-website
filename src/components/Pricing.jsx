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
    const apiBaseParam = searchParams.get('api_base'); 
    const planCode = searchParams.get('plan_code') ? searchParams.get('plan_code').trim().toLowerCase() : '';

    let checkoutApiBase = import.meta.env.VITE_CHECKOUT_API_BASE || 'https://ops.belt.ai';
    if (apiBaseParam) {
        checkoutApiBase = apiBaseParam.replace(/\/$/, '');
    }

    const [apiPrices, setApiPrices] = useState([]);
    const [apiStatus, setApiStatus] = useState('loading'); 
    const [billingInterval, setBillingInterval] = useState('year'); 

    useEffect(() => {
        let cancelled = false;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

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
                    setApiPrices(fetchedPrices);
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

    const fallbackPlans = [
        {
            planCode: 'pro',
            name: 'Pro',
            description: 'Enterprise-grade business continuity for your document management, with no hidden fees.',
            options: [
                {
                    interval: 'month',
                    currency: 'usd',
                    unit_amount: 1000, 
                    features: ['iManage, NetDocuments, Box & SharePoint', 'Automatic continuous document sync', 'Instant outage access and downloads', 'Support for Mac & Windows']
                },
                {
                    interval: 'year',
                    currency: 'usd',
                    unit_amount: 10000, 
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
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(167, 52, 5, 0.1)',
                        color: 'var(--primary)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '1.5rem'
                    }}>
                        <span className="material-symbols-outlined text-sm">payments</span>
                        Pricing Plans
                    </span>
                    <h1 style={{ fontSize: '3.75rem', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                        {isUpgradeMode ? 'Choose your plan' : 'Simple, transparent pricing'}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        {isUpgradeMode
                            ? 'Select a plan below to complete your upgrade and unlock full access.'
                            : 'Enterprise-grade business continuity for your document management, with no hidden fees.'}
                    </p>
                    
                    {/* Interval Toggle */}
                    <div className="pricing-toggle-container">
                        <div className="pricing-toggle">
                            <button 
                                className={`toggle-btn ${billingInterval === 'month' ? 'active' : ''}`}
                                onClick={() => setBillingInterval('month')}
                            >
                                Monthly
                            </button>
                            <button 
                                className={`toggle-btn ${billingInterval === 'year' ? 'active' : ''}`}
                                onClick={() => setBillingInterval('year')}
                            >
                                Yearly <span style={{fontSize: '0.625rem', background: billingInterval === 'year' ? 'rgba(255,255,255,0.2)' : 'rgba(167, 52, 5, 0.1)', color: billingInterval === 'year' ? 'white' : 'var(--primary)', padding: '2px 8px', borderRadius: '12px'}}>Save ~16%</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pricing-cards">
                    {displayPlans.map((plan, idx) => {
                        let activeOption = plan.options.find(o => o.interval === billingInterval);
                        if (!activeOption && plan.options.length > 0) {
                            activeOption = plan.options[0];
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
                            <div key={`${plan.planCode}-${idx}`} className={`pricing-card hover-lift delay-${(idx+1)*100} ${isPopular ? 'popular' : ''}`}>
                                {isPopular && <div className="popular-badge">Most Popular</div>}
                                <h3 className="pricing-tier">{plan.name}</h3>
                                <p className="pricing-desc" style={{minHeight: '40px'}}>{plan.description}</p>
                                
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
                                        className={isPopular ? 'btn-pricing-primary' : 'btn-pricing-secondary'}
                                        onClick={handleDownload}
                                        disabled={isLoading}
                                    >
                                        <span className="material-symbols-outlined" style={{ marginRight: '8px', fontSize: '18px' }}>download</span>
                                        Download for {label}
                                    </button>
                                ) : (
                                    <Link
                                        to="/download"
                                        className={isPopular ? 'btn-pricing-primary' : 'btn-pricing-secondary'}
                                    >
                                        <span className="material-symbols-outlined" style={{ marginRight: '8px', fontSize: '18px' }}>download</span>
                                        Download
                                    </Link>
                                )}
                                
                                <ul className="pricing-features">
                                    {featuresList.map((f, fIdx) => (
                                        <li key={fIdx}>
                                            <span className="material-symbols-outlined feature-check" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> 
                                            {f}
                                        </li>
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
