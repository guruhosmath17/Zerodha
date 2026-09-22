require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/AuthRoute");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { userVerification } = require("./Middelwares/AuthMiddleware");
const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// ==================== MIDDLEWARE ====================

app.use(
  cors({
    origin: ["http://localhost:3000",
      "https://zerodha-dashboard-2pes.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ==================== AUTH ROUTES ====================

app.use("/", authRoute);

// ==================== HOLDINGS ====================

app.get("/allHoldings", userVerification, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

// ==================== POSITIONS ====================

app.get("/allPositions", userVerification, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching positions" });
  }
});

// ==================== CREATE NEW ORDER ====================

app.post("/newOrder", userVerification, async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order saved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order could not be saved",
    });
  }
});

// ==================== ALL ORDERS ====================

app.get("/allOrders", userVerification, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching orders",
    });
  }
});

// ==================== FUNDS ====================

app.get("/funds", userVerification, async (req, res) => {
  try {
    res.json({
      availableMargin: 4043.10,
      usedMargin: 3757.30,
      availableCash: 4043.10,
      openingBalance: 3736.40,
      payin: 4064.00,
      span: 0,
      deliveryMargin: 0,
      exposure: 0,
      optionsPremium: 0,
      collateralLiquid: 0,
      collateralEquity: 0,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching funds",
    });
  }
});

// ==================== MONGODB ====================

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB started!");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// ==================== SERVER ====================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App started on port ${PORT}`);
});

console.log("TOKEN_KEY exists:", !!process.env.TOKEN_KEY);