import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, login, signup, logout } from '../services/auth';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.log('No user session found:', err.response?.status);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const userData = await login(username, password);
      setUser(userData);
      toast.success('Logged in successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  const handleSignup = async (username, password) => {
    try {
      await signup(username, password);
      toast.success('Signed up successfully! Please log in.');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed');
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success('Logged out successfully!');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignup, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};