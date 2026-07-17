const Auction = require("../models/auction");
const Crop = require("../models/crop");
const createAuction = async (req, res) => {
  try {
    const { crop, startPrice } = req.body;

    const cropData = await Crop.findById(crop).populate("auction");

    if (!cropData) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    if (cropData.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can create an auction only for your own crop",
      });
    }

    // Allow only one ACTIVE auction
    if (
      cropData.auction &&
      cropData.auction.status === "active"
    ) {
      return res.status(400).json({
        success: false,
        message: "Auction is already running.",
      });
    }

   const endTime = new Date(
  Date.now() + 5 * 60 * 1000
); // 5 minutes

const auction = await Auction.create({
  crop,
  startPrice,
  currentHighestBid: startPrice,

  startTime: new Date(),

  // Auction ends after 2 minutes
  endTime: new Date(Date.now() + 2 * 60 * 1000),
});        

    cropData.auction = auction._id;
    await cropData.save();

    res.status(201).json({
      success: true,
      message: "Auction Created Successfully",
      data: auction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getActiveAuctions = async (req, res) => {
  try {

    const auctions = await Auction.find({
      status: "active",
    })
      .populate({
        path: "crop",
        populate: {
          path: "farmer",
          select: "fullName",
        },
      })
      .populate("highestBidder", "fullName");

    res.status(200).json({
      success: true,
      count: auctions.length,
      data: auctions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const endAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findById(auctionId)
      .populate("highestBidder", "fullName email")
      .populate("crop");

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    if (auction.status === "ended") {
      return res.status(400).json({
        success: false,
        message: "Auction already ended",
      });
    }

    // End auction
    auction.status = "ended";
    await auction.save();

    // Remove auction reference from crop
    await Crop.findByIdAndUpdate(
      auction.crop._id,
      {
        auction: null,
      }
    );

    res.status(200).json({
      success: true,
      message: "Auction Ended Successfully",
      winner: auction.highestBidder,
      highestBid: auction.currentHighestBid,
      auction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAuctionResults = async (req, res) => {
  try {
    const auctions = await Auction.find({
      status: "ended",
    })
      .populate("crop")
      .populate("highestBidder", "fullName email");

    res.status(200).json({
      success: true,
      data: auctions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createAuction,
  getActiveAuctions,
  endAuction,
  getAuctionResults,
};