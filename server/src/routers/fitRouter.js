const express = require("express");
const { fitController } = require("../controllers/fitController");

const fitRouter = express.Router();

/* 핏 리스트 조회 */
fitRouter.get(
  "/",
  fitController.getFitList
);

module.exports = fitRouter;