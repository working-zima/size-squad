const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models/User");
const { Token } = require('../db/models/Token')

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
      // 토큰을 서명으로 확인, 디코딩
      const jwtDecoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      const userId = jwtDecoded.userId;
      console.log(jwtDecoded)
      // models 에서 유저 고유 아이디로 데이터 찾기
      const userData = await User.findById(userId);

      return userData;
    } catch (error) {
      return error;
    }
  },

  deleteMe: async (accessToken) => {
    try {
      // 토큰을 서명으로 확인, 디코딩
      const jwtDecoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      const userId = jwtDecoded.userId;

      // models 에서 유저 고유 아이디로 데이터 찾기
      await User.deleteUser(userId);
      await Token.deleteToken(userId);
      return;
    } catch (error) {
      return error;
    }
  },
}

exports.userService = userService;