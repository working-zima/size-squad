const express = require("express");

const {
  addCategoryRules, updateCategoryRules, createFitRules,
  createGenderRules,
  tokenValidationRules,
} = require("../utils/combinedValidation");
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

/* 성별에 따른 사이즈 등록 */
adminRouter.post(
  "/genders",
  createGenderRules,
  adminController.postAddGender
)

/* 핏 등록 */
adminRouter.post(
  "/fits",
  createFitRules,
  adminController.postAddFit
)

adminRouter.post(
  "/sizes",
  tokenValidationRules,
  adminController.postAddSize
)

module.exports = adminRouter;