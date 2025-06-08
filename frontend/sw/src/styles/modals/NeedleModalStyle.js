// NeedleModalStyle.js

export const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
};

export const formStyle = {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 8,
    width: 500,
    maxHeight: "80vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

export const labelStyle = {
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
};

export const inputStyle = {
    marginTop: 6,
    padding: "6px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
};

export const selectStyle = {
    marginTop: 6,
    padding: "6px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
};

export const cancelButtonStyle = {
    marginRight: 12,
    backgroundColor: "#eee",
    border: "none",
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "500",
};

export const saveButtonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
};

export const headingStyle = {
    margin: 0,
    fontWeight: "600",
    fontSize: 20,
};
