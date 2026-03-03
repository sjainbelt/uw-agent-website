import { Link } from 'react-router-dom';
import { Download, ChevronRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container animate-fade-in">
                <div className="hero-content">
                    <div className="badge delay-100">
                        <span className="badge-dot"></span>
                        Version 2.0 Now Available
                    </div>

                    <h1 className="hero-title delay-200">
                        The unified <span className="text-gradient">workspace agent.</span>
                    </h1>

                    <p className="hero-subtitle delay-300">
                        Manage your workspace efficiently, query all your integrated systems, and complete tasks with an active agent powered by your data.
                    </p>

                    <div className="hero-actions delay-300">
                        <Link to="/download?os=mac" className="btn btn-primary hover-lift btn-lg">
                            <Download size={20} className="mr-2" />
                            Download for Mac
                        </Link>
                        <Link to="/download?os=windows" className="btn btn-secondary hover-lift btn-lg">
                            <Download size={20} className="mr-2" />
                            Download for Windows
                        </Link>
                    </div>
                </div>

                <div className="hero-visual delay-300">
                    <div className="mockup-container glass-panel">
                        <img src="/hero-mockup.png" alt="UW-Agent Interface" className="mockup-image" />
                    </div>
                </div>            </div>
        </section>
    );
};

export default Hero;
