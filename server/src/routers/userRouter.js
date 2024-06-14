const express = require("express");

const { userController } = require("../controllers/userController");
const { SignupValidationRules } = require("../validation");

const userRouter = express.Router();

userRouter.post("/", SignupValidationRules, userController.getSignup);

module.exports = userRouter;