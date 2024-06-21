const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models/User");
const { Token } = require('../db/models/Token');
const { Product } = require("../db/models/Product");

const { getUserIdByAccessToken } = require("../utils/utils");

const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const userService = {
  signUp: async (newUser) => {
    try {
      newUser.password = await bcrypt.hash(newUser.password, SALT_ROUND);
      const userInfo = User.create(newUser);

      return userInfo;
    } catch(error) {
      throw error;
    }
  },

  getMyInfo: async (accessToken) => {
    try {
      const userId = getUserIdByAccessToken(accessToken)
      const userData = await User.findById(userId);

      return userData;
    } catch (error) {
      return error;
    }
  },

  deleteMe: async (accessToken) => {
    try {
      const userId = getUserIdByAccessToken(accessToken)
      await User.deleteUser(userId);
      await Token.deleteToken(userId);

      return;
    } catch(error) {
      return error;
    }
  },
}

exports.userService = userService;