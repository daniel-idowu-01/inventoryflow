const express = require("express");
const app = express();
const purchase = require("../controller/purchase");

// Add Purchase
app.post("/add", purchase.addPurchase);

// Get All Purchase Data
app.get("/get/:userId", purchase.getPurchaseData);

app.get("/get/:userId/totalpurchaseamount", purchase.getTotalPurchaseAmount);

module.exports = app;
