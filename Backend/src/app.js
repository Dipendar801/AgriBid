const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const bidRoutes = require("./routes/bidRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to AgriBid Backend 🚀");
});

module.exports = app;