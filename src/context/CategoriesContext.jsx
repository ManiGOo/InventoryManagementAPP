// src/contexts/CategoriesContext.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  getCategories,
  createCategory as apiCreateCategory,
  deleteCategory as apiDeleteCategory,
} from "../services/api";
import { toast } from "react-toastify";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // cookies sent automatically
        setCategories(data);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Add a new category
  const addCategory = async (name) => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    try {
      const newCat = await apiCreateCategory(trimmed);
      setCategories((prev) => [...prev, newCat]);
      toast.success("Category added");
      return newCat;
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add category");
      return null;
    }
  };

  // 🔹 Remove category
  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return false;

    try {
      await apiDeleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete category");
      return false;
    }
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, loading, addCategory, removeCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

// Custom hook for easier consumption
export const useCategories = () => useContext(CategoriesContext);
