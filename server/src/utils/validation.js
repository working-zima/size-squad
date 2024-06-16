const { body } = require('express-validator');
const { User } = require('../db/models/User');

/** 이메일 검사 */
const emailValidation = () => [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail()
];

/** 비밀번호 검사 */
const passwordValidation = () => [
  body('password')
    .trim()
    .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters')
];

/** 이름 검사 */
const nameValidation = () => [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .custom(async (value, { req }) => {
      const userDoc = await User.findByName({ name: value });
      if (userDoc) {
        return Promise.reject('Name already exists');
      }
    })
];

/** 성별 검사 */
const genderValidation = () => [
  body('gender')
    .trim()
    .notEmpty().withMessage('Gender is required')
    .isIn(['male', 'female']).withMessage('Gender must be either male or female')
];

/** 숫자 검사 */
const numericValidation = (field) => [
  body(field)
    .trim()
    .notEmpty().withMessage(`${field} is required`)
    .isNumeric().withMessage(`${field} must be a number`)
];

module.exports = {
  emailValidation,
  passwordValidation,
  nameValidation,
  genderValidation,
  numericValidation
};
