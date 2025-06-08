import React from 'react';
import styles from '../styles/aboutStyles';

const AboutPage = () => {
    return (
        <div style={styles.container}>
            <header>
                <h1 style={styles.h1}>About the Platform</h1>
                <p style={styles.paragraph}>
                    This open-source platform was developed as part of the PSG897 research project to promote data sharing and transparency in the electrospinning field.
                    Its purpose is to offer a collaborative space for researchers to contribute, access, and explore experimental datasets in a systematic and accessible manner.
                </p>
            </header>

            <section>
                <h2 style={styles.h2}>Why Electrospinning?</h2>
                <p style={styles.paragraph}>
                    Electrospinning is a versatile technique for fabricating nanofibers that find applications across various fields, including biomedical, energy, and environmental systems.
                    Despite its widespread use, data related to electrospinning experiments remain fragmented. This platform addresses this issue by centralizing and organizing the available datasets.
                </p>
            </section>

            <section>
                <h2 style={styles.h2}>Platform Features</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}>
                        <strong>Data Repository:</strong> A growing collection of datasets, updated regularly through community contributions.
                    </li>
                    <li style={styles.listItem}>
                        <strong>Data Submission Tools:</strong> User-friendly web interfaces for easy dataset sharing and retrieval.
                    </li>
                    <li style={styles.listItem}>
                        <strong>Collaborative Space:</strong> Facilitates interdisciplinary collaboration and cross-institutional research sharing.
                    </li>
                </ul>
            </section>

            <section>
                <h2 style={styles.h2}>Who Can Benefit?</h2>
                <p style={styles.paragraph}>
                    This platform is designed for researchers, practitioners, and educators in the field of electrospinning. It serves as a valuable resource for those looking to validate results, find reliable datasets, and engage in meaningful collaboration.
                </p>
            </section>

            <section>
                <h2 style={styles.h2}>Project Origin</h2>
                <p style={styles.paragraph}>
                    Developed by Mehrab Mahdian as part of his doctoral research, this platform aims to enhance open science practices and facilitate knowledge exchange in materials research.
                </p>
            </section>

            <section>
                <h2 style={styles.h2}>Get Involved</h2>
                <p style={styles.paragraph}>
                    We welcome contributions from the research community. Whether through dataset submissions, feedback, or feature suggestions, your involvement helps us grow this valuable resource for the electrospinning community.
                </p>
                <a
                    href="/dataSubmission"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
                >
                    Contribute to the Platform
                </a>
            </section>
        </div>
    );
};

export default AboutPage;
