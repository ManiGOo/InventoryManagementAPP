import ItemCard from "../common/ItemCard.jsx";

function ItemList({ items, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-gray-400 italic mt-4">
        No items in this category
      </p>
    );
  }

  console.log("📦 ItemList received items:", items);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ItemList;
