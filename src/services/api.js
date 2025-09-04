import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

if (!API_URL) {
  console.error("VITE_API_URL is not defined in .env");
}

// Create axios instance to avoid repeating config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🔑 required for sessions
});

// ===== Items =====
export const getItems = async () => {
  const res = await api.get("/items");
  return res.data;
};

export const getItemById = async (id) => {
  const res = await api.get(`/items/${id}`);
  return res.data;
};

export const createItem = async (itemData) => {
  const res = await api.post("/items", itemData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateItem = async (id, itemData) => {
  const res = await api.put(`/items/${id}`, itemData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteItem = async (id) => {
  await api.delete(`/items/${id}`);
};

// ===== Related Items =====
export const getRelatedItems = async (id) => {
  const res = await api.get(`/related-items/${id}/related`);
  return res.data;
};

export const createRelatedItem = async (item_id, related_item_id) => {
  await api.post("/related-items", { item_id, related_item_id });
};

// ===== Categories =====
export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const createCategory = async (name) => {
  const res = await api.post("/categories", { name });
  return res.data;
};

export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};

// ===== Auth =====
export const signup = async (username, email, password) => {
  const res = await api.post("/auth/signup", { username, email, password });
  return res.data;
};

export const login = async (loginInput, password) => {
  // ✅ match backend LocalStrategy expects { loginInput, password }
  const res = await api.post("/auth/login", { loginInput, password });
  return res.data;
};

export const logout = async () => {
  // ✅ backend uses GET /auth/logout
  await api.get("/auth/logout");
};

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
