const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  addCrop,
  getAllCrops,
  getMyCrops,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");

// Farmer Routes
router.post(
  "/add",
  auth,
  authorizeRoles("farmer"),
  addCrop
);

router.get("/", getAllCrops);

router.get(
  "/my-crops",
  auth,
  authorizeRoles("farmer"),
  getMyCrops
);

router.put(
  "/update/:id",
  auth,
  authorizeRoles("farmer"),
  updateCrop
);

router.delete(
  "/delete/:id",
  auth,
  authorizeRoles("farmer"),
  deleteCrop
);

module.exports = router;