import React from "react";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../Components/InputField/InputField";
import Button from "../Components/Button/Button";
import useSignup from "../hooks/useSignup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function Signup() {
  const {
    formData,
    errors,
    apiError,
    loading,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  } = useSignup();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <ToastContainer />
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x blur opacity-75"></div>
        <div className="relative z-10 bg-gray-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-1 text-center text-white">Create Account</h2>
          <h5 className="text-center mb-6 text-lime-50">Create your account</h5>
          <form onSubmit={(e) => handleSubmit(e, toast)} className="space-y-4">
            <InputField
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              leftIcon={<AiOutlineUser />}
            />
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

            <Button
              type="submit"
              variant="outline"
              className={`mx-auto mt-2 w-full sm:w-76 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-gray-400 text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
