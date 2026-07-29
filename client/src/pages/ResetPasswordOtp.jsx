import React, { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Components/Button/Button";
import useResetPasswordOtp from "../hooks/useResetPasswordOtp";
import { useLocation } from "react-router-dom";

export default function ResetPasswordOtp() {
  const location = useLocation();
  const email = location.state?.email;

  const {
    otp,
    handleChange,
    handleSubmit,
    handleResendOtp,
    resendTimer,
    loading,
    error,
    timeLeft,
    setOtp,
  } = useResetPasswordOtp(email);

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    const filtered = value.replace(/[^0-9]/g, "");
    handleChange(index, filtered);
    if (filtered && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      newOtp.forEach((val, i) => {
        if (inputRefs.current[i]) inputRefs.current[i].value = val;
      });
      inputRefs.current[5]?.focus();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur opacity-75"></div>
        <div className="relative z-10 bg-gray-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Reset Password - OTP
          </h2>

          <p className="text-center text-gray-300 mb-2">
            We’ve sent a verification code to{" "}
            <span className="text-blue-400 font-semibold">{email}</span>
          </p>

          <p className="text-center text-gray-300 mb-4">
            {timeLeft > 0
              ? `OTP expires in: ${formatTime(timeLeft)}`
              : "❌ OTP expired. Please resend."}
          </p>

          <form onSubmit={(e) => handleSubmit(e, toast)} className="space-y-6">
            <div className="flex justify-between" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  disabled={timeLeft <= 0}
                  className={`w-12 h-12 text-center rounded-lg text-white text-xl outline-none transition-colors duration-200
                    ${error ? "border-red-500" : "border-gray-600"} bg-gray-700 focus:border-blue-500`}
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}

            <Button
              type="submit"
              variant="outline"
              className="mx-auto mt-5 w-full sm:w-72"
              disabled={loading || timeLeft <= 0}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <p className="text-center text-gray-400 mt-4">
              Didn’t get OTP?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                className="text-blue-400 hover:underline"
              >
                Resend {resendTimer > 0 && `(${resendTimer}s)`}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
