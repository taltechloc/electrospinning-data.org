// tableStyles.js
export const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "0.9rem",
};

export const thStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 12px",
    textAlign: "center",
    userSelect: "none",
};

export const tdStyle = {
    padding: "8px 10px",
    borderBottom: "1px solid #ddd",
    verticalAlign: "middle",
    textAlign: "center",
};

export const clickableCellStyle = {
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
    padding: "8px",
};

export const inputStyle = {
    width: "70px",
    padding: "4px 6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
};

export const addRowBtnStyle = {
    marginBottom: "1rem",
    padding: "8px 16px",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};


export const tableTitleStyle = {
    display: 'flex',
    justifyContent: 'center'
}
export const rowCountStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    justifyContent: 'flex-end',  // move content to the right
}

export const fontBold14 = {
    fontWeight: 'bold',
    fontSize: '14px',
}

export const rowCountBoxStyle = {
    width: '60px',
    padding: '4px 8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',}

export const submitDivBtnStyle = {
    display: 'flex',
    justifyContent: 'center',  // center horizontally
    gap: '10px',               // space between buttons
    padding: '10px',}

export const submitBtnStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '8px',
}

export const cancelBtnStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '8px',
}

const actionBtnStyle = {
    padding: '4px 8px',
    marginRight: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    transition: 'background-color 0.2s ease',
};

export const removeBtnStyle = {
    ...actionBtnStyle,
    backgroundColor: '#ffdddd',
    borderColor: '#ff9999',
    color: '#a00',
};

export const copyBtnStyle = {
    ...actionBtnStyle,
    backgroundColor: '#ddffdd',
    borderColor: '#99cc99',
    color: '#080',
};
