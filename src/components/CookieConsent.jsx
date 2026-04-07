/**
 * EU-only cookie consent banner for PostHog analytics.
 *
 * Uses the browser's timezone to detect EU visitors. If the visitor
 * is in an EU timezone, shows a non-intrusive consent banner.
 * PostHog capturing is paused until the visitor accepts.
 *
 * Non-EU visitors are never shown the banner — analytics start immediately.
 */
import { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import './CookieConsent.css';

// EU timezone prefixes (covers all EU/EEA member states + UK)
const EU_TIMEZONES = [
  'Europe/', 'Atlantic/Canary', 'Atlantic/Faroe', 'Atlantic/Madeira',
  'Atlantic/Reykjavik', 'Arctic/Longyearbyen',
];

function isEuVisitor() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return EU_TIMEZONES.some(prefix => tz.startsWith(prefix));
  } catch {
    // If timezone detection fails, assume non-EU (most users are US-based).
    return false;
  }
}

const CONSENT_KEY = 'belt_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    // Compute initial visibility synchronously — no effect needed.
    if (!isEuVisitor()) return false;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'declined') return false;
    return true;
  });

  useEffect(() => {
    if (!isEuVisitor()) return;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      posthog.opt_in_capturing();
    } else {
      // Either 'declined' or no consent yet — don't capture.
      posthog.opt_out_capturing();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    posthog.opt_in_capturing();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    posthog.opt_out_capturing();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent">
      <div className="cookie-consent-content">
        <p>
          We use cookies to understand how you use our site and improve your experience.
          By accepting, you agree to our use of analytics cookies.
        </p>
        <div className="cookie-consent-actions">
          <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            Accept
          </button>
          <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
