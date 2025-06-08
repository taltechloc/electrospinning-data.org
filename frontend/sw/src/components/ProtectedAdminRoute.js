import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../pages/admin/AdminDashboard';

const ProtectedAdminRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />;
};

export default ProtectedAdminRoute;
