const { validationResult } = require('express-validator');
const { productService } = require('../services/productService');

const productController = {
  /** product 등록 */
  postAddProducts: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const {
        categoryId, subCategoryId, authorId, brand, name, genderId, size, fitId,
        measurements, description, price
      } = req.body;

      productService.addProduct({
        categoryId, subCategoryId, authorId, brand, name, genderId, size, fitId,
        measurements, description, price
      })

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  getProducts: async (req, res, next) => {
    try {
      const category1DepthCodes = req.query.category1DepthCodes;
      const category2DepthCodes = req.query.category2DepthCodes;

      if(!category1DepthCodes && category2DepthCodes) {
        throw new Error('Please provide a valid category1DepthCode.')
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

      res.status(201).json(productData);
    } catch(error) {
      next(error);
    }
  }
}

exports.productController = productController;