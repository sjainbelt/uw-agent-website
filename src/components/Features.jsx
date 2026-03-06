import './Features.css';

const Features = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <div className="features-header animate-fade-in delay-100">
                    <h2 className="section-title">Your documents, always protected. <br /><span className="text-gradient">Always available.</span></h2>
                    <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
                        UnderWrite is a complete business continuity solution that keeps a local, encrypted copy of your most critical files so you're never locked out during a DMS outage.
                    </p>

                    <div className="demo-video-container card-panel hover-lift" style={{ maxWidth: '800px', margin: '0 auto 4rem auto', padding: '0', overflow: 'hidden' }}>
                        <img src="/demo.webp" alt="UnderWrite App Demo" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="features-showcase">
                    {/* Feature 1: Instant Backup */}
                    <div className="showcase-row">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Continuous Document Sync</h3>
                            <p className="showcase-description">
                                Automatically sync documents from iManage, NetDocuments, Box, and SharePoint to your local machine. UnderWrite runs quietly in the background, ensuring your files are always up to date.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-email.png" alt="Document Backup Interface" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Outage Recovery */}
                    <div className="showcase-row reverse">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Outage Recovery & Download</h3>
                            <p className="showcase-description">
                                When your document management system goes down, UnderWrite steps in. Browse and download any synced document instantly from your secure local copy — no cloud dependency required.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-chat.png" alt="Outage Recovery Interface" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Multi-DMS Connectors */}
                    <div className="showcase-row">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Multi-Platform Connectors</h3>
                            <p className="showcase-description">
                                Connect to the document management systems your firm already uses — iManage, NetDocuments, Box, or SharePoint. Configure watched folders and let UnderWrite handle the rest.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-connectors.png" alt="DMS Connectors Interface" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 4: Admin Controls */}
                    <div className="showcase-row reverse">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Centralized Admin Controls</h3>
                            <p className="showcase-description">
                                IT administrators can manage device enrollment, configure continuity policies, trigger outage mode across the firm, and monitor compliance — all from a centralized dashboard.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-config.png" alt="Admin Configuration Interface" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
