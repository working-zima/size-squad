const { GenderModel } = require("../schemas/gender");

const Gender = {
  create: async (newSize) => {
    try {
      await GenderModel.create(newSize);

      return;
    } catch(error) {
      throw new Error(error);
    }
  },

  findByGender: async ({gender}) => {
    try {
      const genderData = await GenderModel.findOne({gender}).lean();

      return genderData;
    } catch(error) {
      throw new Error(error);
    }
  },
};

exports.Gender = Gender;