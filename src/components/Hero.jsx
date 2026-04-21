import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLatestRelease, osLabel } from '../hooks/useLatestRelease';
import PostDownloadSteps from './PostDownloadSteps';
import ReactGA from 'react-ga4';
import { trackEvent } from '../analytics/posthog';
import './Hero.css';

const Hero = () => {
    const { os, downloadUrl, isLoading, otherOsLabel } = useLatestRelease();
    const [downloadStarted, setDownloadStarted] = useState(false);

    const handleDownload = () => {
        if (downloadUrl) {
            ReactGA.event({
                category: "Engagement",
                action: "Download_App",
                label: `UW_Agent - ${label}`
            });
            trackEvent("download_clicked", { app: "uw-agent", os: label, source: "hero" });
            window.location.href = downloadUrl;
            setDownloadStarted(true);
        }
    };

    const label = osLabel(os);

    return (
        <section className="hero">
            <div className="hero-grid animate-fade-in">
                <div className="hero-content">
                    <div className="hero-badge delay-100">
                        <span className="hero-pulse-dot"></span>
                        <span className="hero-badge-text">Archival Sentinel Active</span>
                    </div>

                    <h1 className="hero-title delay-200">
                        Instant Business Continuity.<br/>
                        <span className="text-gradient">Zero Work Interruptions.</span>
                    </h1>

                    <p className="hero-subtitle delay-300">
                        Hedge against public cloud outages (Azure, AWS) by automatically syncing your critical documents from iManage, NetDocuments, Box, and OneDrive to a secure, independent cloud.
                    </p>

                    <div className="hero-actions delay-300">
                        {downloadUrl ? (
                            <button
                                className="btn signature-gradient btn-lg"
                                onClick={handleDownload}
                                disabled={isLoading}
                            >
                                <span className="material-symbols-outlined mr-2">download</span>
                                Download for {label}
                            </button>
                        ) : (
                            <Link to="/download" className="btn signature-gradient btn-lg">
                                <span className="material-symbols-outlined mr-2">download</span>
                                Download
                            </Link>
                        )}

                        <a href="#demo" className="btn btn-outline btn-lg">
                            <span className="material-symbols-outlined mr-2">play_circle</span>
                            Watch Demo
                        </a>
                    </div>

                    {!downloadStarted && (
                        <div className="hero-alt-download delay-300">
                            {otherOsLabel ? (
                                <span>
                                    Looking for {otherOsLabel}?{' '}
                                    <Link to={`/download?os=${otherOsLabel === 'Mac' ? 'mac' : 'windows'}`}>
                                        See all downloads →
                                    </Link>
                                </span>
                            ) : (
                                <span>
                                    Looking for another OS?{' '}
                                    <Link to={`/download?os=${os === 'mac' ? 'windows' : 'mac'}`}>
                                        See all downloads →
                                    </Link>
                                </span>
                            )}
                        </div>
                    )}

                    {downloadStarted && (
                        <PostDownloadSteps appName="UnderWrite" os={os} />
                    )}
                </div>

                {!downloadStarted && (
                    <div className="hero-visual delay-300">
                        <div className="visual-container">
                            <img src="/images/hero-network.jpg" alt="Network infrastructure" className="visual-image" />
                            <div className="visual-overlay">
                                <div className="visual-card">
                                    <div className="visual-card-header">
                                        <div className="visual-card-info">
                                            <div className="visual-card-icon-wrapper">
                                                <span className="material-symbols-outlined visual-card-icon">cloud_sync</span>
                                            </div>
                                            <div>
                                                <div className="visual-card-title">Real-time Hedge</div>
                                                <div className="visual-card-subtitle">Syncing 4,821 items</div>
                                            </div>
                                        </div>
                                        <span className="visual-card-stat">99.99%</span>
                                    </div>
                                    <div className="visual-card-body">
                                        <div className="progress-track">
                                            <div className="progress-fill"></div>
                                        </div>
                                        <div className="progress-segments">
                                            <div className="progress-segment"></div>
                                            <div className="progress-segment"></div>
                                            <div className="progress-segment"></div>
                                            <div className="progress-segment-empty"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
