// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import PrivateRoute from "./Routes/PrivateRoute";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordOtp from "./pages/ResetPasswordOtp";
import ResetPasswordNew from "./pages/ResetPasswordNew";
import AccountVerificationOtp from "./pages/AccountVerificaionOtp";
import TodosPage from "./pages/TodosPage";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password-otp" element={<ResetPasswordOtp />} />
        <Route path="/reset-password-new" element={<ResetPasswordNew />} />
        <Route
          path="/account-verification-otp"
          element={<AccountVerificationOtp />}
        />

        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodosPage />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
