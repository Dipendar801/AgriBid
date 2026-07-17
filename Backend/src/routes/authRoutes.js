const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get(
  "/profile",
  auth,
  authorizeRoles("farmer", "buyer"),
  getProfile
);

module.exports = router;