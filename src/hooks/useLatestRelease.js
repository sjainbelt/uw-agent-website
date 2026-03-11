import { useState, useEffect } from 'react';

const BUCKET = 'noodle-releases-belt';
const PREFIX = 'uw-agent/';
const CACHE_KEY = 'uw_hero_release_cache';

/**
 * Detect the user's operating system from the user agent.
 * Returns 'mac', 'windows', or 'unknown'.
 */
export function detectOS() {
    if (typeof window === 'undefined') return 'unknown';
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) return 'mac';
    if (ua.includes('win')) return 'windows';
    if (ua.includes('linux')) return 'linux';
    return 'unknown';
}

/** Human-readable OS label */
export function osLabel(os) {
    if (os === 'mac') return 'Mac';
    if (os === 'windows') return 'Windows';
    if (os === 'linux') return 'Linux';
    return 'your system';
}

/** Extension match helpers */
const isMac = (name) => name.endsWith('.dmg') || name.endsWith('.pkg');
const isWin = (name) => name.endsWith('.msi') || name.endsWith('.exe');
const isInstaller = (name) => isMac(name) || isWin(name) || name.endsWith('.AppImage');
const displayName = (name) => name.startsWith(PREFIX) ? name.slice(PREFIX.length) : name;

/**
 * Hook that resolves the latest download URL for the user's OS.
 * Fetches the GCS bucket listing, filters to installers, and picks the best match.
 *
 * Returns: { os, downloadUrl, fileName, isLoading, otherOsLabel, otherOsUrl }
 */
export function useLatestRelease() {
    const [os] = useState(detectOS);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [otherOsLabel, setOtherOsLabel] = useState(null);
    const [otherOsUrl, setOtherOsUrl] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const resolve = async () => {
            try {
                // Check cache first for instant UX
                const cached = localStorage.getItem(CACHE_KEY);
                let installers;

                if (cached) {
                    installers = JSON.parse(cached);
                }

                // Fetch in background regardless (stale-while-revalidate)
                const res = await fetch(
                    `https://storage.googleapis.com/storage/v1/b/${BUCKET}/o?prefix=${encodeURIComponent(PREFIX)}`
                );
                if (res.ok) {
                    const data = await res.json();
                    installers = (data.items || [])
                        .filter((item) => isInstaller(item.name))
                        .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));
                    localStorage.setItem(CACHE_KEY, JSON.stringify(installers));
                }

                if (!installers || installers.length === 0) {
                    if (!cancelled) setIsLoading(false);
                    return;
                }

                // Pick best match for detected OS
                let primary, secondary;
                if (os === 'mac') {
                    primary = installers.find((r) => isMac(r.name));
                    secondary = installers.find((r) => isWin(r.name));
                } else {
                    // Default to Windows for unknown OS
                    primary = installers.find((r) => isWin(r.name));
                    secondary = installers.find((r) => isMac(r.name));
                }

                if (!primary) primary = installers[0];

                if (!cancelled) {
                    const url = `https://storage.googleapis.com/${BUCKET}/${encodeURIComponent(primary.name)}`;
                    setDownloadUrl(url);
                    setFileName(displayName(primary.name));

                    if (secondary) {
                        const secUrl = `https://storage.googleapis.com/${BUCKET}/${encodeURIComponent(secondary.name)}`;
                        setOtherOsLabel(isMac(secondary.name) ? 'Mac' : 'Windows');
                        setOtherOsUrl(secUrl);
                    }

                    setIsLoading(false);
                }
            } catch (err) {
                console.warn('Failed to resolve latest release for hero', err);
                if (!cancelled) setIsLoading(false);
            }
        };

        resolve();
        return () => { cancelled = true; };
    }, [os]);

    return { os, downloadUrl, fileName, isLoading, otherOsLabel, otherOsUrl };
}
