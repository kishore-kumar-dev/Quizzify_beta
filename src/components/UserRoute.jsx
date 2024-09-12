import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children, role }) => {
  return role === 'user' || role === 'admin' ? children : <Navigate to="/unauthorized" />;
};

export default UserRoute;
