import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// function ProtectedRoute({ component: Component, ...rest }) {
//   const { user = {} } = useAuth() || {};

//   // return (
//   //   <Route
//   //     {...rest}
//   //     render={props =>
//   //       user ? <Component {...props} /> : <Navigate to="/login" />
//   //     }
//   //   />
//   // );
// }

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
