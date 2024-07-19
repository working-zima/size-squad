const { SizeModel } = require("../schemas/size");

const Size = {
  create: async ({ newSize }) => {
    try {
      await SizeModel.create(newSize);

      return;
    } catch(error) {
      throw error;
    }
  },

  findAll: async () => {
    try {
      const genderData = await SizeModel
        .find({}, "_id name gender type")
        .populate({ path: "gender", select: ["_id", "gender"] })
        .lean();

      return genderData;
    } catch (error) {
      throw error;
    }
  }
}

exports.Size = Size;