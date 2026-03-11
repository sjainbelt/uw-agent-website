import { CheckCircle } from 'lucide-react';
import './PostDownloadSteps.css';

const PostDownloadSteps = ({ appName = 'UnderWrite', os = 'mac' }) => {
    const installStep = os === 'mac'
        ? 'Open the downloaded .dmg file and drag the app to Applications'
        : 'Run the downloaded .msi installer and follow the wizard';

    return (
        <div className="post-download">
            <div className="post-download-title">
                <CheckCircle size={20} className="check-icon" />
                Download started — check your downloads folder
            </div>
            <ol className="post-download-steps">
                <li>
                    <span className="step-number">1</span>
                    <span>{installStep}</span>
                </li>
                <li>
                    <span className="step-number">2</span>
                    <span>Launch <span className="step-highlight">{appName}</span> and sign in with your work Google or Microsoft account</span>
                </li>
                <li>
                    <span className="step-number">3</span>
                    <span>Your <span className="step-highlight">14-day free trial</span> starts automatically — no credit card needed</span>
                </li>
            </ol>
        </div>
    );
};

export default PostDownloadSteps;
