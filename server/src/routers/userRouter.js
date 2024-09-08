const express = require("express");

const { userController } = require("../controllers/userController");

const {
  SignupValidationRules, tokenValidationRules
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

/* 모든 회원 정보 조회 */
userRouter.get(
  "/all", userController.getAllUser
)

/* 로그인한 회원 product 조회 */
userRouter.get(
  "/product", tokenValidationRules, userController.getMyProduct
);

/* 이메일 조회 */
userRouter.get(
  "/email-valid/:email", userController.getIdByEmail
)

/* 닉네임으로 조회 */
userRouter.get(
  "/name-valid/:name", userController.getIdByName
)

userRouter.get(
  "/:userId", tokenValidationRules, userController.getUserInfo
);

/* 비밀번호 변경 */
userRouter.patch(
  "/modify-password", tokenValidationRules, userController.patchPassword
)

/* 성별 변경 */
userRouter.patch(
  "/modify-gender", tokenValidationRules, userController.patchGender
)

/* 키 변경 */
userRouter.patch(
  "/modify-height", tokenValidationRules, userController.patchHeight
)

/* 몸무게 변경 */
userRouter.patch(
  "/modify-weight", tokenValidationRules, userController.patchWeight
)

/* 체형 변경 */
userRouter.patch(
  "/modify-description", tokenValidationRules, userController.patchDescription
)

/* 로그인한 회원 탈퇴 */
userRouter.delete(
  "/", tokenValidationRules, userController.deleteMe
);

/* 로그인한 회원 product 삭제 */
userRouter.delete(
  "/product/:productId", tokenValidationRules, userController.deleteMyProduct
)

module.exports = userRouter;