// Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import '../styles/layout.css'; // Import custom CSS for additional styling

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <div className="content-container">
                {children}  {/* This is where the specific page content will go */}
            </div>
            <Footer /> {/* Use the Footer component */}
        </div>
    );
};

export default Layout;
