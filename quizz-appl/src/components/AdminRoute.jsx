import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, role }) => {
  return role === 'admin' ? children : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
