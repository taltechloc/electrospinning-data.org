import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/admin/adminDashboardStyles';
import {refreshContributorsCache, refreshDatasetCache} from "../../services/adminService";

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout();
        navigate('/');
    }, [logout, navigate]);

    const handleRefreshDatasetCache = async () => {
        try {
            const message = await refreshDatasetCache();
            alert(`Success: ${message}`);
        } catch (error) {
            alert(`Failed to refresh contributors cache.\n${error.message}`);
            console.error('Refresh failed:', error);
        }
    };

    const handleRefreshContributorsCache = async () => {
        try {
            const message = await refreshContributorsCache();
            alert(`Success: ${message}`);
        } catch (error) {
            alert(`Failed to refresh contributors cache.\n${error.message}`);
            console.error('Refresh failed:', error);
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header} role="banner">
                <h1 style={styles.title}>Admin Dashboard</h1>
                <button
                    style={styles.logoutBtn}
                    onClick={handleLogout}
                    aria-label="Logout"
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#c0392b')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#e74c3c')}
                >
                    Logout
                </button>
            </header>

            <div style={styles.body}>
                <nav style={styles.sidebar} aria-label="Admin navigation">
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                        <li>
                            <Link
                                to="/moderationPage"
                                style={styles.navLink}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#1abc9c')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
                            >
                                Pending Submissions
                            </Link>
                        </li>
                    </ul>
                </nav>


                <main style={styles.main} role="main">
                    <h2 style={styles.sectionTitle}>Welcome to the Admin Dashboard</h2>
                    <p style={styles.paragraph}>Select an option from the sidebar to get started.</p>

                    <div style={{ marginTop: '2rem' }}>
                        <button
                            style={{ ...styles.logoutBtn, marginRight: '1rem' }}
                            onClick={handleRefreshDatasetCache}
                        >
                            Refresh Dataset Cache
                        </button>
                        <button
                            style={styles.logoutBtn}
                            onClick={handleRefreshContributorsCache}
                        >
                            Refresh Contributors Cache
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;