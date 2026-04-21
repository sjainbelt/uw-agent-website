import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';
import usePageTracking from '../hooks/usePageTracking';

const HowItWorks = ({ openContactModal }) => {
    // Relying on global usePageTracking for PostHog event logging
    // which automatically captures pageview on mount based on the route.

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when navigating to this page
    }, []);

    return (
        <main className="pt-32 pb-24 overflow-hidden">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-8 mb-32 animate-fade-in delay-100">
                <div className="hiw-hero-grid">
                    <div>
                        <span className="hiw-badge">
                            System Architecture
                        </span>
                        <h1 className="text-6xl md:text-7xl font-extrabold text-on-background tracking-tighter leading-none mb-8">
                            Seamless <br />Resilience in <br /><span className="text-primary">Three Steps.</span>
                        </h1>
                        <p className="text-body-lg text-on-surface-variant max-w-lg leading-relaxed mb-8">
                            Traditional backups are fragile. UnderWrite creates an immovable archival twin of your business data, ensuring continuity when the primary systems fail.
                        </p>
                        <div className="flex items-center gap-2 text-secondary font-bold">
                            <span className="material-symbols-outlined">shield_with_heart</span>
                            <span className="text-sm tracking-tight uppercase">Military-Grade Archival Protocol</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="hiw-glow absolute -top-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="relative bg-surface-container-low rounded-xl p-2 shadow-2xl">
                            <img src="/images/hiw-hero.jpg" alt="Data nodes visualization" className="rounded-lg w-full aspect-square object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 1: Connect */}
            <section className="bg-surface-container-low py-32">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="hiw-step-grid">
                        <div className="hiw-step-content order-2 md:order-1">
                            <div className="bg-surface-lowest rounded-xl p-8 shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 rounded-lg bg-background border border-outline-variant/10">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex-center">
                                            <span className="material-symbols-outlined text-blue-600">account_balance</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold">iManage</p>
                                            <p className="text-xs text-on-surface-variant">Connected & Verified</p>
                                        </div>
                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-lg bg-background border border-outline-variant/10 opacity-60">
                                        <div className="w-10 h-10 rounded-full bg-sky-100 flex-center">
                                            <span className="material-symbols-outlined text-sky-600">folder_shared</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold">NetDocuments</p>
                                            <p className="text-xs text-on-surface-variant">Authentication Pending</p>
                                        </div>
                                        <button className="text-xs font-bold text-primary">CONNECT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="hiw-step-number">01</div>
                            <h2 className="text-4xl font-bold text-on-background mb-6">Connect.</h2>
                            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                Integration is the first pillar. Securely authenticate your existing Document Management Systems (iManage, NetDocuments, Box, SharePoint) with a single-click OAuth handshake. No complex server configurations or API scripting required.
                            </p>
                            <ul className="space-y-4 hiw-list">
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                                    <span className="text-sm font-medium">Zero-configuration setup</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-sm">lock</span>
                                    <span className="text-sm font-medium">OAuth 2.0 Secure Protocols</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 2: Sync */}
            <section className="py-32 bg-surface-lowest">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="hiw-step-grid">
                        <div className="order-1 md:order-1">
                            <div className="hiw-step-number">02</div>
                            <h2 className="text-4xl font-bold text-on-background mb-6">Sync.</h2>
                            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                Once connected, UnderWrite initiates an encrypted, real-time background sync. Every modification in your primary storage is mirrored instantly to an independent, air-gapped archival cloud.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-lg bg-surface-container-low">
                                    <h4 className="text-2xl font-bold text-primary mb-1">99.9%</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Consistency</p>
                                </div>
                                <div className="p-6 rounded-lg bg-surface-container-low">
                                    <h4 className="text-2xl font-bold text-primary mb-1">256-bit</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Encryption</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative order-2 md:order-2">
                            <img src="/images/hiw-sync.jpg" alt="Data transfer path" className="rounded-xl shadow-2xl" />
                            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md p-4 rounded-lg shadow-xl flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <span className="text-xs font-bold tracking-widest uppercase">Live Archiving</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 3: Access */}
            <section className="bg-surface-container-low py-32">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="hiw-step-grid">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl hiw-access-card group order-2 md:order-1">
                            <img src="/images/hiw-access.jpg" alt="File recovery interface" className="w-full hiw-grayscale transition-all duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-primary text-white p-6 rounded-full shadow-2xl transform transition-transform hover-scale">
                                    <span className="material-symbols-outlined text-4xl">key</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="hiw-step-number">03</div>
                            <h2 className="text-4xl font-bold text-on-background mb-6">Access.</h2>
                            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                In the event of an outage or catastrophic loss, the UnderWrite portal becomes your new primary workspace. One-click access to all your files through our high-speed, secure gateway.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-light p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-primary">ads_click</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Instant Switchover</h4>
                                        <p className="text-sm text-on-surface-variant">Don't wait for restoration. Use files directly from the archive.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-light p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-primary">history</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Version History</h4>
                                        <p className="text-sm text-on-surface-variant">Access any previous version of your archive with temporal tracking.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-8 py-32 text-center">
                <h2 className="text-5xl font-black tracking-tight mb-8">Ready to secure your legacy?</h2>
                <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
                    Join thousands of enterprises that refuse to let a system failure stop their operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/download" className="btn signature-gradient px-10 py-4 font-bold text-lg shadow-xl hover:scale-95 transition-transform text-center">Get Started Today</Link>
                    <button onClick={() => openContactModal("Sales Inquiry")} className="btn bg-white border border-outline-variant text-on-surface px-10 py-4 font-bold text-lg hover:bg-surface-container-low transition-colors" style={{ color: 'var(--text-main)', border: '1px solid var(--outline-variant)' }}>Talk to Sales</button>
                </div>
            </section>
        </main>
    );
};

export default HowItWorks;
