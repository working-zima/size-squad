const express = require("express");

const productRouter = express.Router();

const { productController } = require("../controllers/productController");
const { tokenValidationRules } = require("../utils/combinedValidation");

/** product 조회 */
productRouter.get(
  "/",
  productController.getProducts
);

productRouter.get(
  "/user/:userId",
  productController.getProductsByUserId
);

/** productId로 조회 */
productRouter.get(
  "/:productId",
  productController.getProduct
);

/** product 등록 */
productRouter.post(
  "/",
  tokenValidationRules,
  productController.postAddProducts
)

/** productId에 해당하는 데이터 수정 */
productRouter.patch(
  "/:productId",
  tokenValidationRules,
  productController.patchProduct
)

module.exports = productRouter;