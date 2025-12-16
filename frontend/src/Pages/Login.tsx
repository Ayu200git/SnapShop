import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import { loginUser } from "../serviceProvider/slices/authSlice";
import { buttonClass } from "../theme";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return alert("Enter username and password");
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="surface rounded-2xl px-8 pt-8 pb-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center brand">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="input mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mb-4"
          required
        />
        <button type="submit" className={`${buttonClass("primary")} w-full`} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
