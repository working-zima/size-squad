const { validationResult } = require('express-validator');

const { userService } = require("../services/userService");

const userController = {
  /** 회원가입 */
  postSignUp: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const {
        email, name, password, gender, height, weight, description
      } = req.body;

      userService.signUp(
        {email, name, password, gender, height, weight, description}
      )

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  /** 로그인 회원 정보 조회 */
  getMyInfo: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 403;
      error.data = errors.array();
      return next(error);
    }
    try {
      const userAccessToken = req.headers["authorization"];

      const userData = await userService.getMyInfo(userAccessToken);

      res.status(200).json(userData);
    } catch(error) {
      next(error)
    }
  },

    /** 로그인 회원 삭제 */
    deleteMe: async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 403;
        error.data = errors.array();
        return next(error);
      }
      try {
        const userAccessToken = req.headers["authorization"];

        await userService.deleteMe(userAccessToken);

        res.status(200).json();
      } catch(error) {
        next(error)
      }
    }
}

exports.userController = userController;