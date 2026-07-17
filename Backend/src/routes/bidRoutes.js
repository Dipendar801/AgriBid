const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  placeBid,
  getLiveAuctions,
  getBidHistory,
} = require("../controllers/bidController");

// Live Auctions
router.get("/live", getLiveAuctions);

// Bid History
router.get(
  "/history/:auctionId",
  auth,
  getBidHistory
);

// Place Bid
router.post(
  "/place",
  auth,
  authorizeRoles("buyer"),
  placeBid
);

module.exports = router;