const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
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
    quantityPurchased: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: String,
      required: true,
    },
    totalPurchaseAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("purchase", PurchaseSchema);
module.exports = Purchase;
