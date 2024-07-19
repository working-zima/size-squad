const ProductModel = require("../schemas/product");

const Product = {
  /** 서브 카테고리 생성 */
  create: async ({ newProduct }) => {
    try {
      await ProductModel.create(newProduct)

      return;
    } catch(error) {
      throw error;
    }
  },

  /** userId로 product list 가져오기 */
  findByUserId: async ({ userId }) => {
    try {
      const productData = await ProductModel.find({ author: userId },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "category"] })
        .populate({ path: "subCategory", select: ["_id", "subCategory"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "gender"] })
        .populate({ path: "fit", select: ["_id", "fit"] })
        .populate({ path: "size", select: ["_id", "size"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** userId와 categoryId로 product list 가져오기 */
  findByUserIdAndCategoryId: async ({ userId, categoryId }) => {
    try {
      const productData = await ProductModel.find(
        { author: userId, category: categoryId },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "category"] })
        .populate({ path: "subCategory", select: ["_id", "subCategory"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "gender"] })
        .populate({ path: "fit", select: ["_id", "fit"] })
        .populate({ path: "size", select: ["_id", "size"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** userId와 categoryId로 product list 가져오기 */
  findByUserIdAndSubCategoryId: async ({ userId, subCategoryId }) => {
    try {
      const productData = await ProductModel.find(
        { author: userId, subCategory: subCategoryId },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "category"] })
        .populate({ path: "subCategory", select: ["_id", "subCategory"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "gender"] })
        .populate({ path: "fit", select: ["_id", "fit"] })
        .populate({ path: "size", select: ["_id", "size"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** 모든 product 조회 */
  findAll: async () => {
    try {
      const productData = await ProductModel.find({},
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "category"] })
        .populate({ path: "subCategory", select: ["_id", "subCategory"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "gender"] })
        .populate({ path: "fit", select: ["_id", "fit"] })
        .populate({ path: "size", select: ["_id", "size"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** categoryId로 product list 가져오기 */
  findByCategoryId: async ({ categoryId }) => {
    try {
      const productData = await ProductModel.find({ category: categoryId },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "category"] })
        .populate({ path: "subCategory", select: ["_id", "subCategory"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "gender"] })
        .populate({ path: "fit", select: ["_id", "fit"] })
        .populate({ path: "size", select: ["_id", "size"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** subCategoryId로 product list 가져오기 */
  findBySubCategoryId: async ({ subCategoryId }) => {
    try {
      const productData = await ProductModel.find({ subCategory: subCategoryId },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "category"] })
        .populate({ path: "subCategory", select: ["_id", "subCategory"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "gender"] })
        .populate({ path: "fit", select: ["_id", "fit"] })
        .populate({ path: "size", select: ["_id", "size"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  findByProductId: async ({ productId }) => {
    try {
      const productData = await ProductModel.find({ _id: productId },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "category"] })
        .populate({ path: "subCategory", select: ["_id", "subCategory"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "gender"] })
        .populate({ path: "fit", select: ["_id", "fit"] })
        .populate({ path: "size", select: ["_id", "size"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  deleteProductByProductId: async ({ productId }) => {
    try {
      await ProductModel.findByIdAndDelete({ _id: productId });

      return;
    } catch (error) {
      throw error;
    }
  },
}

exports.Product = Product;