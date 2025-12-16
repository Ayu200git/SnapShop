import React, { useState } from "react";
import type { CartItem } from "../types/cart";

export type ManageCartCardProps = {
  cart: CartItem;
  onUpdate: (cart: CartItem) => void;
  onDelete: () => void;
};

const ManageCartCard: React.FC<ManageCartCardProps> = ({ cart, onUpdate, onDelete }) => {
  const [editableCart, setEditableCart] = useState<CartItem>(cart);

  return (
    <div className="border p-4 rounded shadow flex flex-col gap-2">
      <input
        type="text"
        value={editableCart.title}
        onChange={(e) => setEditableCart({ ...editableCart, title: e.target.value })}
        className="border rounded px-2 py-1"
        placeholder="Product Name"
      />
      <input
        type="text"
        value={editableCart.image}
        onChange={(e) => setEditableCart({ ...editableCart, image: e.target.value })}
        className="border rounded px-2 py-1"
        placeholder="Image URL"
      />
      <input
        type="number"
        value={editableCart.quantity}
        onChange={(e) => setEditableCart({ ...editableCart, quantity: Number(e.target.value) })}
        className="border rounded px-2 py-1"
        placeholder="Quantity"
      />
      <input
        type="number"
        value={editableCart.price}
        onChange={(e) => setEditableCart({ ...editableCart, price: Number(e.target.value) })}
        className="border rounded px-2 py-1"
        placeholder="Price"
      />

      <div className="flex gap-2 mt-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={() => onUpdate(editableCart)}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManageCartCard;
