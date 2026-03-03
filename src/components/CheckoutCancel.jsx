import { XCircle } from 'lucide-react';
import './CheckoutResult.css';

const CheckoutCancel = () => {
    return (
        <section className="checkout-result-page">
            <div className="container animate-fade-in">
                <div className="checkout-result-card">
                    <XCircle size={64} className="checkout-icon cancel" />
                    <h1>Checkout Cancelled</h1>
                    <p className="checkout-message">
                        No worries! You can upgrade anytime from the UW-Agent app.
                    </p>
                    <p className="checkout-hint">
                        Close this tab and return to the app to continue using UW-Agent.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CheckoutCancel;
