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
    <div className="bg-gradient-to-b from-gray-800/90 to-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all">
      {item.image_url && (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-48 object-cover bg-gray-900"
        />
      )}

      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Item info */}
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            {item.name}
          </h2>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {item.description}
          </p>
          <p className="text-emerald-400 font-bold mt-3 text-lg">
            ${item.price}
          </p>
        </div>

        {/* Owner actions */}
        {isOwner && (
          <div className="mt-5 p-2  rounded-xl flex gap-3 justify-around">
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0px 0px 12px rgba(59,130,246,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/dashboard/edit/${item.id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium"
            >
              <Edit3 size={16} /> Edit
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.08,
                rotate: [-3, 3, -3, 0], // wiggle effect
                boxShadow: "0px 0px 12px rgba(251,191,36,0.5)", // amber glow
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => onDelete(item.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium"
            >
              <Trash2 size={16} /> Delete
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
