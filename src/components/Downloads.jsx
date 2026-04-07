import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Download, Calendar, HardDrive, AlertCircle } from 'lucide-react';
import ReactGA from 'react-ga4';
import { trackEvent } from '../analytics/posthog';
import './Downloads.css';

const BUCKET = 'noodle-releases-belt';
const PREFIX = 'uw-agent/';

/** Strip the folder prefix from GCS object names for display */
const displayName = (name) => name.startsWith(PREFIX) ? name.slice(PREFIX.length) : name;

const Downloads = () => {
    const [releases, setReleases] = useState(() => {
        const cached = localStorage.getItem('uw_agent_releases_cache');
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(() => {
        return !localStorage.getItem('uw_agent_releases_cache');
    });
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const targetOs = queryParams.get('os');

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${BUCKET}/o?prefix=${encodeURIComponent(PREFIX)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch releases');
                }
                const data = await response.json();

                // Filter out signatures and metadata files, keep only installers
                const installerFiles = (data.items || []).filter(item =>
                    item.name.endsWith('.msi') ||
                    item.name.endsWith('.exe') ||
                    item.name.endsWith('.dmg') ||
                    item.name.endsWith('.pkg') ||
                    item.name.endsWith('.AppImage')
                );

                // Sort by creation date descending
                installerFiles.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));

                setReleases(installerFiles);
                localStorage.setItem('uw_agent_releases_cache', JSON.stringify(installerFiles));
                setLoading(false);
            } catch (err) {
                console.error('Error fetching releases:', err);
                const cached = localStorage.getItem('uw_agent_releases_cache');
                if (!cached || JSON.parse(cached).length === 0) {
                    setError(err.message);
                }
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    const formatSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getOsFromFilename = (name) => {
        const f = displayName(name);
        if (f.endsWith('.msi') || f.endsWith('.exe')) return 'Windows';
        if (f.endsWith('.dmg') || f.endsWith('.pkg')) return 'macOS';
        if (f.endsWith('.AppImage')) return 'Linux';
        return 'Unknown';
    };

    if (loading) {
        return (
            <div className="downloads-page flex-center min-h-[60vh]">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="downloads-page container min-h-[60vh] flex-center">
                <div className="error-state card-panel">
                    <AlertCircle className="error-icon" size={48} />
                    <h2>Unable to load releases</h2>
                    <p>There was a problem communicating with the release server.</p>
                </div>
            </div>
        );
    }

    const getSystemOs = () => {
        if (typeof window === 'undefined') return 'unknown';
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('win') > -1) return 'windows';
        if (userAgent.indexOf('mac') > -1) return 'mac';
        if (userAgent.indexOf('linux') > -1) return 'linux';
        return 'unknown';
    };

    let latestRelease = null;
    let previousReleases = [];

    if (releases.length > 0) {
        const effectiveOs = targetOs || getSystemOs();

        if (effectiveOs === 'windows') {
            latestRelease = releases.find(r => getOsFromFilename(r.name) === 'Windows') || releases[0];
        } else if (effectiveOs === 'mac') {
            latestRelease = releases.find(r => getOsFromFilename(r.name) === 'macOS') || releases[0];
        } else {
            latestRelease = releases[0];
        }
        previousReleases = releases.filter(r => r.id !== latestRelease.id);
    }

    return (
        <div className="downloads-page">
            <div className="container downloads-container animate-fade-in">
                <div className="downloads-header text-center">
                    <h1 className="hero-title">Download <span className="text-gradient">UnderWrite</span></h1>
                    <p className="hero-subtitle">Get the latest version of the business continuity agent.</p>
                </div>

                {latestRelease && (
                    <div className="latest-release-card card-panel delay-100">
                        <div className="latest-badge">Latest Release</div>
                        <div className="latest-content">
                            <div className="latest-info">
                                <h2>{displayName(latestRelease.name)}</h2>
                                <div className="meta-info">
                                    <span><Calendar size={16} /> {formatDate(latestRelease.timeCreated)}</span>
                                    <span><HardDrive size={16} /> {formatSize(latestRelease.size)}</span>
                                    <span className="os-badge">{getOsFromFilename(latestRelease.name)}</span>
                                </div>
                            </div>
                            <div className="latest-action">
                                <a 
                                    href={`https://storage.googleapis.com/${BUCKET}/${encodeURIComponent(latestRelease.name)}`} 
                                    className="btn btn-primary hover-lift btn-lg"
                                    onClick={() => {
                                        ReactGA.event({
                                            category: "Engagement",
                                            action: "Download_App",
                                            label: `UW_Agent - ${getOsFromFilename(latestRelease.name)}`
                                        });
                                        trackEvent("download_clicked", { app: "uw-agent", os: getOsFromFilename(latestRelease.name), source: "downloads_latest" });
                                    }}
                                >
                                    <Download size={20} className="mr-2" />
                                    Download Latest
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {previousReleases.length > 0 && (
                    <div className="previous-releases delay-200">
                        <h3>Previous Versions</h3>
                        <div className="releases-list card-panel">
                            {previousReleases.map((release) => (
                                <div key={release.id} className="release-item">
                                    <div className="release-file">
                                        <h4>{displayName(release.name)}</h4>
                                        <div className="meta-info text-sm">
                                            <span>{formatDate(release.timeCreated)}</span>
                                            <span className="dot-separator">•</span>
                                            <span>{formatSize(release.size)}</span>
                                            <span className="dot-separator">•</span>
                                            <span className="os-label">{getOsFromFilename(release.name)}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://storage.googleapis.com/${BUCKET}/${encodeURIComponent(release.name)}`}
                                        className="btn btn-secondary btn-sm rounded-btn"
                                        title="Download"
                                        onClick={() => {
                                            ReactGA.event({
                                                category: "Engagement",
                                                action: "Download_App_Previous",
                                                label: `UW_Agent - ${getOsFromFilename(release.name)}`
                                            });
                                            trackEvent("download_clicked", { app: "uw-agent", os: getOsFromFilename(release.name), source: "downloads_previous" });
                                        }}
                                    >
                                        <Download size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Downloads;
