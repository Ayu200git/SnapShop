import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import { registerUser } from "../serviceProvider/slices/authSlice";
import { buttonClass } from "../theme";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/products"); 
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword)
      return alert("Fill all fields!");
    if (password !== confirmPassword) return alert("Passwords do not match");

    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="surface rounded-2xl px-8 pt-8 pb-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center brand">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="input mb-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mb-3"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input mb-4"
          required
        />
        <button type="submit" className={`${buttonClass("primary")} w-full`} disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
