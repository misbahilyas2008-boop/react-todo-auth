import axios from "axios";

// ----------------- CREATE AXIOS INSTANCE -----------------
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ----------------- REQUEST INTERCEPTOR -----------------
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------- RESPONSE INTERCEPTOR -----------------
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await API.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);
        API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return API(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ----------------- AUTH API -----------------
export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });
export const registerUser = (name, email, password) =>
  API.post("/auth/register", { name, email, password });
export const verifyAccountOtp = (email, otp) =>
  API.post("/auth/verify-account-otp", { email, otp });
export const resendAccountOtp = (email) =>
  API.post("/auth/resend-account-otp", { email });
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });
export const resendResetOtp = (email) =>
  API.post("/auth/resend-reset-otp", { email });
export const verifyResetOtp = (email, otp) =>
  API.post("/auth/verify-reset-otp", { email, otp });
export const resetPassword = (email, otp, password) =>
  API.post("/auth/reset-password", { email, otp, password });

// ----------------- USER API -----------------
export const getUserProfile = () => API.get("/user/profile");
export const updateUserProfile = (data) => API.put("/user/profile", data);

// ----------------- TODOS API -----------------
export const getTodos = (filters) => API.get("/todos", { params: filters });
export const createTodo = (data) => API.post("/todos", data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const reorderTodos = (todos) => API.put("/todos/reorder", { todos });

// ----------------- HELPER -----------------
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("accessToken", token);
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("accessToken");
  }
};

export default API;
