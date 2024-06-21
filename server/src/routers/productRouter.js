const express = require("express");

const productRouter = express.Router();

const { productController } = require("../controllers/productController");
const { createProductRules } = require("../utils/combinedValidation");

productRouter.post("/", createProductRules, productController.postAddProducts);

productRouter.get("/", productController.getProducts);

module.exports = productRouter;