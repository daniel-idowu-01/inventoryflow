const Product = require("../models/product");

const purchaseStock = async (productID, purchaseStockData) => {
  // Updating Purchase stock
  try {
    const myProductData = await Product.findOne({ _id: productID });
    let myUpdatedStock = parseInt(myProductData.stock) + purchaseStockData;

    const purchaseStock = await Product.findByIdAndUpdate(
      { _id: productID },
      {
        stock: myUpdatedStock,
      },
      { new: true }
    );
    console.log("=======Purchase Stock==========", purchaseStock);
  } catch (error) {
    console.error("Error updating Purchase stock ", error);
  }
};

const soldStock = async (productID, stockSoldData) => {
  // Updating sold stock
  try {
    const myProductData = await Product.findOne({ _id: productID });
    let myUpdatedStock = myProductData.stock - stockSoldData;

    const soldStock = await Product.findByIdAndUpdate(
      { _id: productID },
      {
        stock: myUpdatedStock,
      },
      { new: true }
    );
    console.log("=======Sold Stock==========", soldStock);
  } catch (error) {
    console.error("Error updating sold stock ", error);
  }
};

module.exports = { purchaseStock, soldStock };
