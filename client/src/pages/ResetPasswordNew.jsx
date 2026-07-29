import React from "react";
import InputField from "../Components/InputField/InputField";
import Button from "../Components/Button/Button";
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useResetPasswordNew from "../hooks/useResetPasswordNew";

export default function ResetPasswordNew() {
  const { password, confirmPassword, setPassword, setConfirmPassword, error, loading, handleSubmit } = useResetPasswordNew();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Set New Password</h2>

          <form onSubmit={(e) => handleSubmit(e, toast)} className="space-y-4">
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<AiOutlineLock />}
              rightIcon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              onRightIconClick={() => setShowPassword(prev => !prev)}
              error={error}
            />

            <InputField
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<AiOutlineLock />}
              rightIcon={showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              onRightIconClick={() => setShowConfirm(prev => !prev)}
              error={error}
            />

            <Button
              type="submit"
              variant="outline"
              className={`mx-auto w-full sm:w-76 mt-1 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
