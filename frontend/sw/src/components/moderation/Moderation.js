import React, { useState, useEffect } from 'react';
import * as styles from '../../styles/ModerationPageStyle';
import { fetchPendingExperiments, moderateExperiment } from '../../services/moderationService';

function Moderation() {
    const [experiments, setExperiments] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadExperiments() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPendingExperiments();
                setExperiments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadExperiments();
    }, []);

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleModeration = async (id, action) => {
        try {
            await moderateExperiment(id, action);
            setExperiments((prev) => prev.filter((exp) => exp.experimentId !== id));
            if (expandedId === id) setExpandedId(null);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Pending Experiments</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && experiments.length === 0 && <p>No pending experiments.</p>}

            {!loading && !error && experiments.length > 0 && (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Details</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {experiments.map((exp) => (
                        <React.Fragment key={exp.experimentId}>
                            <tr>
                                <td style={styles.td}>#{exp.experimentId}</td>
                                <td style={{ ...styles.td, textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleToggle(exp.experimentId)}
                                        aria-label={expandedId === exp.experimentId ? 'Collapse details' : 'Expand details'}
                                    >
                                        {expandedId === exp.experimentId ? '▼' : '▶'}
                                    </button>
                                </td>
                                <td style={{ ...styles.td, textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleModeration(exp.experimentId, 'approve')}
                                        style={styles.approveButton}
                                        aria-label={`Approve experiment ${exp.experimentId}`}
                                    >
                                        ✅
                                    </button>
                                    <button
                                        onClick={() => handleModeration(exp.experimentId, 'reject')}
                                        style={styles.rejectButton}
                                        aria-label={`Reject experiment ${exp.experimentId}`}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>

                            {expandedId === exp.experimentId && (
                                <tr>
                                    <td colSpan={3} style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
                                        <div>
                                            {Object.entries(exp).map(([key, value]) => (
                                                <div key={key}>
                                                    <strong>{key}:</strong> {renderValue(value)}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

function renderValue(value) {
    if (Array.isArray(value)) {
        return (
            <ul style={styles.list}>
                {value.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                        {renderValue(item)}
                    </li>
                ))}
            </ul>
        );
    }

    if (value && typeof value === 'object') {
        return (
            <table style={styles.nestedTable}>
                <tbody>
                {Object.entries(value).map(([k, v]) => (
                    <tr key={k}>
                        <td style={styles.nestedKey}>{k}</td>
                        <td style={styles.nestedValue}>{renderValue(v)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    return <span>{value?.toString() || ''}</span>;
}

export default Moderation;
