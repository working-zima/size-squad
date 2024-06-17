const express = require("express");

const { sessionController } = require("../controllers/sessionController");
const { SigninValidationRules } = require("../utils/combinedValidation");

const sessionRouter = express.Router();

sessionRouter.post("/", SigninValidationRules, sessionController.postSignIn);

module.exports = sessionRouter;