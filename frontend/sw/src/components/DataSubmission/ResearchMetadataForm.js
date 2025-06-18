import React, { useState } from "react";
import styles from "../../styles/UserMetadataFormStyle";

export default function ResearchMetadataForm({ onNext }) {
    const [researchMetadata, setResearchMetadata] = useState({
        publicationTitle: "",
        doi: "",
        deviceManufacturer: "",
        deviceModel: "",
        customDevice: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setResearchMetadata((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (error) setError(""); // Clear error on change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(researchMetadata);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer} noValidate>
            <h2 style={styles.heading}>Research Metadata</h2>

            {error && <p style={styles.errorMessage}>{error}</p>}

            <label htmlFor="publicationTitle" style={styles.label}>Publication Title:</label>
            <input
                id="publicationTitle"
                type="text"
                name="publicationTitle"
                value={researchMetadata.publicationTitle}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Publication Title"
            />

            <label htmlFor="doi" style={styles.label}>DOI:</label>
            <input
                id="doi"
                type="text"
                name="doi"
                value={researchMetadata.doi}
                onChange={handleChange}
                style={styles.input}
                placeholder="Digital Object Identifier"
            />

            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="customDevice"
                    checked={researchMetadata.customDevice}
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
                value={researchMetadata.deviceManufacturer}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Inovenso, Linari"
                disabled={researchMetadata.customDevice}
            />

            <label htmlFor="deviceModel" style={styles.label}>
                Device Model:
            </label>
            <input
                id="deviceModel"
                type="text"
                name="deviceModel"
                value={researchMetadata.deviceModel}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., NE300"
                disabled={researchMetadata.customDevice}
            />

            <button type="submit" style={styles.button} aria-label="Proceed to experiment data">
                Next: Experiment Data
            </button>
        </form>
    );
}
