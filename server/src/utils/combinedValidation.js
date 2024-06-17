const {
  passwordValidation, genderValidation, numericValidation, emailValidation, tokenValidation, checkEmailDuplicate, checkNameDuplicate, isValueExist,
  checkCategoryDuplicate,
  paramIdValidation,
  isCategoryExist
} = require("./validation");

/** 성별 검사 */
const genderCombinedValidation = () => [
  ...isValueExist('gender'),
  ...genderValidation(),
];

/** 닉네임 검사 */
const nameValidation = () => [
  ...isValueExist('name'),
  ...checkNameDuplicate()
];

/** 비밀번호 검사 */
const passwordCombinedValidation = () => [
  ...isValueExist('password'),
  ...passwordValidation(),
];

/** 토큰 검사 */
const tokenValidationRules = [
  ...tokenValidation()
];

/** 회원가입 검사 */
const SignupValidationRules = [
  ...emailValidation(),
  ...checkEmailDuplicate(),
  ...nameValidation(),
  ...checkNameDuplicate(),
  ...passwordCombinedValidation(),
  ...genderCombinedValidation(),
  ...numericValidation('height'),
  ...numericValidation('weight'),
  ...isValueExist('description'),
];

/** 로그인 검사 */
const SigninValidationRules = [
  ...emailValidation(),
  ...passwordValidation(),
];

/** 카테고리 검사 */
const addCategoryRules = [
  ...tokenValidation(),
  ...isValueExist('category'),
  ...checkCategoryDuplicate()
]

const updateCategoryRules = [
  ...tokenValidation(),
  ...isValueExist('category'),
  ...paramIdValidation('categoryId'),
  ...isCategoryExist()
]

module.exports = {
  SignupValidationRules,
  SigninValidationRules,
  tokenValidationRules,
  addCategoryRules,
  updateCategoryRules
};