const express = require("express");

const { sizeController } = require("../controllers/sizeController");

const sizeRouter = express.Router();

/** 사이즈 목록 조회 */
sizeRouter.get(
  "/", sizeController.getSizes
)

module.exports = sizeRouter;