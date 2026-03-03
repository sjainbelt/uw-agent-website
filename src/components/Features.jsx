import './Features.css';

const Features = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <div className="features-header animate-fade-in delay-100">
                    <h2 className="section-title">Everything you need from your inbox, <br /><span className="text-gradient">nothing you don't.</span></h2>
                    <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
                        Experience unparalleled speed and organization with our desktop-first architecture.
                    </p>

                    <div className="demo-video-container card-panel hover-lift" style={{ maxWidth: '800px', margin: '0 auto 4rem auto', padding: '0', overflow: 'hidden' }}>
                        <img src="/uw-agent-demo.webp" alt="UW-Agent App Demo" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="features-showcase">
                    {/* Feature 1: Email */}
                    <div className="showcase-row">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Lightening Fast Triage</h3>
                            <p className="showcase-description">
                                Process your inbox at the speed of thought with native desktop performance. Automatically organize contacts, keep track of important conversations, and maintain relationships seamlessly.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-email.png" alt="Email Triage Interface" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Chat */}
                    <div className="showcase-row reverse">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Query Projects & People</h3>
                            <p className="showcase-description">
                                Find exactly what you need with advanced, secure semantic search across your entire email history. Chat with your inbox to summarize recent projects, generate responses, and find documents.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-chat.png" alt="Chat with Inbox Interface" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Connectors */}
                    <div className="showcase-row">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Seamless Integrations</h3>
                            <p className="showcase-description">
                                Connect the tools you already use. From CRM databases to communication platforms, UW-Agent synchronizes your data instantly to ensure your knowledge graph is always up to date.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-connectors.png" alt="App Connectors Interface" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 4: LLM Config */}
                    <div className="showcase-row reverse">
                        <div className="showcase-content animate-fade-in delay-200">
                            <h3 className="showcase-title">Custom LLM Configurations</h3>
                            <p className="showcase-description">
                                Bring your own models to the table. UW-Agent provides enterprise-grade flexibility allowing you to securely connect your private LLMs and adjust generation parameters to fit your unique workflows.
                            </p>
                        </div>
                        <div className="showcase-image animate-fade-in delay-300">
                            <div className="card-panel img-container">
                                <img src="/feature-config.png" alt="LLM Configuration Interface" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
