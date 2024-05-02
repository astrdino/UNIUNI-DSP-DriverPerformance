import React from "react";
import { Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute_LoginPrev({ children }) {
  const { user } = useAuth();

  var location = useLocation();
  var navigate = useNavigate;

  var currentUser = location.state?.currentUser; // as string from selection
  // console.log(currentUser);

  if (!currentUser) {
    //If there is no selection, e.g. endpoint, back action
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute_LoginPrev;
