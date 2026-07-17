const Bid = require("../models/Bid");
const Auction = require("../models/auction");

// ===================== Place Bid =====================

const placeBid = async (req, res) => {
  try {
    const { auctionId, bidAmount } = req.body;

    const auction = await Auction.findById(auctionId);
if (auction.endTime <= new Date()) {
  auction.status = "ended";
  await auction.save();

  return res.status(400).json({
    success: false,
    message: "Auction has ended",
  });
}
    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    if (auction.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Auction already ended",
      });
    }

    if (bidAmount <= auction.currentHighestBid) {
      return res.status(400).json({
        success: false,
        message: "Bid must be higher than current highest bid",
      });
    }

    const bid = await Bid.create({
      auction: auctionId,
      buyer: req.user.id,
      bidAmount,
    });

    auction.currentHighestBid = bidAmount;
    auction.highestBidder = req.user.id;

    await auction.save();

    res.status(201).json({
      success: true,
      message: "Bid Placed Successfully",
      data: bid,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================== Live Auctions =====================

const getLiveAuctions = async (req, res) => {

  try {
    // Auto End Expired Auctions
await Auction.updateMany(
  {
    status: "active",
    endTime: { $lte: new Date() },
  },
  {
    status: "ended",
  }
);
    const auctions = await Auction.find({
      status: "active",
    })
      .populate("crop")
      .populate("highestBidder", "fullName");

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

// ===================== Bid History =====================

const getBidHistory = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const bids = await Bid.find({
      auction: auctionId,
    })
      .populate("buyer", "fullName")
      .sort({ bidAmount: -1 });

    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeBid,
  getLiveAuctions,
  getBidHistory,
};