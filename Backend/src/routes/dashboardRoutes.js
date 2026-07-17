const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { farmerDashboard } = require("../controllers/dashboardController");

router.get(
  "/farmer",
  auth,
  authorizeRoles("farmer"),
  farmerDashboard
);

module.exports = router;