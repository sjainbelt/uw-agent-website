import React, { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose, title = "Get in Touch" }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                
                <div className="modal-content">
                    {status === 'success' ? (
                        <div className="success-state">
                            <div className="success-icon">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <h2>Message Sent!</h2>
                            <p>Our team will get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <>
                            <div className="modal-header">
                                <h2>{title}</h2>
                                <p>Fill out the form below and an expert will reach out shortly.</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Jane Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Work Email</label>
                                    <input 
                                        type="email" 
                                        required 
                                        placeholder="jane@company.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Enterprise Inc."
                                        value={formData.company}
                                        onChange={e => setFormData({...formData, company: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea 
                                        rows="4" 
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn signature-gradient submit-btn"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
