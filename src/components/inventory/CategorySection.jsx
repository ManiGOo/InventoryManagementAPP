import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemForm from "../common/ItemForm.jsx";
import ItemList from "./ItemList.jsx"; // ✅ using ItemList now
import { getItems, createItem, deleteItem, updateItem } from "../../services/api"; 
import { toast } from "react-toastify";

function CategorySection({ category, isOpen, toggle }) {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch items whenever accordion is opened
  useEffect(() => {
    if (!isOpen) return;

    const fetchItems = async () => {
      setLoadingItems(true);
      try {
        const allItems = await getItems();
        setItems(allItems.filter((item) => item.category_id === category.id));
      } catch {
        toast.error("Failed to load items");
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [category.id, isOpen]);

  // Add item
  const handleCreateItem = async (formData) => {
    try {
      const newItem = await createItem(formData);
      setItems((prev) => [...prev, newItem]);
      toast.success("Item added");
    } catch {
      toast.error("Failed to add item");
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    setDeletingId(id);
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    } finally {
      setDeletingId(null);
    }
  };

  // Edit item
  const handleEditItem = async (id, updatedData) => {
    try {
      const updated = await updateItem(id, updatedData);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
      toast.success("Item updated");
    } catch {
      toast.error("Failed to update item");
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-md overflow-hidden w-full">
      {/* Category Header */}
      <button
        onClick={toggle}
        className="w-full px-6 py-4 flex justify-between items-center font-semibold text-lg text-white hover:bg-gray-700 transition"
      >
        {category.name}
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 space-y-6"
          >
            {/* Add Item Form */}
            <ItemForm category_id={category.id} onSubmit={handleCreateItem} />

            {/* Item List with Skeletons */}
            <ItemList
              items={items}
              onDelete={handleDeleteItem}
              loading={loadingItems}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CategorySection;
