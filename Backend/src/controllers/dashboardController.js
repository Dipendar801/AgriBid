const Crop = require("../models/Crop");
const Auction = require("../models/Auction");

const farmerDashboard = async (req, res) => {
  try {
    const farmerId = req.user.id;

    const totalCrops = await Crop.countDocuments({ farmer: farmerId });

    const cropIds = await Crop.find({ farmer: farmerId }).select("_id");

    const ids = cropIds.map(crop => crop._id);

    const totalAuctions = await Auction.countDocuments({
      crop: { $in: ids }
    });

    const activeAuctions = await Auction.countDocuments({
      crop: { $in: ids },
      status: "active"
    });

    const endedAuctions = await Auction.countDocuments({
      crop: { $in: ids },
      status: "ended"
    });

    res.status(200).json({
      success: true,
      data: {
        totalCrops,
        totalAuctions,
        activeAuctions,
        endedAuctions,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  farmerDashboard,
};