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
      const productData = await ProductModel.find(
        { authorId: userId },
        "_id categoryId subCategoryId authorId brand name genderId size fitId measurements description price"
      )
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
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
        { authorId: userId, categoryId },
        "_id categoryId subCategoryId authorId brand name genderId size fitId measurements description price"
      )
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
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
        { authorId: userId, subCategoryId },
        "_id categoryId subCategoryId authorId brand name genderId size fitId measurements description price"
      )
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
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
        "_id categoryId subCategoryId authorId brand name genderId sizeId fitId measurements description"
      )
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .populate({ path: "sizeId", select: ["_id", "size"] })
        .populate({
          path: "measurements.measurementId",
          select: ["_id", "measurement"]
        })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** categoryId로 product list 가져오기 */
  findByCategoryId: async ({ categoryId }) => {
    try {
      const productData = await ProductModel.find(
        { categoryId },
        "_id categoryId subCategoryId authorId brand name genderId sizeId fitId measurements description"
      )
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .populate({ path: "sizeId", select: ["_id", "size"] })
        .populate({
          path: "measurements.measurementId",
          select: ["_id", "measurement"]
        })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  /** subCategoryId로 product list 가져오기 */
  findBySubCategoryId: async ({ subCategoryId }) => {
    try {
      const productData = await ProductModel.find(
        { subCategoryId },
        "_id categoryId subCategoryId authorId brand name genderId sizeId fitId measurements description"
      )
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .populate({ path: "sizeId", select: ["_id", "size"] })
        .populate({
          path: "measurements.measurementId",
          select: ["_id", "measurement"]
        })
        .lean();

      return productData;
    } catch(error) {
      throw error;
    }
  },

  findByProductId: async ({ productId }) => {
    try {
      const productData = await ProductModel.find(
        { _id: productId },
        "_id categoryId subCategoryId authorId brand name genderId sizeId fitId measurements description"
      )
        .populate({ path: "categoryId", select: ["_id", "category"] })
        .populate({ path: "subCategoryId", select: ["_id", "subCategory"] })
        .populate({ path: "authorId", select: ["_id", "name"] })
        .populate({ path: "genderId", select: ["_id", "gender"] })
        .populate({ path: "fitId", select: ["_id", "fit"] })
        .populate({ path: "sizeId", select: ["_id", "size"] })
        .populate({
          path: "measurements.measurementId",
          select: ["_id", "measurement"]
        })
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