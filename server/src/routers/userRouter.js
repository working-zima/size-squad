const express = require("express");

const { userController } = require("../controllers/userController");
const { SignupValidationRules, tokenValidationRules } = require("../utils/combinedValidation");

const userRouter = express.Router();

/* 회원 가입 */
userRouter.post("/", SignupValidationRules, userController.postSignUp);

/* 로그인한 회원 정보 조회 */
userRouter.get("/me", tokenValidationRules, userController.getMyInfo);

/* 로그인한 회원 탈퇴 */
userRouter.delete("/", tokenValidationRules, userController.deleteMe);

module.exports = userRouter;