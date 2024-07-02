const { productService } = require('../services/productService');

const CustomError = require('../utils/CustomError');

const productController = {
  /** product 리스트 조회 */
  getProducts: async (req, res, next) => {
    try {
      const categoryId = req.query.categoryId;
      const subCategoryId = req.query.subCategoryId;
      let productData = [];

      // 서브 카테고리
      if(subCategoryId) {
        productData = await productService.getProductBySubCategoryId({
          subCategoryId
        });
      }

      // 카테고리
      if(categoryId && !subCategoryId) {
        productData = await productService.getProductByCategoryId({
          categoryId
        });
      }

      // 전체
      if(!categoryId && !subCategoryId) {
        productData = await productService.getProducts();
      }

      res.status(200).json({ products: productData });
    } catch(error) {
      next(error);
    }
  },

  /** 개별 product 조회 */
  getProduct: async (req, res, next) => {
    try {

    } catch(error) {
      next(error);
    }
  }
}

exports.productController = productController;