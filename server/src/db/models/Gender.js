const { GenderModel } = require("../schemas/gender");

const Gender = {
  create: async (newSize) => {
    try {
      await GenderModel.create(newSize);

      return;
    } catch(error) {
      throw error;
    }
  },

  findByGender: async ({gender}) => {
    try {
      const genderData = await GenderModel.findOne({gender}).lean();

      return genderData;
    } catch(error) {
      throw error;
    }
  },
};

exports.Gender = Gender;