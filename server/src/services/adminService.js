const { Category } = require("../db/models/Category");
const { Fit } = require("../db/models/Fit");
const { Gender } = require("../db/models/Gender");
const { SubCategory } = require("../db/models/SubCategory");
const { User } = require("../db/models/User");

const CustomError = require("../utils/CustomError");
const { getUserIdByAccessToken } = require("../utils/utils");

const adminService = {
  /** 카테고리 등록 */
  addCategory: async (accessToken, categoryData) => {
    try {
      const userId = getUserIdByAccessToken(accessToken);
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Access Token mismatch', 403);
      }

      categoryData.subCategories = await Promise.all(
        categoryData.subCategories.map(async (subCategory) => {
          return await SubCategory.create(
            {subCategory, category: categoryData.category});
        }))

      await Category.create(categoryData);

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
        throw new CustomError('Unauthorized access', 403);
      }

      const filter = { _id: categoryId };

      await Category.updateCategory(filter, categoryData);

      return;
    } catch(error) {
      throw error;
    }
  },

  addGender: async (accessToken, sizeData) => {
    try {
      const userId = getUserIdByAccessToken(accessToken);
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Unauthorized access', 403);
      }

      await Gender.create(sizeData);

      return;
    } catch(error) {
      throw error;
    }
  },

  addFit: async (accessToken, fit) => {
    try {
      const userId = getUserIdByAccessToken(accessToken);
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Unauthorized access', 403);
      }

      await Fit.create({fit});

      return;
    } catch(error) {
      throw error;
    }
  }
}

exports.adminService = adminService;