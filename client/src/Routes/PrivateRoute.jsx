// src/Routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" />;
}
