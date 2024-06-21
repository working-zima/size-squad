const express = require("express");

const productRouter = express.Router();

const { productController } = require("../controllers/productController");
const { createProductRules } = require("../utils/combinedValidation");

/** product 조회 */
productRouter.get("/", productController.getProducts);

module.exports = productRouter;