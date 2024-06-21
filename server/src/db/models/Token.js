const { TokenModel } = require("../schemas/token");

const { renameId } = require("../../utils/utils");

const Token = {
  create: async (newToken) => {
    try {
      let tokenData = await TokenModel.create(newToken);

      if (tokenData) tokenData = renameId(tokenData._doc, 'tokenId');

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
        [fieldToUpdate.userId]: newValue.userId,
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
  findByUserId: async (userId) => {
    try {
      let tokenData = await TokenModel.findOne(
        { userId },
        "_id refreshToken userId"
      ).lean();

      if (tokenData) tokenData = renameId(tokenData, 'tokenId');
      if (!tokenData) tokenData = null;

      return tokenData;
    } catch (error) {
      throw error;
    }
  },

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
