const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const { userService } = require("../services/userService");
const { productService } = require('../services/productService');

const { Token } = require('../db/models/Token');

const CustomError = require('../utils/CustomError');

const userController = {
  /** 회원가입 */
  postSignUp: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const {
        email, name, password, genderId, height, weight, description
      } = req.body;

      userService.signUp(
        { email, name, password, genderId, height, weight, description }
      )

      res.status(201).json();
    } catch (error) {
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
        categoryId, subCategoryId, authorId, brand, name, genderId, size, fitId,
        measurements, description, price
      } = req.body;

      const userAccessToken = req.headers["authorization"];

      const tokenData = await Token.findByAccessToken({
        accessToken: userAccessToken
      })

      if (userAccessToken !== tokenData.accessToken) {
        throw new CustomError('Access Token mismatch', 403);
      }

      productService.addProduct({
        categoryId, subCategoryId, authorId, brand, name, genderId, size, fitId,
        measurements, description, price
      })

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 회원 product 조회 */
  getMyProduct: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const userAccessToken = req.headers["authorization"];
      const userData = await userService.getMyInfo(userAccessToken);
      const userId = userData.userId;

      const category1DepthCodes = req.query.category1DepthCodes;
      const category2DepthCodes = req.query.category2DepthCodes;

      if(!category1DepthCodes && category2DepthCodes) {
        throw new CustomError('Please provide a valid category1DepthCode', 501);
      }

      let productData = [];

      // 서브 카테고리
      if(category2DepthCodes) {
        productData = await productService.getProductByUserIdAndSubCategoryId({
          userId, subCategoryId: category2DepthCodes
        });
      }

      // 카테고리
      if(category1DepthCodes && !category2DepthCodes) {
        productData = await productService.getProductByUserIdAndCategoryId({
          userId, categoryId: category1DepthCodes
        });
      }

      // 전체
      if(!category1DepthCodes) {
        productData = await productService.getProductByUserId({ userId });
      }

      res.status(200).json(productData);
    } catch(error) {
      next(error);
    }
  },

  /** 회원 product 삭제 */
  deleteMyProduct: async (req, res, next) => {
    try {
      const userAccessToken = req.headers["authorization"];
      const { productId } = req.params;


      const tokenData = await Token.findByAccessToken({
        accessToken: userAccessToken
      })

      if (userAccessToken !== tokenData.accessToken) {
        throw new CustomError('Access Token mismatch', 403);
      }

      const userId = tokenData.userId;

      productService.deleteMyProduct({ productId, userId });

      res.status(200).json();
    } catch(error) {
      next(error);
    }
  },

  /** 로그인 회원 정보 조회 */
  getMyInfo: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const userAccessToken = req.headers["authorization"];

      const userData = await userService.getMyInfo(userAccessToken);
      const { role, ...userDataWithoutRole } = userData;

      res.status(200).json(userDataWithoutRole);
    } catch(error) {
      next(error);
    }
  },

  /** 로그인 회원 삭제 */
  deleteMe: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const userAccessToken = req.headers["authorization"];

      const tokenData = await Token.findByAccessToken({
        accessToken: userAccessToken
      })

      if (userAccessToken !== tokenData.accessToken) {
        throw new CustomError('Access Token mismatch', 403);
      }

      await userService.deleteMe(userAccessToken);

      res.status(200).json();
    } catch(error) {
      next(error);
    }
  },
}

exports.userController = userController;