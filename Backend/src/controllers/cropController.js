const Crop = require("../models/Crop");

// ================= Add Crop =================

const addCrop = async (req, res) => {
  try {
    const { cropName, quantity, basePrice, location, image } = req.body;

    const crop = await Crop.create({
      cropName,
      quantity,
      basePrice,
      location,
      image,
      farmer: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Crop Added Successfully",
      data: crop,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Crops =================

const getAllCrops = async (req, res) => {
  try {

    const crops = await Crop.find()
      .populate("farmer", "fullName email")
      .populate("auction");

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get My Crops =================

const getMyCrops = async (req, res) => {
  try {

    const crops = await Crop.find({
      farmer: req.user.id,
    }).populate("auction");

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Crop =================

const updateCrop = async (req, res) => {
  try {

    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Crop Updated Successfully",
      data: crop,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Delete Crop =================

const deleteCrop = async (req, res) => {
  try {

    await Crop.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Crop Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCrop,
  getAllCrops,
  getMyCrops,
  updateCrop,
  deleteCrop,
};