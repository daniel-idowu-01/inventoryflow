const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    storeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    stockSold: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: String,
      required: true,
    },
    totalSaleAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model("sales", SaleSchema);
module.exports = Sales;
