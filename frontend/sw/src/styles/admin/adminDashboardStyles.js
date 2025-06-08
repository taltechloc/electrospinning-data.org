// src/styles/adminDashboardStyles.js

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
    },
    header: {
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '24px',
    },
    logoutBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    body: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        width: '100vw',
        flexDirection: isMobile ? 'column' : 'row',
    },
    sidebar: {
        width: isMobile ? '100%' : '250px',
        backgroundColor: '#34495e',
        paddingTop: '20px',
        paddingLeft: isMobile ? '10px' : '20px',
    },
    navLink: {
        textDecoration: 'none',
        color: 'white',
        fontSize: isMobile ? '16px' : '18px',
        padding: isMobile ? '10px' : '15px',
        display: 'block',
        transition: 'background 0.3s',
    },
    main: {
        flex: 1,
        padding: isMobile ? '20px' : '30px',
        backgroundColor: 'white',
        overflowY: 'auto',
    },
    sectionTitle: {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#2c3e50',
    },
    paragraph: {
        fontSize: '18px',
        color: '#7f8c8d',
    },
};

export default styles;
