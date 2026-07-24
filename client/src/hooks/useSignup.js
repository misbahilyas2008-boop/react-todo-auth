import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/axios";
import {
  validateEmail,
  validatePassword,
  validateFullName1To3Words,
} from "../utils/helper";

export default function useSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return validateFullName1To3Words(value)
          ? ""
          : "Enter 1-3 words, 2-25 letters each";
      case "email":
        return validateEmail(value) ? "" : "Enter a valid email";
      case "password":
        return validatePassword(value)
          ? ""
          : "Min 8 chars, 1 letter, 1 number, 1 special char";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e, toast) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      setLoading(true);
      setApiError("");

      const res = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );

      console.log("✅ Signup Response:", res.data);

      // Save OTP expiry if available
      if (res.data?.expiresAt) {
        localStorage.setItem("otpExpiry", res.data.expiresAt);
        console.log("💾 Saved OTP expiry in localStorage:", res.data.expiresAt);
      }

      // Show success toast
      toast.success(
        res.data.message || "Signup successful! OTP sent to your email."
      );

      // Delay redirect so user can see toast
      setTimeout(() => {
        navigate("/account-verification-otp", {
          state: { email: formData.email },
        });
      }, 2500); // 2.5 seconds delay

    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      setApiError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    apiError,
    loading,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
