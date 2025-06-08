import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/admin/loginStyles';
import { loginUser } from '../../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const success = await loginUser(username, password);

      if (success === true) {
        login(); // no token, just mark logged in
        navigate('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => navigate('/home');
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
      <div style={styles.wrapper}>
        <div style={styles.form}>
          <h2 style={styles.heading}>Login</h2>
          {!isAuthenticated ? (
              <>
                <div style={styles.inputGroup}>
                  <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoFocus
                      style={styles.inputField}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={styles.inputField}
                  />
                </div>

                {error && <p style={styles.errorMessage}>{error}</p>}

                <button
                    style={{
                      ...styles.submitBtn,
                      backgroundColor: isLoading ? '#cccccc' : styles.submitBtn.backgroundColor,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <button
                    style={styles.homeBtn}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#5a6268')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#6c757d')}
                    onClick={handleGoHome}
                >
                  Go Home
                </button>
              </>
          ) : (
              <button
                  style={styles.logoutBtn}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
                  onClick={handleLogout}
              >
                Logout
              </button>
          )}
        </div>
      </div>
  );
};

export default Login;
