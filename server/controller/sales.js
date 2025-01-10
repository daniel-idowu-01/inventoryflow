const Sales = require("../models/sales");
const { soldStock } = require("../utils/helpers");

// Add Sales
const addSales = async (req, res, next) => {
  try {
    const { userId, productID, storeID, stockSold, saleDate, totalSaleAmount } =
      req.body;

    if (
      !userId ||
      !productID ||
      !storeID ||
      !stockSold ||
      !saleDate ||
      !totalSaleAmount
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const addSale = await Sales.create({
      userId,
      productID,
      storeID,
      stockSold,
      saleDate,
      totalSaleAmount,
    });

    if (!addSale) {
      return res.status(400).json({ message: "Error adding sale details" });
    }
    soldStock(productID, stockSold);

    res.status(201).json({ message: "Sale details added successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get All Sales Data
const getSalesData = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const findAllSalesData = await Sales.find({ userId })
      .sort({ _id: -1 })
      .populate("ProductID")
      .populate("StoreID"); // -1 for descending order

    if (!findAllSalesData) {
      return res.status(400).json({ message: "No sale found" });
    }

    return res.status(200).json({ message: findAllSalesData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get total sales amount
const getTotalSalesAmount = async (req, res) => {
  let totalSaleAmount = 0;
  const salesData = await Sales.find({ userId: req.params.userId });
  salesData.forEach((sale) => {
    totalSaleAmount += sale.TotalSaleAmount;
  });
  res.json({ totalSaleAmount });
};

const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.find();

    // Initialize array with 12 zeros
    const salesAmount = [];
    salesAmount.length = 12;
    salesAmount.fill(0);

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;

      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addSales,
  getMonthlySales,
  getSalesData,
  getTotalSalesAmount,
};
