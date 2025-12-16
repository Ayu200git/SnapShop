import { useState } from "react";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: () => void;
};

const ManageProductCard = ({ product, onUpdate, onDelete }: ProductCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  return (
    <div className="border rounded p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 shadow">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedProduct.title}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, title: e.target.value })
            }
            className="border rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: Number(e.target.value) })
            }
            className="border rounded px-2 py-1 text-sm"
          />
          <input
            type="text"
            value={editedProduct.category}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, category: e.target.value })
            }
            className="border rounded px-2 py-1 text-sm"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-sm">{product.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Category: {product.category}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProductCard;
