import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

// Axios instance pointing to backend
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true, // important for sending session cookies
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Re-fetch the current user from backend
  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.log("No active session:", err.response?.status || err.message);
      setUser(null);
      return null;
    }
  };

  // 🔹 Check session on mount
  useEffect(() => {
    (async () => {
      await refreshUser();
      setLoading(false);
    })();
  }, []);

  // 🔹 Login (username OR email as identifier)
  const handleLogin = async (identifier, password) => {
    try {
      await api.post("/auth/login", { loginInput: identifier, password });
      const userData = await refreshUser(); // sync after login
      toast.success("Logged in successfully!");
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
      throw err;
    }
  };

  // 🔹 Signup
  const handleSignup = async (username, email, password) => {
    try {
      await api.post("/auth/signup", { username, email, password });
      toast.success("Signed up successfully! Please log in.");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      toast.error(message);
      throw err;
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        handleLogin,
        handleSignup,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
