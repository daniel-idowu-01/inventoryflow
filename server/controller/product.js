const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

const addProduct = async (req, res, next) => {
  try {
    const { userId, name, manufacturer, description } = req.body;

    if (!userId || !name || !manufacturer || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Product.create({
      userID: userId,
      name,
      manufacturer,
      stock: 0,
      description,
    });

    return res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get All Products
const getAllProducts = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const findAllProducts = await Product.find({
      userID: userId,
    }).sort({ _id: -1 }); // -1 for descending;

    if (!findAllProducts) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.status(200).json({ message: findAllProducts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res, next) => {
  let product, productID;
  try {
    productID = req.params.id;
    if (!productID) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    product = await Product.findById(productID);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    await Promise.all([
      Product.deleteOne({ _id: productID }),
      Purchase.deleteOne({ ProductID: productID }),
      Sales.deleteOne({ ProductID: productID }),
    ]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update Selected Product
const updateSelectedProduct = async (req, res, next) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).json("Error");
  }
};

// Search Products
const searchProduct = async (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
