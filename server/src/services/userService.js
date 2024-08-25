const bcrypt = require("bcrypt");

const { User } = require("../db/models/User");
const { Token } = require('../db/models/Token');

const { getUserIdByAccessToken, generateJwtToken } = require("../utils/utils");
const CustomError = require("../utils/CustomError");
const { Product } = require("../db/models/Product");

const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const userService = {
  /** 회원가입 */
  signUp: async (newUser) => {
    try {
      newUser.password = await bcrypt.hash(newUser.password, SALT_ROUND);

      const userData = await User.create(newUser);
      const { _id } = userData;

      // accessToken, refreshToken 동시 발급
      const refreshToken = generateJwtToken({
        userId: _id,
        secretKey: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.REFRESH_EXPIRES_IN
      });
      const accessToken = generateJwtToken({
        userId: _id,
        secretKey: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.ACCESS_EXPIRES_IN
      });

      await Token.create({ refreshToken, accessToken, user: _id });

      return accessToken;
    } catch (error) {
      throw error;
    }
  },

  /** 내 정보 조회 */
  getMyInfo: async (accessToken) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken })
      const userData = await User.findById(userId);
      return userData;
    } catch (error) {
      throw error;
    }
  },

  getIdByEmail: async ({ email }) => {
    try {
      const userData = await User.findByEmail({ email })
      const { _id } = userData

      return _id;
    } catch (error) {
      if (
        error.message ===
        "Cannot destructure property '_id' of 'userData' as it is null."
      ) {
        error.statusCode = 200;
        error.message = 'email not found'
      }

      throw error;
    }
  },

  getIdByName: async ({ name }) => {
    try {
      const userData = await User.findByName({ name })
      const { _id } = userData

      return _id;
    } catch (error) {
      if (
        error.message ===
        "Cannot destructure property '_id' of 'userData' as it is null."
      ) {
        error.statusCode = 200;
        error.message = 'Name not found'
      }

      throw error;
    }
  },

  /** 내 정보 삭제 */
  deleteMe: async (accessToken) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken })
      await User.deleteUser(userId);
      await Token.deleteToken(userId);
      await Product.deleteProductByAuthor({ author: userId })

      return;
    } catch (error) {
      throw error;
    }
  },

  /** 비밀번호 변경 */
  patchPassword: async ({ oldPassword, newPassword, accessToken }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken })
      const { _id, password } = await User.findPasswordById({ _id: userId });

      const isPasswordMatch = await bcrypt.compare(oldPassword, password);

      if (!isPasswordMatch) {
        throw new CustomError('Incorrect password', 400, []);
      }

      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUND);

      await User.patchUserData({ _id }, { password: hashedPassword })
    } catch (error) {
      throw error;
    }
  },

  /** 성별 변경 */
  patchGender: async ({ gender, accessToken }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken })
      const { _id } = await User.findPasswordById({ _id: userId });

      await User.patchUserData({ _id }, { gender })
    } catch (error) {
      throw error;
    }
  },

  /** 키 변경 */
  patchHeight: async ({ height, accessToken }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken })
      const { _id } = await User.findPasswordById({ _id: userId });

      await User.patchUserData({ _id }, { height })
    } catch (error) {
      throw error;
    }
  },

  /** 몸무게 변경 */
  patchWeight: async ({ weight, accessToken }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken })
      const { _id } = await User.findPasswordById({ _id: userId });

      await User.patchUserData({ _id }, { weight })
    } catch (error) {
      throw error;
    }
  },

  /** 체형 변경 */
  patchDescription: async ({ description, accessToken }) => {
    try {
      const userId = getUserIdByAccessToken({ accessToken })
      const { _id } = await User.findPasswordById({ _id: userId });

      await User.patchUserData({ _id }, { description })
    } catch (error) {
      throw error;
    }
  },
}

exports.userService = userService;