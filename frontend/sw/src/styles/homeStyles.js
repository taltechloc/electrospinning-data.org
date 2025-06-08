const homeStyles = {
    containerFluid: {
        position: 'relative',
        backgroundColor: '#f8f9fa', // equivalent to bg-light
    },

    heroSection: {
        background: 'linear-gradient(to right, #003366, #005b99)', // Classic blue gradient
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white',
    },

    heroImg: {
        borderRadius: '15px 50px 30px',
        maxWidth: '100%',
        height: 'auto',
    },

    heroHeading: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginTop: '1rem',
    },

    heroSubheading: {
        fontSize: '1.25rem',
        marginTop: '1rem',
    },

    aboutSection: {
        backgroundColor: '#f4f4f9',
        padding: '40px 20px',
        color: '#333',
        textAlign: 'center',
    },

    sectionHeading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '30px',
    },

    aboutText: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        marginTop: '1rem',
    },

    featuresSection: {
        background: 'linear-gradient(135deg, #1f6f94, #5b8e9f)',
        color: 'black',
        padding: '60px 20px',
        textAlign: 'center',
    },

    featuresRow: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '1rem',
    },

    featureBox: {
        backgroundColor: 'gainsboro',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        flex: '1 1 250px',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    },

    featureBoxHover: {
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)',
        transform: 'translateY(-5px)',
    },

    featureBoxHeading: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: 'black',
    },

    featureBoxText: {
        fontSize: '1rem',
        color: 'black',
    },

    ctaSection: {
        backgroundColor: 'black',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white',
    },

    ctaHeading: {
        fontSize: '2rem',
        fontWeight: 'bold',
    },

    ctaText: {
        fontSize: '1.1rem',
        marginBottom: '30px',
        marginTop: '1rem',
    },

    ctaBtn: {
        fontSize: '1.25rem',
        padding: '12px 30px',
        borderRadius: '30px',
        border: '2px solid white',
        backgroundColor: 'transparent',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s, border-color 0.3s',
        textDecoration: 'none',
        display: 'inline-block',
    },

    ctaBtnHover: {
        backgroundColor: 'white',
        color: '#005b99',
        borderColor: '#005b99',
    },
};

export default homeStyles;
