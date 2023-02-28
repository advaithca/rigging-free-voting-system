import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = UserAuth();
  if(loading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
