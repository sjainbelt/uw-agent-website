import { Link, useLocation } from 'react-router-dom';
import InterestLink from './InterestLink';
import './ProductUnavailable.css';

/**
 * Rendered on /download and /pricing while PRODUCT_AVAILABLE is false.
 */
const ProductUnavailable = () => {
    const { pathname } = useLocation();
    const source = pathname.replace(/^\//, '') || 'unknown';

    return (
        <section className="unavailable-page">
            <div className="container animate-fade-in">
                <div className="unavailable-card card-panel text-center">
                    <span className="material-symbols-outlined unavailable-icon">info</span>
                    <h1>UnderWrite isn't available right now</h1>
                    <p>
                        Downloads, free trials and new subscriptions are currently closed.
                        If UnderWrite would help your team, register your interest and we'll
                        be in touch if that changes.
                    </p>
                    <div className="unavailable-actions">
                        <InterestLink source={`${source}_page`} className="btn signature-gradient btn-lg" />
                        <Link to="/" className="btn btn-outline btn-lg">Back to Home</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductUnavailable;
