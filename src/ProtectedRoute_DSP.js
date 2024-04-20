import React from "react";
import { Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth_DSP } from "./AuthContext";

function ProtectedRoute_DSP({ children }) {
  const { user } = useAuth_DSP();

  var location = useLocation();
  var navigate = useNavigate;

  //   console.log(".....!!")
  //   console.log(user)

  var userDSP = location.state?.selData;

  if (!user) {
    return (
      <Navigate to="/DSPLogin" replace state={{ from: location, userDSP }} /> //Navigate with extra data "Current DSP Name"
    );
  }

  // console.log(userDSP);

  return children;
}

export default ProtectedRoute_DSP;
