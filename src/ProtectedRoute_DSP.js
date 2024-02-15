import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth_DSP } from './AuthContext';

function ProtectedRoute_DSP({ children }) {
  const { user } = useAuth_DSP();

//   console.log(".....!!")
//   console.log(user)

  if (!user) {
    return <Navigate to="/DSPLogin" replace />;
  }

  return children;
}

export default ProtectedRoute_DSP;
