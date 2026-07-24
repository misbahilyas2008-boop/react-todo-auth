import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../api/axios";

export default function useResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e, toast) => {
    e.preventDefault();
    if (!password || !confirmPassword) return setError("All fields are required");
    if (password !== confirmPassword) return setError("Passwords do not match");
    setError("");

    try {
      await resetPassword(email, password);
      toast.success("Password reset successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return { password, confirmPassword, setPassword, setConfirmPassword, error, handleSubmit };
}
