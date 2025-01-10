const Store = require("../models/store");

// Add Store
const addStore = async (req, res, next) => {
  try {
    const { userId, name, category, address, city, image } = req.body;

    if (!userId || !name || !category || !address || !city || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const addStore = await Store.create({
      userId,
      name,
      category,
      address,
      city,
      image,
    });

    if (!addStore) {
      return res.status(400).json({ message: "Error adding store" });
    }

    res.status(201).json({ message: "Store added successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get All Stores
const getAllStores = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const findAllStores = await Store.find({ userId }).sort({ _id: -1 }); // -1 for descending;\

    if (!findAllStores) {
      return res.status(400).json({ message: "No stores found" });
    }

    return res.status(200).json({ message: findAllStores });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { addStore, getAllStores };
