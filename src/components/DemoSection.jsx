import React, { useState } from 'react';
import './DemoSection.css';

const DemoSection = () => {
    const [activeTab, setActiveTab] = useState('agent'); // 'agent' | 'portal' | 'admin'

    const demos = {
        agent: {
            title: "Desktop Agent",
            subtitle: "Low-latency archival in the background.",
            description: "The UnderWrite agent runs silently on your workstation, mirroring every document change to your secure archival hedge instantly.",
            image: "/images/underwrite-desktop-agent.png"
        },
        portal: {
            title: "Emergency Portal",
            subtitle: "One-click access during outages.",
            description: "When primary systems fail, the Emergency Portal provides a fast, lightweight interface to search and download all critical files.",
            image: "/images/underwrite-emergency-portal.png"
        },
        admin: {
            title: "IT Dashboard",
            subtitle: "Centralized health & compliance.",
            description: "Monitor sync health, managed retention policies, and generate audit-ready reports across your entire data footprint.",
            image: "/images/underwrite-admin-dashboard.png"
        }
    };

    return (
        <section id="demo" className="demo-section">
            <div className="container">
                <div className="demo-header text-center">
                    <span className="demo-badge">Product Walkthrough</span>
                    <h2 className="demo-title">See UnderWrite in Action</h2>
                    <p className="demo-subtitle">A high-fidelity look at the business continuity platform designed for zero work interruptions.</p>
                </div>

                <div className="demo-content">
                    <div className="demo-nav">
                        {Object.keys(demos).map(key => (
                            <button 
                                key={key}
                                className={`demo-nav-btn ${activeTab === key ? 'active' : ''}`}
                                onClick={() => setActiveTab(key)}
                            >
                                <div className="demo-nav-dot"></div>
                                <span>{demos[key].title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="demo-visual-grid">
                        <div className="demo-info">
                            <h3 className="demo-info-title">{demos[activeTab].title}</h3>
                            <p className="demo-info-subtitle">{demos[activeTab].subtitle}</p>
                            <p className="demo-info-desc">{demos[activeTab].description}</p>
                            
                            <ul className="demo-check-list">
                                <li>
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span>Military-grade 256-bit encryption</span>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span>Zero-trust architecture</span>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span>Point-in-time recovery</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="demo-mockup-container">
                            <div className="demo-glow"></div>
                            <img 
                                key={activeTab}
                                src={demos[activeTab].image} 
                                alt={demos[activeTab].title} 
                                className="demo-mockup-image animate-fade-in"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
