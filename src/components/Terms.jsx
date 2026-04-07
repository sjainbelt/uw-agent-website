import './Privacy.css';

const Terms = () => {
    return (
        <section className="legal-page">
            <div className="container legal-container animate-fade-in">
                <div className="legal-header">
                    <h1>Terms of Service</h1>
                    <p className="effective-date">Effective Date: March 11, 2026</p>
                </div>

                <div className="legal-card">
                    <div className="legal-content">
                        <p>
                            These Terms of Service ("Terms") govern your use of the UnderWrite desktop application
                            and related services provided by Belt Software Inc. ("Belt," "we," "us," or "our"). By
                            accessing or using our services, you agree to be bound by these Terms.
                        </p>

                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By creating an account or using UnderWrite, you acknowledge that you have read,
                            understood, and agree to be bound by these Terms and our{' '}
                            <a href="/privacy">Privacy Policy</a>. If you do not agree, you may not use our
                            services.
                        </p>

                        <h2>2. Description of Service</h2>
                        <p>
                            UnderWrite is a desktop document business continuity solution that synchronizes and
                            provides offline access to documents from iManage, NetDocuments, Box, and SharePoint.
                            The application runs locally on your device with cloud features for synchronization
                            and account management.
                        </p>

                        <h2>3. Account Registration</h2>
                        <p>
                            You must provide accurate and complete information when creating an account. You are
                            responsible for maintaining the confidentiality of your account credentials and for all
                            activities that occur under your account.
                        </p>

                        <h2>4. Subscription and Billing</h2>
                        <ul>
                            <li>UnderWrite offers free trial and paid subscription plans</li>
                            <li>Paid subscriptions are billed on a recurring basis (monthly or annually)</li>
                            <li>You may cancel your subscription at any time through your account settings</li>
                            <li>Refunds are handled in accordance with our refund policy</li>
                            <li>We reserve the right to modify pricing with reasonable notice</li>
                        </ul>

                        <h2>5. Acceptable Use</h2>
                        <p>You agree not to:</p>
                        <ul>
                            <li>Use the service for any unlawful purpose</li>
                            <li>Reverse engineer, decompile, or disassemble the software</li>
                            <li>Interfere with or disrupt the service or its infrastructure</li>
                            <li>Attempt to gain unauthorized access to any part of the service</li>
                            <li>Use the service to store or distribute malicious content</li>
                            <li>Redistribute, sublicense, or resell the service without authorization</li>
                        </ul>

                        <h2>6. Intellectual Property</h2>
                        <p>
                            UnderWrite and all related trademarks, logos, and content are the property of Belt
                            Software Inc. Your use of the service does not grant you ownership of any intellectual
                            property rights in the service or its content.
                        </p>

                        <h2>7. Data and Privacy</h2>
                        <p>
                            Your use of the service is also governed by our <a href="/privacy">Privacy Policy</a>.
                            You retain ownership of your data. We process your data only as described in our
                            Privacy Policy and as necessary to provide the service.
                        </p>

                        <h2>8. Disclaimer of Warranties</h2>
                        <p>
                            The service is provided "as is" and "as available" without warranties of any kind,
                            either express or implied, including but not limited to implied warranties of
                            merchantability, fitness for a particular purpose, and non-infringement.
                        </p>

                        <h2>9. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Belt Software Inc. shall not be liable for any
                            indirect, incidental, special, consequential, or punitive damages, or any loss of
                            profits or revenues, whether incurred directly or indirectly, or any loss of data,
                            use, goodwill, or other intangible losses.
                        </p>

                        <h2>10. Termination</h2>
                        <p>
                            We may terminate or suspend your account and access to the service at our sole
                            discretion, without prior notice, for conduct that we believe violates these Terms
                            or is harmful to other users, us, or third parties, or for any other reason.
                        </p>

                        <h2>11. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. We will provide notice of
                            material changes by posting the updated Terms on our website. Your continued use of
                            the service after such changes constitutes acceptance of the new Terms.
                        </p>

                        <h2>12. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the
                            jurisdiction in which Belt Software Inc. is incorporated, without regard to its
                            conflict of law provisions.
                        </p>

                        <h2>13. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us
                            at <a href="https://belt.ai/contact">belt.ai/contact</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Terms;
