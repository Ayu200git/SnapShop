import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import { fetchCarts, addToCart, updateCartItemAPI, clearCart } from "../serviceProvider/slices/cartSlice";
import ManageCartCard from "../components/manageCartCard";
import type { CartItem } from "../types/cart";

const ManageCarts = () => {
  const dispatch = useAppDispatch();
  const { items: carts, loading, error } = useAppSelector(state => state.cart);

  const [newCart, setNewCart] = useState<Omit<CartItem, "id">>({
    title: "",
    image: "",
    quantity: 1,
    price: 0,
  });

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const handleAddCart = () => {
    if (!newCart.title || !newCart.image || newCart.quantity <= 0 || newCart.price <= 0) return;

    dispatch(addToCart(newCart));
    setNewCart({ title: "", image: "", quantity: 1, price: 0 });
  };

  if (loading) return <p className="text-center mt-10">Loading carts...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4">Add New Cart Item</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={newCart.title}
          onChange={(e) => setNewCart({ ...newCart, title: e.target.value })}
          className="border rounded px-2 py-1 flex-1"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCart.image}
          onChange={(e) => setNewCart({ ...newCart, image: e.target.value })}
          className="border rounded px-2 py-1 flex-1"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newCart.quantity}
          onChange={(e) => setNewCart({ ...newCart, quantity: Number(e.target.value) })}
          className="border rounded px-2 py-1 w-24"
        />
        <input
          type="number"
          placeholder="Price"
          value={newCart.price}
          onChange={(e) => setNewCart({ ...newCart, price: Number(e.target.value) })}
          className="border rounded px-2 py-1 w-24"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={handleAddCart}
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {carts.length > 0 ? (
          carts.map((cart: CartItem) => (
            <ManageCartCard
              key={cart.id}
              cart={cart}
              onUpdate={(c) => dispatch(updateCartItemAPI(c))}
              onDelete={() => dispatch(clearCart())}
            />
          ))
        ) : (
          <p className="col-span-full text-gray-500">No carts found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageCarts;
