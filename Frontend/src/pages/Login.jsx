import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLeaf, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

      if (response.data.data.role === "farmer") {
        navigate("/dashboard");
      } else {
        navigate("/buyer-dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-green-700 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-5 rounded-full">
            <FaLeaf className="text-green-700" size={34} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-green-700">
          AgriBid
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Smart Agriculture Bidding Platform
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="flex items-center border rounded-2xl px-4">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border rounded-2xl px-4">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;