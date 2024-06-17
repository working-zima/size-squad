const { Category } = require("../db/models/Category");
const { User } = require("../db/models/User");

const { getUserIdByAccessToken } = require("../utils/utils");

const adminService = {
  addCategory: async (accessToken, categoryData) => {
    try {
      const userId = getUserIdByAccessToken(accessToken);
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new Error('Unauthorized access');
      }

      await Category.create(categoryData)

      return;
    } catch(error) {
      throw error;
    }
  },

  updateCategory: async (accessToken, categoryId, categoryData) => {
    try {
      const userId = getUserIdByAccessToken(accessToken);
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new Error('Unauthorized access');
      }

      const filter = { _id: categoryId };

      await Category.updateCategory(filter, categoryData);

      return;
    } catch(error) {
      throw error;
    }
  }
}

exports.adminService = adminService;