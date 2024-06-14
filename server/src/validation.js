const { body } = require('express-validator');

const { User } = require('./db/models/User');

const SignupValidationRules = [
  body('email')
    .isEmail() // 문자열이 이메일 형식인지 확인
    .withMessage('Please enter a valid email.')
    .normalizeEmail() // 이메일 주소 저장을 위한 균일화(sanitize)
    .custom((value, { req }) => {
      return User.findByEmail({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('E-Mail address already exists!');
        }
      });
    }),
  body('password')
    .trim()
    .isLength({ min: 8, max: 16 }), // 길이 8 ~ 16
  body('name')
    .trim()
    .notEmpty(),
  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['male', 'female']).withMessage('Gender must be either male or female'),
  body('height')
    .trim()
    .notEmpty(),
  body('weight')
    .trim()
    .notEmpty(),
  body('description')
    .notEmpty(),
]

module.exports = {
  SignupValidationRules,
};