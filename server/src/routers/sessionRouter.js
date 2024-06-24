const express = require("express");

const { sessionController } = require("../controllers/sessionController");

const { SigninValidationRules, tokenValidationRules } = require("../utils/combinedValidation");
const { tokenValidation } = require("../utils/validation");

const sessionRouter = express.Router();

/* 로그인 */
sessionRouter.post(
  "/", SigninValidationRules, sessionController.postSignIn
);

/* 로그아웃 */
sessionRouter.delete(
  "/", ...tokenValidation(), sessionController.signOut
)

/* access 토큰 재발급 */
sessionRouter.get(
  "/", tokenValidationRules, sessionController.getReissueToken
)

module.exports = sessionRouter;