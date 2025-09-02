import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL is not defined in .env');
}

export const getItems = async () => {
  const res = await axios.get(`${API_URL}/items`, { withCredentials: true });
  return res.data;
};

export const getItemById = async (id) => {
  const res = await axios.get(`${API_URL}/items/${id}`, { withCredentials: true });
  return res.data;
};

export const createItem = async (itemData) => {
  const res = await axios.post(`${API_URL}/items`, itemData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return res.data;
};

export const updateItem = async (id, itemData) => {
  const res = await axios.put(`${API_URL}/items/${id}`, itemData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return res.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/items/${id}`, { withCredentials: true });
};

export const getRelatedItems = async (id) => {
  const res = await axios.get(`${API_URL}/related-items/${id}/related`, { withCredentials: true });
  return res.data;
};

export const createRelatedItem = async (item_id, related_item_id) => {
  await axios.post(`${API_URL}/related-items`, { item_id, related_item_id }, { withCredentials: true });
};

export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`, { withCredentials: true });
  return res.data;
};

export const createCategory = async (name) => {
  const res = await axios.post(`${API_URL}/categories`, { name }, { withCredentials: true });
  return res.data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`${API_URL}/categories/${id}`, { withCredentials: true });
};

export const signup = async (username, email, password) => {
  const res = await axios.post(
    `${API_URL}/auth/signup`,
    { username, email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const login = async (identifier, password) => {
  // identifier = username OR email
  const res = await axios.post(
    `${API_URL}/auth/login`,
    { identifier, password },
    { withCredentials: true }
  );
  return res.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};

export const getCurrentUser = async () => {
  const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
  return res.data;
};