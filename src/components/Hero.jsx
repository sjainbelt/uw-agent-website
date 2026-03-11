import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useLatestRelease, osLabel } from '../hooks/useLatestRelease';
import PostDownloadSteps from './PostDownloadSteps';
import ReactGA from 'react-ga4';
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
            window.location.href = downloadUrl;
            setDownloadStarted(true);
        }
    };

    const label = osLabel(os);

    return (
        <section className="hero">
            <div className="container hero-container animate-fade-in">
                <div className="hero-content">
                    <div className="badge delay-100">
                        <span className="badge-dot"></span>
                        Business Continuity Solution
                    </div>

                    <h1 className="hero-title delay-200">
                        Instant document <span className="text-gradient">Business Continuity.</span>
                    </h1>

                    <p className="hero-subtitle delay-300">
                        Ensure business continuity for critical documents from iManage, NetDocuments, Box, and SharePoint. Access and download your synced files anytime — even during an outage.
                    </p>

                    <div className="hero-actions delay-300">
                        {downloadUrl ? (
                            <button
                                className="btn btn-primary hover-lift btn-lg"
                                onClick={handleDownload}
                                disabled={isLoading}
                            >
                                <Download size={20} className="mr-2" />
                                Download for {label}
                            </button>
                        ) : (
                            <Link to="/download" className="btn btn-primary hover-lift btn-lg">
                                <Download size={20} className="mr-2" />
                                Download
                            </Link>
                        )}

                        <Link to="/download" className="btn btn-secondary hover-lift btn-lg">
                            View Pricing
                        </Link>
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
                        <div className="mockup-container glass-panel">
                            <img src="/hero-screenshot.png" alt="UnderWrite Dashboard" className="mockup-image" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
