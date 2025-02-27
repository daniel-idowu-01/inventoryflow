const Purchase = require("../models/purchase");
const { purchaseStock } = require("../utils/helpers");

// Add Purchase Details
const addPurchase = async (req, res, next) => {
  try {
    const {
      userId,
      productID,
      quantityPurchased,
      purchaseDate,
      totalPurchaseAmount,
    } = req.body;

    if (
      !userId ||
      !productID ||
      !quantityPurchased ||
      !purchaseDate ||
      !totalPurchaseAmount
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const addPurchaseDetails = await Purchase.create({
      userId,
      productID,
      quantityPurchased,
      purchaseDate,
      totalPurchaseAmount,
    });

    if (!addPurchaseDetails) {
      return res.status(400).json({ message: "Error adding purchase details" });
    }
    purchaseStock(productID, quantityPurchased);

    res.status(201).json({ message: "Purchase details added successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get All Purchase Data
const getPurchaseData = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const findAllPurchaseData = await Purchase.find({ userId })
      .sort({ _id: -1 })
      .populate("ProductID"); // -1 for descending order

    if (!findAllPurchaseData) {
      return res.status(400).json({ message: "No purchase found" });
    }

    return res.status(200).json({ message: findAllPurchaseData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res, next) => {
  try {
    let totalPurchaseAmount = 0;
    let userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const purchaseData = await Purchase.find({ userId });
    purchaseData.forEach((purchase) => {
      totalPurchaseAmount += purchase.totalPurchaseAmount;
    });

    return res.status(200).json({ message: totalPurchaseAmount });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { addPurchase, getPurchaseData, getTotalPurchaseAmount };
