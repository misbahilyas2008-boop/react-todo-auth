import React from "react";
import InputField from "../Components/InputField/InputField";
import Button from "../Components/Button/Button";
import { AiOutlineMail } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPassword() {
  const { email, error, loading, handleChange, handleSubmit } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000} // 5 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x blur opacity-75"></div>
        <div className="relative z-10 bg-gray-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Reset Password</h2>

          <form onSubmit={(e) => handleSubmit(e, toast)} className="space-y-4">
            <InputField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              error={error}
              leftIcon={<AiOutlineMail />}
            />

            <Button
              type="submit"
              variant="outline"
              className={`mx-auto w-full sm:w-76 mt-1 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
