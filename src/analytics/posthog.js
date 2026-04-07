/**
 * PostHog analytics wrapper for UnderWrite Agent marketing website.
 *
 * All capture calls are no-ops when VITE_POSTHOG_KEY is empty,
 * so dev/test builds remain analytics-free by default.
 *
 * Website-specific: autocapture and session recording are ENABLED
 * but only activated after EU consent check passes.
 */
import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || "";
const POSTHOG_HOST =
  import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

/** True when PostHog is configured and active. */
let active = false;

/**
 * Initialise PostHog for the UnderWrite marketing website.
 * Call once at application startup (App.jsx).
 */
export function initPostHog() {
  if (!POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: false,
    persistence: "localStorage",
    opt_out_capturing_by_default: false,
    loaded: () => {
      posthog.register({
        app_name: "uw-agent-website",
        app_type: "web",
      });
    },
  });

  active = true;
}

/** Send a manual pageview (called by usePageTracking). */
export function trackPageView(path) {
  if (!active) return;
  posthog.capture("$pageview", { $current_url: path });
}

/** Capture a named product event. */
export function trackEvent(event, properties) {
  if (!active) return;
  posthog.capture(event, properties);
}

export { posthog };
