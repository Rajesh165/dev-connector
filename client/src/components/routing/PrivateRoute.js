import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return !auth.isAuthenticated && !auth.isLoading ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};
export default PrivateRoute;
