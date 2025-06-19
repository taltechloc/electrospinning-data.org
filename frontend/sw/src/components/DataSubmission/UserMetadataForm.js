import React, { useState } from "react";
import styles from "../../styles/UserMetadataFormStyle";
import {Link} from "react-router-dom";

export default function UserMetadataForm({ onNext }) {
    const [userMetadata, setUserMetadata] = useState({
        name: "",
        email: "",
        affiliation: "",
        lab: "",
        country: "",
        role: "",
        orcid: "",
        showPublicly: true,
        consentTerms: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserMetadata((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (error) setError(""); // Clear error on change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userMetadata.name.trim() || !userMetadata.email.trim() || !userMetadata.consentTerms) {
            setError("Please fill in all required fields and accept the terms.");
            return;
        }
        onNext(userMetadata);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer} noValidate>
            <h2 style={styles.heading}>Contributor Metadata</h2>

            {error && <p style={styles.errorMessage}>{error}</p>}

            <label htmlFor="name" style={styles.label}>Name*:</label>
            <input
                id="name"
                type="text"
                name="name"
                value={userMetadata.name}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Your full name"
            />

            <label htmlFor="email" style={styles.label}>Email*:</label>
            <input
                id="email"
                type="email"
                name="email"
                value={userMetadata.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="you@example.com"
            />

            <label htmlFor="affiliation" style={styles.label}>Affiliation:</label>
            <input
                id="affiliation"
                type="text"
                name="affiliation"
                value={userMetadata.affiliation}
                onChange={handleChange}
                style={styles.input}
                placeholder="Your institution or company"
            />

            <label htmlFor="lab" style={styles.label}>Lab / Research Group:</label>
            <input
                id="lab"
                type="text"
                name="lab"
                value={userMetadata.lab}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Biomaterials & Interfaces Group"
            />

            <label htmlFor="role" style={styles.label}>Role:</label>
            <input
                id="role"
                type="text"
                name="role"
                value={userMetadata.role}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., PhD student, Research Scientist"
            />

            <label htmlFor="country" style={styles.label}>Country:</label>
            <input
                id="country"
                type="text"
                name="country"
                value={userMetadata.country}
                onChange={handleChange}
                style={styles.input}
                placeholder="Country of residence"
            />

            <label htmlFor="orcid" style={styles.label}>ORCID:</label>
            <input
                id="orcid"
                type="text"
                name="orcid"
                value={userMetadata.orcid}
                onChange={handleChange}
                style={styles.input}
                placeholder="0000-0000-0000-0000"
            />

            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="showPublicly"
                    checked={userMetadata.showPublicly}
                    onChange={handleChange}
                    style={styles.checkbox}
                />
                Show my name, affiliation, country, and ORCID under contributors page.
            </label>

            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="consentTerms"
                    checked={userMetadata.consentTerms}
                    onChange={handleChange}
                    required
                    style={styles.checkbox}
                    aria-label="Accept terms and conditions"
                />
                    I accept{' '}
                    <Link to="/terms">Terms & Conditions</Link>{' '}
                    and{' '}
                    <Link to="/license" >License Agreement</Link>. <span style={{ color: "red" }}>*</span>
                </label>


                <button type="submit" style={styles.button} aria-label="Proceed to experiment data">
                Next: Research Metadata
            </button>
        </form>
    );
}
