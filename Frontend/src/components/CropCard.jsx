import api from "../services/api";
import {
  FaMapMarkerAlt,
  FaWeightHanging,
  FaRupeeSign,
  FaPlayCircle,
  FaCheckCircle,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

function CropCard({ crop, fetchMyCrops }) {
  const token = localStorage.getItem("token");

  const startAuction = async () => {
    try {
      await api.post(
        "/auctions/create",
        {
          crop: crop._id,
          startPrice: crop.basePrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Auction Started Successfully");

      fetchMyCrops();

    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const endAuction = async () => {
    try {
      await api.put(
        `/auctions/end/${crop.auction._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Auction Ended Successfully");

      fetchMyCrops();

    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const isAuctionRunning =
    crop.auction && crop.auction.status === "active";

 return (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

    {/* Image */}

    <div className="relative">

      <img
        src={
          crop.image ||
          "https://via.placeholder.com/500x300?text=Crop+Image"
        }
        alt={crop.cropName}
        className="w-full h-60 object-cover"
      />

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow">

        <FaLeaf className="text-green-700" />

        <span className="font-semibold text-green-700">
          Fresh Crop
        </span>

      </div>

    </div>

    {/* Body */}

    <div className="p-7">

      <h2 className="text-3xl font-bold text-gray-800">
        {crop.cropName}
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3 text-gray-600">

            <FaWeightHanging className="text-green-700" />

            <span>Quantity</span>

          </div>

          <span className="font-bold">
            {crop.quantity} Kg
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3 text-gray-600">

            <FaRupeeSign className="text-green-700" />

            <span>Base Price</span>

          </div>

          <span className="font-bold text-green-700">
            ₹ {crop.basePrice}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3 text-gray-600">

            <FaMapMarkerAlt className="text-green-700" />

            <span>Location</span>

          </div>

          <span className="font-semibold">
            {crop.location}
          </span>

        </div>

      </div>

      {/* Status */}

      <div className="mt-8">

        {isAuctionRunning ? (

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

            <FaCheckCircle />

            Auction Running

          </div>

        ) : (

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

            <FaPlayCircle />

            Ready For Auction

          </div>

        )}

      </div>

      {/* Button */}

      {!isAuctionRunning ? (

        <button
          onClick={startAuction}
          className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
        >

          Start Auction

          <FaArrowRight />

        </button>

      ) : (

        <button
          onClick={endAuction}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
        >

          End Auction

        </button>

      )}

    </div>

  </div>
);
}

export default CropCard;