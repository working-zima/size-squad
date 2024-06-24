const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models/User");
const { Token } = require("../db/models/Token");
const { generateJwtToken } = require("../utils/utils");

const sessionService = {
  /** 로그인 */
  signIn: async ({inputEmail, inputPassword}) => {
    try {
      // 가입 여부 조회
      const userData = await User.findByEmail({ email: inputEmail });
      if (!userData) throw new Error('Registered email not found');

      const { userId, password } = userData;

      // 비밀번호 확인
      const isPasswordMatch = await bcrypt.compare(inputPassword, password);
      if (!isPasswordMatch) throw new Error('Incorrect password');

      // accessToken, refreshToken 동시 발급
      const refreshToken =  generateJwtToken({
        userId,
        secretKey: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.REFRESH_EXPIRES_IN
      });
      const accessToken = generateJwtToken({
        userId,
        secretKey: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.ACCESS_EXPIRES_IN
      });

      // 데이터 베이스에 토큰 유무 확인
      const tokenData = await Token.findByUserId({ userId });

      // 데이터 베이스에 refresh 토큰이 있는 경우 재발급하여 데이터 베이스의 refresh 토큰과 교체
      if (!!tokenData) {
        const tokenId = tokenData.tokenId;
        const fieldToUpdate = {};
        const newValue = {};

        fieldToUpdate.refreshToken = "refreshToken";
        fieldToUpdate.accessToken = "accessToken";

        newValue.refreshToken = refreshToken;
        newValue.accessToken = accessToken;

        await Token.update({
          tokenId,
          fieldToUpdate,
          newValue,
        });
      }

      // 데이터 베이스에 refresh 토큰이 없는 경우 데이터 베이스에 refresh 토큰 저장
      if (!tokenData) {
        await Token.create({ refreshToken, accessToken, userId });
      }

      return accessToken;
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
  },

  /** 로그아웃 */
  signOut: async ({userAccessToken}) => {
    try {
      const tokenData = await Token.findByAccessToken({
        accessToken: userAccessToken
      })

      if(userAccessToken !== tokenData.accessToken) {
        throw new Error("accessToken mismatch");
      }

      await Token.deleteToken({userId: tokenData.userId});

      return;
    } catch (error) {
      throw error;
    }
  },

  /** access 토큰 재발급 */
  reissueToken: async ({accessToken}) => {
    try {
      const tokenData = await Token.findByAccessToken({
        accessToken
      });

      if(tokenData) {
        const accessToken = generateJwtToken({
          userId: tokenData.userId,
          secretKey: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.ACCESS_EXPIRES_IN
        });

        Token.create({ refreshToken, accessToken, userId :tokenData.userId })

        return accessToken;
      }

      throw new Error("accessToken mismatch")
    } catch(error) {
      throw error;
    }
  },
}

exports.sessionService = sessionService;