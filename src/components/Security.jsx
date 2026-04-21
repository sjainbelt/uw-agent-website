import React, { useEffect } from 'react';
import './Security.css';

const Security = ({ openContactModal }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-24 overflow-hidden bg-background font-body text-on-background">
            {/* Hero Section */}
            <section className="relative px-8 py-24 overflow-hidden animate-fade-in delay-100">
                <div className="max-w-7xl mx-auto sec-hero-grid gap-16 items-center">
                    <div>
                        <div className="sec-badge mb-6">
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                            Security First Philosophy
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-on-background leading-tight mb-8">
                            Enterprise-Grade Security. <span className="text-primary">Your Data, Fully Protected.</span>
                        </h1>
                        <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-xl">
                            UnderWrite provides the backup infrastructure, but you maintain 100% control of the encryption keys and the destination cloud. True business continuity without compromising sovereignty.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button onClick={() => openContactModal("Request Compliance Packet")} className="btn signature-gradient px-8 py-4 rounded-full flex items-center gap-2 shadow-xl hover-scale">
                                View Compliance Docs
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <div className="flex -space-x-2 items-center px-4">
                                <div className="sec-cert-icon">
                                    <span className="material-symbols-outlined text-secondary">lock</span>
                                </div>
                                <div className="sec-cert-icon">
                                    <span className="material-symbols-outlined text-secondary">shield</span>
                                </div>
                                <div className="sec-cert-icon text-[10px] font-bold">SOC2</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-surface-container-low rounded-3xl overflow-hidden shadow-2xl relative group">
                            <div className="absolute inset-0 bg-primary-light mix-blend-multiply"></div>
                            <img src="/images/security-hero.jpg" alt="Security visualization" className="w-full h-full object-cover" />
                            {/* Abstract HUD Elements */}
                            <div className="absolute top-8 right-8 bg-surface-lowest-glass p-6 rounded-xl shadow-lg border-outline-variant">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-xs font-bold tracking-tighter uppercase">Vault Integrity: 100%</span>
                                </div>
                                <div className="h-1 w-32 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Archival Principles (Bento Grid) */}
            <section className="px-8 py-24 bg-surface-container-low">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold tracking-tight mb-4">The Archival Sentinel Framework</h2>
                        <p className="text-on-surface-variant max-w-2xl text-lg">Four pillars of immutable security designed for mission-critical business continuity.</p>
                    </div>
                    <div className="sec-bento-grid gap-6">
                        {/* Encryption */}
                        <div className="md-col-span-2 bg-surface-lowest p-12 rounded-xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-primary text-4xl mb-6">key</span>
                                <h3 className="text-2xl font-bold mb-4">End-to-end encryption</h3>
                                <p className="text-on-surface-variant leading-relaxed max-w-md">
                                    Every byte of data is encrypted at the source using AES-256 before it ever leaves your infrastructure. We never handle unencrypted data.
                                </p>
                            </div>
                            <div className="absolute -right-20 -bottom-20 opacity-5 transition-opacity sec-hover-opacity">
                                <span className="material-symbols-outlined text-[240px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                            </div>
                        </div>
                        {/* SOC 2 Placeholder */}
                        <div className="sec-soc-card text-white p-12 rounded-xl flex flex-col justify-between">
                            <div>
                                <span className="material-symbols-outlined text-4xl mb-6">workspace_premium</span>
                                <h3 className="text-2xl font-bold mb-4">SOC 2 compliance</h3>
                                <p className="leading-relaxed opacity-80">
                                    Our systems are architected to exceed SOC 2 Type II standards, with continuous monitoring and automated evidence collection.
                                </p>
                            </div>
                            <div className="pt-8 text-xs font-mono opacity-50">AUDIT_REF: 2024-UW-COMPLIANCE</div>
                        </div>
                        {/* Zero Knowledge */}
                        <div className="bg-surface-lowest p-12 rounded-xl group">
                            <span className="material-symbols-outlined text-primary text-4xl mb-6">visibility_off</span>
                            <h3 className="text-2xl font-bold mb-4">Zero-knowledge architecture</h3>
                            <p className="text-on-surface-variant leading-relaxed">
                                UnderWrite has zero visibility into your data. Our metadata-only indexing ensures privacy while maintaining rapid search capabilities.
                            </p>
                        </div>
                        {/* Sovereignty */}
                        <div className="md-col-span-2 bg-surface-lowest p-12 rounded-xl flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-6">public</span>
                                <h3 className="text-2xl font-bold mb-4">Data Sovereignty</h3>
                                <p className="text-on-surface-variant leading-relaxed">
                                    Choose exactly where your data resides. We support multi-region backups across AWS, GCP, and Azure, ensuring compliance with local data residency laws.
                                </p>
                            </div>
                            <div className="sec-sov-img-container bg-surface-container-low rounded-full flex-center p-8 shrink-0">
                                <img src="/images/security-sovereignty.jpg" alt="Data sovereignty nodes" className="w-full h-full object-contain opacity-40 mix-blend-multiply" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Message Section: Full Control */}
            <section className="px-8 py-32 overflow-hidden relative">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none flex-center" style={{ zIndex: -1 }}>
                        <span className="material-symbols-outlined text-[600px]">lock_open</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                        The Platform is Ours. <br /> <span className="text-primary italic">The Keys are Yours.</span>
                    </h2>
                    <p className="text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-16">
                        Unlike traditional backup providers, UnderWrite decouples the management layer from the storage layer. You bring your own cloud buckets and your own encryption keys. If we disappeared tomorrow, your data remains accessible via standard tools.
                    </p>
                    <div className="sec-control-grid bg-surface-lowest p-12 rounded-2xl shadow-sm border border-outline-variant text-left">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-primary-light rounded-full flex-center shrink-0">
                                <span className="material-symbols-outlined text-primary">encrypted</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-2">BYOK (Bring Your Own Key)</h4>
                                <p className="text-on-surface-variant text-sm line-height-relaxed">Integrate with AWS KMS, Google Cloud KMS, or HashiCorp Vault. UnderWrite never touches your private keys.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-primary-light rounded-full flex-center shrink-0">
                                <span className="material-symbols-outlined text-primary">cloud_done</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-2">Storage Decoupling</h4>
                                <p className="text-on-surface-variant text-sm line-height-relaxed">Send backups directly to your own S3, GCS, or Azure Blob storage. No vendor lock-in, ever.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Visualization */}
            <section className="px-8 py-24 bg-dark text-white">
                <div className="max-w-7xl mx-auto sec-arch-grid gap-24 items-center">
                    <div className="sec-arch-img order-2 lg-order-1">
                        <img src="/images/security-architecture.jpg" alt="Technical diagram" className="w-full opacity-90 rounded-xl" />
                    </div>
                    <div className="order-1 lg-order-2">
                        <h2 className="text-4xl font-bold mb-8">Architectural Immutability</h2>
                        <div className="space-y-8">
                            <div className="border-l-4 border-primary pl-6">
                                <h4 className="font-bold mb-2 text-xl">Point-to-Point Tunneling</h4>
                                <p className="text-stone-400">Data travels through ephemeral, single-use tunnels with mutual TLS 1.3 authentication.</p>
                            </div>
                            <div className="border-l-4 border-stone-700 pl-6">
                                <h4 className="font-bold mb-2 text-xl">WORM Compliance</h4>
                                <p className="text-stone-400">Write-Once-Read-Many policies prevent accidental or malicious deletion of archival records.</p>
                            </div>
                            <div className="border-l-4 border-stone-700 pl-6">
                                <h4 className="font-bold mb-2 text-xl">Continuous Auditing</h4>
                                <p className="text-stone-400">Every access request is logged to an immutable ledger for forensic-level transparency.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Compliance Standards Section */}
            <section className="px-8 py-24 bg-surface-container-low border-t border-outline-variant/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="sec-badge mb-4 mx-auto">Regulatory Compliance</span>
                        <h2 className="text-4xl font-black mb-4">Aligned with Global Standards</h2>
                        <p className="text-on-surface-variant max-w-2xl mx-auto">We undergo rigorous third-party audits to ensure our business continuity platform exceeds industry security benchmarks.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-surface-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-primary-light rounded-full flex-center mb-6">
                                <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">SOC 2 Type II</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed">System and Organization Controls 2 focused on Security, Availability, Processing Integrity, Confidentiality, and Privacy.</p>
                        </div>
                        
                        <div className="bg-surface-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-primary-light rounded-full flex-center mb-6">
                                <span className="material-symbols-outlined text-primary text-4xl">gavel</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">GDPR Compliant</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed">Full compliance with General Data Protection Regulation for processing and protecting EU citizen data assets.</p>
                        </div>
                        
                        <div className="bg-surface-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-primary-light rounded-full flex-center mb-6">
                                <span className="material-symbols-outlined text-primary text-4xl">medical_services</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">HIPAA Ready</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed">Architected to handle Protected Health Information (PHI) with advanced audit trails and business associate agreement (BAA) support.</p>
                        </div>
                    </div>
                    
                    <div className="mt-16 bg-dark text-white p-12 rounded-3xl text-center relative overflow-hidden">
                        <h4 className="text-2xl font-bold mb-4 relative z-10">Need our full Security Whitepaper?</h4>
                        <p className="text-stone-400 mb-8 max-w-xl mx-auto relative z-10">Download our detailed technical overview covering key management, network topology, and disaster recovery SLA.</p>
                        <button onClick={() => openContactModal("Security Whitepaper Request")} className="btn signature-gradient px-8 py-3 rounded-full font-bold relative z-10">Request Access</button>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Security;
