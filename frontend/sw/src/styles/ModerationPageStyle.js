// ModerationPageStyle.js

export const container = {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
};

export const leftPanel = {
    width: '30%',
    padding: 20,
    borderRight: '1px solid #ccc',
    backgroundColor: '#f9fafb',
    overflowY: 'auto',
};

export const noPendingText = {
    color: '#666',
};

export const table = {
    width: '100%',
    borderCollapse: 'collapse',
};

export const th = {
    backgroundColor: '#f1f5f9',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
    color: '#334155',
};

export const td = {
    padding: '10px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'top',
    wordBreak: 'break-word',
    maxWidth: '400px',
    color: '#475569',
};

export const selectedRow = {
    backgroundColor: '#e0f2fe',
};

export const viewButton = {
    padding: '6px 10px',
    fontSize: 13,
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
};

export const rightPanel = {
    flex: 1,
    padding: 24,
    overflowY: 'auto',
};

export const detailsTitle = {
    fontSize: 20,
    marginBottom: 16,
};

export const detailsTable = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 20,
};

export const nestedContainer = {
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    overflowX: 'auto',
};

export const nestedTable = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
};

export const nestedKey = {
    padding: '8px 12px',
    backgroundColor: '#f1f5f9',
    fontWeight: '600',
    color: '#334155',
    borderBottom: '1px solid #e2e8f0',
    width: '30%',
    verticalAlign: 'top',
};

export const nestedValue = {
    padding: '8px 12px',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
    verticalAlign: 'top',
};

export const list = {
    paddingLeft: '20px',
    marginTop: '4px',
    marginBottom: '4px',
};

export const listItem = {
    marginBottom: '4px',
    color: '#475569',
};

export const approveButton = {
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
};

export const rejectButton = {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
};

export const buttonGroup = {
    display: 'flex',
    gap: 12,
};

export const placeholderText = {
    color: '#666',
};
