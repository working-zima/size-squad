const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const { userService } = require("../services/userService");
const { productService } = require('../services/productService');

const { Token } = require('../db/models/Token');

const CustomError = require('../utils/CustomError');
const { User } = require('../db/models/User');

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
      const accessToken = userService.signUp(
        { email, name, password, genderId, height, weight, description }
      )

      res.status(201).json({accessToken});
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
      const userId = userData._id;

      const categoryId = req.query.categoryId;
      const subCategoryId = req.query.subCategoryId;

      let productData = [];

      // 서브 카테고리
      if(subCategoryId) {
        productData = await productService.getProductByUserIdAndSubCategoryId({
          userId, subCategoryId: subCategoryId
        });
      }

      // 카테고리
      if(categoryId && !subCategoryId) {
        productData = await productService.getProductByUserIdAndCategoryId({
          userId, categoryId: categoryId
        });
      }

      // 전체
      if(!categoryId && !subCategoryId) {

        productData = await productService.getProductByUserId({ userId });
      }

      res.status(200).json(productData);
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

      res.status(200).json({ user: userDataWithoutRole });
    } catch(error) {
      next(error);
    }
  },

  /** 이메일로 id 조회 */
  getIdByEmail: async (req, res, next) => {
    try {
      const { email } = req.params;
      const id = await userService.getIdByEmail({ email });

      res.status(200).json({ id });
    } catch(error) {
      next(error);
    }
  },

  /** 닉네임으로 id 조회 */
  getIdByName: async (req, res, next) => {
    try {
      const { name } = req.params;
      const id = await userService.getIdByName({ name });

      res.status(200).json({ id });
    } catch(error) {
      next(error);
    }
  },

  /** 회원 product 삭제 */
  deleteMyProduct: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
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