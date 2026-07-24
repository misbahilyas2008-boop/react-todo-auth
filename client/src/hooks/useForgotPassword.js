import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/axios";

export default function useForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e, toast) => {
    e.preventDefault();
    if (!email) return setError("Email is required");
    setLoading(true);
    setError("");

    try {
      console.log("📨 Sending forgot password request for:", email);

      // Send forgot password request
      const res = await forgotPassword(email);
      console.log("📦 Forgot password response:", res.data);

      //  Success toast (longer and styled)
      toast.success(` OTP sent to ${email}. Please check your inbox.`, {
        autoClose: 8000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      
      });

      //  Save OTP expiry in localStorage if provided
      if (res.data?.expiresAt) {
        localStorage.setItem("resetOtpExpiry", res.data.expiresAt);
        console.log("💾 Saved Reset OTP expiry:", res.data.expiresAt);
      }

      // Redirect to OTP verification page after small delay
      setTimeout(() => {
        navigate("/reset-password-otp", { state: { email } });
      }, 1000);
    } catch (err) {
      console.error("❌ Forgot Password Error:", err.response?.data || err.message);

      //  Error toast
      toast.error(err.response?.data?.message || "❌ Something went wrong", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { email, error, loading, handleChange, handleSubmit };
}
