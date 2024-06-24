const { Category } = require('../db/models/Category');

const categoryController = {
  /** 카테고리 목록 조회 */
  getCategoryList: async (req, res, next) => {
    try {
      const categoryData = await Category.findAll();

      // Access Token이 올바름
      res.status(200).json(categoryData);
    } catch (error) {
      next(error);
    }
  },
}

exports.categoryController = categoryController;