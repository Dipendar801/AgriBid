const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    auction: {
        type: mongoose.Schema.Types.ObjectId,
       ref: "Auction",
       default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Crop", cropSchema);