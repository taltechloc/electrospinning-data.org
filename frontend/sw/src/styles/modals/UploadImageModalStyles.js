// UploadImageModalStyles.js
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

export const uploadButtonStyle = {
    marginTop: 12,
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: 4,
    border: "1px solid #555",
    backgroundColor: "#eee",
};

export const sectionStyle = (idx) => ({
    marginTop: idx > 0 ? 24 : 16,
    borderBottom: "1px solid #ddd",
    paddingBottom: 12,
});

export const previewContainerStyle = {
    marginTop: 8,
    width: 100,
    height: 100,
    borderRadius: 4,
    overflow: "hidden",
    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    position: "relative",
};

export const previewImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
};

export const previewRemoveButtonStyle = {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "50%",
    width: 22,
    height: 22,
    cursor: "pointer",
    lineHeight: 1,
};

export const addNewButtonStyle = {
    marginTop: 20,
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: 4,
    border: "1px solid #555",
    backgroundColor: "#eee",
};
