export const overlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
};

export const modalStyle = {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 8,
    width: 480,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    maxHeight: "90vh",
    overflowY: "auto",
};

export const headerStyle = {
    margin: 0,
    fontWeight: "600",
    fontSize: 20,
};

export const labelStyle = {
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
};

export const inlineLabelStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    flexWrap: "wrap",
};

export const inputStyle = {
    marginTop: 6,
    padding: "6px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    maxWidth: "100%",
    boxSizing: "border-box",
    wordBreak: "break-word",
};

export const selectStyle = {
    marginTop: 6,
    padding: "6px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    maxWidth: "100%",
    boxSizing: "border-box",
};

export const errorTextStyle = {
    color: "red",
    marginTop: 4,
};

export const buttonCancelStyle = {
    marginRight: 12,
    backgroundColor: "#eee",
    border: "none",
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "500",
};

export const buttonSaveStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
};
