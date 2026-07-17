import { FaLeaf, FaGavel } from "react-icons/fa";

function StatsCards({ crops }) {
  const totalCrops = crops.length;

  const activeAuctions = crops.filter(
    (crop) => crop.auction && crop.auction.status === "active"
  ).length;

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">

      {/* Total Crops */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-8">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-gray-500 text-lg font-medium">
              Total Crops
            </p>

            <h1 className="text-6xl font-bold text-green-700 mt-4">
              {totalCrops}
            </h1>

            <p className="text-gray-400 mt-4">
              Crops uploaded by you
            </p>

          </div>

          <div className="bg-green-100 w-18 h-18 rounded-2xl flex justify-center items-center">

            <FaLeaf
              className="text-green-700"
              size={34}
            />

          </div>

        </div>

      </div>

      {/* Active Auctions */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-8">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-gray-500 text-lg font-medium">
              Active Auctions
            </p>

            <h1 className="text-6xl font-bold text-blue-700 mt-4">
              {activeAuctions}
            </h1>

            <p className="text-gray-400 mt-4">
              Currently running auctions
            </p>

          </div>

          <div className="bg-blue-100 w-18 h-18 rounded-2xl flex justify-center items-center">

            <FaGavel
              className="text-blue-700"
              size={34}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default StatsCards;