const express = require("express");
const app = express();
const sales = require("../controller/sales");

// Add Sales
app.post("/add", sales.addSales);

// Get All Sales
app.get("/get/:userId", sales.getSalesData);
app.get("/getmonthly", sales.getMonthlySales);
app.get("/get/:userId/totalsaleamount", sales.getTotalSalesAmount);

module.exports = app;
