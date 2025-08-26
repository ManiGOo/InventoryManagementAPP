import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL is not defined in .env');
}

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { username, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });
    return res.data.user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
};

export const getCurrentUser = async () => {
  const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
  return res.data.user;
};