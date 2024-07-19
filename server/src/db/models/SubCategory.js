const { SubCategoryModel } = require("../schemas/subCategory");

const SubCategory = {
  /** 서브 카테고리 생성 */
  create: async ({ name }) => {
    try {
      const subCategoryData = await SubCategoryModel.create({ name })

      return subCategoryData;
    } catch(error) {
      throw error;
    }
  },

  /** subCategory로 서브 카테고리 조회 */
  findBySubCategory: async ({subCategory}) => {
    try {
      let subCategoryData = await SubCategoryModel.findOne(
        { subCategory: subCategory },
        "_id name"
      ).lean();

      return subCategoryData;
    } catch(error) {
      throw error;
    }
  },
}

exports.SubCategory = SubCategory;