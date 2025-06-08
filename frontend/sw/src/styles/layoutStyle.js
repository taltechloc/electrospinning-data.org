const layoutStyles = {
    layoutContainer: {
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f8f9fa", // Light gray background
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
    },

    contentContainer: {
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
        maxWidth: "2400px", // Maximum width
        flexGrow: 1, // Grow to fill vertical space
    },

    headings: {
        color: "#333333",
        fontWeight: "bold",
    },

    link: {
        textDecoration: "none",
    },

    navbarLinkHover: {
        color: "#00008B", // Dark blue on hover - note: can't do pseudo-classes inline, so handle via JS or CSS
    },

    navbarTogglerIcon: {
        backgroundColor: "#fff",
    },

    customNavLeft: {
        marginLeft: "20px",
    },
};

export default layoutStyles;
