const express = require("express");

const { categoryController } = require("../controllers/categoryController");

const categoryRouter = express.Router();

/* 카테고리 목록 조회 */
categoryRouter.get(
  "/",
  categoryController.getCategoryList
);

module.exports = categoryRouter;