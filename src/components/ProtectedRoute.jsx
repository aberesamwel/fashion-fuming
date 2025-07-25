import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("🛡️ ProtectedRoute loaded");
  console.log("🧪 user in ProtectedRoute:", user);

  if (!user || user.guest) {
    setTimeout(() => {
      alert("You must log in or sign up to access this page.");
    }, 100);
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
