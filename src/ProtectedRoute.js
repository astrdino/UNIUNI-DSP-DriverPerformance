import React from "react";
import { Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  var location = useLocation();
  var navigate = useNavigate;

  var currentUser = location.state?.selData; // as string from selection

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location, currentUser }} />
    );
  }

  return children;
}

export default ProtectedRoute;
