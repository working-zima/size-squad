const { Category } = require('../db/models/Category');

const categoryController = {
  getCategoryList: async (req, res, next) => {
    try {
      const categoryData = await Category.findAll()

      res.status(201).json(categoryData);
    } catch (error) {

    }
  },
}

exports.categoryController = categoryController;