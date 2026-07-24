import React, { createContext, useState, useEffect } from "react";
import {
  loginUser,
  setAuthToken,
  getUserProfile,
  default as API,
} from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // -------------------- FETCH USER PROFILE --------------------
  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile();
      // your backend sends profile inside res.data.data
      setUser(res.data.data || null);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setUser(null);
      setIsAuth(false);
      localStorage.removeItem("accessToken");
      throw err;
    }
  };

  // -------------------- REFRESH TOKEN --------------------
  const refreshTokenIfNeeded = async () => {
    try {
      const res = await API.post(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      );
      if (res?.data?.accessToken) {
        setAuthToken(res.data.accessToken);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Refresh token failed:", err);
      logout();
      return false;
    }
  };

  // -------------------- INITIALIZE AUTH --------------------
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAuthToken(token);
        try {
          await fetchUserProfile();
          setIsAuth(true);
        } catch (err) {
          if (err.response?.status === 401) {
            const refreshed = await refreshTokenIfNeeded();
            if (refreshed) {
              await fetchUserProfile();
              setIsAuth(true);
            } else {
              logout();
            }
          } else {
            logout();
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // -------------------- LOGIN --------------------
  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password);
      const { accessToken, user: loggedInUser } = res.data;

      if (!loggedInUser.isAccountVerified) {
        throw new Error("Account not verified. Please verify OTP first.");
      }

      if (accessToken) {
        setAuthToken(accessToken);
        setUser(loggedInUser);
        setIsAuth(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // -------------------- LOGOUT --------------------
  const logout = () => {
    setAuthToken(null);
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isAuth,
        loading,
        login,
        logout,
        setUser,
        setIsAuth,
        setAuthToken,
        refreshTokenIfNeeded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
