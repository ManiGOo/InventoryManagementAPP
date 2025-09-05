import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Trash2, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

function ItemCard({ item, onDelete }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isOwner = user && (user.id === item.user_id || user.id === item.userId);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl shadow-md overflow-hidden backdrop-blur-sm border border-gray-700 flex flex-col"
    >
      {/* Image */}
      {item.image_url && (
        <div className="relative">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-44 object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Info */}
        <div>
          <h2 className="text-lg font-semibold text-white truncate">
            {item.name}
          </h2>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {item.description}
          </p>
          <p className="text-emerald-400 font-bold mt-3 text-lg">
            ${item.price}
          </p>
        </div>

        {/* Actions (owner only) */}
        {isOwner && (
          <div className="mt-4 flex gap-3">
            {/* Edit */}
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 10px rgba(59,130,246,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/dashboard/edit/${item.id}`)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white text-sm font-medium"
            >
              <Edit3 size={16} /> Edit
            </motion.button>

            {/* Delete */}
            <motion.button
              whileHover={{
                scale: 1.08,
                rotate: [-2, 2, -2, 0],
                boxShadow: "0px 0px 10px rgba(251,191,36,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => onDelete(item.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-white text-sm font-medium"
            >
              <Trash2 size={16} /> Delete
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ItemCard;
