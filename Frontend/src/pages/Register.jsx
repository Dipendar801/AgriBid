import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "farmer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", formData);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-green-700 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center mb-5">

          <div className="bg-green-100 p-5 rounded-full">

            <FaLeaf
              className="text-green-700"
              size={34}
            />

          </div>

        </div>

        <h1 className="text-4xl font-bold text-center text-green-700">
          AgriBid
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create Your Account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="flex items-center border rounded-2xl px-4">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-4 outline-none"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border rounded-2xl px-4">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-4 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border rounded-2xl px-4">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-4 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border rounded-2xl px-4">
            <FaPhone className="text-gray-400" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-4 outline-none"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border rounded-2xl px-4">
            <FaMapMarkerAlt className="text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full p-4 outline-none"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4 outline-none"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;