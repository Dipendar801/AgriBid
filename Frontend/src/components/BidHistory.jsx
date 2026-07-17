import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaHistory,
  FaUser,
  FaRupeeSign,
  FaClock,
  FaTimes,
} from "react-icons/fa";

function BidHistory({ auctionId, onClose }) {
  const [bids, setBids] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/bids/history/${auctionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBids(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-green-700 text-white px-8 py-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FaHistory size={24} />

            <h2 className="text-2xl font-bold">
              Bid History
            </h2>

          </div>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-200 transition"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 max-h-screen overflow-y-auto">

          {bids.length === 0 ? (

            <div className="text-center py-12">

              <h3 className="text-2xl font-bold text-gray-700">
                No Bids Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Buyers haven't placed any bids for this auction.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {bids.map((bid, index) => (

                <div
                  key={bid._id}
                  className={`rounded-2xl border p-5 flex justify-between items-center transition hover:shadow-md ${
                    index === 0
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >

                  <div>

                    <div className="flex items-center gap-2">

                      <FaUser className="text-green-700" />

                      <h3 className="font-bold text-lg">
                        {bid.buyer.fullName}
                      </h3>

                      {index === 0 && (
                        <span className="bg-green-700 text-white text-xs px-3 py-1 rounded-full">
                          Highest Bid
                        </span>
                      )}

                    </div>

                    <div className="flex items-center gap-2 text-gray-500 mt-2">

                      <FaClock />

                      <span>
                        {new Date(bid.createdAt).toLocaleString()}
                      </span>

                    </div>

                  </div>

                  <div className="text-2xl font-bold text-green-700 flex items-center gap-1">

                    <FaRupeeSign />

                    {bid.bidAmount}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default BidHistory;