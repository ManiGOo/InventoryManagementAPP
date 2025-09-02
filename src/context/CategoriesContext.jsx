import { createContext, useContext, useState, useEffect } from "react";
import { getCategories, createCategory as apiCreateCategory, deleteCategory as apiDeleteCategory } from "../services/api";
import { toast } from "react-toastify";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const addCategory = async (name) => {
    if (!name.trim()) return null;
    try {
      const newCat = await apiCreateCategory(name.trim());
      setCategories(prev => [...prev, newCat]); // ✅ update state here
      toast.success("Category added");
      return newCat;
    } catch {
      toast.error("Failed to add category");
      return null;
    }
  };

  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await apiDeleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id)); // ✅ update state here
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <CategoriesContext.Provider value={{ categories, loading, addCategory, removeCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
