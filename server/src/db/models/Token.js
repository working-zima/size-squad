const { TokenModel } = require("../schemas/token");

const Token = {
  create: async ({ refreshToken, accessToken, user }) => {
    try {
      let tokenData = await TokenModel.create({
        refreshToken, accessToken, user
      });

      return tokenData;
    } catch (error) {
      throw error;
    }
  },

  /**
   * refresh token 업데이트
   */
  update: async ({ tokenId, accessToken }) => {
    try {
      // 업데이트 전 데이터를 리턴하지 말고 업데이트 후 데이터를 리턴
      const newToken = await TokenModel.findOneAndUpdate(
        { _id: tokenId },
        { accessToken },
        { returnOriginal: false }
      ).lean();

      return newToken;
    } catch (error) {
      throw error;
    }
  },

  /** userId로 데이터 검색 */
  findByUserId: async ({ user }) => {
    try {
      let tokenData = await TokenModel.findOne(
        { user },
        "_id refreshToken user"
      ).lean();
      if (!tokenData) tokenData = null;

      return tokenData;
    } catch (error) {
      throw error;
    }
  },

  findByAccessToken: async ({ accessToken }) => {
    try {
      const tokenData = await TokenModel.findOne(
        { accessToken },
        "accessToken refreshToken user"
      )
      .lean()

      return tokenData;
    } catch(error) {
      throw error;
    }
  },

  /** refresh 토큰 삭제 */
  deleteToken: async ({ user }) => {
    try {
      const deletedTokenInfo = await TokenModel.deleteOne({ user });

      return deletedTokenInfo;
    } catch(error) {
      throw error;
    }
  }
}

exports.Token = Token;
