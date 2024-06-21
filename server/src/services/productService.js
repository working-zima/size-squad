const { Product } = require("../db/models/Product");

const productService = {
  /** product 등록 */
  addProduct: async (newProduct) => {
    try {
      await Product.create(newProduct)

      return;
    } catch(error) {
      throw error;
    }
  },

  /** product 조회 */
  getProducts: async () => {
    try {
      const productData = await Product.findAll();

      return productData;
    } catch (error) {
      throw error;
    }
  },

  /** userId로 product 조회 */
  getProductByUserId: async ({userId}) => {
    try {
      const productData = await Product.findByUserId({userId});

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** categoryId와 userId로 product 조회 */
  getProductByUserIdAndCategoryId: async ({userId, categoryId}) => {
    try {
      const productData = await Product.findByUserIdAndCategoryId({
        userId, categoryId
      });

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** subCategoryId와 userId로 product 조회 */
  getProductByUserIdAndSubCategoryId: async ({userId, subCategoryId}) => {

    try {
      const productData = await Product.findByUserIdAndSubCategoryId({
        userId, subCategoryId
      });

      return productData;
    } catch(error) {
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
    } catch(error) {
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
    } catch(error) {
      throw error;
    }
  },

  /** product 삭제 */
  deleteMyProduct: async ({ productId, userId }) => {
    try {
      const productData = await Product.findByProductId({ productId });

      if(productData[0].authorId._id !== userId) {
        throw new Error("User ID and accessToken mismatch")
      }

      await Product.deleteProductByProductId({ productId })

      return;
    } catch(error) {
      throw error;
    }
  },
}

exports.productService = productService;