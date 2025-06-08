export const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

export const formStyle = {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    minWidth: 400,
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
};

export const labelStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 500,
    color: "#333",
};

export const inputStyle = {
    padding: "6px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
};

export const selectStyle = {
    padding: "6px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
    cursor: "pointer",
};

export const buttonRowStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 24,
};

export const cancelButtonStyle = {
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
};

export const saveButtonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: "600",
    transition: "background-color 0.3s ease",
};

export const saveButtonHoverStyle = {
    backgroundColor: "#0056b3",
};
