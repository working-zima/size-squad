const express = require("express");

const { genderController } = require("../controllers/genderController");

const genderRouter = express.Router();

/* 카테고리 목록 조회 */
genderRouter.get(
  "/",
  genderController.getGenderList
);

module.exports = genderRouter;