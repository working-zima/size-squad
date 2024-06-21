const { UserModel } = require("../schemas/user");

const { renameId } = require("../../utils/utils");

const User = {
  /** 회원 가입 */
  create: async (newUser) => {
    try {
      let userData = await UserModel.create(newUser);

      if (userData) userData = renameId(userData._doc, 'userId');

      return userData;
    } catch(error) {
      throw new Error(error);
    }
  },

  /** _id로 검색 */
  findById: async (_id) => {
    try {
      let userData = await UserModel.findOne(
        { _id },
        "_id email name gender height weight description role followers following"
        // mongoose document를 필요한 javascript object로 반환
      )
      .populate({ path: "genderId", select: ["_id", "gender"] })
      .lean();

      // 고유 아이디 키 이름인 _id를 userId로 교체
      if (userData) userData = renameId(userData, 'userId');

      return userData;
    } catch (error) {
      throw error;
    }
  },

  /** Email로 검색 */
  findByEmail: async ({email}) => {
    try {
      let userData = await UserModel.findOne(
        { email },
        "_id email password name"
        // mongoose document를 필요한 javascript object로 반환
      )
      .populate({ path: "genderId", select: ["_id", "gender"] })
      .lean();

      // 고유 아이디 키 이름인 _id를 userId로 교체
      if (userData) userData = renameId(userData, 'userId');

      return userData;
    } catch (error) {
      throw error;
    }
  },

  /** Name으로 검색 */
  findByName: async ({name}) => {
    try {
      let userData = await UserModel.findOne(
        { name },
        "_id email name"
      )
      .populate({ path: "genderId", select: ["_id", "gender"] })
      .lean();

      if (userData) userData = renameId(userData, 'userId');
    } catch (error) {
      throw error;
    }
  },

  /** 유저 정보 삭제 */
  deleteUser: async (_id) => {
    try {
      const userData = await UserModel.findByIdAndDelete({ _id });

      return userData;
    } catch (error) {
      return error;
    }
  },
}

exports.User = User;
