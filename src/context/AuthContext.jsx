import { createContext, useState, useEffect } from "react";
import { getCurrentUser, login, signup, logout } from "../services/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Re-fetch the current user from backend
  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      return userData;
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
      await login(identifier, password);
      const userData = await refreshUser(); // sync after login
      toast.success("Logged in successfully!");
      return userData;
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      toast.error(message);
      throw err;
    }
  };

  // 🔹 Signup
  const handleSignup = async (username, email, password) => {
    try {
      await signup(username, email, password);
      toast.success("Signed up successfully! Please log in.");
    } catch (err) {
      const message = err.response?.data?.error || "Signup failed";
      toast.error(message);
      throw err;
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await logout();
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
        refreshUser,   // <-- exposed to components
        handleLogin,
        handleSignup,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
