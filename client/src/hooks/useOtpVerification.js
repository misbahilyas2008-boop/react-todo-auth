import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAccountOtp, resendAccountOtp } from "../api/axios";

export default function useOtpVerification(email) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [otpExpiryTime, setOtpExpiryTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // ---------------- RESTORE LOCAL STORAGE ----------------
  useEffect(() => {
    const savedExpiry = localStorage.getItem("otpExpiry");
    if (savedExpiry) {
      console.log("💾 Restoring saved OTP expiry from localStorage:", savedExpiry);
      setOtpExpiryTime(Number(savedExpiry));
    } else {
      console.log("⚠️ No saved OTP expiry found in localStorage (first mount)");
    }
  }, []);

  // ---------------- COUNTDOWN LOGIC ----------------
  useEffect(() => {
    if (!otpExpiryTime) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    console.log("🕒 Starting OTP countdown...");
    console.log("⏰ OTP expiry time from backend:", new Date(otpExpiryTime).toLocaleString());

    const tick = () => {
      const remaining = Math.max(Math.floor((otpExpiryTime - Date.now()) / 1000), 0);
      setTimeLeft(remaining);

      if (remaining % 10 === 0) {
        console.log("⏱️ Time left:", remaining, "seconds");
      }

      if (remaining <= 0) {
        console.log("❌ OTP expired (timer reached 0)");
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        localStorage.removeItem("otpExpiry");
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
    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // ---------------- INPUT HANDLER ----------------
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
    console.log("📤 Submitting OTP:", otp.join(""), "for email:", email);

    try {
      const res = await verifyAccountOtp(email, otp.join(""));
      console.log("✅ OTP Verified Response:", res.data);

      // Show toast
      toast.success(res.data.message || "OTP Verified!", {
        autoClose: 2000, // toast stays for 2 seconds
      });

      // Delay redirect so user sees the toast
      setTimeout(() => {
        navigate("/login");
      }, 2500);

      // Clean up on successful verification
      localStorage.removeItem("otpExpiry");
    } catch (err) {
      console.error("❌ OTP verification failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RESEND OTP ----------------
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    console.log("🔁 Resending OTP for:", email);

    try {
      const res = await resendAccountOtp(email);
      console.log("📦 Resend response:", res.data);

      setResendTimer(30);

      if (res.data?.expiresAt) {
        const expiryTime = Number(res.data.expiresAt);
        localStorage.setItem("otpExpiry", expiryTime);
        setOtpExpiryTime(expiryTime);
        console.log("✅ New OTP expiry set:", new Date(expiryTime).toLocaleString());
      } else {
        console.warn("⚠️ No expiresAt received in resend response!");
      }
    } catch (err) {
      console.error("❌ Failed to resend OTP:", err.response?.data || err.message);
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
