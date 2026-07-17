import { useState } from "react";
import api from "../services/api";

function UploadCrop() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [basePrice, setBasePrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
       "/api/crops/add",
        {
          cropName,
          quantity,
          basePrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setCropName("");
      setQuantity("");
      setBasePrice("");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Upload Crop 🌾</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Crop Name"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Base Price"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Upload Crop
        </button>

      </form>
    </div>
  );
}

export default UploadCrop;