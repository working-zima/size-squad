const { validationResult } = require('express-validator');

const { sessionService } = require("../services/sessionService");

const sessionController = {
  /** 로그인 */
  postSignIn: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const {email, password} = req.body;

      const accessToken = await sessionService.signIn({
        inputEmail: email, inputPassword: password
      });

      res.status(201).json({'accessToken': accessToken});
    } catch(error) {
      next(error);
    }
  },

  signOut: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    try {
      const userAccessToken = req.headers["authorization"];
      await sessionService.signOut({userAccessToken})

      res.status(201).json({});
    } catch(error) {
      next(error);
    }
  }
}

exports.sessionController = sessionController;