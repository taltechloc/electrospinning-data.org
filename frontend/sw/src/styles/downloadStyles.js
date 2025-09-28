const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        textAlign: 'center',
        color: '#333',
    },
    header: {
        marginBottom: '20px',
    },
    title: {
        fontSize: '2em',
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: '1.2em',
        color: '#7f8c8d',
    },
    fileSection: {
        backgroundColor: '#ecf0f1',
        padding: '15px',
        margin: '20px auto',
        borderRadius: '10px',
        maxWidth: '600px',
    },
    datasetInfo: {
        listStyle: 'none',
        padding: 0,
    },
    datasetInfoItem: {
        margin: '5px 0',
        fontSize: '1.1em',
    },
    downloadSection: {
        margin: '20px 0',
    },
    downloadButton: {
        display: 'inline-block',
        textDecoration: 'none',
        backgroundColor: '#3498db',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '1.1em',
        transition: 'background-color 0.3s ease',
        border: 'none',
        cursor: 'pointer',
    },
    downloadButtonHover: {
        backgroundColor: '#2980b9',
    },
    note: {
        fontSize: '0.9em',
        color: '#95a5a6',
    },
    footer: {
        marginTop: '30px',
        fontSize: '0.9em',
        color: '#95a5a6',
    },
    link: {
        color: '#e74c3c', // Red accent color for links
        textDecoration: 'none',
    },
    linkHover: {
        textDecoration: 'underline',
    },
    
    citationCard: {
        margin: '30px auto',
        maxWidth: '600px',
        padding: '25px',
        borderRadius: '10px',
        // Uses existing background and blue primary color for consistency
        background: '#ecf0f1', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '2px solid #3498db', 
        textAlign: 'left',
    },
    citationHeader: {
        color: '#3498db', // Primary blue color
        fontSize: '1.3em',
        fontWeight: 700,
        marginBottom: '15px',
        paddingBottom: '5px',
        borderBottom: '1px solid #bdc3c7', 
    },
    citationTextContainer: {
        display: 'block',
        fontSize: '1em',
        lineHeight: '1.6',
        color: '#333', 
        backgroundColor: '#fff', 
        padding: '10px',
        borderRadius: '5px',
        border: '1px dashed #95a5a6', 
        fontFamily: 'monospace, "Courier New", Courier, sans-serif',
    },
    doiLink: {
        color: '#e74c3c', // Uses the red accent color
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    }
    // --- END NEW CITATION STYLES ---
};

export default styles;