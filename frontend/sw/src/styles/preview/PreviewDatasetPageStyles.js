const styles = {
    page: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2rem',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '1.5rem',
    },
    filters: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px',
    },
    inputLabel: {
        fontSize: '0.9rem',
        color: '#374151',
        marginBottom: '0.25rem',
    },
    inputField: {
        padding: '0.5rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '0.95rem',
        backgroundColor: '#fff',
    },
    tableContainer: {
        flex: 1,
        overflowX: 'auto',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    table: {
        width: '100%',
        minWidth: '1300px',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f3f4f6',
        textAlign: 'left',
        fontWeight: '600',
        color: '#374151',
    },
    tableRow: {
        borderBottom: '1px solid #e5e7eb',
    },
    tableCell: {
        padding: '0.75rem 1rem',
        fontSize: '0.875rem',
        color: '#374151',
    },
    status: {
        marginTop: '1rem',
        fontStyle: 'italic',
        color: '#6b7280',
        fontSize: '0.95rem',
    },
};

export default styles;
