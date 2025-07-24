import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    alert("You must log in or sign up to access this page.");
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
