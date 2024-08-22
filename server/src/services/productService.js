const { Product } = require("../db/models/Product");

const productService = {
  /** product 등록 */
  addProduct: async ({ newProduct }) => {
    try {
      await Product.create({ newProduct })

      return;
    } catch (error) {
      throw error;
    }
  },

  /** product 조회 */
  getAllProducts: async () => {
    try {
      const productData = await Product.findAll();

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** userId로 product 조회 */
  getProductByUserId: async ({
    userId, page, limit
  }) => {
    try {
      const options = {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] }
        ],
        lean: true
      };

      const productData = await Product.findByUserId({
        userId, options
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** categoryId와 userId로 product 조회 */
  getProductByUserIdAndCategoryId: async ({
    userId, category, page, limit
  }) => {
    try {
      const options = {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] }
        ],
        lean: true
      };

      const productData = await Product.findByUserIdAndCategoryId({
        userId, category, options
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** subCategoryId와 userId로 product 조회 */
  getProductByUserIdAndSubCategoryId: async ({
    userId, subCategory, page, limit
  }) => {
    try {
      const options = {
        page,
        limit,
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] }
        ],
        lean: true
      };

      const productData = await Product.findByUserIdAndSubCategoryId({
        userId, subCategory, options
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** categoryId로 product 조회 */
  getProductByCategoryId: async ({ categoryId }) => {
    try {
      const productData = await Product.findByCategoryId({
        categoryId
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** subCategoryId로 product 조회 */
  getProductBySubCategoryId: async ({ subCategoryId }) => {
    try {
      const productData = await Product.findBySubCategoryId({
        subCategoryId
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** product 삭제 */
  deleteMyProduct: async ({ productId, userId }) => {
    try {
      const productData = await Product.findByProductId({ productId });
      if (productData[0].author._id !== userId) {
        throw new CustomError('Access Token mismatch', 403);
      }

      await Product.deleteProductByProductId({ productId })

      return;
    } catch (error) {
      throw error;
    }
  },
}

exports.productService = productService;