const {
  passwordValidation, genderValidation, numericValidation, emailValidation,
  tokenValidation, checkEmailDuplicate, checkNameDuplicate, isValueExist,
  checkCategoryDuplicate, paramIdValidation, isCategoryExist,
  checkSubCategoryDuplicate,sizeArrayValidation, isArrayValidation,
  checkFitDuplicate, checkGenderDuplicate, isObjectValidation
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
  ...numericValidation('height'),
  ...numericValidation('weight'),
  ...isValueExist('genderId'),
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
  ...checkCategoryDuplicate(),
  ...checkSubCategoryDuplicate()
]

/** 카테고리 수정 검사 */
const updateCategoryRules = [
  ...tokenValidation(),
  ...isValueExist('category'),
  ...paramIdValidation('categoryId'),
  ...isCategoryExist()
]

/** 사이즈 등록 검사 */
const createGenderRules = [
  ...tokenValidation(),
  ...genderValidation(),
  ...sizeArrayValidation(),
  ...isArrayValidation('size'),
  ...checkGenderDuplicate()
]

/** 핏 검사 */
const createFitRules = [
  ...tokenValidation(),
  ...isValueExist('fit'),
  ...checkFitDuplicate()
];

const fieldsToValidate = [
  "categoryId",
  "subCategoryId",
  "authorId",
  "brand",
  "name",
  "genderId",
  "size",
  "fitId"
];

/** product 등록 검사 */
const createProductRules = [
  ...fieldsToValidate.flatMap(field => isValueExist(`${field}`)),
  ...isObjectValidation("measurements"),
  ...tokenValidation(),
]

module.exports = {
  SignupValidationRules,
  SigninValidationRules,
  tokenValidationRules,
  addCategoryRules,
  updateCategoryRules,
  createGenderRules,
  createFitRules,
  createProductRules
};