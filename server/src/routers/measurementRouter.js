const express = require("express");
const { measurementController } = require("../controllers/measurementController");

const measurementRouter = express.Router();

/** product 조회 */
measurementRouter.get("/", measurementController.getMeasurementList);

module.exports = measurementRouter;