const bcrypt = require("bcrypt");

const { User } = require("../db/models/User");
const { Token } = require("../db/models/Token");

const { generateJwtToken } = require("../utils/utils");
const CustomError = require("../utils/CustomError");

const sessionService = {
  /** 로그인 */
  signIn: async ({inputEmail, inputPassword}) => {
    try {
      // 가입 여부 조회
      const userData = await User.findByEmail({ email: inputEmail });
      if (!userData) throw new CustomError('Registered email not found', 400);

      const { userId, password } = userData;

      // 비밀번호 확인
      const isPasswordMatch = await bcrypt.compare(inputPassword, password);
      if (!isPasswordMatch) throw new CustomError('Incorrect password', 400);

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
        throw new CustomError('Access Token mismatch', 403);
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

      throw new CustomError('Access Token mismatch', 403);
    } catch(error) {
      throw error;
    }
  },
}

exports.sessionService = sessionService;