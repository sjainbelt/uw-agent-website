import React, { useEffect } from 'react';
import './Integrations.css';

const Integrations = ({ openContactModal }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-24 overflow-hidden bg-background font-body text-on-background">
            {/* Hero Section */}
            <section className="relative px-8 py-24 overflow-hidden animate-fade-in delay-100">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="sec-badge mb-6" style={{ backgroundColor: 'rgba(167, 52, 5, 0.1)', color: 'var(--primary)' }}>
                        <span className="material-symbols-outlined text-sm">hub</span>
                        Ecosystem Integrations
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-on-background leading-tight mb-8">
                        Connect Once. <br /><span className="text-primary text-gradient">Archive Infinitely.</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-2xl">
                        Deep-tier integrations with industry-standard Document Management Systems. We mirror metadata, granular permissions, and temporal version histories natively.
                    </p>
                </div>
            </section>

            {/* Platform Matrix */}
            <section className="px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="integration-matrix">
                        {/* Legal Tech Integrations */}
                        <div className="integration-col">
                            <h3 className="section-eyebrow">Legal Workspace Providers</h3>
                            <div className="integration-card group">
                                <div className="int-card-header">
                                    <span className="material-symbols-outlined int-icon text-primary">account_balance</span>
                                    <h4 className="int-title">iManage Work</h4>
                                    <span className="int-status">Active</span>
                                </div>
                                <p className="int-desc">Full workspace parity including matters, clients, and custom metadata templates.</p>
                                <div className="int-features">
                                    <span><span className="material-symbols-outlined text-xs">done</span> Matter Syncer</span>
                                    <span><span className="material-symbols-outlined text-xs">done</span> Security Mapping</span>
                                </div>
                            </div>
                            
                            <div className="integration-card group">
                                <div className="int-card-header">
                                    <span className="material-symbols-outlined int-icon text-primary">folder_managed</span>
                                    <h4 className="int-title">NetDocuments</h4>
                                    <span className="int-status">Active</span>
                                </div>
                                <p className="int-desc">Cabinet-level mirroring with encrypted transport and profile attribute retention.</p>
                                <div className="int-features">
                                    <span><span className="material-symbols-outlined text-xs">done</span> Cabinet Archival</span>
                                    <span><span className="material-symbols-outlined text-xs">done</span> Echo Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise File Sync & Share */}
                        <div className="integration-col">
                            <h3 className="section-eyebrow">Enterprise Sync & Share</h3>
                            <div className="integration-card group">
                                <div className="int-card-header">
                                    <span className="material-symbols-outlined int-icon" style={{ color: '#0061D5' }}>grid_view</span>
                                    <h4 className="int-title">Box Enterprise</h4>
                                    <span className="int-status">Active</span>
                                </div>
                                <p className="int-desc">Continuous real-time webhook streaming for Box structured enterprise content.</p>
                                <div className="int-features">
                                    <span><span className="material-symbols-outlined text-xs">done</span> Retention Policy Sync</span>
                                </div>
                            </div>

                            <div className="integration-card group">
                                <div className="int-card-header">
                                    <span className="material-symbols-outlined int-icon" style={{ color: '#0078D4' }}>cloud</span>
                                    <h4 className="int-title">Microsoft OneDrive</h4>
                                    <span className="int-status">Active</span>
                                </div>
                                <p className="int-desc">Graph API integrated archival, preserving O365 classifications and holds.</p>
                                <div className="int-features">
                                    <span><span className="material-symbols-outlined text-xs">done</span> Graph API</span>
                                </div>
                            </div>

                            <div className="integration-card group">
                                <div className="int-card-header">
                                    <span className="material-symbols-outlined int-icon" style={{ color: '#34A853' }}>source</span>
                                    <h4 className="int-title">Google Workspace</h4>
                                    <span className="int-status">Active</span>
                                </div>
                                <p className="int-desc">Shared drives and domain-wide delegation for headless archival.</p>
                                <div className="int-features">
                                    <span><span className="material-symbols-outlined text-xs">done</span> Shared Drives</span>
                                </div>
                            </div>
                        </div>

                         {/* Destination Storage */}
                         <div className="integration-col">
                            <h3 className="section-eyebrow flex items-center gap-2"><span className="material-symbols-outlined text-sm">lock</span> Archival Destinations</h3>
                            
                            <div className="integration-target bg-surface-container-low">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background flex-center shadow-sm">
                                        <span className="material-symbols-outlined" style={{ color: '#FF9900' }}>storage</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">AWS S3 Glacier</h4>
                                        <p className="text-xs text-on-surface-variant">Deep Archive WORM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="integration-target bg-surface-container-low">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background flex-center shadow-sm">
                                        <span className="material-symbols-outlined" style={{ color: '#4285F4' }}>dns</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Google Cloud Storage</h4>
                                        <p className="text-xs text-on-surface-variant">Coldline / Archive</p>
                                    </div>
                                </div>
                            </div>

                            <div className="integration-target bg-surface-container-low">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background flex-center shadow-sm">
                                        <span className="material-symbols-outlined" style={{ color: '#0089D6' }}>cloud_done</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Azure Blob Storage</h4>
                                        <p className="text-xs text-on-surface-variant">Archive Tier WORM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integration Banner */}
            <section className="px-8 py-32">
                <div className="max-w-5xl mx-auto banner-card bg-dark text-white p-12 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-bold mb-6">Need a custom connector?</h2>
                        <p className="text-stone-400 mb-8 max-w-xl mx-auto text-lg hover-scale">Our integration engineering team builds specialized connectors for proprietary on-premise document management systems. Let's discuss your architecture.</p>
                        <button onClick={() => openContactModal("Engineering Inquiry")} className="btn signature-gradient px-8 py-3 shadow-xl uppercase font-bold tracking-widest text-sm">Contact Engineering</button>
                    </div>
                    {/* Decorative abstract elements */}
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-secondary rounded-full filter blur-3xl opacity-30"></div>
                </div>
            </section>
        </main>
    );
};

export default Integrations;
