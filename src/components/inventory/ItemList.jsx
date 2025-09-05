import { motion, AnimatePresence } from "framer-motion";
import ItemCard from "../common/ItemCard.jsx";

function ItemList({ items, onDelete, loading = false }) {
  // Skeleton placeholder (for loading state)
  const SkeletonCard = () => (
    <div className="bg-gray-800 rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="h-40 w-full bg-gray-700"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );

  // Show skeletons when loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <p className="text-gray-500 italic mt-6 text-center">
        No items available in this category.
      </p>
    );
  }

  // Render actual items
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ItemCard item={item} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default ItemList;
