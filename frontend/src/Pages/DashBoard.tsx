import { Link } from "react-router-dom";
import { useAppSelector } from "../serviceProvider/hook";
import { ShoppingCart, Heart, Package } from "lucide-react";
import { buttonClass } from "../theme";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const pastOrders = [
    { id: "ORD123", date: "2025-10-01", total: 249.99, status: "Delivered" },
    { id: "ORD124", date: "2025-10-25", total: 129.99, status: "Shipped" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Welcome, {user?.username || "User"} 👋</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-5 rounded-lg border flex items-center gap-4 bg-white dark:bg-gray-800 shadow text-white">
          <ShoppingCart size={28} className="text-blue-500" />
          <div>
            <p className="text-sm text-white-500">Cart Items</p>
            <h2 className="text-lg font-semibold">{cartItems.length}</h2>
          </div>
        </div>

        <div className="p-5 rounded-lg border flex items-center gap-4 bg-white dark:bg-gray-800 shadow text-white">
          <Heart size={28} className="text-pink-500" />
          <div>
            <p className="text-sm text-white-500">Wishlist</p>
            <h2 className="text-lg font-semibold">{wishlistItems.length}</h2>
          </div>
        </div>

        <div className="p-5 rounded-lg border flex items-center gap-4 bg-white dark:bg-gray-800 shadow text-white">
          <Package size={28} className="text-green-500" />
          <div>
            <p className="text-sm text-white-500">Past Orders</p>
            <h2 className="text-lg font-semibold">{pastOrders.length}</h2>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="flex flex-wrap gap-4 mb-10">
        <Link to="/products" className={buttonClass("primary")}>
          🛍️ Shop Products
        </Link>
        <Link to="/cart" className={buttonClass("secondary")}>
          🛒 View Cart
        </Link>
        <Link to="/wishlist" className={buttonClass("secondary")}>
          ❤️ Wishlist
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-3">Recent Orders</h2>
      <div className="space-y-3">
        {pastOrders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-900"
          >
            <div>
              <p className="font-medium text-yellow-100">Order ID: {order.id}</p>
              <p className="text-sm text-white">Date: {order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-white">${order.total}</p>
              <p
                className={`text-sm font-medium ${
                  order.status === "Delivered" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

