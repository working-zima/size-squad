const { body, header, param } = require('express-validator');

const { User } = require('../db/models/User');
const { Category } = require('../db/models/Category');
const { SubCategory } = require('../db/models/SubCategory');
const { Fit } = require('../db/models/Fit');
const { Gender } = require('../db/models/Gender');
const { Token } = require('../db/models/Token');

/** 특정 필드 값의 유무 확인 */
const isValueExist = (field) => [
  body(field)
  .trim()
  .notEmpty().withMessage(`${field} is required`)
];

/** 배열인지 검사 */
const isArrayValidation = (field) => [
  body(field)
    .isArray()
    .withMessage(`${field} must be an array`),
]

/** 객체인지 검사 */
const isObjectValidation = (field) => [
  body(field)
    .isObject()
    .withMessage(`${field} must be an object`),
]

/** 숫자 검사 */
const numericValidation = (field) => [
  body(field)
    .trim()
    .isNumeric().withMessage(`${field} must be a number`)
];

/** 이메일 검사 */
const emailValidation = () => [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail()
];

/** 비밀번호 검사 */
const passwordValidation = () => [
  body('password')
    .isLength({ min: 8, max: 16 })// 8이상 16이하
    .withMessage('Password must be between 8 and 16 characters')
];

/** 성별 검사 */
const genderValidation = () => [
  body('gender')
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female')
];

/** 토큰 검사 */
const tokenValidation = () => [
  header('Authorization')
    .exists().withMessage('Authorization header is missing')
    .bail()
    .customSanitizer(value => value.split(' ')[1]) // 'Bearer ' 이후 토큰만 추출
    .trim()
    .notEmpty().withMessage('Token is empty') // 토큰이 비어있는지 확인
    .isJWT().withMessage('Invalid token') // JWT 형식 검증
    .custom(async (value, { req }) => {
      const userDoc = await Token.findByAccessToken({ accessToken: value });
      if (!userDoc) {
        return Promise.reject('AccessToken doesn\'t exists');
      }
    })
];

/** 이메일 중복 검사 */
const checkEmailDuplicate = () => [
  body('email').custom(async (value, { req }) => {
    const userDoc = await User.findByEmail({ email: value });
    if (userDoc) {
      return Promise.reject('E-Mail address already exists');
    }
  })
];

/** 닉네임 중복 검사 */
const checkNameDuplicate = () => [
  body('name')
    .custom(async (value, { req }) => {
      const userDoc = await User.findByName({ name: value });
      if (userDoc) {
        return Promise.reject('Name already exists');
      }
    })
];

/** 카테고리 중복 검사 */
const checkCategoryDuplicate = () => [
  body('category')
    .custom(async (value, { req }) => {
      const userDoc = await Category.findByCategory({ category: value });
      if (userDoc) {
        return Promise.reject('Category already exists');
      }
    })
];

/** URL Params으로 받은 _id 검사 */
const paramIdValidation = (field) => [
  param(field)
    .trim()
    .notEmpty().withMessage(`${field} is required`)
    .isLength({ min: 24, max: 24 })
    .withMessage(`${field} is incorrect format`)
]

/** 카테고리가 데이터베이스에 존재하는지 검사 */
const isCategoryExist = () => [
  param('categoryId')
    .custom(async (value, { req }) => {
      const userDoc = await Category.findById({ _id: value });
      if (!userDoc) {
        return Promise.reject('Category doesn\'t exists');
      }
    })
];

/** subCategory 검사 */
const checkSubCategoryDuplicate = () => [
  body('subCategories.*')
    .custom(async (value, { req }) => {
      const userDoc = await SubCategory.findBySubCategory({ subCategory: value });
      if (userDoc) {
        return Promise.reject('subCategory already exists');
      }
    })
];


/** 사이즈 형식 검사 */
const sizeArrayValidation = () => [
  body('size.*')
    .matches(/^(ONE SIZE|\d{2,3}\([A-Z0-9]+\))$/)
    .withMessage('Invalid size format')
]


/** 핏 중복 검사 */
const checkFitDuplicate = () => [
  body('fit')
    .custom(async (value, { req }) => {
      const userDoc = await Fit.findByFit({ fit: value });
      if (userDoc) {
        return Promise.reject('Fit already exists');
      }
    })
];

/** 성별 중복 검사 */
const checkGenderDuplicate = () => [
  body('gender')
    .custom(async (value, { req }) => {
      const userDoc = await Gender.findByGender({ gender: value });
      if (userDoc) {
        return Promise.reject('Gender already exists');
      }
    })
];

module.exports = {
  emailValidation,
  checkEmailDuplicate,
  passwordValidation,
  genderValidation,
  numericValidation,
  tokenValidation,
  checkNameDuplicate,
  isValueExist,
  checkCategoryDuplicate,
  paramIdValidation,
  isCategoryExist,
  checkSubCategoryDuplicate,
  isArrayValidation,
  sizeArrayValidation,
  checkFitDuplicate,
  checkGenderDuplicate,
  isObjectValidation
};
