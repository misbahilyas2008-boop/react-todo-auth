import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../api/axios";

export default function useResetPasswordNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, toast) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Both fields are required");
      toast.error("Both fields are required", { autoClose: 4000, theme: "colored" });
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match", { autoClose: 4000, theme: "colored" });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await resetPassword(email, otp, password);

      // Success toast
      toast.success(res.data.message || "✅ Your password has been successfully changed!", {
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      //  Redirect to login after short delay to show toast
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to reset password";
      setError(message);
      toast.error(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  };
}
