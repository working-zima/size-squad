const { renameId } = require("../../utils/utils");
const { CategoryModel } = require("../schemas/category");

const Category = {
  /** 카테고리 생성 */
  create: async (newCategory) => {
    try {
      await CategoryModel.create(newCategory);

      return;
    } catch(error) {
      throw error;
    }
  },

  /** 카테고리 조회 */
  findAll: async () => {
    try {
      const categoryData = await CategoryModel.find(
        {}, "_id category subCategories measurements"
      )
      .populate({ path: "subCategories", select: ["_id", "subCategory"] })
      .lean();

      return categoryData;
    } catch(error) {
      throw error;
    }
  },

  /** _id로 검색 */
  findById: async ({_id}) => {
    try {
      let categoryData = await CategoryModel.findOne(
        { _id },
        "_id category subCategories measurements"
      ).lean();

      if (categoryData) categoryData = renameId(categoryData, 'categoryId');

      return categoryData;
    } catch (error) {
      throw error;
    }
  },

  /** category로 검색 */
  findByCategory: async ({category}) => {
    try {
      let categoryData = await CategoryModel.findOne(
        { category },
        "_id category subCategories measurements"
      ).lean();
      if (categoryData) categoryData = renameId(categoryData, 'categoryId');

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
    } catch(error) {
      throw error;
    }
  }
}

exports.Category = Category;