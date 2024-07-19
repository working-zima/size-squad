const { Category } = require("../db/models/Category");
const { Fit } = require("../db/models/Fit");
const { Gender } = require("../db/models/Gender");
const { Measurement } = require("../db/models/Measurement");
const { Size } = require("../db/models/Size");
const { SubCategory } = require("../db/models/SubCategory");
const { Type } = require("../db/models/Type");
const { User } = require("../db/models/User");

const CustomError = require("../utils/CustomError");
const { getUserIdByAccessToken } = require("../utils/utils");

const adminService = {
  /** 카테고리 등록 */
  addCategory: async ({ accessToken, categoryData }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Access Token mismatch', 403);
      }

      // categoryData.subCategories = await Promise.all(
      //   categoryData.subCategories.map(async (subCategory) => {
      //     return await SubCategory.create(
      //       {name: subCategory, category: categoryData.name});
      //   }))

      await Category.create(categoryData);

      return;
    } catch(error) {
      throw error;
    }
  },

  /** 서브카테고리 등록 */
  addSubCategory: async ({ accessToken, name }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Access Token mismatch', 403);
      }

      await SubCategory.create({ name });

      return;
    } catch(error) {
      throw error;
    }
  },

  updateCategory: async ({ accessToken, categoryId, categoryData }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
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

  addGender: async ({ accessToken, name }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Unauthorized access', 403);
      }

      await Gender.create({ name });

      return;
    } catch(error) {
      throw error;
    }
  },

  addFit: async ({ accessToken, name }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Unauthorized access', 403);
      }

      await Fit.create({ name });

      return;
    } catch(error) {
      throw error;
    }
  },

  addSize: async ({ accessToken, name, gender, type  }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
      const userData = await User.findById(userId);
      const newSize = { name, gender, type }

      if(!userData.role) {
        throw new CustomError('Unauthorized access', 403);
      }

      await Size.create({ newSize })

      return;
    } catch(error) {
      throw error;
    }
  },

  addMeasurement: async ({ accessToken, name }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Unauthorized access', 403);
      }

      await Measurement.create({ name })

      return;
    } catch(error) {
      throw error;
    }
  },

  addTypes: async ({ accessToken, name }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken });
      const userData = await User.findById(userId);

      if(!userData.role) {
        throw new CustomError('Unauthorized access', 403);
      }

      await Type.create({ name })

      return;
    } catch(error) {
      throw error;
    }
  }
}

exports.adminService = adminService;