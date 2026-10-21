/**
 * Site-wide feature flags.
 *
 * PRODUCT_AVAILABLE: UnderWrite is no longer offered, but the marketing site
 * stays up so we can gauge interest. When false:
 *   - /download and /pricing render <ProductUnavailable /> instead (the paths
 *     keep resolving so links from existing installs don't 404),
 *   - download / "Get Started" CTAs become "Register interest" links,
 *   - the Pricing nav link is hidden,
 *   - the release listing is never fetched.
 * Flip back to true to restore downloads, trial and pricing everywhere.
 */
export const PRODUCT_AVAILABLE = false;

/** Where "Register interest" CTAs send visitors. */
export const INTEREST_URL = 'https://belt.ai/contact';
