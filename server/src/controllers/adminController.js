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
      const accessToken = req.headers["authorization"];

      const categoryData = { category, subCategories, measurements }

      await adminService.addCategory({ accessToken, categoryData });

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
      const accessToken = req.headers["authorization"];
      const { category, subCategories, measurements } = req.body;

      const categoryData = {category, subCategories, measurements}

      await adminService.updateCategory(
        { accessToken, categoryId, categoryData }
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
      const sizeData = { gender, size }
      const accessToken = req.headers["authorization"];

      await adminService.addGender({ accessToken, sizeData });

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
      const accessToken = req.headers["authorization"];

      await adminService.addFit({ accessToken, fit });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 사이즈 등록 */
  postAddSize: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { size, genderId, type } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addSize({ accessToken, size, genderId, type  });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 사이즈 등록 */
  postAddMeasurements: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { measurement } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addMeasurement({ accessToken, measurement });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

exports.adminController = adminController;