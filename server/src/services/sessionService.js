const bcrypt = require("bcrypt");

const { User } = require("../db/models/User");
const { Token } = require("../db/models/Token");
const { generateJwtToken } = require("../utils/utils");

const sessionService = {
  /** 로그인 */
  signIn: async (inputEmail, inputPassword) => {
    try {
      // 가입 여부 조회
      const userData = await User.findByEmail(inputEmail);
      if (!userData) throw new Error('Registered email not found');

      const { userId, email, password, name } = userData;

      // 비밀번호 확인
      const isPasswordMatch = await bcrypt.compare(inputPassword, password);
      if (!isPasswordMatch) throw new Error('Incorrect password');

      // accessToken, refreshToken 동시 발급
      let refreshToken =  generateJwtToken(
        userId, process.env.JWT_SECRET_KEY, process.env.REFRESH_EXPIRES_IN
      );
      const accessToken = generateJwtToken(
        userId, process.env.JWT_SECRET_KEY, process.env.ACCESS_EXPIRES_IN
      );

      // 데이터 베이스에 토큰 유무 확인
      const tokenData = await Token.findByUserId(userId);

      // 데이터 베이스에 refresh 토큰이 있는 경우 재발급하여 데이터 베이스의 refresh 토큰과 교체
      if (!!tokenData) {
        const tokenId = tokenData.tokenId;
        const fieldToUpdate = {};
        const newValue = {};

        fieldToUpdate.refreshToken = "refreshToken";
        fieldToUpdate.userId = "userId";

        newValue.refreshToken = refreshToken;
        newValue.userId = userId;

        await Token.update({
          tokenId,
          fieldToUpdate,
          newValue,
        });
      }

      // 데이터 베이스에 refresh 토큰이 없는 경우 데이터 베이스에 refresh 토큰 저장
      if (!tokenData) {
        const newToken = {
          refreshToken: refreshToken,
          userId: userData.userId,
        };

        await Token.create(newToken);
      }

      return accessToken;
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
  }
}

exports.sessionService = sessionService;