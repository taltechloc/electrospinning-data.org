import React, { useEffect, useState } from 'react';
import { getAllFeedback } from '../../services/feedbackService';

const FeedbackListPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchFeedback() {
            try {
                const data = await getAllFeedback();
                setFeedbacks(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch feedback');
            }
        }

        fetchFeedback();
    }, []);

    return (
        <div className="container py-4">
            <h2 className="mb-4">User Feedback Submissions</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Subject</th>
                        <th>Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feedbacks.length === 0 ? (
                        <tr><td colSpan="6">No feedback submitted yet.</td></tr>
                    ) : (
                        feedbacks.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.date || '-'}</td>
                                <td>{item.name || '-'}</td>
                                <td>{item.email || '-'}</td>
                                <td>{item.category}</td>
                                <td>{item.subject}</td>
                                <td>{item.message}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackListPage;
