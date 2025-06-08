import React, { useState } from "react";
import styles from "../../styles/UserMetadataFormStyle";

export default function UserMetadataForm({ onNext }) {
    const [userMetadata, setUserMetadata] = useState({
        name: "",
        email: "",
        affiliation: "",
        lab: "",
        country: "",
        role: "",
        orcid: "",
        doi: "",
        deviceManufacturer: "",
        deviceModel: "",
        customDevice: false,
        showPublicly: false,
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
            <h2 style={styles.heading}>User Metadata</h2>

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

            <label htmlFor="doi" style={styles.label}>DOI:</label>
            <input
                id="doi"
                type="text"
                name="doi"
                value={userMetadata.doi}
                onChange={handleChange}
                style={styles.input}
                placeholder="Digital Object Identifier"
            />

            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="customDevice"
                    checked={userMetadata.customDevice}
                    onChange={handleChange}
                    style={styles.checkbox}
                />
                DIY / Custom-Built Device
            </label>

            <label htmlFor="deviceManufacturer" style={styles.label}>
                Device Manufacturer:
            </label>
            <input
                id="deviceManufacturer"
                type="text"
                name="deviceManufacturer"
                value={userMetadata.deviceManufacturer}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Inovenso, Linari"
                disabled={userMetadata.customDevice}
            />

            <label htmlFor="deviceModel" style={styles.label}>
                Device Model:
            </label>
            <input
                id="deviceModel"
                type="text"
                name="deviceModel"
                value={userMetadata.deviceModel}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., NE300"
                disabled={userMetadata.customDevice}
            />

            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="showPublicly"
                    checked={userMetadata.showPublicly}
                    onChange={handleChange}
                    style={styles.checkbox}
                />
                Show Data Publicly
            </label>

            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="consentTerms"
                    checked={userMetadata.consentTerms}
                    onChange={handleChange}
                    required
                    style={styles.checkbox}
                />
                I accept the terms *
            </label>

            <button type="submit" style={styles.button} aria-label="Proceed to experiment data">
                Next: Experiment Data
            </button>
        </form>
    );
}
