const express = require("express");
const { validationResult } = require('express-validator');
const { userService } = require("../services/userService");

const userController = {
  /**
   * 회원가입
   */
  getSignup: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    try {
      const {
        email, name, password, gender, height, weight, description
      } = req.body;

      const userInfo = userService.signup(
      {email, name, password, gender, height, weight, description}
    )

      res.status(201).json(userInfo);
    } catch (error) {
      next(error);
    }
  }
}

exports.userController = userController;