const express = require("express");

const { userController } = require("../controllers/userController");

const {
  SignupValidationRules, tokenValidationRules, createProductRules
} = require("../utils/combinedValidation");

const userRouter = express.Router();

/* 회원 가입 */
userRouter.post(
  "/", SignupValidationRules, userController.postSignUp
);

/* 로그인한 회원 정보 조회 */
userRouter.get(
  "/me", tokenValidationRules, userController.getMyInfo
);

/* 로그인한 회원 탈퇴 */
userRouter.delete(
  "/", tokenValidationRules, userController.deleteMe
);

/** product 등록 */
userRouter.post(
  "/product", createProductRules, userController.postAddProducts
);

/* 로그인한 회원 product 조회 */
userRouter.get(
  "/product", tokenValidationRules, userController.getMyProduct
);

/* 로그인한 회원 product 삭제 */
userRouter.delete(
  "/product/:productId", tokenValidationRules, userController.deleteMyProduct
)

// 수정해야 됨
/* 이메일 조회 */
userRouter.get(
  "/email-valid/:email", userController.getIdByEmail
)

/* 닉네임으로 조회 */
userRouter.get(
  "/name-valid/:name", userController.getIdByName
)

module.exports = userRouter;