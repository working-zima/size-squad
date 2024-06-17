const express = require("express");

const { addCategoryRules, updateCategoryRules } = require("../utils/combinedValidation");
const { adminController } = require("../controllers/adminController");

const adminRouter = express.Router();

/* 카테고리 등록 */
adminRouter.post(
  "/categories",
  addCategoryRules,
  adminController.postAddCategory
);

/* 카테고리 수정 */
adminRouter.patch(
  "/categories/:categoryId",
  updateCategoryRules,
  adminController.patchUpdateCategory
);

module.exports = adminRouter;