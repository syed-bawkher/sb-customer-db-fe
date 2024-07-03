import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService'; // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const isValid = await authService.validateToken();
        setIsValidToken(isValid);
      } catch (error) {
        setIsValidToken(false);
      }
    };

    checkToken();
  }, [children]);

  if (isValidToken === null) {
    // You can show a loading spinner or some other placeholder here
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    // Redirect to login page if the token is not valid
    return <Navigate to="/login" replace />;
  }

  // Render the children if the token is valid
  return children;
};

export default PrivateRoute;
