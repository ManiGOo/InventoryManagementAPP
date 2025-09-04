// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentUser, login, signup, logout } from "../services/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Refresh user from backend (cookie-based)
  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  };

  // 🔹 Run once on mount
  useEffect(() => {
    (async () => {
      await refreshUser();
      setLoading(false);
    })();
  }, []);

  // 🔹 Login
  const handleLogin = async (identifier, password) => {
    try {
      const loggedInUser = await login(identifier, password); // cookie set by backend
      setUser(loggedInUser);
      toast.success("Logged in successfully!");
      return loggedInUser;
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      toast.error(message);
      throw err;
    }
  };

  // 🔹 Signup
  const handleSignup = async (username, email, password) => {
    try {
      const newUser = await signup(username, email, password); // cookie set by backend
      setUser(newUser);
      toast.success("Signed up and logged in!");
      return newUser;
    } catch (err) {
      const message = err.response?.data?.error || "Signup failed";
      toast.error(message);
      throw err;
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await logout(); // clears cookie on backend
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
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

export default AuthProvider;
