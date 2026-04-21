import './Features.css';

const Features = ({ openContactModal }) => {
    return (
        <section id="features">
            {/* Section 1: Multi-Platform Connectors */}
            <div className="section-padding section-bg-alt">
                <div className="container">
                    <div className="connectors-grid animate-fade-in delay-100">
                        <div>
                            <h2 className="connectors-title">Multi-Platform Connectors</h2>
                            <p className="connectors-subtitle">
                                Deep-tier integration with industry-standard Document Management Systems. We don't just sync; we mirror the metadata, security permissions, and version history of your primary repositories.
                            </p>
                            <div className="connectors-cards">
                                <div className="connector-card">
                                    <span className="material-symbols-outlined connector-card-icon">hub</span>
                                    <h4 className="connector-card-title">iManage</h4>
                                    <p className="connector-card-text">Full workspace parity and legal hold synchronization.</p>
                                </div>
                                <div className="connector-card">
                                    <span className="material-symbols-outlined connector-card-icon">account_tree</span>
                                    <h4 className="connector-card-title">NetDocuments</h4>
                                    <p className="connector-card-text">Cabinet-level mirroring with encrypted transport.</p>
                                </div>
                                <div className="connector-card">
                                    <span className="material-symbols-outlined connector-card-icon">grid_view</span>
                                    <h4 className="connector-card-title">Box</h4>
                                    <p className="connector-card-text">Enterprise-grade content management sync.</p>
                                </div>
                                <div className="connector-card">
                                    <span className="material-symbols-outlined connector-card-icon">cloud_queue</span>
                                    <h4 className="connector-card-title">OneDrive</h4>
                                    <p className="connector-card-text">Real-time delta-block replication for Office 365.</p>
                                </div>
                            </div>
                        </div>
                        <div className="connectors-visual-container">
                            <div className="connectors-glow"></div>
                            <img src="/images/server-status.jpg" alt="Server rack status lights" className="connectors-image" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: The Continuity Hedge */}
            <div className="section-padding">
                <div className="container animate-fade-in delay-200">
                    <div className="hedge-header">
                        <h2 className="hedge-title">The Continuity Hedge</h2>
                        <p className="hedge-subtitle">
                            Eliminate single-point-of-failure risks by archiving your primary cloud data into an isolated, geographically distinct secondary public cloud.
                        </p>
                    </div>

                    <div className="hedge-visual">
                        <div className="hedge-diagram">
                            <div className="hedge-node primary">
                                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#4f6073', marginBottom: '0.5rem' }}>cloud_off</span>
                                <span className="hedge-node-title" style={{ color: '#4f6073' }}>Primary Cloud</span>
                                <span className="hedge-node-status" style={{ color: 'var(--error)' }}><span className="hedge-status-dot error"></span> Offline</span>
                            </div>
                            <div className="hedge-path-container">
                                <div className="hedge-path-line"></div>
                                <div className="hedge-path-icon signature-gradient">
                                    <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '1.875rem' }}>shield_with_heart</span>
                                </div>
                            </div>
                            <div className="hedge-node secondary">
                                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>verified_user</span>
                                <span className="hedge-node-title" style={{ color: 'var(--primary)' }}>UnderWrite Hedge</span>
                                <span className="hedge-node-status" style={{ color: 'var(--primary)' }}><span className="hedge-status-dot active"></span> Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="hedge-features">
                        <div className="hedge-feature">
                            <h3>Zero Trust Transit</h3>
                            <p>Data is encrypted at the source and re-encrypted at the destination with client-held keys.</p>
                        </div>
                        <div className="hedge-feature">
                            <h3>Cloud Isolation</h3>
                            <p>Cross-hyperscaler replication ensures availability even during total regional cloud outages.</p>
                        </div>
                        <div className="hedge-feature">
                            <h3>Immutable Vaults</h3>
                            <p>WORM (Write Once, Read Many) storage protocols prevent accidental or malicious deletion.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Instant Recovery */}
            <div className="section-padding section-bg-dark">
                <div className="container">
                    <div className="recovery-grid animate-fade-in delay-300">
                        <div className="recovery-mockup">
                            <div className="mockup-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div className="mockup-window-controls">
                                        <div className="mockup-dot r"></div>
                                        <div className="mockup-dot y"></div>
                                        <div className="mockup-dot g"></div>
                                    </div>
                                    <span className="mockup-url">underwrite.io/emergency-portal</span>
                                </div>
                                <span className="mockup-status">EMERGENCY MODE ACTIVE</span>
                            </div>
                            <div className="mockup-body">
                                <div className="mockup-toolbar">
                                    <div className="mockup-search">
                                        <span className="material-symbols-outlined">search</span>
                                        <span className="text">Search archived matter files...</span>
                                    </div>
                                    <div className="mockup-btn">Download All</div>
                                </div>
                                <div className="mockup-list">
                                    <div className="mockup-item">
                                        <div className="mockup-item-left">
                                            <span className="material-symbols-outlined mockup-item-icon">description</span>
                                            <div>
                                                <div className="mockup-item-title">Litigation_Case_v4_Final.pdf</div>
                                                <div className="mockup-item-meta">Archived 2h ago • 4.2 MB</div>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined" style={{ color: '#a8a29e' }}>download</span>
                                    </div>
                                    <div className="mockup-item">
                                        <div className="mockup-item-left">
                                            <span className="material-symbols-outlined mockup-item-icon">article</span>
                                            <div>
                                                <div className="mockup-item-title">Agreement_Template_2024.docx</div>
                                                <div className="mockup-item-meta">Archived 45m ago • 1.1 MB</div>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined" style={{ color: '#a8a29e' }}>download</span>
                                    </div>
                                    <div className="mockup-item" style={{ opacity: 0.6 }}>
                                        <div className="mockup-item-left">
                                            <span className="material-symbols-outlined" style={{ color: '#a8a29e' }}>folder</span>
                                            <div>
                                                <div className="mockup-item-title">Client_Onboarding_Assets</div>
                                                <div className="mockup-item-meta">12 Files • 156 MB</div>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined" style={{ color: '#a8a29e' }}>chevron_right</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="recovery-content">
                            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Instant Recovery Interface</h2>
                            <p style={{ fontSize: '1.125rem', color: '#a8a29e', marginBottom: '2rem', lineHeight: 1.6 }}>
                                When your primary Document Management System goes dark, the Archival Sentinel steps in. Our emergency portal provides a lightweight, high-speed interface to access your most critical matter files instantly, bypassing slow recovery processes.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>bolt</span>
                                    <div>
                                        <span style={{ fontWeight: 800, display: 'block' }}>Zero-Latency Access</span>
                                        <span style={{ fontSize: '0.875rem', color: '#a8a29e' }}>Sub-second document retrieval through edge-cached archives.</span>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>security</span>
                                    <div>
                                        <span style={{ fontWeight: 800, display: 'block' }}>SSO Continuity</span>
                                        <span style={{ fontSize: '0.875rem', color: '#a8a29e' }}>Integrates with your existing IDP to ensure secure access during downtime.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Centralized Admin */}
            <div className="section-padding">
                <div className="container">
                    <div className="admin-container animate-fade-in delay-200">
                        <div className="admin-intro">
                            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>Centralized Administration</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                                A single pane of glass for IT and Compliance teams to monitor health, manage retention policies, and generate audit reports.
                            </p>
                            <button onClick={() => openContactModal("Request Demo Access")} className="btn" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '0.75rem 2rem', borderRadius: '9999px', fontSize: '0.875rem' }}>
                                Launch Demo Dashboard
                            </button>
                        </div>
                        <div className="admin-grid">
                            <div className="admin-card">
                                <span className="material-symbols-outlined admin-card-icon">analytics</span>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Real-Time Monitoring</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Live health telemetry of all connectors. Visualizes sync latency, data throughput, and archival success rates.</p>
                            </div>
                            <div className="admin-card">
                                <span className="material-symbols-outlined admin-card-icon">verified</span>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Compliance Auditing</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Automated logs of every file access and transfer. Ready-to-export reports for GDPR, HIPAA, and SOC2 compliance.</p>
                            </div>
                            <div className="admin-card">
                                <span className="material-symbols-outlined admin-card-icon">policy</span>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Retention Engine</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Set granular archival rules based on document age, metadata, or workspace classification.</p>
                            </div>
                            <div className="admin-card">
                                <span className="material-symbols-outlined admin-card-icon">lock_reset</span>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Key Governance</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Manage customer-managed encryption keys (CMEK) and rotate credentials without service interruption.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container cta-section">
                <div className="cta-box signature-gradient shadow-2xl">
                    <div className="z-10">
                        <h2 className="cta-title">Don't wait for the next outage to find a solution.</h2>
                        <p className="cta-subtitle">Join the leading law firms and financial institutions that trust UnderWrite for their business continuity.</p>
                        <div className="cta-buttons">
                            <button className="cta-btn-primary">Get Started Now</button>
                            <button className="cta-btn-secondary">Talk to Sales</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
