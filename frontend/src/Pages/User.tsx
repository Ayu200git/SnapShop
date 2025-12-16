import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../serviceProvider/slices/userSlice";
import type { User } from "../types/user";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { list: users, loading, error } = useAppSelector((state) => state.users);

  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    username: "",
    email: "",
    password: "",
  });
  const [editUserId, setEditUserId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email) return;
    dispatch(createUser(newUser));
    setNewUser({ username: "", email: "", password: "" });
  };

  const handleUpdateUser = () => {
    if (editUserId === null) return;
    dispatch(updateUser({ id: editUserId, ...newUser }));
    setEditUserId(null);
    setNewUser({ username: "", email: "", password: "" });
  };

  const handleDeleteUser = (id: number | undefined) => {
    if (id !== undefined) {
      dispatch(deleteUser(id));
      if (editUserId === id) {
        setEditUserId(null);
        setNewUser({ username: "", email: "", password: "" });
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8 container-xl">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        {editUserId !== null ? (
          <button
            onClick={handleUpdateUser}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        )}
      </div>

      <div className="space-y-2">
        {users.length === 0 && <p className="text-gray-500">No users found.</p>}
        {users.map((user) => (
          <div
            key={user.id ?? user.username} 
            className="flex items-center justify-between border p-2 rounded"
          >
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (user.id !== undefined) {
                    setEditUserId(user.id);
                    setNewUser({
                      username: user.username,
                      email: user.email,
                      password: "",
                    });
                  }
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
