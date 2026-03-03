import { CheckCircle } from 'lucide-react';
import './CheckoutResult.css';

const CheckoutSuccess = () => {
    return (
        <section className="checkout-result-page">
            <div className="container animate-fade-in">
                <div className="checkout-result-card">
                    <CheckCircle size={64} className="checkout-icon success" />
                    <h1>Payment Successful!</h1>
                    <p className="checkout-message">
                        Your subscription is now active. You can close this tab and return to the UW-Agent app.
                    </p>
                    <p className="checkout-hint">
                        UW-Agent will automatically refresh your account status when you switch back.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CheckoutSuccess;
