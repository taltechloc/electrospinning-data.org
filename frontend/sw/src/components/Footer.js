import React from 'react';
import '../styles/footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>Electrospinning Data</h2>
                </div>

                <div className="footer-links">
                    <Link to="/about">About</Link>
                    <Link to="/dataSubmission">Submit Data</Link>
                    <Link to="/download">Download Dataset</Link>
                    <Link to="/contactAndFeedbackPage">Contact</Link>
                </div>


                <div className="footer-social">
                    <a href="https://github.com/taltechloc/electrospinning-data.org" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/lab-on-a-chip/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Electrospinning Data Community. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
