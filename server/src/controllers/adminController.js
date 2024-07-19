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
      const { name, type, subCategories, measurements } = req.body;
      const accessToken = req.headers["authorization"];

      const categoryData = { name, type, subCategories, measurements }
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
      const { name, type, subCategories, measurements } = req.body;

      const categoryData = {name, type, subCategories, measurements}

      await adminService.updateCategory(
        { accessToken, categoryId, categoryData }
      );

      res.status(201).json();
    } catch(error) {
      next(error);
    }
  },

  /** 서브카테고리 등록 */
  postAddSubCategory: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { name } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addSubCategory({ accessToken, name });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 성별 등록 */
  postAddGender: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { name } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addGender({ accessToken, name });

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
      const { name } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addFit({ accessToken, name });

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
      const { name, gender, type } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addSize({ accessToken, name, gender, type  });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 치수 등록 */
  postAddMeasurements: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { name } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addMeasurement({ accessToken, name });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 타입 등록 */
  postAddTypes: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const { name } = req.body;
      const accessToken = req.headers["authorization"];

      await adminService.addTypes({ accessToken, name });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

exports.adminController = adminController;