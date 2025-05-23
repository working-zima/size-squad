const { Product } = require("../db/models/Product");

const productService = {
  /** product 등록 */
  addProduct: async ({ newProduct }) => {
    try {
      return await Product.create({ newProduct });
    } catch (error) {
      throw error;
    }
  },

  /** product 조회 */
  getAllProducts: async ({ keyword, sort, page, limit }) => {
    try {
      const queryCriteria = {};

      if (keyword) {
        queryCriteria.$or = [
          { brand: { $regex: keyword, $options: "i" } },
          { name: { $regex: keyword, $options: "i" } },
        ];
      }

      const options = {
        page,
        limit,
        sort: sort,
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] },
        ],
        lean: true,
      };

      const productData = await Product.findAll({
        queryCriteria,
        options,
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** userId로 product 조회 */
  getProductByUserId: async ({ userId, keyword, sort, page, limit }) => {
    try {
      const queryCriteria = {
        author: userId,
      };

      if (keyword) {
        queryCriteria.$or = [
          { brand: { $regex: keyword, $options: "i" } },
          { name: { $regex: keyword, $options: "i" } },
        ];
      }

      const options = {
        page,
        limit,
        sort: sort,
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] },
        ],
        lean: true,
      };

      const productData = await Product.findByUserId({
        queryCriteria,
        options,
      });
      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** categoryId와 userId로 product 조회 */
  getProductByUserIdAndCategoryId: async ({
    userId,
    category,
    sort,
    page,
    limit,
  }) => {
    try {
      const options = {
        page,
        limit,
        sort: sort,
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] },
        ],
        lean: true,
      };

      const productData = await Product.findByUserIdAndCategoryId({
        userId,
        category,
        options,
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** subCategoryId와 userId로 product 조회 */
  getProductByUserIdAndSubCategoryId: async ({
    userId,
    subCategory,
    sort,
    page,
    limit,
  }) => {
    try {
      const options = {
        page,
        limit,
        sort: sort,
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] },
        ],
        lean: true,
      };

      const productData = await Product.findByUserIdAndSubCategoryId({
        userId,
        subCategory,
        options,
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** categoryId로 product 조회 */
  getProductByCategoryId: async ({ category, sort, page, limit }) => {
    try {
      const options = {
        page,
        limit,
        sort: sort,
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] },
        ],
        lean: true,
      };

      const productData = await Product.findByCategoryId({
        category,
        options,
      });

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** subCategoryId로 product 조회 */
  getProductBySubCategoryId: async ({ subCategory, sort, page, limit }) => {
    try {
      const options = {
        page,
        limit,
        sort: sort,
        populate: [
          { path: "category", select: ["_id", "name"] },
          { path: "subCategory", select: ["_id", "name"] },
          { path: "author", select: ["_id", "name"] },
          { path: "gender", select: ["_id", "name"] },
          { path: "fit", select: ["_id", "name"] },
          { path: "size", select: ["_id", "name"] },
        ],
        lean: true,
      };

      const productData = await Product.findBySubCategoryId({
        subCategory,
        options,
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
        throw new CustomError("Access Token mismatch", 403);
      }

      const newProductData = await Product.deleteProductByProductId({
        productId,
      });

      return newProductData;
    } catch (error) {
      throw error;
    }
  },
};

exports.productService = productService;
