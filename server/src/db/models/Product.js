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

  update: async ({ product, productId }) => {
    try {
      await ProductModel.findByIdAndUpdate(
        productId,
        { ...product },
        { new: true }
      );

      return;
    } catch(error) {
      throw error;
    }
  },

  findByProductId: async ({ productId }) => {
    try {
      const productData = await ProductModel.find({ _id: productId },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "name"] })
        .populate({ path: "subCategory", select: ["_id", "name"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "name"] })
        .populate({ path: "fit", select: ["_id", "name"] })
        .populate({ path: "size", select: ["_id", "name"] })
        .lean();
      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** userId로 product list 가져오기 */
  findByUserId: async ({ user }) => {
    try {
      const productData = await ProductModel.find({ author: user },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "name"] })
        .populate({ path: "subCategory", select: ["_id", "name"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "name"] })
        .populate({ path: "fit", select: ["_id", "name"] })
        .populate({ path: "size", select: ["_id", "name"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** userId와 categoryId로 product list 가져오기 */
  findByUserIdAndCategoryId: async ({ user, category }) => {
    try {
      const productData = await ProductModel.find(
        { author: user, category },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "name"] })
        .populate({ path: "subCategory", select: ["_id", "name"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "name"] })
        .populate({ path: "fit", select: ["_id", "name"] })
        .populate({ path: "size", select: ["_id", "name"] })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** userId와 categoryId로 product list 가져오기 */
  findByUserIdAndSubCategoryId: async ({ user, subCategory }) => {
    try {
      const productData = await ProductModel.find(
        { author: user, subCategory },
        "_id author name brand category subCategory gender size fit measurements description"
        ).populate({ path: "category", select: ["_id", "name"] })
        .populate({ path: "subCategory", select: ["_id", "name"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "name"] })
        .populate({ path: "fit", select: ["_id", "name"] })
        .populate({ path: "size", select: ["_id", "name"] })
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
        ).populate({ path: "category", select: ["_id", "name"] })
        .populate({ path: "subCategory", select: ["_id", "name"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "name"] })
        .populate({ path: "fit", select: ["_id", "name"] })
        .populate({ path: "size", select: ["_id", "name"] })
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
        ).populate({ path: "category", select: ["_id", "name"] })
        .populate({ path: "subCategory", select: ["_id", "name"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "name"] })
        .populate({ path: "fit", select: ["_id", "name"] })
        .populate({ path: "size", select: ["_id", "name"] })
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
        ).populate({ path: "category", select: ["_id", "name"] })
        .populate({ path: "subCategory", select: ["_id", "name"] })
        .populate({ path: "author", select: ["_id", "name"] })
        .populate({ path: "gender", select: ["_id", "name"] })
        .populate({ path: "fit", select: ["_id", "name"] })
        .populate({ path: "size", select: ["_id", "name"] })
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