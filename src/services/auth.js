import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

if (!API_URL) console.error("VITE_API_URL is not defined in .env");

// Signup
export const signup = async (username, email, password) => {
  const res = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
  const { token, user } = res.data;
  if (token) localStorage.setItem("token", token); // store JWT
  return { user, token };
};

// Login
export const login = async (identifier, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { loginInput: identifier, password });
  const { token, user } = res.data;
  if (token) localStorage.setItem("token", token);
  return { user, token };
};

// Logout
export const logout = async () => {
  localStorage.removeItem("token"); // remove JWT
};

// Get current user
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const res = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
