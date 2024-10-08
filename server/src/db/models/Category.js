const { CategoryModel } = require("../schemas/category");

const Category = {
  /** 카테고리 생성 */
  create: async (newCategory) => {
    try {
      await CategoryModel.create(newCategory);

      return;
    } catch (error) {
      throw error;
    }
  },

  /** 카테고리 조회 */
  findAll: async () => {
    try {
      const categoryData = await CategoryModel.find(
        {}, "_id name type category subCategories measurements"
      ).populate({ path: "subCategories", select: ["_id", "name"] })
        .populate({ path: "measurements", select: ["_id", "name"] })
        .populate({ path: "type", select: ["_id", "name"] })
        .lean();

      return categoryData;
    } catch (error) {
      throw error;
    }
  },

  /** _id로 검색 */
  findById: async ({ _id }) => {
    try {
      let categoryData = await CategoryModel.findOne(
        { _id }, "_id name type subCategories measurements"
      ).populate({ path: "subCategories", select: ["_id", "name"] })
        .populate({ path: "measurements", select: ["_id", "name"] })
        .populate({ path: "type", select: ["_id", "name"] })
        .lean();

      return categoryData;
    } catch (error) {
      throw error;
    }
  },

  /** category로 검색 */
  findByCategory: async ({ category }) => {
    try {
      let categoryData = await CategoryModel.findOne(
        { name: category },
        "_id name type subCategories measurements"
      ).populate({ path: "subCategories", select: ["_id", "name"] })
        .populate({ path: "measurements", select: ["_id", "name"] })
        .populate({ path: "type", select: ["_id", "name"] })
        .lean();

      return categoryData;
    } catch (error) {
      throw error;
    }
  },

  /** 카테고리 수정 */
  updateCategory: async (filter, categoryData) => {
    try {
      await CategoryModel.findOneAndUpdate(
        filter, categoryData
      ).lean();

      return;
    } catch (error) {
      throw error;
    }
  }
}

exports.Category = Category;