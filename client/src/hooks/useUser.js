import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../api/axios";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile();
      setUser(res.data.data || res.data); // depending on backend
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUser = async (data) => {
    try {
      const res = await updateUserProfile(data);
      setUser(res.data.data || res.data);
      return true;
    } catch (err) {
      console.error("Failed to update user:", err);
      setError(err);
      return false;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, fetchUser, updateUser };
};
