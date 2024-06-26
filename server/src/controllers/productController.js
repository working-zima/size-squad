const { productService } = require('../services/productService');

const CustomError = require('../utils/CustomError');

const productController = {
  /** product 조회 */
  getProducts: async (req, res, next) => {
    try {
      const category1DepthCodes = req.query.category1DepthCodes;
      const category2DepthCodes = req.query.category2DepthCodes;

      if(!category1DepthCodes && category2DepthCodes) {
        throw new CustomError('Please provide a valid category1DepthCode', 501);
      }

      let productData = [];

      // 서브 카테고리
      if(category2DepthCodes) {
        productData = await productService.getProductBySubCategoryId({
          subCategoryId: category2DepthCodes
        });
      }

      // 카테고리
      if(category1DepthCodes && !category2DepthCodes) {
        productData = await productService.getProductByCategoryId({
          categoryId: category1DepthCodes
        });
      }

      // 전체
      if(!category1DepthCodes) {
        productData = await productService.getProducts();
      }

      res.status(200).json({ products: productData });
    } catch(error) {
      next(error);
    }
  }
}

exports.productController = productController;