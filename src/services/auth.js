// src/services/auth.js
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) console.error("VITE_API_URL is not defined in .env");

// Signup
export const signup = async (username, email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/auth/signup`,
      { username, email, password },
      { withCredentials: true }
    );
    return res.data; // usually some success message
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    throw err;
  }
};

// Login
export const login = async (identifier, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/auth/login`,
      { loginInput: identifier, password },
      { withCredentials: true }
    );
    return res.data; // return whole object, AuthContext will call /auth/me to fetch user
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

// Logout
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
    return res.data; // should be the user object from backend
  } catch (err) {
    console.error("Get current user error:", err.response?.data || err.message);
    throw err;
  }
};
