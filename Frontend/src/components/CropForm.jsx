import { useState } from "react";
import api from "../services/api";
import {
  FaLeaf,
  FaMapMarkerAlt,
  FaWeightHanging,
  FaRupeeSign,
} from "react-icons/fa";

function CropForm({ fetchMyCrops }) {
  const token = localStorage.getItem("token");

  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/crops/add",
        {
          cropName,
          quantity,
          basePrice,
          location,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("✅ Crop Added Successfully");

      setCropName("");
      setQuantity("");
      setBasePrice("");
      setLocation("");
      setImage("");

      fetchMyCrops();
    } catch (error) {
      console.log("FULL ERROR:", error);

      console.log("Response:", error.response);

      console.log("Data:", error.response?.data);

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Add New Crop</h2>

        <p className="text-gray-500 mt-2">
          Upload your crop details to start an auction and receive bids from
          buyers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Crop Name */}

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Crop Name
          </label>

          <div className="flex items-center border border-gray-300 rounded-2xl px-4 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition">
            <FaLeaf className="text-green-700 mr-3" />

            <input
              type="text"
              placeholder="e.g. Wheat"
              className="w-full py-4 outline-none bg-transparent"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Quantity */}

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Quantity (Kg)
          </label>

          <div className="flex items-center border border-gray-300 rounded-2xl px-4 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition">
            <FaWeightHanging className="text-green-700 mr-3" />

            <input
              type="number"
              placeholder="100"
              className="w-full py-4 outline-none bg-transparent"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Base Price */}

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Base Price (₹)
          </label>

          <div className="flex items-center border border-gray-300 rounded-2xl px-4 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition">
            <FaRupeeSign className="text-green-700 mr-3" />

            <input
              type="number"
              placeholder="1000"
              className="w-full py-4 outline-none bg-transparent"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Location */}

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Location
          </label>

          <div className="flex items-center border border-gray-300 rounded-2xl px-4 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition">
            <FaMapMarkerAlt className="text-green-700 mr-3" />

            <input
              type="text"
              placeholder="City / Village"
              className="w-full py-4 outline-none bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Image */}

        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-gray-700">
            Image URL (Optional)
          </label>

          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-2xl py-4 px-5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* Button */}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 active:scale-[0.99] text-white py-4 rounded-2xl text-lg font-semibold transition duration-300"
          >
            Upload Crop
          </button>
        </div>
      </form>
    </div>
  );
}

export default CropForm;
