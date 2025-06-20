import React, { useEffect, useState } from 'react';
import styles from '../styles/contributorStyles';
import {fetchContributors} from "../services/contributorService";
import { Helmet } from 'react-helmet';

const ContributorsPage = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadContributors = async () => {
            try {
                const data = await fetchContributors();
                setContributors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadContributors();
    }, []);

    const filteredContributors = contributors.filter(contributor => contributor.name);

    return (
        <>
            <Helmet>
                <link rel="canonical" href="https://electrospinning-data.org/contributors" />
            </Helmet>
        <div style={styles.container}>
            <h1 style={styles.h1}>Contributors</h1>
            <p>
                This platform thrives on the collaborative efforts of researchers, developers, and data enthusiasts around the world.
                We would like to extend our deepest gratitude to all those who have contributed to making this project a success.
            </p>

            {loading ? (
                <p>Loading contributors...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <section>
                    <h2 style={styles.h2}>Contributors After Moderation</h2>
                    {filteredContributors.length === 0 ? (
                        <p>No verified contributors found yet.</p>
                    ) : (
                        <>
                            <p>The following individuals have contributed data that is now part of the dataset:</p>
                            <ul style={styles.list}>
                                {filteredContributors.map((contributor) => (
                                    <li key={contributor.userId || contributor.name} style={styles.listItem}>
                                        <strong style={{ fontSize: '1.1rem' }}>{contributor.name}</strong>

                                        <div style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: '#555' }}>
                                            {contributor.affiliation && <span>Affiliation: {contributor.affiliation} &nbsp;|&nbsp; </span>}
                                            {contributor.lab && <span>Lab: {contributor.lab} &nbsp;|&nbsp; </span>}
                                            {contributor.country && <span>Country: {contributor.country}</span>}
                                        </div>

                                        {contributor.orcid && (
                                            <div style={{ marginTop: '0.25rem' }}>
                                                ORCID:{' '}
                                                <a
                                                    href={`https://orcid.org/${contributor.orcid}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={styles.link}
                                                >
                                                    {contributor.orcid}
                                                </a>
                                            </div>
                                        )}

                                        {/* Optional collapsible details for device info */}
                                        {(contributor.deviceManufacturer || contributor.deviceModel || typeof contributor.customDevice === 'boolean') && (
                                            <details style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
                                                <summary style={{ cursor: 'pointer' }}>Device info</summary>
                                                {contributor.deviceManufacturer && <div>Manufacturer: {contributor.deviceManufacturer}</div>}
                                                {contributor.deviceModel && <div>Model: {contributor.deviceModel}</div>}
                                                {typeof contributor.customDevice === 'boolean' && (
                                                    <div>Custom Device: {contributor.customDevice ? 'Yes' : 'No'}</div>
                                                )}
                                            </details>
                                        )}
                                    </li>
                                ))}


                            </ul>
                        </>
                    )}
                </section>
            )}

            <section style={styles.callToAction}>
                <h2 style={styles.h2}>Join Us!</h2>
                <p style={styles.callText}>
                    Want to be part of this exciting project? We welcome contributors from all fields! Whether you're a researcher,
                    developer, or just passionate about electrospinning, there's a place for you. <strong>Get involved!</strong>
                </p>
            </section>
        </div>
        </>

    );
};

export default ContributorsPage;
