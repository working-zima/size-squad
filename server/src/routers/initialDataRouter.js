const express = require("express");

const { initialDataController } = require("../controllers/initialDataController");

const initialDataRouter = express.Router();

initialDataRouter.get(
  "/",
  initialDataController.getInitialData
);

module.exports = initialDataRouter;