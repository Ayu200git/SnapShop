import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../serviceProvider/store';
import { removeFromWishlist, clearWishlist } from '../serviceProvider/slices/wishlistSlice';

const Wishlist: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return <div className="p-4 text-center">💤 Your wishlist is empty.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">My Wishlist</h2>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="text-sm text-red-500"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="border p-3 rounded flex flex-col justify-between">
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/products/${item.id}`)}
            >
              <img src={item.image} alt={item.title} className="w-full h-40 object-contain" />
              <h3 className="font-medium mt-2">{item.title}</h3>
              <p>${item.price}</p>
            </div>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => navigate(`/products/${item.id}`)}
                className="bg-blue-600 text-white text-sm py-1 px-2 rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="text-sm text-red-500 py-1 px-2 rounded border border-red-500 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

