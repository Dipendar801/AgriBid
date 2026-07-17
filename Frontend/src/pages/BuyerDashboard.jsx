import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaLeaf,
  FaSignOutAlt,
  FaUserCircle,
  FaMapMarkerAlt,
  FaWeightHanging,
  FaRupeeSign,
  FaGavel,
  FaHistory,
} from "react-icons/fa";

import BidHistory from "../components/BidHistory";

function BuyerDashboard() {
  const navigate = useNavigate();

  const [auctions, setAuctions] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [selectedAuction, setSelectedAuction] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAuctions = async () => {
    try {
      const res = await api.get("/bids/live");
      setAuctions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuctions();

    const interval = setInterval(() => {
      fetchAuctions();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBid = async (auctionId) => {
    try {
      await api.post(
        "/bids/place",
        {
          auctionId,
          bidAmount: Number(bidAmounts[auctionId]),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Bid Placed Successfully");

      fetchAuctions();

    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
  <div className="min-h-screen bg-slate-50">

    {/* Navbar */}

    <div className="bg-white border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo */}

        <div className="flex items-center gap-4">

          <div className="bg-green-700 w-14 h-14 rounded-2xl flex justify-center items-center shadow">

            <FaLeaf
              className="text-white"
              size={26}
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-green-700">
              AgriBid
            </h1>

            <p className="text-gray-500">
              Smart Agriculture Bidding Platform
            </p>

          </div>

        </div>

        {/* User */}

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-3">

            <FaUserCircle
              className="text-green-700"
              size={42}
            />

            <div>

              <h2 className="font-bold text-gray-800">
                {user?.fullName}
              </h2>

              <p className="text-gray-500 capitalize">
                {user?.role}
              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </div>

    {/* Heading */}

    <div className="max-w-7xl mx-auto px-8 py-10">

      <h1 className="text-4xl font-bold text-gray-800">

        Welcome,

        <span className="text-green-700">
          {" "}
          {user?.fullName}
        </span>

      </h1>

      <p className="text-gray-500 mt-3 text-lg">

        Browse active crop auctions and place competitive bids on fresh crops from farmers.

      </p>

    </div>

    {/* Cards */}

    <div className="max-w-7xl mx-auto px-8 pb-12">

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {auctions.map((auction) => (

            <div
              key={auction._id}
             className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              <img
                src={
                  auction.crop.image ||
                  "https://via.placeholder.com/500x300"
                }
                alt={auction.crop.cropName}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {auction.crop.cropName}
                </h2>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center gap-3">

                    <FaWeightHanging className="text-green-700" />

                    <span>
                      {auction.crop.quantity} Kg
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <FaMapMarkerAlt className="text-green-700" />

                    <span>
                      {auction.crop.location}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <FaRupeeSign className="text-green-700" />

                    <span className="font-semibold">
                      Current Highest Bid
                    </span>

                  </div>

                  <h2 className="text-3xl font-bold text-green-700">
                    ₹ {auction.currentHighestBid}
                  </h2>

                  <div>

                    <p className="text-gray-500">
                      Highest Bidder
                    </p>

                    <h3 className="font-semibold mt-1">
                      {auction.highestBidder
                        ? auction.highestBidder.fullName
                        : "No Bids Yet"}
                    </h3>

                  </div>
                                    <input
                    type="number"
                    placeholder="Enter Your Bid Amount"
                    value={bidAmounts[auction._id] || ""}
                    onChange={(e) =>
                      setBidAmounts({
                        ...bidAmounts,
                        [auction._id]: e.target.value,
                      })
                    }
                   className="w-full border border-gray-300 rounded-2xl p-4 mt-6 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-700 transition"
                  />

                  <button
                    onClick={() => handleBid(auction._id)}
                    disabled={
                      !bidAmounts[auction._id] ||
                      Number(bidAmounts[auction._id]) <=
                        auction.currentHighestBid
                    }
                  className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold mt-5 flex justify-center items-center gap-2 transition-all duration-300"
                  >
                    <FaGavel />
                    Place Bid
                  </button>

                  <button
                    onClick={() =>
                      setSelectedAuction(auction._id)
                    }
                    className="w-full bg-white border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white py-4 rounded-2xl font-semibold mt-3 flex justify-center items-center gap-2 transition-all duration-300"
                  >
                    <FaHistory />
                    View Bid History
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {selectedAuction && (
        <BidHistory
          auctionId={selectedAuction}
          onClose={() => setSelectedAuction(null)}
        />
      )}

    </div>
  );
}

export default BuyerDashboard;