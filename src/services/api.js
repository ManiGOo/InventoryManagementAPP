// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

if (!API_URL) console.error("VITE_API_URL is not defined in .env");

// Axios instance with cookies
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ⚠ automatically send HTTP-only cookies
});

// ===== Auth =====
export const signup = async (username, email, password) => {
  try {
    const res = await api.post("/auth/signup", { username, email, password });
    return res.data; // { user, message }
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const login = async (identifier, password) => {
  try {
    const res = await api.post("/auth/login", { loginInput: identifier, password });
    return res.data; // { user, message }
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout"); // backend clears cookie
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me"); // cookie sent automatically
    return res.data.user;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ===== Categories =====
export const getCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createCategory = async (name) => {
  try {
    const res = await api.post("/categories", { name });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ===== Items =====
export const getItems = async () => {
  try {
    const res = await api.get("/items");
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getItemById = async (id) => {
  try {
    const res = await api.get(`/items/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createItem = async (itemData) => {
  try {
    const res = await api.post("/items", itemData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    const res = await api.put(`/items/${id}`, itemData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteItem = async (id) => {
  try {
    await api.delete(`/items/${id}`);
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ===== Related Items =====
export const getRelatedItems = async (id) => {
  try {
    const res = await api.get(`/related-items/${id}/related`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createRelatedItem = async (item_id, related_item_id) => {
  try {
    await api.post("/related-items", { item_id, related_item_id });
  } catch (err) {
    throw err.response?.data || err;
  }
};

export default api;
