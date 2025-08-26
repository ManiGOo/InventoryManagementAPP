import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ItemCard({ item, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteItem(item.id);
      onDelete(item.id);
      toast.success("Item deleted");
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 text-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg flex flex-col"
    >
      {item.image_url && (
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
          alt={item.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
          loading="lazy"
        />
      )}

      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
      <p className="text-green-400 font-bold mt-3 text-lg">${item.price}</p>

      <div className="mt-5 flex space-x-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/dashboard/edit/${item.id}`)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          ✏️ Edit
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        >
          🗑️ Delete
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ItemCard;
