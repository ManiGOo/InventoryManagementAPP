import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { getItemById, updateItem } from "../services/api";
import ItemForm from "../components/common/ItemForm.jsx";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        toast.error("Failed to load item");
        navigate("/dashboard");
      } finally {
        setFetching(false);
      }
    }
    fetchItem();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      await updateItem(id, formData);
      toast.success("Item updated successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update item");
    }
  };

  if (loading || fetching)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-300">
        <p>Loading item...</p>
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
          to edit items.
        </p>
      </div>
    );

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Edit Item</h1>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-md">
        <ItemForm category_id={item.category_id} onSubmit={handleUpdate} initialData={item} />
      </div>
    </motion.div>
  );
}

export default EditItem;
