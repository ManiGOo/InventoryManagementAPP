import { motion } from "framer-motion";
import { Trash2, X, Plus } from "lucide-react";

function UserCategories({
  onClose,
  userCategories,
  onDeleteCategory,
  onAddCategory,
  newCategoryName,
  setNewCategoryName,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <h2 className="text-2xl font-bold text-white">My Categories</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-full transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Add new category */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category"
          className="px-3 py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 flex-1 transition"
        />
        <button
          onClick={onAddCategory}
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-xl text-white font-medium flex items-center space-x-2 shadow-md transition"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>

      {/* Category list */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {userCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg">No categories yet</p>
            <p className="text-sm text-gray-400">Add one to get started!</p>
          </div>
        ) : (
          userCategories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center bg-gray-800 hover:bg-gray-750 p-3 rounded-xl shadow-sm transition"
            >
              <span className="text-white font-medium truncate">{cat.name}</span>
              <button
                onClick={() => onDeleteCategory(cat.id)}
                className="bg-purple-600 hover:bg-red-700 text-white p-2 rounded-lg flex-shrink-0 shadow-md transition"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default UserCategories;
