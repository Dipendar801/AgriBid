import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function AuctionResults() {
  const [auctions, setAuctions] = useState([]);

  const token = localStorage.getItem("token");

  const fetchResults = async () => {
    try {
      const res = await api.get("/auctions/results", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAuctions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">🏆 Auction Results</h1>

        <Link
          to="/dashboard"
          className="bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          Dashboard
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <div key={auction._id} className="bg-white rounded-xl shadow-lg p-5">
            <img
              src={auction.crop.image || "https://via.placeholder.com/300"}
              className="w-full h-48 object-cover rounded-lg"
              alt={auction.crop.cropName}
            />

            <h2 className="text-2xl font-bold mt-4">{auction.crop.cropName}</h2>

            <p className="mt-2">
              Highest Bid :<strong> ₹{auction.currentHighestBid}</strong>
            </p>

            <p>
              Winner :
              <strong>
                {" "}
                {auction.highestBidder
                  ? auction.highestBidder.fullName
                  : "No Winner"}
              </strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionResults;
