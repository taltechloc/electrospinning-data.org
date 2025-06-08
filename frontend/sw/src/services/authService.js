// src/services/authService.js
import { endpoints } from '../api/endpoints';

export const loginUser = async (username, password) => {
    const response = await fetch(endpoints.AdminLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
    }

    const data = await response.json();
    return data.success;  // boolean true or false
};
