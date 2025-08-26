import ItemCard from '../common/ItemCard.jsx';

function ItemList({ items, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {items.length ? (
        items.map(item => <ItemCard key={item.id} item={item} onDelete={onDelete} />)
      ) : (
        <p className="text-gray-500">No items in this category</p>
      )}
    </div>
  );
}

export default ItemList;