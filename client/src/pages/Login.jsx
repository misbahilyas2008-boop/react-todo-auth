import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../Components/InputField/InputField";
import Button from "../Components/Button/Button";
import useLogin from "../hooks/useLogin";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function Login() {
  const { formData, errors, apiError, loading, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <ToastContainer
        position="top-right"
        autoClose={7000}  // 7 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x blur opacity-75"></div>
        <div className="relative z-10 bg-gray-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>

          <form onSubmit={(e) => handleSubmit(e, toast)} className="space-y-4">
            <InputField
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              leftIcon={<AiOutlineMail />}
            />

            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              leftIcon={<AiOutlineLock />}
              rightIcon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              onRightIconClick={() => setShowPassword(prev => !prev)}
            />

            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

            <Link
              to="/forgot-password"
              className="text-left text-blue-400 cursor-pointer mt-2 hover:underline block"
            >
              Forgot password?
            </Link>

            <Button
              type="submit"
              variant="outline"
              className={`mx-auto mt-4 w-full sm:w-72 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
