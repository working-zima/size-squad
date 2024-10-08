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
        email, name, password, gender, height, weight, description
      } = req.body;
      const accessToken = await userService.signUp(
        { email, name, password, gender, height, weight, description }
      )

      res.status(201).json({ accessToken });
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
      const {
        keyword, categoryId, subCategoryId, sortField, sortOrder, page, per
      } = req.query;
      let sort = {};
      if (sortField && sortOrder) sort[sortField] = parseInt(sortOrder, 10)

      const userData = await userService.getMyInfo(userAccessToken);
      const userId = userData._id;

      let productData = [];

      // 서브 카테고리
      if (subCategoryId) {
        productData = await productService.getProductByUserIdAndSubCategoryId({
          userId, subCategory: subCategoryId, sort, page, limit: per
        });
      }

      // 카테고리
      if (categoryId && !subCategoryId) {
        productData = await productService.getProductByUserIdAndCategoryId({
          userId, category: categoryId, sort, page, limit: per
        });
      }

      // 전체
      if (!categoryId && !subCategoryId) {
        productData = await productService.getProductByUserId({
          userId, keyword, sort, page, limit: per
        });
      }

      res.status(200).json({ products: productData });
    } catch (error) {
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
    } catch (error) {
      next(error);
    }
  },

  getUserInfo: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const userAccessToken = req.headers["authorization"];
      const { userId } = req.params;

      const myData = await userService.getMyInfo(userAccessToken);
      const userData = await userService.getUserById({ _id: userId })

      const isOwner = myData._id === userData._id;

      res.status(200).json({ user: userData, isOwner });
    } catch (error) {
      next(error);
    }
  },

  /** 로그인 회원 정보 조회 */
  getAllUser: async (req, res, next) => {

    try {
      const {
        keyword, sortField, sortOrder, page, per
      } = req.query;
      let sort = {};
      if (sortField && sortOrder) sort[sortField] = parseInt(sortOrder, 10)

      const userData = await userService.getAllUser({
        keyword, sort, page, limit: per
      });

      res.status(200).json({ users: userData });
    } catch (error) {
      next(error);
    }
  },

  /** 이메일로 id 조회 */
  getIdByEmail: async (req, res, next) => {
    try {
      const { email } = req.params;
      const id = await userService.getIdByEmail({ email });

      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  },

  /** 닉네임으로 id 조회 */
  getIdByName: async (req, res, next) => {
    try {
      const { name } = req.params;
      const id = await userService.getIdByName({ name });

      res.status(200).json({ id });
    } catch (error) {
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

      const userId = tokenData.user;

      const newProductData = await productService.deleteMyProduct({
        productId, userId
      });

      res.status(200).json({ products: newProductData });
    } catch (error) {
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
    } catch (error) {
      next(error);
    }
  },

  /** 비밀번호 변경 */
  patchPassword: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const accessToken = req.headers["authorization"];
      const { oldPassword, newPassword } = req.body;

      await userService.patchPassword({ oldPassword, newPassword, accessToken });

      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  },

  /** 성별 변경 */
  patchGender: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const accessToken = req.headers["authorization"];
      const { gender } = req.body;

      await userService.patchGender({ gender, accessToken });

      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  },

  /** 키 변경 */
  patchHeight: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const accessToken = req.headers["authorization"];
      const { height } = req.body;

      await userService.patchHeight({ height, accessToken });

      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  },

  /** 몸무게 변경 */
  patchWeight: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const accessToken = req.headers["authorization"];
      const { weight } = req.body;

      await userService.patchWeight({ weight, accessToken });

      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  },

  /** 체형 변경 */
  patchDescription: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const accessToken = req.headers["authorization"];
      const { description } = req.body;

      await userService.patchDescription({ description, accessToken });

      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  },
}

exports.userController = userController;
