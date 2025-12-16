import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import { useAppSelector as useAuthSelector } from "../serviceProvider/hook";
import {
  fetchCarts,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  updateCartItemAPI,
  removeFromCartAPI,
  addToCartAPI,
  clearCartAPI,
} from "../serviceProvider/slices/cartSlice";
import { buttonClass } from "../theme";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCarts());
    }
  }, [dispatch, isAuthenticated]);

  const handleIncrement = async (item: any) => {
    if (isAuthenticated) {
      const productId = typeof item.id === 'string' ? item.id : item.id.toString();
      await dispatch(updateCartItemAPI({ productId, quantity: item.quantity + 1 }));
    } else {
      dispatch(incrementQuantity(item.id));
    }
  };

  const handleDecrement = async (item: any) => {
    if (isAuthenticated) {
      const productId = typeof item.id === 'string' ? item.id : item.id.toString();
      if (item.quantity === 1) {
        await dispatch(removeFromCartAPI(productId));
      } else {
        await dispatch(updateCartItemAPI({ productId, quantity: item.quantity - 1 }));
      }
    } else {
      if (item.quantity === 1) {
        dispatch(removeFromCart(item.id));
      } else {
        dispatch(decrementQuantity(item.id));
      }
    }
  };

  const handleRemove = async (item: any) => {
    if (isAuthenticated) {
      const productId = typeof item.id === 'string' ? item.id : item.id.toString();
      await dispatch(removeFromCartAPI(productId));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleClearCart = async () => {
    if (isAuthenticated) {
      await dispatch(clearCartAPI());
    } else {
      dispatch(clearCart());
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (items.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="p-8 container-xl">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between surface rounded-xl px-4 py-3 hover:bg-gray-50"
          >
            <div
              className="flex items-center space-x-4 flex-1 cursor-pointer"
              onClick={() => navigate(`/products/${item.id}`)}
            >
              <img src={item.image} alt={item.title} className="w-16 h-16" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p>
                  ${item.price} × {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mr-0.5">
              <button
                onClick={() => handleDecrement(item)}
                className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-300"
              >
                –
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => handleIncrement(item)}
                className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleRemove(item)}
              className={`${buttonClass("danger")} m-0.5`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 border-t pt-4 gap-2">
        <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleClearCart}
            className={buttonClass("danger")}
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate(`/checkout`)}
            className={buttonClass("primary")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
