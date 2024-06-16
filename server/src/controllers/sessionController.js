const { validationResult } = require('express-validator');

const { sessionService } = require("../services/sessionService");

const sessionController = {
  /** 로그인 */
  postSignIn: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const {email, password} = req.body;

      const accessToken = await sessionService.signIn(email, password);

      res.status(201).json({'accessToken': accessToken});
    } catch (error) {
      next(error)
    }
  }
}

exports.sessionController = sessionController;