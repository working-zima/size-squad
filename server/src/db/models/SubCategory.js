const { renameId } = require("../../utils/utils");
const { SubCategoryModel } = require("../schemas/subCategory");

const SubCategory = {
  /** 서브 카테고리 생성 */
  create: async (newSubCategory) => {
    try {
      const subCategoryData = await SubCategoryModel
        .create(newSubCategory)

      return subCategoryData._id;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** subCategory로 서브 카테고리 조회 */
  findBySubCategory: async ({subCategory}) => {
    try {
      let subCategoryData = await SubCategoryModel.findOne(
        { subCategory: subCategory },
        "_id subCategory category"
      ).lean();

      return subCategoryData;
    } catch(error) {
      throw new Error(error);
    }
  },
}

exports.SubCategory = SubCategory;