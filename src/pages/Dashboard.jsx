import { useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import CategorySection from "../components/inventory/CategorySection.jsx";
import UserCategories from "../components/common/UserCategories.jsx";
import { useCategories } from "../context/CategoriesContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/common/Navbar.jsx";

const NAV_HEIGHT = 64;

function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const { categories = [], loading: catLoading, addCategory, removeCategory } = useCategories();

  const [openCategory, setOpenCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showUserCategories, setShowUserCategories] = useState(false);

  const toggleCategory = (id) => setOpenCategory(openCategory === id ? null : id);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const newCat = await addCategory(newCategoryName.trim());
    if (newCat) {
      setOpenCategory(newCat.id);
      setNewCategoryName("");
      if (!showUserCategories) setShowUserCategories(true);
    }
  };

  const handleDeleteCategory = async (id) => {
    await removeCategory(id);
    if (openCategory === id) setOpenCategory(null);
  };

  const userCreatedCategories = useMemo(
    () => (Array.isArray(categories) ? categories.filter((cat) => cat.user_id) : []),
    [categories]
  );

  if (loading || catLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-300">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
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
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 pt-[80px] max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white mb-6">Inventory Dashboard</h1>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Categories</h2>
          {userCreatedCategories.length > 0 ? (
            <button
              onClick={() => setShowUserCategories((prev) => !prev)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white shadow-md transition"
            >
              {showUserCategories ? "Close Sidebar" : "My Categories"}
            </button>
          ) : (
            <button
              onClick={() => setShowUserCategories(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white shadow-md transition"
            >
              + Add Category
            </button>
          )}
        </div>

        {/* Category Accordions - vertical stack */}
        <div className="flex flex-col gap-4">
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
            <p className="text-gray-400 italic">No categories available.</p>
          )}
        </div>

        {/* Sidebar for user categories */}
        <AnimatePresence>
          {showUserCategories && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black"
                onClick={() => setShowUserCategories(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-gray-900 shadow-2xl flex flex-col rounded-l-2xl"
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <UserCategories
                    onClose={() => setShowUserCategories(false)}
                    userCategories={userCreatedCategories}
                    onDeleteCategory={handleDeleteCategory}
                    onAddCategory={handleAddCategory}
                    newCategoryName={newCategoryName}
                    setNewCategoryName={setNewCategoryName}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

export default Dashboard;
