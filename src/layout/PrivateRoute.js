import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('bearer_token');

  if (!token) {
    // Redirect to login page if no token is found
    return <Navigate to="/login" replace />;
  }

  // Render the children if the token is present
  return children;
};

export default PrivateRoute;
