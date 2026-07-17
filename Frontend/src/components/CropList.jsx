import CropCard from "./CropCard";

function CropList({ crops, fetchMyCrops }) {
  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        My Crops
      </h2>

      {crops.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-xl text-gray-500">
            No Crops Added Yet
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {crops.map((crop) => (
            <CropCard
              key={crop._id}
              crop={crop}
              fetchMyCrops={fetchMyCrops}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default CropList;