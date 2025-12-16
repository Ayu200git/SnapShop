import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../serviceProvider/store";
import { buttonClass } from "../theme";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    password: "",
  });
  const [photo, setPhoto] = useState(defaultAvatar);

  const [orders] = useState([
    { id: "ORD12345", date: "2025-11-02", total: 249.99, status: "Delivered" },
    { id: "ORD12346", date: "2025-11-04", total: 89.49, status: "In Transit" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleSave = () => {
    alert("✅ Profile updated successfully (demo)");
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">👤 My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={photo}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover mb-3"
        />
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <button onClick={handleSave} className={`${buttonClass("primary")} w-full`}>
          Save Changes
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">🛒 Past Orders</h3>
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg flex justify-between items-center shadow-sm"
              >
                <div>
                  <p className="font-medium">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      order.status === "Delivered" ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No past orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
