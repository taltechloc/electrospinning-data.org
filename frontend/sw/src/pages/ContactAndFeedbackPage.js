import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactAndSupportPage = () => {

    return (

        <div className="container py-5">
            {/* Contact Info */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Contact, Feedback & Community</h1>
                <p className="lead text-muted mb-4">
                    We’d love to hear from you! Whether you have questions, need support, want to share feedback, or contribute to the platform,
                    you’re in the right place.
                </p>

                <div className="bg-white shadow-sm rounded p-4 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                    <h3 className="mb-4">General Contact</h3>
                    <p className="fs-5">
                        <strong>Contact Person:</strong> Mehrab Mahdian
                    </p>
                    <p className="fs-5">
                        <strong>Email:</strong>{' '}
                        <a href="mailto:mehrab.mahdian@taltech.ee">mehrab.mahdian@taltech.ee</a>
                    </p>
                    <p className="fs-5">
                        <strong>Address:</strong><br />
                        Estonia, Tallinn, <br />
                        Ehitajate tee 5. Room U02B-203<br />
                        Research Laboratory for Cognitronics<br />
                        Thomas Johann Seebeck Department of Electronics
                    </p>
                </div>

                {/* Feedback Section */}
                <div className="bg-light shadow-sm rounded p-4 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                    <h3 className="mb-4">Feedback & Feature Requests</h3>
                    <p className="fs-5 text-muted mb-4">
                        Help us improve by submitting your feedback, reporting bugs, or suggesting new features through our dedicated feedback form.
                    </p>
                    <Link to="/feedbackPage" className="btn btn-primary btn-lg">
                        Go to Feedback Form
                    </Link>
                </div>

                {/* Community Support Section */}
                <div className="bg-white shadow-sm rounded p-4 mx-auto" style={{ maxWidth: '600px' }}>
                    <h3 className="mb-4">Community & Contribution</h3>
                    <p className="fs-5 text-muted mb-4">
                        This platform is fully open-source and thrives because of community support. Your contributions help improve features, fix issues, and grow this valuable resource.
                    </p>
                    <a
                        href="https://github.com/taltechloc/electrospinning-data.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-lg"
                    >
                        Visit Our GitHub Repository
                    </a>
                </div>
            </div>
        </div>

);
};

export default ContactAndSupportPage;
