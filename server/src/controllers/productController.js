const { validationResult } = require('express-validator');

const { productService } = require('../services/productService');

const { Token } = require('../db/models/Token');

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

  /** product 등록 */
  postAddProducts: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const {
        categoryId, subCategoryId, brand, name, genderId, sizeId, fitId,
        measurements, description
      } = req.body;

      const requestAccessToken = req.headers["authorization"];

      const { userId, accessToken } = await Token.findByAccessToken({
        accessToken: requestAccessToken
      })

      if (requestAccessToken !== accessToken) {
        throw new CustomError('Access Token mismatch', 403);
      }

      const newProduct = { authorId: userId, categoryId, subCategoryId, brand, name, genderId, sizeId, fitId, measurements, description}

      productService.addProduct({ newProduct })

      res.status(201).json();
    } catch (error) {
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