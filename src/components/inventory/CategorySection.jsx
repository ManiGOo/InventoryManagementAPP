import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ItemList from './ItemList.jsx';
import ItemForm from '../common/ItemForm.jsx';
import { getItems, createItem } from '../../services/api';
import { toast } from 'react-toastify';

function CategorySection({ category, isOpen, toggle }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const allItems = await getItems();
        setItems(allItems.filter(item => item.category_id === category.id));
      } catch (err) {
        toast.error('Failed to load items');
      }
    }

    if (isOpen) fetchItems(); // only fetch when open
  }, [category.id, isOpen]);

  const handleCreateItem = async (formData) => {
    try {
      await createItem(formData);
      const allItems = await getItems();
      setItems(allItems.filter(item => item.category_id === category.id));
      toast.success('Item added');
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-md overflow-hidden">
      {/* Category header */}
      <button
        onClick={toggle}
        className="w-full px-6 py-4 flex justify-between items-center font-semibold text-lg text-white hover:bg-gray-700 transition"
      >
        {category.name}
        <span>{isOpen ? '−' : '+'}</span>
      </button>

      {/* Accordion content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 space-y-4"
          >
            <ItemForm category_id={category.id} onSubmit={handleCreateItem} />
            <ItemList items={items} onDelete={handleDeleteItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CategorySection;
