const express = require("express");
const { connectDB } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const User = require("./models/users");
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

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  
});

// Registration API
app.post("/api/register", (req, res) => {
  
});


app.get("/testget", async (req, res) => {
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564' })
  res.json(result)

})

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
