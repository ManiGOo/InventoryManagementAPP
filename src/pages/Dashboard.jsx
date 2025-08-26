import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { getCategories } from "../services/api";
import CategorySection from "../components/inventory/CategorySection.jsx";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [openCategory, setOpenCategory] = useState(null); // track open category

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        toast.error("Failed to load categories");
      } finally {
        setFetching(false);
      }
    }
    fetchCategories();
  }, []);

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id); // open one at a time
  };

  if (loading || fetching)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-300">
        <p>Loading dashboard...</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-300">
        <p>
          Please{" "}
          <a href="/login" className="text-blue-400 underline">
            login
          </a>{" "}
          to view the dashboard.
        </p>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-gray-200 p-6 space-y-6"
    >
      <h1 className="text-4xl font-bold text-white mb-6">Inventory Dashboard</h1>

      <div className="space-y-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              isOpen={openCategory === category.id}
              toggle={() => toggleCategory(category.id)}
            />
          ))
        ) : (
          <p className="text-gray-400">No categories available.</p>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
