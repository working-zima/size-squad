const { Product } = require("../db/models/Product");

const productService = {
  addProduct: async (newProduct) => {
    try {
      await Product.create(newProduct)

      return;
    } catch(error) {
      throw error;
    }
  },

  getProducts: async () => {
    try {
      const productData = await Product.findAll();

      return productData;
    } catch (error) {
      throw error;
    }
  },

  getProductByUserId: async ({userId}) => {
    try {
      const productData = await Product.findByUserId({userId});

      return productData;
    } catch(error) {
      return error;
    }
  },

  getProductByUserIdAndCategoryId: async ({userId, categoryId}) => {
    try {
      const productData = await Product.findByUserIdAndCategoryId({
        userId, categoryId
      });

      return productData;
    } catch(error) {
      return error;
    }
  },

  getProductByUserIdAndSubCategoryId: async ({userId, subCategoryId}) => {

    try {
      const productData = await Product.findByUserIdAndSubCategoryId({
        userId, subCategoryId
      });

      return productData;
    } catch(error) {
      return error;
    }
  },

  getProductByCategoryId: async ({ categoryId }) => {
    try {
      const productData = await Product.findByCategoryId({
        categoryId
      });

      return productData;
    } catch(error) {
      return error;
    }
  },

  getProductBySubCategoryId: async ({ subCategoryId }) => {
    try {
      const productData = await Product.findBySubCategoryId({
        subCategoryId
      });

      return productData;
    } catch(error) {
      return error;
    }
  },
}

exports.productService = productService;