const express = require("express");

const productRouter = express.Router();

const { productController } = require("../controllers/productController");

productRouter.get("/", productController.getAllProducts);

module.exports = productRouter;