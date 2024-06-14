const { UserModel } = require("../schemas/user");

const { renameIdToUserId } = require("../../utils");

const User = {
  /** 회원 가입 */
  create: async (newUser) => {
    try {
      let userInfo = await UserModel.create(newUser);

      if (userInfo) userInfo = renameIdToUserId(userInfo._doc);

      return userInfo;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** Email로 검색 */
  findByEmail: async ({email}) => {
    try {
      // 생성과 수정 날짜 데이터를 제외한 _id, email, password, name만 user에 초기화
      let userInfo = await UserModel.findOne(
        { email },
        "_id email password name"
        // mongoose document를 필요한 javascript object로 반환
      ).lean();

      // 고유 아이디 키 이름인 _id를 userId로 교체
      if (userInfo) userInfo = renameIdToUserId(userInfo);

      return userInfo;
    } catch (error) {
      return error;
    }
  },
}

exports.User = User;
