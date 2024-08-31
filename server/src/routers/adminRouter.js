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
  tokenValidationRules,
  adminController.postAddCategory
);

/* 카테고리 수정 */
adminRouter.patch(
  "/categories/:categoryId",
  tokenValidationRules,
  adminController.patchUpdateCategory
);

/* 서브 카테고리 등록 */
adminRouter.post(
  "/subCategories",
  tokenValidationRules,
  adminController.postAddSubCategory
);

/* 성별에 따른 사이즈 등록 */
adminRouter.post(
  "/genders",
  tokenValidationRules,
  adminController.postAddGender
)

/* 핏 등록 */
adminRouter.post(
  "/fits",
  tokenValidationRules,
  adminController.postAddFit
)

/** 사이즈 등록 */
adminRouter.post(
  "/sizes",
  tokenValidationRules,
  adminController.postAddSize
)

/** 실측 등록 */
adminRouter.post(
  "/measurements",
  tokenValidationRules,
  adminController.postAddMeasurements
)

/** 타입 등록 */
adminRouter.post(
  "/types",
  tokenValidationRules,
  adminController.postAddTypes
)

module.exports = adminRouter;