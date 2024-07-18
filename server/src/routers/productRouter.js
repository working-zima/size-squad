const express = require("express");

const productRouter = express.Router();

const { productController } = require("../controllers/productController");
const { tokenValidationRules } = require("../utils/combinedValidation");

/** product 조회 */
productRouter.get("/", productController.getProducts);

/** product 등록 */
productRouter.post("/", tokenValidationRules, productController.postAddProducts)

productRouter.get("/:productId", productController.getProducts);


module.exports = productRouter;