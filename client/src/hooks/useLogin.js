import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { loginUser, setAuthToken } from "../api/axios";

export default function useLogin() {
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return value ? "" : "Email cannot be empty";
      case "password":
        return value ? "" : "Password cannot be empty";
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

    setLoading(true);
    setApiError("");

    try {
      const res = await loginUser(formData.email, formData.password);
      const { user, accessToken } = res.data;

      // ✅ Save token + set header
      setAuthToken(accessToken);
      setUser(user);
      setIsAuth(true);

      toast.success("🎉 Login successful!", { autoClose: 7000 });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";
      setApiError(message);
      toast.error(message, { autoClose: 7000 });
    } finally {
      setLoading(false);
    }
  };

  return { formData, errors, apiError, loading, handleChange, handleSubmit };
}
