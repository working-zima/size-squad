const { validationResult } = require('express-validator');

const { categoryService } = require('../services/categoryService');
const { Category } = require('../db/models/Category');

const categoryController = {
  getCategoryList: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const categoryData = await Category.findAll()

      res.status(201).json(categoryData);
    } catch (error) {

    }
  },
}

exports.categoryController = categoryController;