const { TokenModel } = require("../schemas/token");

const Token = {
  create: async ({ refreshToken, accessToken, userId }) => {
    try {
      let tokenData = await TokenModel.create({
        refreshToken, accessToken, userId
      });

      return tokenData;
    } catch (error) {
      throw error;
    }
  },

  /**
   * refresh token 업데이트
   */
  update: async ({ tokenId, fieldToUpdate, newValue }) => {
    try {
      const filter = { _id: tokenId };
      const update = {
        [fieldToUpdate.refreshToken]: newValue.refreshToken,
        [fieldToUpdate.accessToken]: newValue.accessToken,
      };

      // 업데이트 전 데이터를 리턴하지 말고 업데이트 후 데이터를 리턴
      const option = { returnOriginal: false };

      const newToken = await TokenModel.findOneAndUpdate(
        filter,
        update,
        option
      ).lean();

      return newToken;
    } catch (error) {
      throw error;
    }
  },

  /** userId로 데이터 검색 */
  findByUserId: async ({ userId }) => {
    try {
      let tokenData = await TokenModel.findOne(
        { userId },
        "_id refreshToken userId"
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
        "accessToken userId"
      )
      .lean()

      return tokenData;
    } catch(error) {
      throw error;
    }
  },

  /** refresh 토큰 삭제 */
  deleteToken: async ({userId}) => {
    try {
      const deletedTokenInfo = await TokenModel.deleteOne({ userId });

      return deletedTokenInfo;
    } catch(error) {
      throw error;
    }
  }
}

exports.Token = Token;
