const styles = {
    formContainer: {
        maxWidth: "480px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
    },
    heading: {
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#1a73e8",
    },
    label: {
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: "600",
    },
    input: {
        width: "100%",
        padding: "0.5rem 0.75rem",
        marginBottom: "1.25rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        transition: "border-color 0.3s ease",
    },
    inputFocus: {
        borderColor: "#1a73e8",
        outline: "none",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        fontWeight: "500",
        cursor: "pointer",
    },
    checkbox: {
        marginRight: "0.5rem",
        width: "18px",
        height: "18px",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#1a73e8",
        color: "white",
        fontWeight: "700",
        fontSize: "1.1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#155ab6",
    },
    errorMessage: {
        color: "red",
        marginBottom: "1rem",
        fontWeight: "600",
    },
};

export default styles;
