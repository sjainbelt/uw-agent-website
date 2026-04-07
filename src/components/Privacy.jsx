import './Privacy.css';

const Privacy = () => {
    return (
        <section className="legal-page">
            <div className="container legal-container animate-fade-in">
                <div className="legal-header">
                    <h1>Privacy Policy</h1>
                    <p className="effective-date">Effective Date: March 11, 2026</p>
                </div>

                <div className="legal-card">
                    <div className="legal-content">
                        <p>
                            Belt Software Inc. ("Belt," "we," "us," or "our") operates the UnderWrite desktop
                            application and related services. This Privacy Policy explains how we collect, use,
                            disclose, and safeguard your information when you use our products and services.
                        </p>

                        <h2>1. Information We Collect</h2>

                        <h3>Account Information</h3>
                        <p>
                            When you create an account, we collect your name, email address, and organization details.
                            If you subscribe to a paid plan, we collect billing information through our payment
                            processor (Stripe).
                        </p>

                        <h3>Usage Data</h3>
                        <p>
                            We collect anonymized usage analytics to improve our products, including feature usage
                            patterns, performance metrics, and error reports. We use Google Analytics to understand
                            website traffic and user engagement.
                        </p>

                        <h3>Document Data</h3>
                        <p>
                            UnderWrite synchronizes and stores document metadata and files locally on your device
                            for business continuity purposes. Documents are synced from your connected document
                            management systems (iManage, NetDocuments, Box, SharePoint). Document content is
                            stored locally and is not transmitted to our servers beyond what is necessary for
                            synchronization.
                        </p>

                        <h2>2. How We Use Your Information</h2>
                        <ul>
                            <li>To provide, operate, and maintain our services</li>
                            <li>To process transactions and manage your subscription</li>
                            <li>To send you service-related communications</li>
                            <li>To improve and personalize your experience</li>
                            <li>To detect, prevent, and address technical issues</li>
                            <li>To comply with legal obligations</li>
                        </ul>

                        <h2>3. Data Storage and Security</h2>
                        <p>
                            UnderWrite is designed with a local-first architecture. Your synchronized documents
                            are stored locally on your device to ensure availability during outages. We implement
                            industry-standard security measures to protect any data transmitted to our servers,
                            including encryption in transit and at rest.
                        </p>

                        <h2>4. Third-Party Services</h2>
                        <p>
                            We may share information with third-party service providers that assist us in operating
                            our services, including:
                        </p>
                        <ul>
                            <li><strong>Stripe</strong> — for payment processing</li>
                            <li><strong>Google Analytics</strong> — for website analytics</li>
                            <li><strong>Document Management Systems</strong> — iManage, NetDocuments, Box, SharePoint (as configured by you)</li>
                        </ul>
                        <p>
                            These providers are bound by their own privacy policies and we encourage you to review
                            them.
                        </p>

                        <h2>5. Your Rights</h2>
                        <p>
                            Depending on your jurisdiction, you may have the right to:
                        </p>
                        <ul>
                            <li>Access the personal data we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to or restrict processing of your data</li>
                            <li>Data portability</li>
                        </ul>

                        <h2>6. Data Retention</h2>
                        <p>
                            We retain your account information for as long as your account is active or as needed to
                            provide you services. Local data on your device is under your control and can be deleted
                            at any time by uninstalling the application or clearing local data.
                        </p>

                        <h2>7. Children's Privacy</h2>
                        <p>
                            Our services are not intended for individuals under the age of 16. We do not knowingly
                            collect personal information from children.
                        </p>

                        <h2>8. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any material
                            changes by posting the new policy on this page and updating the effective date.
                        </p>

                        <h2>9. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us
                            at <a href="https://belt.ai/contact">belt.ai/contact</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
