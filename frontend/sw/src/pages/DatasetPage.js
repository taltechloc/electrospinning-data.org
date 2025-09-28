import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { downloadDatasetExcel } from '../services/datasetService';
import styles from '../styles/downloadStyles'; 

const DatasetPage = () => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const blob = await downloadDatasetExcel();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'electrospinning_dataset.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error.message);
      alert('There was an error downloading the dataset. Please try again later.');
    }
  };

  const handlePreviewRedirect = () => {
    navigate('/PreviewDatasetPage');
  };

  return (

      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>📊 Electrospinning Dataset Hub</h1>
          <p style={styles.subtitle}>
            Explore and download the curated dataset for electrospinning experiments.
            Perfect for researchers, students, and innovators in material science.
          </p>
        </header>

        <main>
          {/* Button to navigate to preview page */}
          <section style={styles.downloadSection}>
            <button
                onClick={handlePreviewRedirect}
                style={{ ...styles.downloadButton, marginBottom: '1rem' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
                onMouseOut={e => e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor}
            >
              🔍 Preview Dataset
            </button>
          </section>

          {/* Dataset Info */}
          <section style={styles.fileSection}>
            <h2>📁 Dataset Details</h2>
            <ul style={styles.datasetInfo}>
              <li style={styles.datasetInfoItem}>Format: Excel (.xlsx)</li>
            </ul>
          </section>

          {/* Download button */}
          <section style={styles.downloadSection}>
            <button
                onClick={handleDownload}
                style={styles.downloadButton}
                onMouseOver={e => e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
                onMouseOut={e => e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor}
            >
              🚀 Download Full Dataset
            </button>
            <p style={styles.note}>
              ⚡ Note: This dataset is updated regularly. Check back for the latest version!
            </p>
          </section>
          
          {/* BEAUTIFIED CITATION CARD - Now using imported styles. */}
          <section style={styles.citationCard}>
            <h3 style={styles.citationHeader}>
              📚 Please Cite This Work
            </h3>
            <span style={styles.citationTextContainer}>
              Mehrab Mahdian, Ferenc Ender, Tamas Pardy. **<span style={{ fontStyle: 'italic' }}>An Open Web Platform for Standardized, Community-Driven Electrospinning Data Collection.</span>** TechRxiv. June 27, 2025.
              <br /><br />
              **DOI:** <a 
                href="https://doi.org/10.36227/techrxiv.175099633.32220861/v1" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.doiLink}
              >
                10.36227/techrxiv.175099633.32220861/v1
              </a>
            </span>
          </section>
          {/* END BEAUTIFIED CITATION CARD */}

        </main>


        {/* Footer */}
        
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            📜 By downloading, you agree to our{' '}
            <Link to="/terms" style={styles.link}>Terms & Conditions</Link>{' '}
            and{' '}
            <Link to="/license" style={styles.link}>License Agreement</Link>.
          </p>
        </footer>

      </div>

  );
};

export default DatasetPage;