import { useEffect } from "react";
import { Users, Package, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import { fetchDashboardData } from "../serviceProvider/slices/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { usersCount, productsCount, cartCount, status, error } =
    useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const cardClass =
    "bg-white dark:bg-gray-800 p-5 rounded shadow hover:shadow-lg transition flex items-center gap-4 cursor-pointer";

  if (status === "loading") {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (status === "failed") {
    return <p className="p-6 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={cardClass} onClick={() => navigate("/users")}>
          <Users size={36} className="text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Users</p>
            <p className="text-xl font-semibold">{usersCount}</p>
          </div>
        </div>

        <div className={cardClass} onClick={() => navigate("/products")}>
          <Package size={36} className="text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <p className="text-xl font-semibold">{productsCount}</p>
          </div>
        </div>

        <div className={cardClass} onClick={() => navigate("/carts")}>
          <ShoppingCart size={36} className="text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Carts</p>
            <p className="text-xl font-semibold">{cartCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="p-4 bg-blue-600 text-white rounded text-center cursor-pointer hover:bg-blue-700"
          onClick={() => navigate("/user")}
        >
          Manage Users
        </div>
        <div
          className="p-4 bg-green-600 text-white rounded text-center cursor-pointer hover:bg-green-700"
          onClick={() => navigate("/manageproducts")}
        >
          Manage Products
        </div>
        <div
          className="p-4 bg-yellow-600 text-white rounded text-center cursor-pointer hover:bg-yellow-700"
          onClick={() => navigate("/managecart")}
        >
          Manage Carts
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
