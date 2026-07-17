const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createAuction,
  getActiveAuctions,
  endAuction,
  getAuctionResults,
} = require("../controllers/auctionController");

router.post(
  "/create",
  auth,
  authorizeRoles("farmer"),
  createAuction
);

router.get(
  "/active",
  auth,
  getActiveAuctions
);

router.put(
  "/end/:auctionId",
  auth,
  authorizeRoles("farmer"),
  endAuction
);
router.get(
  "/results",
  auth,
  getAuctionResults
);
module.exports = router;