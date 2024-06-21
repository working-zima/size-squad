const { validationResult } = require('express-validator');

const { adminService } = require('../services/adminService');

const adminController = {
  /** 카테고리 등록 */
  postAddCategory: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { category, subCategories, measurements } = req.body;
      const userAccessToken = req.headers["authorization"];

      await adminService.addCategory(
        userAccessToken, { category, subCategories, measurements }
      );

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 카테고리 수정 */
  patchUpdateCategory: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { categoryId } = req.params;
      const userAccessToken = req.headers["authorization"];
      const { category, subCategories, measurements } = req.body;
      await adminService.updateCategory(
        userAccessToken, categoryId, {category, subCategories, measurements}
      );

      res.status(201).json();
    } catch(error) {
      next(error);
    }
  },

  /** 사이즈 등록 */
  postAddGender: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { gender, size } = req.body;
      const userAccessToken = req.headers["authorization"];

      await adminService.addGender(
        userAccessToken, { gender, size }
      );

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 핏 등록 */
  postAddFit: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { fit } = req.body;
      const userAccessToken = req.headers["authorization"];

      await adminService.addFit(userAccessToken, fit);

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },
}

exports.adminController = adminController;