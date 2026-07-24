import { useState, useEffect, useRef } from "react";
import { verifyResetOtp, resendResetOtp } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function useResetPasswordOtp(email) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [otpExpiryTime, setOtpExpiryTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // ---------------- RESTORE EXPIRY FROM LOCALSTORAGE ----------------
  useEffect(() => {
    const savedExpiry = localStorage.getItem("resetOtpExpiry");
    if (savedExpiry) {
      console.log("💾 Restoring Reset OTP expiry from localStorage:", savedExpiry);
      setOtpExpiryTime(Number(savedExpiry));
    }
  }, []);

  // ---------------- COUNTDOWN LOGIC ----------------
  useEffect(() => {
    if (!otpExpiryTime) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const tick = () => {
      const remaining = Math.max(Math.floor((otpExpiryTime - Date.now()) / 1000), 0);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        localStorage.removeItem("resetOtpExpiry");
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [otpExpiryTime]);

  // ---------------- RESEND TIMER ----------------
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // ---------------- OTP INPUT CHANGE ----------------
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);
  };

  // ---------------- VERIFY OTP ----------------
  const handleSubmit = async (e, toast) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await verifyResetOtp(email, otp.join(""));
      console.log("✅ Reset OTP Verified Response:", res.data);

      //  Show success toast
      toast.success(res.data.message || "OTP Verified!", { autoClose: 2000 });

      // Clean up local storage
      localStorage.removeItem("resetOtpExpiry");

      // ⏳ Delay redirect so user can see toast
      setTimeout(() => {
        navigate("/reset-password-new", { state: { email, otp: otp.join("") } });
      }, 2500);
    } catch (err) {
      console.error("❌ Reset OTP verification failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RESEND OTP ----------------
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await resendResetOtp(email);
      console.log("📦 Reset Resend response:", res.data);

      setResendTimer(30);

      if (res.data?.expiresAt) {
        const expiryTime = Number(res.data.expiresAt);
        localStorage.setItem("resetOtpExpiry", expiryTime);
        setOtpExpiryTime(expiryTime);
      }
    } catch (err) {
      console.error("❌ Failed to resend Reset OTP:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return {
    otp,
    handleChange,
    handleSubmit,
    handleResendOtp,
    resendTimer,
    loading,
    error,
    timeLeft,
    setOtp,
  };
}
