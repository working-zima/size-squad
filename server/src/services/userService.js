const bcrypt = require("bcrypt");

const { User } = require("../db/models/User");
const { Token } = require('../db/models/Token');

const { getUserIdByAccessToken } = require("../utils/utils");

const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const userService = {
  /** 회원가입 */
  signUp: async (newUser) => {
    try {
      newUser.password = await bcrypt.hash(newUser.password, SALT_ROUND);
      const userInfo = User.create(newUser);

      return userInfo;
    } catch(error) {
      throw error;
    }
  },

  /** 내 정보 조회 */
  getMyInfo: async (accessToken) => {
    try {
      const userId = getUserIdByAccessToken(accessToken)
      const userData = await User.findById(userId);

      return userData;
    } catch (error) {
      throw error;
    }
  },

  getIdByEmail: async ({email}) => {
    try {
      const userData = await User.findByEmail({ email })
      const { _id } = userData

      return _id;
    } catch (error) {
      if(
        error.message ===
        "Cannot destructure property '_id' of 'userData' as it is null."
      ){
        error.statusCode = 200;
        error.message = 'email not found'
      }

      throw error;
    }
  },

  getIdByName: async ({name}) => {
    try {
      const userData = await User.findByName({ name })
      const { _id } = userData

      return _id;
    } catch (error) {
      if(
        error.message ===
        "Cannot destructure property '_id' of 'userData' as it is null."
      ){
        error.statusCode = 200;
        error.message = 'Name not found'
      }

      throw error;
    }
  },

  /** 내 정보 삭제 */
  deleteMe: async (accessToken) => {
    try {
      const userId = getUserIdByAccessToken(accessToken)
      await User.deleteUser(userId);
      await Token.deleteToken(userId);

      return;
    } catch(error) {
      throw error;
    }
  },
}

exports.userService = userService;