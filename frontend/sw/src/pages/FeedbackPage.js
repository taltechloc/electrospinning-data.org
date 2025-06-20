import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { submitFeedback } from "../services/feedbackService";

const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'Feedback',
        subject: '',
        message: '',
        imageBase64: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            const file = files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(",")[1]; // remove data:image/... prefix
                setFormData((prevData) => ({
                    ...prevData,
                    imageBase64: base64,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMsg('');
        setErrorMsg('');
        setSubmitted(false);

        try {
            await submitFeedback(formData);
            setSubmitted(true);
            setResponseMsg("Thank you for your feedback!");
            setFormData({
                name: '',
                email: '',
                category: 'Feedback',
                subject: '',
                message: '',
                imageBase64: '',
            });
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (

        <div className="container py-5">
            {/* Explanation Section */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Feedback & Feature Requests</h1>
                <p className="lead text-muted mb-4">
                    Help us improve the platform! Submit your thoughts, ideas, or bug reports below.
                </p>
                <p className="text-muted fs-5">
                    <strong>Why this matters:</strong> Electrospinning is a powerful method for producing nanofibers with applications in medicine, energy, and environmental science.
                    However, data in this field is often siloed, inconsistent, or unpublished — limiting reproducibility and slowing down progress.
                </p>
                <p className="text-muted fs-5">
                    This open, community-based effort aims to break down barriers by centralizing experimental data and encouraging transparent collaboration.
                    Your feedback directly helps make this platform more accessible, reliable, and valuable for everyone in the field.
                </p>
            </div>

            {/* Form Section */}
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {submitted ? (
                        <div className="alert alert-success text-center p-4">
                            <h5 className="mb-3">{responseMsg}</h5>
                            <p>We appreciate your input and will review it shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">
                            {errorMsg && (
                                <div className="alert alert-danger">{errorMsg}</div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">Name (optional)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email (optional)</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="Feedback">Feedback</option>
                                    <option value="Feature Request">Feature Request</option>
                                    <option value="Bug Report">Bug Report</option>
                                    <option value="Data Correction">Data Correction</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Attach Image (optional)</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>

    );
};

export default FeedbackPage;
