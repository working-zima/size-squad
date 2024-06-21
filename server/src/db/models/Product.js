const ProductModel = require("../schemas/product");

const { renameId } = require("../../utils/utils");

const Product = {
  /** 서브 카테고리 생성 */
  create: async (newProduct) => {
    try {
      await ProductModel.create(newProduct)

      return;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** userId로 product list 가져오기 */
  findByUserId: async ({userId}) => {
    try {
      const productData = await ProductModel.find({authorId: userId})
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .lean();

      return productData;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** userId와 categoryId로 product list 가져오기 */
  findByUserIdAndCategoryId: async ({userId, categoryId}) => {
    try {
      const productData = await ProductModel.find({
        authorId: userId, categoryId
      })
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .lean();

      return productData;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** userId와 categoryId로 product list 가져오기 */
  findByUserIdAndSubCategoryId: async ({ userId, subCategoryId }) => {
    try {
      const productData = await ProductModel.find({
        authorId: userId, subCategoryId
      })
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .lean();

      return productData;
    } catch(error) {
      throw new Error(error);
    }
  },

  findAll: async () => {
    try {
      const productData = await ProductModel.find()
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .lean();

      return productData;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** categoryId로 product list 가져오기 */
  findByCategoryId: async ({ categoryId }) => {
    try {
      const productData = await ProductModel.find({ categoryId })
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .lean();

      return productData;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** subCategoryId로 product list 가져오기 */
  findBySubCategoryId: async ({ subCategoryId }) => {
    try {
      const productData = await ProductModel.find({
        subCategoryId
      })
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .lean();

      return productData;
    } catch(error) {
      throw new Error(error);
    }
  }
}

exports.Product = Product;