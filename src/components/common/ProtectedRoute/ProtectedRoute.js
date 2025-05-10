import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { isValidAccessToken } from "../../../services/AuthenticationService";

const ProtectedRoute = ({ children, role }) => {
  const accessToken = Cookies.get("access_token");
  const userRole = Cookies.get("user_role");
  
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default ProtectedRoute;