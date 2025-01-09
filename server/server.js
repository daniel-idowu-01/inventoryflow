const express = require("express");
const { connectDB } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const authRoute = require("./router/auth");
const cors = require("cors");
const Product = require("./models/product");


const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

connectDB();

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// Auth API
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
