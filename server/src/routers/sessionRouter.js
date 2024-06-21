const express = require("express");

const { sessionController } = require("../controllers/sessionController");
const { SigninValidationRules } = require("../utils/combinedValidation");
const { tokenValidation } = require("../utils/validation");

const sessionRouter = express.Router();

sessionRouter.post("/", SigninValidationRules, sessionController.postSignIn);

sessionRouter.delete("/", ...tokenValidation(), sessionController.signOut)

module.exports = sessionRouter;