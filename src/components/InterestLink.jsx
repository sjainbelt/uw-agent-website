import ReactGA from 'react-ga4';
import { trackEvent } from '../analytics/posthog';
import { INTEREST_URL } from '../config/features';

/**
 * "Register interest" CTA shown in place of download/trial/pricing CTAs while
 * the product is unavailable. Each click is tracked so we can measure demand.
 */
const InterestLink = ({ source, className, children = 'Register Interest' }) => {
    const handleClick = () => {
        ReactGA.event({
            category: 'Engagement',
            action: 'Register_Interest',
            label: `UW_Agent - ${source}`
        });
        trackEvent('interest_clicked', { app: 'uw-agent', source });
    };

    return (
        <a href={INTEREST_URL} className={className} onClick={handleClick}>
            {children}
        </a>
    );
};

export default InterestLink;
