const { body, header } = require('express-validator');

const {
  passwordValidation, nameValidation, genderValidation, numericValidation, emailValidation
} = require("./validation");

/** 토큰 검사 */
const tokenValidationRules = [
  header('Authorization')
    .exists().withMessage('Authorization header is missing')
    .bail()
    .customSanitizer(value => value.split(' ')[1]) // 'Bearer ' 이후 토큰만 추출
    .trim()
    .notEmpty().withMessage('Token is empty') // 토큰이 비어있는지 확인
    .isJWT().withMessage('Invalid token') // JWT 형식 검증
];

/** 회원가입 검사 */
const SignupValidationRules = [
  ...emailValidation(),
  body('email').custom(async (value, { req }) => {
    const userDoc = await User.findByEmail(value);
    if (userDoc) {
      return Promise.reject('E-Mail address already exists');
    }
  }),
  ...passwordValidation(),
  ...nameValidation(),
  ...genderValidation(),
  ...numericValidation('height'),
  ...numericValidation('weight'),
  body('description')
    .notEmpty().withMessage('Description is required'),
];

/** 로그인 검사 */
const SigninValidationRules = [
  ...emailValidation(),
  ...passwordValidation(),
];

module.exports = {
  SignupValidationRules,
  SigninValidationRules,
  tokenValidationRules
};