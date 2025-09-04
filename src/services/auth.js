// src/services/auth.js
import { api } from "../services/api";

// ===== Signup =====
export const signup = async (username, email, password) => {
  try {
    const res = await api.post("/auth/signup", { username, email, password });
    // backend sets HTTP-only cookie, no localStorage needed
    return res.data.user;
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    throw err;
  }
};

// ===== Login =====
export const login = async (identifier, password) => {
  try {
    const res = await api.post("/auth/login", { loginInput: identifier, password });
    // backend sets HTTP-only cookie
    return res.data.user;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

// ===== Logout =====
export const logout = async () => {
  try {
    await api.post("/auth/logout"); // clears cookie in backend
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err;
  }
};

// ===== Get current user =====
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me"); // sends cookie automatically
    return res.data.user;
  } catch (err) {
    console.error("Get current user error:", err.response?.data || err.message);
    throw err;
  }
};
