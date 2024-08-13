const { UserModel } = require("../schemas/user");

const User = {
  /** 회원 가입 */
  create: async (newUser) => {
    try {
      const userData = await UserModel.create(newUser)

      return userData;
    } catch(error) {
      throw error;
    }
  },

  /** _id로 검색 */
  findById: async (_id) => {
    try {
      const userData = await UserModel.findOne(
        { _id },
        "_id email name gender height weight description role followers following"
        // mongoose document를 필요한 javascript object로 반환
      )
      .populate({ path: "gender", select: ["_id", "name"] })
      .lean();

      return userData;
    } catch (error) {
      throw error;
    }
  },

  /** Email로 검색 */
  findByEmail: async ({email}) => {
    try {
      const userData = await UserModel.findOne(
        { email },
        "_id email password name"
        // mongoose document를 필요한 javascript object로 반환
      )
      .populate({ path: "gender", select: ["_id", "name"] })
      .lean();

      return userData;
    } catch (error) {
      throw error;
    }
  },

  /** Name으로 검색 */
  findByName: async ({name}) => {
    try {
      const userData = await UserModel.findOne(
        { name },
        "_id email name"
      )
      .populate({ path: "gender", select: ["_id", "name"] })
      .lean();

      return userData;
    } catch (error) {
      throw error;
    }
  },

  findPasswordById: async ({userId}) => {
    try {
      const userData = await UserModel.findOne({ userId }, "password")
        .lean();

      return userData;
    } catch (error) {
      throw error;
    }
  },

  /** 비밀번호 수정 */
  patchPassword: async (filter, userData) => {
    try {
      const data = await UserModel.findOneAndUpdate(
        filter, userData, { new: true }
      ).lean();

      return;
    } catch(error) {
      throw error;
    }
  },

  /** 유저 정보 삭제 */
  deleteUser: async (_id) => {
    try {
      const userData = await UserModel.findByIdAndDelete({ _id });

      return userData;
    } catch (error) {
      throw error;
    }
  },
}

exports.User = User;
